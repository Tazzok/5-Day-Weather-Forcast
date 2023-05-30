var searchForm = document.querySelector('#search-form');
var cityInput = document.querySelector('#citySearch');
var cityInfo = document.querySelector('#cityInfo');
var fiveDay = document.querySelector('#fiveDay');
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

        var avgTemp = 0;
        var avgHumid=0;
        var avgWind=0;
        var count = 0;

        for (let i = 0; i < data.list.length-1; i++) {
            var date = new Date(data.list[i].dt*1000).toDateString();
            var compDate = new Date(data.list[i+1].dt*1000).toDateString();

            console.log(date);
            console.log(compDate);

            if(date==compDate){
                avgTemp+=data.list[i].main.temp
                console.log("if");
            }
            else if(date != compDate)
            {
                //display
                console.log("else if");
                console.log(avgTemp/count);
                console.log("new day");
                avgTemp=0;
                count=0;
            }
            else{
                console.log("else");
                console.log(avgTemp/count);
                console.log("new day");
                avgTemp=0;
                count=0;
            }




            // while(date == compDate){
            //     var element= i+count;
            //     var compDate = new Date(data.list[element].dt*1000).toDateString();
            //     avgTemp+=data.list[element].main.temp;
            //     avgHumid+=data.list[element].main.humidity;
            //     avgWind+=data.list[element].wind.speed;
            //     count++;
            //     console.log(count);
            // }


            // console.log(data.list[i].main.temp); 
            // console.log(data.list[i].main.humidity); 
            // console.log(data.list[i].wind.speed); 

            // console.log(avgTemp);
            // console.log(avgHumid);
            // console.log(avgWind);

            count++
        };



        // for (let i = 0; i < data.list.length; i+=count) {
        //     average = 0;
        //     var date = new Date(data.list[i].dt*1000).toDateString();
        //     var compDate = new Date(data.list[i].dt*1000).toDateString();
        //     count = 0;

        //     while(date == compDate) {
        //         compDate = new Date(data.list[i+count].dt*1000).toDateString();
        //         average+=data.list[i+count].main.humidity;

        //         console.log(data.list[i+count].main.humidity);

        //         count++;
    
        //     }

        //     console.log(count);
        //     console.log(average/8);
      
        // }




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
