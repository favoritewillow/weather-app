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

function formatMonth(timestamp) {
  let todayDate = new Date(timestamp * 1000);
  let month = todayDate.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[month];
}
function displayForecast(response) {
  console.log(response.data.list);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
  <div class="col week">
  <ul class="five-days">
  <li class="day"><h3>${day}</h3></li>
  <li class="weather">Sunny</li>
  <li class="icons">
  <img src="images/sun.png" alt="" width="100" />
  </li>
  <li class="temperature">
  <span class="maxTemperature">31</span>°C/<span
  class="minTemperature"
  >16</span
  >°C
  </li>
  </ul>
  </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
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
function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentTemperature(response) {
  let searchCityCountry = document.querySelector("h1");
  let headTemperature = document.querySelector("#temperature-head");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconHead = document.querySelector("#icon");
  let dateElement = document.querySelector(".lastUpdate");

  celsiusTemp = response.data.main.temp;
  searchCityCountry.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  headTemperature.innerHTML = Math.round(celsiusTemp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.weather[0].description;
  iconHead.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function showLocation(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function navigatorClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusTemperature.classList.add("active");
  fahrenheitTemperature.classList.remove("active");
  let linkCelsius = document.querySelector("#temperature-head");
  linkCelsius.innerHTML = Math.round(celsiusTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  let linkFahrenheit = document.querySelector("#temperature-head");
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  linkFahrenheit.innerHTML = Math.round(fahrenheitTemp);
}
let celsiusTemp = null;
let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", showCelsius);

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", showFahrenheit);

let enterCityForm = document.querySelector("#enter-a-city");
enterCityForm.addEventListener("submit", handleSubmit);

let clickSearchButton = document.querySelector("#searchButton");
clickSearchButton.addEventListener("click", handleSubmit);

let clickNavigatorButton = document.querySelector("#navigatorButton");
clickNavigatorButton.addEventListener("click", navigatorClick);

searchCity("Kyiv");
