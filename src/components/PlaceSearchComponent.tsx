import { useState } from "react";
import axios from "axios";
import countrycodes from "../../public/countrycodes.json";
interface Place {
  countryCode: any;
  name: string;
  lat: number;
  lng: number;
}

type Props = {
  onPlaceSelect: (place: Place) => void;
};

const PlaceSearchComponent = (props: Props) => {
  const [placeName, setPlaceName] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  async function axiosGetData(url: string) {
    return await axios.get(url, {
      params: {
        q: placeName,
        username: import.meta.env.VITE_GEONAMES_USERNAME,
        featureClass: "P", // Populated places
      },
      timeout: 5000,
    });
  }

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response: any = axiosGetData(
        "https://pixtane-proxy-b2c195238332.herokuapp.com/http://api.geonames.org/searchJSON"
      );

      const data = response.data;
      console.log("data", data);
      setPlaces(data.geonames);
    } catch (error) {
      console.error(
        "Error fetching data from GeoNames API using self hosted proxy:",
        error
      );
      console.log("Retrying with open proxy...");

      try {
        const response: any = axiosGetData(
          "https://cors-anywhere.herokuapp.com/http://api.geonames.org/searchJSON"
        );

        const data = response.data;
        console.log("data", data);
        setPlaces(data.geonames);
      } catch (error) {
        console.error(
          "Error fetching data from GeoNames API using open proxy:",
          error
        );
        console.log("Retrying using https with no proxy");

        try {
          const response: any = axiosGetData(
            "https://api.geonames.org/searchJSON"
          );

          const data = response.data;
          console.log("data", data);
          setPlaces(data.geonames);
        } catch (error) {
          console.error("Error fetching data from GeoNames API:", error);
          console.log(
            "Search failed. Try again later or enable open proxy by going to https://cors-anywhere.herokuapp.com/corsdemo and clicking enable. Contant owner for support."
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full p-4 bg-gray-500">
      <div className="flex gap-3">
        <input
          className="border p-1.5 bg-gray-100 rounded-lg font-semibold text-black"
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder="Enter place name"
        />
        <button
          className="border border-gray-800 hover:border-blue-800 p-1.5 px-4 rounded-lg font-semibold bg-gray-700 hover:bg-blue-600 active:bg-blue-700 transition-colors text-white"
          onClick={handleSearch}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <ul
        className={
          `place-item ` + (loading ? "" : "place-item-enter ") + "mt-4 "
        }
      >
        {places.map((place, index) => (
          <li
            key={index + ": " + place.lat + "|" + place.lng}
            className={
              "border border-gray-300 transition-all -mt-[1px] p-1.5 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 cursor-pointer flex items-center justify-between " +
              (index === 0 ? "rounded-t-lg" : "")
            }
            onClick={() => props.onPlaceSelect(place)}
          >
            <div>
              <p className="font-semibold">
                {place.name},{" "}
                {countrycodes[place.countryCode as keyof typeof countrycodes]}
              </p>
              <p className="text-sm font-light">
                Lat/Lon: {Number(place.lat).toFixed(2)}/
                {Number(place.lng).toFixed(2)}
              </p>
            </div>

            <div
              data-tooltip={JSON.stringify(place)
                .replace(/"[^"]*"/g, (match) => match.replace(/,/g, ""))
                .replace(/"/g, "")
                .replace(/:/g, ": ")
                .replace(/,/g, "\n")
                .slice(1, -1)}
              className=" bg-gray-600 rounded h-10 w-10 mr-0.5 flex items-center justify-center"
            >
              <p className="text-2xl">?</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceSearchComponent;
