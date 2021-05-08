let now = new Date ();
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let day = days[now.getDay ()];
let dateNumber = now.getDate();
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = 0+hour;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = 0+minute;
}

let date = document.querySelector ("#currentDate");
date.innerHTML = day+" "+dateNumber+" "+month+", "+hour+":"+minute;

function showTemperature (response) {
document.querySelector("#city").innerHTML = response.data.name;

function showForecast () {
  let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  days.forEach(function(day) {
    forecastHTML= forecastHTML + `
    <div class="col-2">
        <div class="predictions-date">
            ${day}
        </div>
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon"/>
            <div class="predictions-temp">
                  <span class="predictions-temp-max">
                       18°
                  </span>| 
                  <span class="predictions-temp-min">
                         12°
                  </span>
              </div>
      </div>`;
  });
  
     forecastHTML= forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
}

showForecast ();

let temperature = document.querySelector ("#temperature");
celsiusTemp = response.data.main.temp;
temperature.innerHTML = Math.round(celsiusTemp);
document.querySelector ("#weather-description").innerHTML = response.data.weather[0].main;
document.querySelector ("#humidity").innerHTML = response.data.main.humidity;
document.querySelector ("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector ("#icon").setAttribute ("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector ("#icon").setAttribute ("alt", response.data.weather[0].description);
}

function searchCity (city) {
let apiKey = '1460a2c676633b20484f0b2ee12b8cc6';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showTemperature);
}

function showCity (event) {
event.preventDefault();
let city = document.querySelector("#city-input").value;
searchCity(city)
}

let form = document.querySelector ("#search-form");
form.addEventListener("submit", showCity);

function showFahrenheitTemp (event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9/5) + 32;
  document.querySelector ("#temperature").innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp (event) {
  event.preventDefault();
   celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector ("#temperature").innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = "null";

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", showFahrenheitTemp);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener ("click", showCelsiusTemp);

function findLocation (position) {
let apiKey = '1460a2c676633b20484f0b2ee12b8cc6';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition (event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(findLocation)
}

let currentLocation = document.querySelector("#geolocation");
currentLocation.addEventListener("click", getCurrentPosition);

searchCity ("Athens");