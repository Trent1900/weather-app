import ProgressBar from "react-bootstrap/ProgressBar";
import "./WeatherResult.css";
const WeatherResult = ({ weatherData, showAirQuality }) => {
  const Option = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
    hour12: false,
  };

  const { location, current } = weatherData || {};
  // TODO 可以改进
  if (showAirQuality && current?.air_quality) {
    // console.log("current.air_quality", current.air_quality);
    var barCoverage = (1 - current?.air_quality.pm2_5 / 300) * 100;
    if (barCoverage < 0) {
      barCoverage = 1;
    }
    if (barCoverage > 96) {
      barCoverage = 96;
    }
  }
  const date = new Date(location?.localtime);
  return (
    <div>
      {location && (
        <div>
          <h2 className="mt-3">
            {location.name}, {location.country}
          </h2>
          <p>{date?.toLocaleTimeString("en-AU", Option)}</p>
        </div>
      )}
      {current && (
        <ul className="Weather-display-section ">
          <li className="mt-3 fs-3 text-muted">
            <img src={current.condition.icon} alt="current-weather-icon" />
            <strong>{current.condition.text}</strong>
          </li>
          <li className="mt-3 fs-5">Temperature: {current.temp_c} °C</li>
          <li className="mt-2 fs-5">Wind Speed: {current.wind_kph} kph</li>
          {showAirQuality && current?.air_quality && (
            <li className="mt-2 fs-5">
              PM2.5: {current?.air_quality?.pm2_5} kph
              <ProgressBar
                now={barCoverage}
                className="justify-content-end bar"
              />
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
export default WeatherResult;
