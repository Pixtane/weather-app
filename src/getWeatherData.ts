import axios from "axios";

async function getWeatherData(lat: number, lon: number) {
  const apiKey = import.meta.env.VITE_API_KEY; // Replace with your actual API key
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Example CORS proxy

  const url = `${proxyUrl}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=metric&lon=${lon}&appid=${apiKey}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (response.status !== 200) {
      console.error(`Error: ${response.status} ${response.data}`);
      return null;
    } else {
      console.log(response.data);
      return response.data;
    }
  } catch (error: any) {
    console.error("Request failed:", error.message);
    return null;
  }
}

export default getWeatherData;
