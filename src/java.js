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
  let varDay = document.querySelector(".currentDay");
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
  let varDate = document.querySelector(".currentDate");
  varDate.innerHTML = `${date} ${month} ${year}`;

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let dataForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  dataForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `  
  <div class="col week">
  <ul class="five-days">
  <li class="day"><h3>${formatDay(forecastDay.dt)}</h3></li>
  <li class="weather">${forecastDay.weather[0].description}</li>
  <li class="icons">
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt="" width="100" />
  </li>
  <li class="temperature">
  <span class="maxTemperature">${Math.round(forecastDay.temp.max)}</span>°/<span
  class="minTemperature"
  >${Math.round(forecastDay.temp.min)}</span
  >°
  </li>
  </ul>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  showCelsius({ preventDefault: () => {} });
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

  let clickF = document.querySelector(".fahrenheit-link");
  clickF.disabled = false;
  let clickC = document.querySelector(".celsius-link");
  clickC.disabled = true;

  let linkCelsius = document.querySelector("#temperature-head");
  linkCelsius.innerHTML = Math.round(celsiusTemp);

  let temperatureMax = document.querySelectorAll(".maxTemperature");
  let temperatureMin = document.querySelectorAll(".minTemperature");
  temperatureMax.forEach(function (max) {
    max.innerText = convertTempFToC(max.innerText);
  });
  temperatureMin.forEach(function (min) {
    min.innerText = convertTempFToC(min.innerText);
  });
}

function convertTempFToC(degree) {
  return Math.round((degree - 32) / 1.8);
}

function showFahrenheit(event) {
  event.preventDefault();
  let linkFahrenheit = document.querySelector("#temperature-head");
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");

  let clickF = document.querySelector(".fahrenheit-link");
  clickF.disabled = true;
  let clickC = document.querySelector(".celsius-link");
  clickC.disabled = false;

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  linkFahrenheit.innerHTML = Math.round(fahrenheitTemp);

  let temperatureMax = document.querySelectorAll(".maxTemperature");
  let temperatureMin = document.querySelectorAll(".minTemperature");
  temperatureMax.forEach(function (max) {
    max.innerText = convertTempCToF(max.innerText);
  });
  temperatureMin.forEach(function (min) {
    min.innerText = convertTempCToF(min.innerText);
  });
}

function convertTempCToF(degree) {
  return Math.round((degree * 9) / 5 + 32);
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
