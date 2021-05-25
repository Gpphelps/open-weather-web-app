var APIKey = "163ece1b73280667347e148d36aba27b";
var searchButton = document.querySelector("#searchBtn");
var cityButton = document.querySelector(".cityButton");

// Fucntion to set the cities that have already been searched into local storage and appends the searched city buttons into the correct area
function searchHistory() {
  values=[],
      keys = Object.keys(localStorage),
      i = keys.length;
  while ( i-- ) {
      values.push( localStorage.getItem(keys[i]));
  }
  for (i = 0; i < values.length; i++) {
      $(".previousSearches").append("<button class='btn-secondary cityButton'>" + values[i] + "</button>");
  }
}

// Calls the seach history function
searchHistory();

// Function to get the weather of a city from the search bar
function getWeather(event) {
  // Clears the previously searched city's weather data if there was any
  $("#currentWeatherCard").empty();
  event.preventDefault();

  // Sets the city the user input into the search bar as a variable
  var searchInput = document.getElementById("searchInput").value;

  // Sets the API call url to the variable currentForcastURL in order to get the latitude and logitude 
  var currentForcastUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + APIKey + "&units=imperial";

  // Starts the fetch request to the URL set in the currentForcastRUL variable
  fetch(currentForcastUrl)
    .then(response => response.json())
    .then(function (response) {
      console.log(response);
      var cityName = response.name;
      // Creates a button with the name and values of the searched city
      createCityButtons(response.name);

      // Sets the API call url to the variable oneCallUrl in order to get the weather data for the searched city
      var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lat + "&appid=" + APIKey + "&units=imperial";

      // Starts the fetch request to the URL set in the oneCallUrl variable
      fetch(oneCallUrl)
        .then(response2 => response2.json())
        .then(function (response2) {
          console.log(response2);

          // Sets the fetched weather data into their own variables
          var dateEl = $('<h5>').text(moment.unix(response2.daily[0].dt).format('dddd MMM Do',));
          var temp = "Temperature: " + response2.current.temp;
          var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response2.daily[0].weather[0].icon + "@2x.png");
          weatherIcon.attr("width", 50);
          var humidity = $("<h4>").html("Humidity: " + response2.daily[0].humidity);
          var windSpeed = $("<h4>").html("Wind Speed: " + response2.current.wind_speed);
          var UVI = $("<h4>").html("UV Index: " + response2.daily[0].uvi).addClass("UVIndex");
          // Calls the function to set the color of the UV Index text
          singleUVindex();

          // If loop to determine whether the UV Index is low, moderate, or high, and then sets the text color of the UV Index to the coresponding color depending on how high the UV Index is
          function singleUVindex() {
            if (response2.daily[0].uvi < 5) {
                UVI.addClass('low');
            } else if (response2.daily[0].uvi < 10) {
                UVI.addClass('moderate');
            } else if (response2.daily[0].uvi >= 10) {
                UVI.addClass('high');
            };
          }
          // Appends the weather data variables into the current weather card
          $("#currentWeatherCard").append(cityName, dateEl, weatherIcon, temp, humidity, windSpeed, UVI);
          // Clears the data from the previous search from the five day weather forcast if there was one
          $(".fiveDayDisplay").empty();

          // For loop to loop through the one call api call five times using the future forcast api resonse to get the five day forcast and appends the data to the 5 day forcast card
          for (var i = 1; i < 6; i++) {
            var fiveDayDateEl = moment.unix(response2.daily[i].dt).format('dddd MMM Do');
            var fiveDayTempHigh = "High Temperature: " + response2.daily[i].temp.max;
            var fiveDayTempMin = "Low Temperature: " + response2.daily[i].temp.min;
            var fiveDayHumidity = "Humidity: " + response2.daily[i].humidity;
            var fiveDayWindSpeed = "Wind Speed: " + response2.daily[i].wind_speed;
            var fiveDayUVI = "UV Index: " + response2.daily[i].uvi;
            var fiveDayWeatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response2.daily[i].weather[0].icon + "@2x.png");
            var forcastDiv = $("<div>")
            var tempHighEl = $("<h3>").text(fiveDayTempHigh);
            var tempLowEl = $("<h3>").text(fiveDayTempMin);
            var humidityEl = $("<h3>").text(fiveDayHumidity);
            var windSpeedEl = $("<h3>").text(fiveDayWindSpeed);
            var uviEl = $("<h3>").text(fiveDayUVI).addClass("UVIndex");
            $(".fiveDayDisplay").append(forcastDiv);
            forcastDiv.append(fiveDayDateEl, fiveDayWeatherIcon, tempHighEl, tempLowEl, humidityEl, windSpeedEl, uviEl);

            localStorage.setItem(response.name, response.name);
            // Calls the five day UV Index color coding function
            fiveDayUVIndex();
            // For loop to check the UV Index numbers and set them to the corresponding color for low, moderate, and high
            function fiveDayUVIndex() {
            if (response2.daily[i].uvi < 5) {
                uviEl.addClass('low');
            } else if (response2.daily[i].uvi < 10) {
              uviEl.addClass('moderate');
            } else if (response2.daily[i].uvi >= 10) {
              uviEl.addClass('high');
            }
          };
        };
      });
  });
};
// Function to create the previously seached city buttons and appends them to the previousSearches area and clears the search bar
function createCityButtons(name) {
  var cityBtn = $("<button>").text(name).addClass("cityButton btn-secondary").prop("id", name);
  $(".previousSearches").append(cityBtn);
  $("#searchInput").val("");
};
// When the user clicks on one of the previously searched city button this functions sets the search value to the city that corresponded to the button clicked and runs the get city function
$(".previousSearches").delegate(".cityButton", "click", function () {
  $("#searchInput").val($(this).text());
  getCity();
});

