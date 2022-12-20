import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import "./SearchCity.css";
import Form from "react-bootstrap/Form";
import { BiSearch } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
const SearchCity = (props) => {
  const { setWeather, setSelect } = props;
  // const { setWeather, setLoading, setSelect, showAirQuality } = props;
  // const [city, setCity] = useState("Brisbane");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(undefined);
  const [address, setAddress] = useState("");
  // const [coordinate, setCoordinate] = useState("");

  // const handleSearchButton = async (param) => {
  //   if (param !== undefined) {
  //     setLoading(true);
  //     try {
  //       const res =
  //         param !== "auto:ip"
  //           ? await fetchWeatherForecast(param, showAirQuality)
  //           : await fetchWeatherByIp(setCity, showAirQuality);

  //       if (!res.ok) {
  //         setWeather("");
  //         const error = await res?.json();
  //         throw error;
  //       }
  //       if (res.ok) {
  //         const forecast = await res?.json();
  //         console.log("@原forecast中,", forecast);
  //         setWeather(forecast);
  //         setError(undefined);
  //       }
  //     } catch ({ error }) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handleSelection = (e) => {
    setSelect(e.target.checked);
  };
  // const claytonCoordinate = { lat: -37.9145479, lng: 145.127492 };
  // get status code and weather data from proxy server(to hide API key)
  const handleProxyServerData = async (data) => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    };

    const proxyServerData = await fetch(
      "http://localhost:3600/myApi",
      option
    ).then((response) => response.json());
    // console.log(typeof proxyServerData.status);
    // console.log(proxyServerData.status);
    // console.log( proxyServerData);
    // response 如果OK的话,setWeather,不然就show Error.
    if (proxyServerData.status < 400) {
      const { forecast } = proxyServerData;
      // console.log(forecast, "新的forecast");
      setWeather(forecast);
    }
    return proxyServerData;
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const coordinateResult = await getLatLng(results[0]);
    setAddress(value);
    // setCoordinate(coordinateResult);
    // handleSearchButton(coordinateResult);
    await handleProxyServerData(coordinateResult);
  };
  return (
    <Form>
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
                <BiSearch
                  className="search-btn"
                  disabled={address.length > 1 ? false : true}
                  // onClick={() => {
                  //   handleSearchButton();
                  // }}
                ></BiSearch>
                <GrLocation
                  className="search-btn"
                  // onClick={handleSearchButton("auto:ip")}
                ></GrLocation>
                <div className="suggestion">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    // const style = suggestion.active
                    //   ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    //   : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          // style,
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
