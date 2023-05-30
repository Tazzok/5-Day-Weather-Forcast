var searchForm = document.querySelector('#search-form');
var cityInput = document.querySelector('#citySearch');
var cityInfo = document.querySelector('#cityInfo');
var fiveDay = document.querySelector('#five-day');
var cityLat = 41.85;
var cityLon= -87.65;


var getLatLon= function(event){
    event.preventDefault();

    var city = cityInput.value.trim();
    var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=1&appid=9a565ccb47007a77932708dccfc031dd';
  
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            cityLat = data[0].lat;
            cityLon = data[0].lon;
            currentW();
            FiveDayForecast();
        })

};


var currentW =function(){
    
    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+cityLat+'&lon='+cityLon+'&units=imperial&lastupdate&appid=9a565ccb47007a77932708dccfc031dd';

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var CityName=data.name;
            var todaysDate=new Date(data.dt*1000);
            
            var curTemp=Math.round(data.main.temp);
            var curWind=Math.round(data.wind.speed);
            var curHumidity=Math.round(data.main.humidity);
            

            var current=document.createElement('div');
            var currBody=document.createElement('div');
            var name=document.createElement('h2');
            var temp=document.createElement('p');
            var wind=document.createElement('p');
            var humidity=document.createElement('p');

            name.textContent = CityName +' ('+todaysDate.toDateString()+')';
            temp.textContent = "Temp: "+curTemp;
            wind.textContent = "Wind Speed: "+curWind+"MPH";
            humidity.textContent = "Humidity: "+curHumidity+'%';
            
            current.appendChild(currBody);
            currBody.append(name, temp, wind, humidity);
            cityInfo.appendChild(current);
        })
};




var FiveDayForecast= function(){

    var apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+cityLat+'&lon='+cityLon+'&units=imperial&appid=9a565ccb47007a77932708dccfc031dd';

    fetch(apiURL)
    .then(function(response) {
        return response.json();  
      })
      .then(function(data) {
        console.log(data);

        

        for (let i = 0; i < data.list.length; i++) {

            var avgTemp = data.list[i].main.temp;
            var avgHumid= data.list[i].main.humidity;
            var avgWind= data.list[i].wind.speed;
            var todaysDate=new Date(data.list[i].dt*1000);


            var cardEl=document.createElement('div');
            var cardBody=document.createElement('div');
            var cardText= document.createElement('div');
            var title=document.createElement('h3');
            var date=document.createElement('h2');
            var temp = document.createElement('p');
            var wind = document.createElement('p');
            var humidity = document.createElement('p');


            
            cardEl.className = 'card mb-3 col - 12 col - xl';
            cardBody.className = 'card-body';
            title.className = 'card-title';
            cardText.className = 'card-text';
            

            title.textContent="5-Day Forecast:"
            date.textContent =  todaysDate.toDateString();
            temp.textContent = "Temp: "+avgTemp;
            wind.textContent = "Wind Speed: "+avgWind+"MPH";
            humidity.textContent = "Humidity: "+avgHumid+'%';

            cardBody.append(date, temp, wind, humidity);
            fiveDay.appendChild(cardBody);
      
        }






        //h3 5-Day Forecast:

        //card
        //date
        //symbol
        //temp
        //wind
        //humidity








        // data.list.length-1

        // for (let i = 0; i < 38 ; i++) {
        //     var date = new Date(data.list[i].dt*1000).toDateString();
        //     var compDate = new Date(data.list[i+1].dt*1000).toDateString();

        //     console.log(date);
        //     console.log(compDate);

        //     if(date == compDate){

        //         avgTemp+=data.list[i].main.temp;

        //     }
        //     else{
        //         avgTemp+=data.list[i].main.temp;
        //         console.log("else");
        //         console.log(avgTemp/count);
        //         console.log("new day");
        //         avgTemp=0;
        //         count=0;

        //     }
        //     count++;


        // };



      });
    };





searchForm.addEventListener('submit', getLatLon);
  








// var handleSearch = function(event) {
//   event.preventDefault();
  
//   var apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+cityLat+'&lon='+cityLon+'&units=imperial&appid=9a565ccb47007a77932708dccfc031dd';

//   fetch(apiURL)
//     .then(function(response) {
//       return response.json();  
//     })
//     .then(function(data) {
//         console.log(data);


//     });

// };

// http://api.openweathermap.org/data/2.5/forecast?lat=41.85&lon=-87.65&units=imperial&appid=9a565ccb47007a77932708dccfc031dd'



// searchForm.addEventListener('submit', handleSearch);




// var handleSearch = function(event) {
//     event.preventDefault();
//     var city = cityInput.value.trim();
//     var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=5&appid=9a565ccb47007a77932708dccfc031dd';
  
//     fetch(apiURL)
//       .then(function(response) {
//         return response.json();  
//       })
//       .then(function(data) {
//           for (let i = 0; i < data.length; i++) {
//               var city=data[i].name;
//               var state=data[i].state;
              
//               var possibleCity=document.createElement('div');
//               var cityEl=document.createElement('h3');
//               var stateEl=document.createElement('p');
  
//               cityEl.textContent = city;
//               stateEl.textContent = state;
//               possibleCity.appendChild(cityEl);
//               possibleCity.append(stateEl);
//               fiveDay.appendChild(possibleCity);
  
  
  
//           }
  
  
//       });
  
//   };
  



// for (var i = 0; i < data.results.length; i++) {
//     var result = data.results[i];
//     var title = result.title;
//     var url = result.url;
//     var description = result?.description?.toString();

//     var cardEl = document.createElement('div');
//     var cardBody = document.createElement('div');
//     var cardTitle = document.createElement('h3');
//     var cardText = document.createElement('p');
//     var cardLink = document.createElement('a');

//     cardEl.className = 'card mb-3';
//     cardBody.className = 'card-body';
//     cardTitle.className = 'card-title';
//     cardText.className = 'card-text';
//     cardLink.className = 'btn btn-primary';

//     cardTitle.textContent = title;
//     cardText.textContent = description;
//     cardLink.textContent = 'Read more';
//     cardLink.href = url;
//     cardLink.target = '_blank';

//     cardEl.appendChild(cardBody);
//     cardBody.append(cardTitle, cardText, cardLink);
//     resultsContainer.appendChild(cardEl);


//   var apiURL = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=9a565ccb47007a77932708dccfc031dd';
// var apiURL =   'http://api.openweathermap.org/data/2.5/forecast?lat=41.85&lon=-87.65&exclude=minutely,hourly,daily&appid=9a565ccb47007a77932708dccfc031dd';
