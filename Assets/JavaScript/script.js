var searchForm = document.querySelector('#search-form');
var cityInput = document.querySelector('#citySearch');
var cityInfo = document.querySelector('#cityInfo');
var fiveDay = document.querySelector('#five-day');
var preSearched = document.querySelector('#searched');
var cityLat = 0;
var cityLon = 0;
let searchedCity = { lat: 0, lon: 0 };

// calls the geo api to get the latitude and longitude of the city that the user enters.
var getLatLon = function (event) {
    event.preventDefault();
    var city = cityInput.value.trim();
    var apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=9a565ccb47007a77932708dccfc031dd`;
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityLat = data[0].lat;
            cityLon = data[0].lon;
            searchedCity.lat = cityLat;
            searchedCity.lon = cityLon;
            //saves the coordinates to local storage then calls the other functions.
            localStorage.setItem(city, JSON.stringify(searchedCity));
            previousSearches();
            currentW();
            FiveDayForecast();
        })
};
//Weather api to give us the current weather conditions of the city
var currentW = function () {
    var apiURL = `httpss://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=imperial&lastupdate&appid=9a565ccb47007a77932708dccfc031dd`;
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityInfo.innerHTML = " ";
            var CityName = data.name;
            var todaysDate = new Date(data.dt * 1000);
            var curIcon = data.weather[0].icon;
            var curTemp = Math.round(data.main.temp);
            var curWind = Math.round(data.wind.speed);
            var curHumidity = Math.round(data.main.humidity);
            var current = document.createElement('div');
            var currBody = document.createElement('div');
            var name = document.createElement('h2');
            var temp = document.createElement('p');
            var wind = document.createElement('p');
            var humidity = document.createElement('p');
            var icon = document.createElement('img');
            current.classList ="bg-info";
            icon.setAttribute('src', `httpss://openweathermap.org/img/wn/${curIcon}.png`)
            name.textContent = CityName + ' (' + dayjs(todaysDate).format('dddd MMM D') + ')';
            temp.textContent = "Temp: " + curTemp;
            wind.textContent = "Wind Speed: " + curWind + "MPH";
            humidity.textContent = "Humidity: " + curHumidity + '%';
            current.appendChild(currBody);
            currBody.append(name, icon, temp, wind, humidity);
            cityInfo.appendChild(current);
        })
};

// Forcast api to give the weather for the next 5 days
var FiveDayForecast = function () {
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=9a565ccb47007a77932708dccfc031dd`;
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            fiveDay.innerHTML = " ";
            var title = document.createElement('h3');
            title.className = 'card-title';
            title.textContent = "5-Day Forecast:"
            fiveDay.appendChild(title);
            for (let i = 0; i < data.list.length; i += 8) {
                var avgTemp = data.list[i].main.temp;
                var avgHumid = data.list[i].main.humidity;
                var avgWind = data.list[i].wind.speed;
                var todaysDate = new Date(data.list[i].dt * 1000);
                var curIcon = data.list[i].weather[0].icon;
                var cardEl = document.createElement('div');
                var cardBody = document.createElement('div');
                var cardText = document.createElement('div');
                var title = document.createElement('h3');
                var date = document.createElement('h2');
                var temp = document.createElement('p');
                var wind = document.createElement('p');
                var humidity = document.createElement('p');
                var icon = document.createElement('img');
                icon.setAttribute('src', `httpss://openweathermap.org/img/wn/${curIcon}.png`)
                cardEl.className = 'card col - 12 col - xl';
                cardBody.className = 'card-body bg-info';
                title.className = 'card-title';
                cardText.className = 'card-text';
                title.textContent = "5-Day Forecast:"
                date.textContent = dayjs(todaysDate).format('dddd');
                temp.textContent = "Temp: " + avgTemp;
                wind.textContent = "Wind Speed: " + avgWind + "MPH";
                humidity.textContent = "Humidity: " + avgHumid + '%';
                cardEl.appendChild(cardBody);
                cardBody.append(date, icon, temp, wind, humidity);
                fiveDay.appendChild(cardEl);
            }
        });
};

//Populates the display with the previous search history
var previousSearches = function () {
    preSearched.innerHTML = ' ';

    //for every item in local storage create a button and add the event listener to that button.
    for (var i = 0; i < localStorage.length; i++) {
        //check local storage for all keys
        var key = localStorage.key(i);
        var cityButton = document.createElement("button");
        cityButton.textContent = key;
        cityButton.className = "btn btn-primary";
        cityButton.id = `${key}`;
        cityButton.addEventListener('click', function (event) {
            //when the button it clciked, it gets the id # for the button then gets the value at that storage location. Then calls the other functions
            buttonID = event.target.id;
            var info = JSON.parse(localStorage.getItem(buttonID))
            cityLat = info.lat;
            cityLon = info.lon;
            currentW();
            FiveDayForecast();
        });
        preSearched.appendChild(cityButton);
    }
};

//function call at start to populate the search history
previousSearches();
searchForm.addEventListener('submit', getLatLon);
