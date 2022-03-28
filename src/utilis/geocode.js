const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FwYXN0dXNzYWdlIiwiYSI6ImNremQ4YTd3ZjA0aWEyb28wZ2F1bTZuemwifQ.9u0zr8txyQKOjvoUOObS7A&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {

    if (error) {
      callback("No internet connection", undefined);
    } else if (body.features.length === 0) {
      callback("invalid Params", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
