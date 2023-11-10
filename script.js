var cityForm = document.querySelector('#city-form');
var cityInput = document.querySelector('#city');
var cityContainer = document.querySelector('#current-city-cont');
var forecastContainer = document.querySelector('#five-day-cast-cont');

var APIKey = "9bb4b2c1ffd39a376fee55d90bd740ba";


function submitFormHandler(event) {
    event.preventDefault();
    var chosenCity = document.querySelector("#city").value.trim();
    if (chosenCity) {
        getCityWeather(chosenCity);
        cityInput.value = '';
        cityContainer.textContent = '';
        forecastContainer.textContent = '';
    } else {
        alert('Enter a City by name.');
    }
};

function getCityWeather(chosenCity) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIKey;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCityWeather(data);
                getForecast(data.coord.lat, data.coord.lon, chosenCity)
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to get weather');
    });
    localStorage.setItem('searchedCities', chosenCity);
    document.querySelector('#previous-cities').append(chosenCity);
};

function displayCityWeather(data) {
    if (data) {
        let html = 
            `<h2>${data.name}</h2>
            <p>${data.dt}</p>
            <p>${data.weather[0].icon}</p>
            <p>${data.main.temp}</p>
            <p>${data.main.humidity}</p>
            <p>${data.wind.speed}</p>`
        
       document.querySelector('#current-city-cont').innerHTML = html;
    } else {
        document.querySelector('#current-city-cont').innerHTML = '<h2>Not Found</h2>';
    }
}


function getForecast(lat, lon, chosenCity) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayForecast(data);
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
        data.list.forEach(item => {
            console.log(item)
        })
        // .appendTo().querySelector('#5-day-cast-cont');
    } return;
    
}


cityForm.addEventListener('submit', submitFormHandler);