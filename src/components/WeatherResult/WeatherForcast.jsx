// import ProgressBar from "react-bootstrap/ProgressBar";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./WeatherForecast.css";
import { TbTemperature, TbWind } from "react-icons/tb";
import { MdOutlineWaterDrop } from "react-icons/md";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { GiThermometerScale, GiWindsock } from "react-icons/gi";
const WeatherForecast = ({ weatherData, showAirQuality }) => {
  const Option1 = {
    day: "numeric",
    month: "short",
    weekday: "short",
  };
  const Option2 = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };
  const Option3 = {
    day: "numeric",
    month: "short",
  };

  const { location, forecast, current } = weatherData || {};
  // TODO 可以改进 weatherData || {}写法;
  if (showAirQuality && current?.air_quality) {
    var barCoverage = (1 - current?.air_quality?.pm2_5 / 300) * 100;
    if (barCoverage < 0) {
      barCoverage = 1;
    }
    if (barCoverage > 96) {
      barCoverage = 96;
    }
  }
  const time = new Date(location.localtime.replace(/-/g, "/"));
  // console.log(weatherData);
  return (
    <>
      {/* location information */}
      {location && (
        <div>
          <div className="time-container">
            <div className="time-box">
              <p>{time.toLocaleDateString("en-AU", Option1)}</p>
            </div>
            <div className="time-box localTime">
              <p>Local time: {time.toLocaleTimeString("en-AU", Option2)}</p>
            </div>
          </div>
          <h2 className="fs-3 mb-3">
            {location.name}, {location.region}, {location.country}
          </h2>
          <p className="fs-6 mb-4">{current.condition.text}</p>
        </div>
      )}
      {/* current weather data */}
      {current && (
        <div className="current-weather-bg">
          <ul className="current-weather-section row">
            <li className="col-lg-3 col-sm-10">
              <img
                className="bigIcon"
                src={current.condition.icon}
                alt="current-weather-icon"
              />
            </li>
            <li className="col-lg-3 col-sm-10">
              <div>
                <p className="temp_c ">{current.temp_c} °C</p>
              </div>
            </li>
            <li className="col-lg-3 col-sm-10">
              <div className="side3-item-container">
                <p className="side3-item">
                  <TbTemperature /> Real feel: {current.feelslike_c}°C
                </p>
                <p className="side3-item">
                  <MdOutlineWaterDrop /> Humidity: {current.humidity} %
                </p>
                <p className="side3-item">
                  <TbWind />
                  Wind speed: {current.wind_kph} kph
                </p>
              </div>
            </li>
          </ul>
          <ul className="list4-container  ">
            <li className="col list4-item">
              <span>
                <BsFillEmojiSunglassesFill />
              </span>
              UV: {current?.uv}
            </li>
            <li className="col list4-item">
              <span>
                <GiThermometerScale />
              </span>
              Pressure: {current?.pressure_mb}
            </li>
            <li className="col list4-item">
              <span>
                <GiWindsock />
              </span>
              Wind direction: {current?.wind_dir}
            </li>
            <li className="col list4-item">
              <span>
                <GrUpdate />
              </span>
              Last update: {time.toLocaleTimeString("en-AU", Option2)}
            </li>
          </ul>
          {showAirQuality && (
            <div className="aq-container row">
              <div className="col-lg-2">
                <p>PM2.5: {current?.air_quality?.pm2_5.toFixed(1)} ug/m3</p>
              </div>
              <div className=" col-lg-9 col-sm-12 ">
                <ProgressBar
                  now={barCoverage}
                  className="justify-content-end bar"
                />
              </div>
            </div>
          )}
        </div>
      )}
      {/* forecast hour */}
      {forecast && (
        <div className="hourly-forecast-container ">
          <h3>Hourly forecast</h3>
          <ul className="hourly-forecast-list row">
            {forecast.forecastday[0].hour.slice(0, 11).map((item) => {
              const time = new Date(item.time.replace(/-/g, "/"));
              // console.log(item, "@weatherForecast");
              return (
                <li className="hourly-item col" key={item.time_epoch}>
                  <p>{time.toLocaleTimeString("en-AU")}</p>
                  <div>
                    <img src={item.condition.icon} alt="" />
                  </div>
                  <p>{item.temp_c}°C</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {forecast && (
        <div className="Weather-forecast-section row ">
          <h3 className="mt-4">Next 3 days forecast</h3>
          {forecast.forecastday.map((item) => {
            const date = new Date(item.date);
            return (
              <ul className="Weather-forecast-lists col" key={date}>
                <li className="fs-6 text-muted ">
                  <span>{date.toLocaleDateString("en-AU", Option3)}</span>
                </li>
                <li className="fs-6 text-muted icon ">
                  <div>
                    <img
                      src={item.day.condition.icon}
                      alt="current-weather-icon"
                    />
                  </div>
                </li>
                <li className="fs-6 text-muted">
                  <p className="textShortForm">{item.day.condition.text}</p>
                </li>
                <li className="fs-6 text-muted ">
                  <p>
                    Hi<span className="textShortForm">gh:</span>{" "}
                    {item.day.maxtemp_c}°C
                  </p>
                </li>
                <li className="fs-6 text-muted ">
                  <p>
                    L<span className="textShortForm">ow: </span>
                    {item.day.mintemp_c} °C
                  </p>
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </>
  );
};
export default WeatherForecast;
