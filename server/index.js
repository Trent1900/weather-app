const express = require("express");
const weatherService = require("./weatherService");

const app = express();
const port = 3600;

// set cors and origin from 3000 (my frontend)
const origin = "http://localhost:3000";
const cors = require("cors");
const corsOptions = {
  origin,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200, // for legacy browser
};
app.use(cors(corsOptions));

// use middleware to get body data from request.
app.use(express.json());

app.use("/myApi", async (req, res) => {
  const fetchWeather = weatherService.fetchWeatherForecast;
  const coordinate = req?.body;
  const response = await fetchWeather(coordinate);
  if (!response.ok) {
    const error = await response.json();
    // throw error;
    res.send({ status: 400, error });
  }
  if (response.ok) {
    const forecast = await response.json();
    res.send({ status: 201, forecast });
  }
});

app.listen(port, () => {
  console.log(`now listening to port ${port}`);
});
