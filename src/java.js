function formatDate(todayDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[todayDate.getDay()];
  document.querySelector(".col-2").innerHTML = `${day}`;

  let date = addZero(todayDate.getDate());
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  let month = months[todayDate.getMonth()];
  let year = todayDate.getFullYear();

  return `${date} ${month} ${year}`;
}

let todayDate = new Date();
let varDateMonth = document.querySelector(".col-3");
varDateMonth.innerHTML = formatDate(todayDate);

// add zero to the time and date
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let hours = addZero(todayDate.getHours());
let minutes = addZero(todayDate.getMinutes());

let varTime = document.querySelector(".col-1");
varTime.innerHTML = `${hours}:${minutes}`;

function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function showCurrentTemperature(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature-head").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

let enterCityForm = document.querySelector("#enter-a-city");
enterCityForm.addEventListener("submit", handleSubmit);

let clickSearchButton = document.querySelector("#searchButton");
clickSearchButton.addEventListener("click", handleSubmit);

function showLocation(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function navigatorClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let clickNavigatorButton = document.querySelector("#navigatorButton");
clickNavigatorButton.addEventListener("click", navigatorClick);

searchCity("Kyiv");

/*function showCelsius(event) {
  event.preventDefault();  
  let celsiusTemp = Math.round(temperatureC);
  let linkCelsius = document.querySelector("#temperature");
  linkCelsius.innerHTML = `${celsiusTemp}`;
}

let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((temperatureC * 9) / 5 + 32);
  let linkFahrenheit = document.querySelector("#temperature");
  linkFahrenheit.innerHTML = `${fahrenheitTemp}`;
}

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", showFahrenheit);*/
