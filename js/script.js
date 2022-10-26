// const weath = (city)=>{
// 		APIkey = "ff2ddd6da9549e3bee387e18dbdfd852"
// 		return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ff2ddd6da9549e3bee387e18dbdfd852`)
// 				.then(response => response.json())
// 				.then(response => response)
// 				.catch(err => console.error(err));
	
// 		}


// const getInput = ()=>{
//         let input= document.getElementById("search").value
// 		console.log(input)
//         return input
// 	}
	
// const sortInfo = async()=>{
// 	let input = getInput()
// 	console.log(input)
//     const data = weath(input);
// 	console.log(data)
//     // data.then(res => showInfo(res))
// 	showInfo(await data)
// }

// const showInfo = (data)=>{
// 	console.log(data)
//     const namee = document.getElementById("name")
// 	const state = document.getElementById("state")
// 	const temp = document.getElementById("temp")
// 	const mintemp = document.getElementById("mintemp")
// 	const maxtemp = document.getElementById("maxtemp")
//     namee.innerHTML = data.name
// 	state.innerHTML = data.weather[0].description
// 	temp.innerHTML = data.main.temp
// 	mintemp.innerHTML = data.main.temp_min
// 	maxtemp.innerHTML = data.main.temp_max
// }


/*
 * Retrieve weather data from openweathermap
 */
// const getWeatherData = (city) => {
// //   const URL = "https://api.openweathermap.org/data/2.5/weather";
//   const FULL_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ff2ddd6da9549e3bee387e18dbdfd852`;
//   const weatherPromise  = fetch(FULL_URL);
//   return weatherPromise.then((response) => {
//     return response.json();
//   })
// }

// /*
// ** Retrieve city input and get the weather data
//  */
// const searchCity = () => {
//   const city = document.getElementById('city-input').value;
//   getWeatherData(city)
//   .then((res)=>{
//     showWeatherData(res);
//   }).catch((error)=>{
//     console.log(error);
//     console.log("Something happend");
//   })
// }

// /**
//  * Show the weather data in HTML
//  */
// showWeatherData = (weatherData) => {
//   document.getElementById("city-name").innerText = weatherData.name;
//   document.getElementById("weather-type").innerText = weatherData.weather[0].main;
//   document.getElementById("temp").innerText = weatherData.main.temp;
//   document.getElementById("min-temp").innerText = weatherData.main.temp_min;
//   document.getElementById("max-temp").innerText = weatherData.main.temp_max;
// }




let weather = {
  apiKey: "API KEY GOES HERE",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ff2ddd6da9549e3bee387e18dbdfd852`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

//first method to figure out your location 
 getLocation: function() {
              try {
                    navigator.geolocation.getCurrentPosition(this.showPosition);// showPosition: callbackFunction
                } catch {
                      x.innerHTML = err;
                  }
              },
      
  showPosition:function(position) {
            latitude= position.coords.latitude ;
    // console.log(latitude)
    longitude=position.coords.longitude;
    // console.log(longitude)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ff2ddd6da9549e3bee387e18dbdfd852`)
    .then(response => response.json())
    .then(data => document.querySelector(".search-bar").value=data.name)
  },


//second method to figure out your location 



displayWeather: function (data) {
  const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    // document.body.classList.add("background");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// let geocode = {
//   reverseGeocode: function(latitude, longitude){
//   var api_key = '84cb565b03804e189621cb836d9e20f8';
//   var api_url = 'https://api.opencagedata.com/geocode/v1/json'

//   var request_url = api_url
//     + '?'
//     + 'key=' + api_key
//     + '&q=' + encodeURIComponent(latitude + ',' + longitude)
//     + '&pretty=1'
//     + '&no_annotations=1';

//   // see full list of required and optional parameters:
//   // https://opencagedata.com/api#forward

//   var request = new XMLHttpRequest();
//   request.open('GET', request_url, true);

//   request.onload = function() {
//     // see full list of possible response codes:
//     // https://opencagedata.com/api#codes

//     if (request.status === 200){
//       // Success!
//       var data = JSON.parse(request.responseText);
//       // console.log(data.results[0].components.city); // print the location
//       weather.fetchWeather(data.results[0].components.city)
//     } else if (request.status <= 500){
//       // We reached our target server, but it returned an error

//       console.log("unable to geocode! Response code: " + request.status);
//       var data = JSON.parse(request.responseText);
//       console.log('error msg: ' + data.status.message);
//     } else {
//       console.log("server error");
//     }
//   };

//   request.onerror = function() {
//     // There was a connection error of some sort
//     console.log("unable to connect to server");
//   };

//   request.send();  // make the request
//   },
//   getLocation: function(){
//     function success(data){
//       geocode.reverseGeocode(data.coords.latitude, data.coords.longitude)
//     }
//     if(navigator.geolocation){
//       navigator.geolocation.getCurrentPosition(success, console.error)
//     }else{
//       weather.fetchWeather("Denver");
//     }
//   }
// }

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

// geocode.getLocation()

window.onload = ()=>{
  weather.fetchWeather("Tunisia");
}