function formatDate(timestamp) {
  let todayDate = new Date(timestamp);

  let hours = todayDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = todayDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let varTime = document.querySelector(".col-1");
  varTime.innerHTML = `${hours}:${minutes}`;

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
  let varDay = document.querySelector(".col-2");
  varDay.innerHTML = `${day}`;

  let date = todayDate.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

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
  let varDate = document.querySelector(".col-3");
  varDate.innerHTML = `${date} ${month} ${year}`;

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let todayDate = new Date(timestamp * 1000);
  let day = todayDate.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

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
  console.log(response.data);
  let searchCityCountry = document.querySelector("h1");
  let headTemperature = document.querySelector("#temperature-head");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconHead = document.querySelector("#icon");
  let dateElement = document.querySelector(".lastUpdate");

  searchCityCountry.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  headTemperature.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.weather[0].description;
  iconHead.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
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
