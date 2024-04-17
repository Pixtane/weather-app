import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
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
              "border border-gray-300 transition-all -mt-[1px] p-1.5 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 cursor-pointer " +
              (index === 0 ? "rounded-t-lg" : "")
            }
            onClick={() => props.onPlaceSelect(place)}
            data-tooltip={JSON.stringify(place)
              .replace(/"[^"]*"/g, (match) => match.replace(/,/g, ""))
              .replace(/"/g, "")
              .replace(/:/g, ": ")
              .replace(/,/g, "\n")
              .slice(1, -1)}
          >
            <p className="font-semibold">
              {place.name},{" "}
              {countrycodes[place.countryCode as keyof typeof countrycodes]}
            </p>
            <p className="text-sm font-light">
              Lat/Lon: {Number(place.lat).toFixed(2)}/
              {Number(place.lng).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div data-todo="DELETE THIS" className="bg-[#282828] h-full w-full">
        {[
          "Blizzard",
          "BlowingDust",
          "Breezy",
          "Clear",
          "Clear-night",
          "Cloudy",
          "Drizzle",
          "Flurries",
          "Foggy",
          "Foggy-night",
          "FreezingDrizzle",
          "FreezingRain",
          "Frigid",
          "Haze",
          "Haze-night",
          "Hail",
          "HeavyRain",
          "HeavySnow",
          "Hot",
          "Hot-night",
          "Hurricane",
          "IsolatedThunderstorms",
          "MostlyClear",
          "MostlyClear-night",
          "MostlyCloudy",
          "MostlyCloudy-night",
          "PartlyCloudy",
          "PartlyCloudy-night",
          "Rain",
          "ScatteredThunderstorms",
          "Sleet",
          "Smoky",
          "Smoky-night",
          "Snow",
          "StrongStorms",
          "SunFlurries",
          "SunFlurries-night",
          "Thunderstorms",
          "TropicalStorm",
          "Windy",
          "WintryMix",
        ].map((condition, index) => (
          <div className="flex items-center">
            <img
              key={index}
              className="h-20"
              src={`/src/assets/weather-icons/${condition}.svg`}
              alt={condition}
            />{" "}
            <p>{condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceSearchComponent;
