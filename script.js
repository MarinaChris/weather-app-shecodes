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
document.querySelector ("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector ("#weather-description").innerHTML = response.data.weather[0].main;
document.querySelector ("#humidity").innerHTML = response.data.main.humidity;
document.querySelector ("#wind").innerHTML = Math.round(response.data.wind.speed);
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

searchCity ("Athens");

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