// The getCity function is the same as the getWeather function except that it does not set the city into local storage(becasue that was doen in the get weather function) nor does it create a button for the city because we do not want multiple buttons for the same city
function getCity() {
  $("#currentWeatherCard").empty();

  var cityBtnInput = document.getElementById("searchInput").value;
  var currentForcastUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityBtnInput + "&appid=" + APIKey + "&units=imperial";

  fetch(currentForcastUrl)
    .then(response => response.json())
    .then(function (response) {

      var cityName = response.name;
      var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lat + "&appid=" + APIKey + "&units=imperial";

      fetch(oneCallUrl)
        .then(response2 => response2.json())
        .then(function (response2) {

          var dateEl = $('<h5>').text(moment.unix(response2.daily[0].dt).format('dddd MMM Do',));
          var temp = "Temperature: " + response2.current.temp;
          var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response2.daily[0].weather[0].icon + "@2x.png");
          weatherIcon.attr("width", 50);
          var humidity = $("<h4>").html("Humidity: " + response2.daily[0].humidity);
          var windSpeed = $("<h4>").html("Wind Speed: " + response2.current.wind_speed);
          var UVI = $("<h4>").html("UV Index: " + response2.daily[0].uvi)
          singleUVindex();

          function singleUVindex() {
            if (response2.daily[0].uvi < 5) {
                UVI.addClass('low');
            } else if (response2.daily[0].uvi < 10) {
                UVI.addClass('moderate');
            } else if (response2.daily[0].uvi >= 10) {
                UVI.addClass('high');
            };
          };
        
          $("#currentWeatherCard").append(cityName, dateEl, weatherIcon, temp, humidity, windSpeed, UVI);
          $(".fiveDayDisplay").empty();
          
          for (var i = 1; i < 6; i++) {
            var fiveDayDateEl = moment.unix(response2.daily[i].dt).format('dddd MMM Do');
            var fiveDayTempHigh = "High Temperature: " + response2.daily[i].temp.max;
            var fiveDayTempMin = "Low Temperature: " + response2.daily[i].temp.min;
            var fiveDayHumidity = "Humidity: " + response2.daily[i].humidity;
            var fiveDayWindSpeed = "Wind Speed: " + response2.daily[i].wind_speed;
            var fiveDayUVI = "UV Index: " + response2.daily[i].uvi;
            var fiveDayWeatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response2.daily[i].weather[0].icon + "@2x.png");
            var forcastDiv = $("<div>")
            var tempHighEl = $("<h3>").text(fiveDayTempHigh);
            var tempLowEl = $("<h3>").text(fiveDayTempMin);
            var humidityEl = $("<h3>").text(fiveDayHumidity);
            var windSpeedEl = $("<h3>").text(fiveDayWindSpeed);
            var uviEl = $("<h3>").text(fiveDayUVI).addClass("UVIndex");
            $(".fiveDayDisplay").append(forcastDiv);
            forcastDiv.append(fiveDayDateEl, fiveDayWeatherIcon, tempHighEl, tempLowEl, humidityEl, windSpeedEl, uviEl);

            fiveDayUVIndex();

            function fiveDayUVIndex() {
            if (response2.daily[i].uvi < 5) {
                uviEl.addClass('low');
            } else if (response2.daily[i].uvi < 10) {
              uviEl.addClass('moderate');
            } else if (response2.daily[i].uvi >= 10) {
              uviEl.addClass('high');
            }
            };
          };
        });
    });
};

// Event listener for the search button that runs the get weather function when clicked
searchButton.addEventListener("click", getWeather);