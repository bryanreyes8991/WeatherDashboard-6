var cityForm = doucument.querySelector('#city-form');
var cityInput = document.querySelector('#city');
var cityContainer = document.querySelector('#current-city-cont');
var forecastContainer = document.querySelector('#5-day-cast-cont');

var APIKey = "9bb4b2c1ffd39a376fee55d90bd740ba";


function submitFormHandler(event) {
    event.preventDefault();
    var chosenCity = document.querySelector("#city").value.trim();
    if (chosenCity) {
        getCityWeather(chosenCity);
        getForecast(chosenCity);
        cityInput.value = '';
        cityContainer.textContent = '';
        forecastContainer.textContent = '';
    } else {
        alert('Enter a City by name.');
    }
};

function getCityWeather() {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIKey;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayCityWeather(data, chosenCity);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to get weather');
    });
    localStorage.setItem(('Searched Cities', chosenCity).textContent()).appendTo().querySelector('#previous-cities');
};

function displayCityWeather(data) {
    if (data) {
        let html = '';
        data.forEach(city => {
            html += 
            `<h2>${city}</h2>
            <p>${city.dt_txt}</p>
            <p>${weather.icon}</p>
            <p>${main.temp}</p>
            <p>${main.humidity}</p>
            <p>${wind.speed}</p>`
        }).appendTo().querySelector('#current-city-cont');
    } else if (data) {
        city.lon = lon;
        city.lat = lat;
    }
}

function getForecast() {
    lat; 
    lon;
    APIKey;
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayForecast(data, chosenCity);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('unable to get weather');
    });
};
//the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
function displayForecast(data) {
    if (data) {
        let html = '';
        data.forEach(city => {
            html +=
            `<h2>${city}</h2>
            <p>${city.dt_txt}</p>
            <p>${weather.icon}</p>
            <p>${main.temp}</p>
            <p>${main.humidity}</p>
            <p>${wind.speed}</p>`
        }).appendTo().querySelector('#5-day-cast-cont');
    } return;
    
}


cityForm.addEventListener('submit', submitFormHandler);