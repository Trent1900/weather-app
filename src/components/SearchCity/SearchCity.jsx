import { useState } from "react";
import {
  fetchWeatherByIp,
  fetchWeatherForecast,
} from "../../service/weatherService";
import "./SearchCity.css";
import Form from "react-bootstrap/Form";
import { BiSearch } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";

const SearchCity = (props) => {
  const { setWeather, setLoading, setSelect, showAirQuality } = props;
  const [city, setCity] = useState("Brisbane");
  const [error, setError] = useState(undefined);
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const onSearchButtonOnClick = (param) => async (e) => {
    if (param) {
      e.preventDefault();
      setLoading(true);
      try {
        const res =
          param !== "auto:ip"
            ? await fetchWeatherForecast(param, showAirQuality)
            : await fetchWeatherByIp(setCity, showAirQuality);

        if (!res.ok) {
          setWeather("");
          const error = await res?.json();
          throw error;
        }
        if (res.ok) {
          const forecast = await res?.json();
          setWeather(forecast);
          setError(undefined);
        }
      } catch ({ error }) {
        // console.log("error.message", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSelection = (e) => {
    setSelect(e.target.checked);
  };

  return (
    <Form onSubmit={onSearchButtonOnClick(city)}>
      <div className="inputContainer ">
        <div className="input-box ">
          <input
            className="weatherInput"
            type="text"
            placeholder="Search City"
            value={city}
            onChange={handleChange}
          />
          <BiSearch
            className="search-btn"
            disabled={city.length > 1 ? 0 : 1}
            onClick={onSearchButtonOnClick(city)}
          ></BiSearch>
          <GrLocation
            className="search-btn"
            onClick={onSearchButtonOnClick("auto:ip")}
          ></GrLocation>
        </div>
        <div className="air-quality">
          <label htmlFor="air-quality">
            <input
              type="checkbox"
              id="air-quality"
              onChange={handleSelection}
            />
            Show air quality data
          </label>
        </div>
      </div>

      {error && (
        <div className="errorText">
          <p>Error: {error}</p>
        </div>
      )}
    </Form>
  );
};
export default SearchCity;
