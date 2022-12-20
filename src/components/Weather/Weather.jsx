import { useState } from "react";
import "./Weather.css";
import Card from "react-bootstrap/Card";
import WeatherForecast from "../WeatherResult/WeatherForcast";
import SearchCity from "../SearchCity/SearchCity";
import Spinner from "../Spinner/Spinner";
const Weather = () => {
  const [weather, setWeather] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [isSelected, setSelect] = useState(false);
  return (
    <Card className="weather-container">
      <Card.Header as="h5">Weather App</Card.Header>
      <Card.Body>
        <SearchCity
          setWeather={setWeather}
          setLoading={setLoading}
          setSelect={setSelect}
          showAirQuality={isSelected}
        />

        {isLoading ? (
          <Spinner />
        ) : (
          weather && (
            <WeatherForecast
              weatherData={weather}
              showAirQuality={isSelected}
            />
          )
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        By <a href="https://trent1900.github.io/">Trent</a>
      </Card.Footer>
    </Card>
  );
};
export default Weather;
