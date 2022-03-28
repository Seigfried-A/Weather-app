const path = require("path");
const geocode = require("./utilis/geocode");
const forecast = require("./utilis/forecast");
const express = require("express");
const hbs = require("hbs");

const app = express();

const pathDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(pathDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    by: "Sieg",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    by: "Amos",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    by: "Sieg",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Enter a Valid Address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }

        // console.log(location);
        // console.log(forecastData);

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address

        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: 404,
    error: "Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: 404,
    error: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server started sucessfully");
});
