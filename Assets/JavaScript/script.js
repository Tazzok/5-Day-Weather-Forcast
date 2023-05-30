var searchForm = document.querySelector('#search-form');
var cityInput = document.querySelector('#citySearch');
var cityInfo = document.querySelector('#cityInfo');
var fiveDay = document.querySelector('#fiveDay');
var cityLat = 41.85;
var cityLon= -87.65;



var handleSearch = function(event) {
  event.preventDefault();
  
  var apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat='+cityLat+'&lon='+cityLon+'&units=imperial&appid=9a565ccb47007a77932708dccfc031dd';

  fetch(apiURL)
    .then(function(response) {
      return response.json();  
    })
    .then(function(data) {
        console.log(data);


    });

};




searchForm.addEventListener('submit', handleSearch);




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
