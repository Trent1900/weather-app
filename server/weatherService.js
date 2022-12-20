const fetch = require("node-fetch");
require("dotenv").config();
const API_KEY = process.env.WEATHER_API_KEY;

const FETCH_WEATHER_FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json`;

const fetchWeatherForecast = async (coordinate) => {
  // console.log(coordinate, "@server weather");
  // const [lat, lng] = coordinate;
  const coordinateArray = [coordinate.lat, coordinate.lng];
  const url = new URL(FETCH_WEATHER_FORECAST_URL);
  url.searchParams.append("key", API_KEY);
  url.searchParams.append("q", coordinateArray);

  url.searchParams.append("days", 3);
  url.searchParams.append("aqi", "yes");
  const response = await fetch(url);
  // console.log(response, "@weatherService server side");
  return response;
};

// use IP to allocate city
// export const fetchWeatherByIp = async (setCity) => {
//   // get city by IP address
//   const ip_url = new URL(FETCH_IP_URL);
//   ip_url.searchParams.append("q", "auto:ip");
//   ip_url.searchParams.append("key", API_KEY);
//   const cityData = await fetch(ip_url).then((data) => data.json());

//   setCity(cityData.city);
//   // get weather data with city value from cityData.city
//   const url = new URL(FETCH_WEATHER_FORECAST_URL);
//   url.searchParams.append("q", cityData.city);
//   url.searchParams.append("key", API_KEY);
//   url.searchParams.append("days", 7);
//   url.searchParams.append("aqi", "yes");
//   const response = await fetch(url);
//   return response;
// };
module.exports = { fetchWeatherForecast };
