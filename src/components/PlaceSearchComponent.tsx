import React, { useState } from "react";
import axios from "axios";
import countrycodes from "../assets/countrycodes.json";

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

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://api.geonames.org/searchJSON", {
        params: {
          q: placeName,
          username: import.meta.env.VITE_GEONAMES_USERNAME,
          featureClass: "P", // Populated places
          featureCode: "PPL", // Cities, towns, villages, etc.
        },
      });

      const data = response.data;
      console.log("data", data);
      setPlaces(data.geonames);
    } catch (error) {
      console.error("Error fetching data from GeoNames API:", error);
    }
  };

  return (
    <div className="w-full h-full p-2 bg-gray-400">
      <div className="flex gap-3">
        <input
          className="border p-1.5 bg- rounded font-semibold text-black"
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder="Enter place name"
        />
        <button
          className="border p-1.5 px-4 rounded-xl font-semibold bg-blue-600 text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <ul className="p-2 my-2">
        {places.map((place) => (
          <li
            className="border -mt-[1px] p-0.5 hover:bg-gray-100 active:bg-gray-300 cursor-pointer transition-colors"
            key={place.lat + "|" + place.lng}
            onClick={() => props.onPlaceSelect(place)}
          >
            <p className="font-semibold">
              {place.name},{" "}
              {countrycodes[place.countryCode as keyof typeof countrycodes]}
            </p>
            Lat: {place.lat}, Lon: {place.lng}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceSearchComponent;
