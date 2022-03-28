console.log("Js working");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector(".weather-input");
const firstMessage = document.querySelector(".P__1");
const secMessage = document.querySelector(".p__2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchElement.value;
  console.log(location);

  firstMessage.textContent = "Loading";
  secMessage.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then((res) => {
    res
      .json()
      .then((data) => {
        firstMessage.textContent = data.location;
        secMessage.textContent = data.forecast;
        console.log(data.forecast);
      })
      .catch((err) => {
        firstMessage.textContent =
          "Something went wrong, Check input Location.";
        secMessage.textContent = "";
      });
  });
});
 