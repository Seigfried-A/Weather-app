const request = require("request");
const chalk = require("chalk");
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (long, lat, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=f0da1eb72ac5111c5e3f0cc45c1d9bfb&query= " +
    lat +
    ", " +
    long +
    "";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Please check your internet connection", undefined);
    } else if (body.error) {
      callback("Please input latitude and longitude", undefined);
    } else {
      const temp = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const weatherDes = body.current.weather_descriptions;

      callback(
        undefined,
        "The weather is " +
          weatherDes +
          ". it is currently " +
          temp +
          " degress, but it feels like " +
          feelsLike +
          " degress out there"
      );
    }
  });
};

module.exports = forecast;
