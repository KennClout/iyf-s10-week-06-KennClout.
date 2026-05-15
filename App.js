const API_KEY = "YOUR_API_KEY";

const BASE_URL =
    "https://api.openweathermap.org/data/2.5/weather";

const form = document.getElementById("search-form");

const cityInput = document.getElementById("city-input");

const loading = document.getElementById("loading");

const error = document.getElementById("error");

const weatherDisplay = document.getElementById("weather-display");

const cityName = document.getElementById("city-name");

const weatherIcon = document.getElementById("weather-icon");

const temperature = document.getElementById("temperature");

const description = document.getElementById("description");

const feelsLike = document.getElementById("feels-like");

const humidity = document.getElementById("humidity");

const wind = document.getElementById("wind");

const pressure = document.getElementById("pressure");


async function getWeather(city) {

    const url =
`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        showLoading();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (err) {

        showError(err.message);

    } finally {

        hideLoading();
    }
}


function displayWeather(data) {

    cityName.textContent =
`${data.name}, ${data.sys.country}`;

    weatherIcon.src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    temperature.textContent =
`Temperature: ${data.main.temp}°C`;

    description.textContent =
data.weather[0].description;

    feelsLike.textContent =
`Feels Like: ${data.main.feels_like}°C`;

    humidity.textContent =
`Humidity: ${data.main.humidity}%`;

    wind.textContent =
`Wind Speed: ${data.wind.speed} m/s`;

    pressure.textContent =
`Pressure: ${data.main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
}


function showLoading() {
    loading.classList.remove("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    }
});
