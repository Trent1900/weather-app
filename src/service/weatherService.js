const API_KEY = "d503b357e92b437a86932049220712";
const FETCH_CITY_WEATHER_URL = `http://api.weatherapi.com/v1/current.json`;
const FETCH_WEATHER_FORECAST_URL = `http://api.weatherapi.com/v1/forecast.json`;
const FETCH_IP_URL = `http://api.weatherapi.com/v1/ip.json`;

export const fetchWeatherByCity = async (city) => {
  const url = new URL(FETCH_CITY_WEATHER_URL);

  url.searchParams.append("key", API_KEY);
  url.searchParams.append("q", city);
  url.searchParams.append("aqi", "yes");

  const response = await fetch(url);

  return response;
};

export const fetchWeatherForecast = async (city) => {
  const url = new URL(FETCH_WEATHER_FORECAST_URL);

  url.searchParams.append("key", API_KEY);
  url.searchParams.append("q", city);
  url.searchParams.append("days", 5);
  url.searchParams.append("aqi", "yes");

  const response = await fetch(url);
  return response;
};

// use IP to allocate city
export const fetchWeatherByIp = async (setCity) => {
  // get city by IP address
  const ip_url = new URL(FETCH_IP_URL);
  ip_url.searchParams.append("q", "auto:ip");
  ip_url.searchParams.append("key", API_KEY);
  const cityData = await fetch(ip_url).then((data) => data.json());

  setCity(cityData.city);
  // get weather data with city value from cityData.city
  const url = new URL(FETCH_WEATHER_FORECAST_URL);
  url.searchParams.append("q", cityData.city);
  url.searchParams.append("key", API_KEY);
  url.searchParams.append("days", 7);
  url.searchParams.append("aqi", "yes");
  const response = await fetch(url);
  return response;
};
