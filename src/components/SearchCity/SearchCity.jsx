import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
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
  const [address, setAddress] = useState("");
  const [coordinate, setCoordinate] = useState("");

  const handleSearchButton = async (param) => {
    if (param !== undefined) {
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelection = (e) => {
    setSelect(e.target.checked);
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const coordinateResult = await getLatLng(results[0]);
    setAddress(value);
    setCoordinate(coordinateResult);
    handleSearchButton(coordinateResult);
  };
  return (
    <Form
      onSubmit={() => {
        handleSearchButton(city);
      }}
    >
      <div className="inputContainer ">
        <div className="input-box ">
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div key={suggestions}>
                <input
                  className="weatherInput"
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    autoFocus: true,
                  })}
                />
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                        key={suggestion.placeId}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <BiSearch
            className="search-btn"
            disabled={city.length > 1 ? false : true}
            onClick={() => {
              handleSearchButton(coordinate);
            }}
          ></BiSearch>
          <GrLocation
            className="search-btn"
            // onClick={handleSearchButton("auto:ip")}
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
