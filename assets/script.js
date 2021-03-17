var APIKey = "163ece1b73280667347e148d36aba27b";
var searchButton = document.querySelector("#searchBtn");
var cityButton = document.querySelector(".cityButton");



function getWeather(event) {
  $("#currentWeatherCard").empty();
  event.preventDefault();

  var searchInput = document.getElementById("searchInput").value;



  var currentForcastUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + APIKey + "&units=imperial";

  fetch(currentForcastUrl)
    .then(response => response.json())
    .then(function (response) {
      console.log(response);
      var cityName = response.name;

      createCityButtons(response.name);

      var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lat + "&appid=" + APIKey + "&units=imperial";

      fetch(oneCallUrl)
        .then(response2 => response2.json())
        .then(function (response2) {
          console.log(response2);

          var dateEl = $('<h5>').text(moment.unix(response2.daily[0].dt).format('dddd MMM Do',));
          var temp = "Temperature: " + response2.current.temp;
          var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response2.daily[0].weather[0].icon + "@2x.png");
          weatherIcon.attr("width", 50);
          var humidity = $("<h4>").html("Humidity: " + response2.daily[0].humidity);
          var windSpeed = $("<h4>").html("Wind Speed: " + response2.current.wind_speed);
          var UVI = $("<h4>").html("UV Index: " + response2.daily[0].uvi);

          $("#currentWeatherCard").append(cityName, dateEl, weatherIcon, temp, humidity, windSpeed, UVI);

          $(".fiveDayDisplay").empty();

          for (var i = 1; i < 6; i++) {
            var fiveDayDateEl= moment.unix(response2.daily[i].dt).format('dddd MMM Do');
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
            var uviEl = $("<h3>").text(fiveDayUVI);
            $(".fiveDayDisplay").append(forcastDiv);
            forcastDiv.append(fiveDayDateEl, fiveDayWeatherIcon, tempHighEl, tempLowEl, humidityEl, windSpeedEl, uviEl);

            localStorage.setItem(response.name, response.name);
          }

        })
    })
}

function createCityButtons(name) {
  var cityBtn = $("<button>").text(name).addClass("cityButton").prop("id", name);
  var btn = $(".cityButton");
  btn.click(getCity);
  $(".previousSearches").append(cityBtn);
  $("#searchInput").val("");

}



function getCity(event) {
  $("#currentWeatherCard").empty();
  event.preventDefault();
  
  var cityBtnInput = localStorage.getItem("value");

  var currentForcastUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityBtnInput + "&appid=" + APIKey + "&units=imperial";

  fetch(currentForcastUrl)
    .then(response => response.json())
    .then(function (response) {

      var cityName = "City: " + response.name;


      var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lat + "&appid=" + APIKey + "&units=imperial";

      fetch(oneCallUrl)
        .then(response2 => response2.json())
        .then(function (response2) {
          console.log(response2);

          var temp = "Temperature: " + response2.current.temp;
          var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");
          weatherIcon.attr("width", 50);
          var humidity = $("<h4>").html("Humidity: " + response.current.humidity);
          var windSpeed = $("<h4>").html("Wind Speed: " + response2.current.wind_speed);
          var UVI = $("<h4>").html("UV Index: " + response2.daily[0].uvi)

          $("#currentWeatherCard").append(cityName, weatherIcon, temp, humidity, windSpeed, UVI);

          $(".fiveDayDisplay").empty();

          for (var i = 1; i < 6; i++) {
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
            var uviEl = $("<h3>").text(fiveDayUVI);
            $(".fiveDayDisplay").append(forcastDiv);
            forcastDiv.append(fiveDayWeatherIcon, tempHighEl, tempLowEl, humidityEl, windSpeedEl, uviEl);

          }
        })
    })
}


searchButton.addEventListener("click", getWeather);

