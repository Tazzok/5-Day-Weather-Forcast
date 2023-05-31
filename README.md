# 06 Server-Side APIs: Weather Dashboard


## Description
The purpose of this project was to leverage OpenWeather's free API (https://openweathermap.org/) in order to create a dynamically updated webpage to display current weather data, as well as 5 day forecast.

The search form accepts a city name, and through the use of the Geocoding API, converts the name into latitude and longitude coordinates. These coordinates are then used to pull from the Current Weather Data API to present the user with current temperature, wind speed, humidity, as well as an icon. These same coordinates are also used to fetch the 5 Day/ 3 Hour Forecast API and display the same data, as well as the name of the day.
Upon clicking the search button, the city searched is stored in localStorage and displayed in the search history list. Upon clicking any name in the search history, the weather data for that city is regenerated and displayed on the page.

## Installation

https://tazzok.github.io/5-Day-Weather-Forcast/

https://github.com/Tazzok/5-Day-Weather-Forcast


## Usage
