var APIKey = "163ece1b73280667347e148d36aba27b";
var searchButton = document.querySelector("#searchBtn");

// var searchInput = $("#searchInput");
// var searchButton = $("#searchBtn");
var fiveDayForcastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid==" + APIKey + "&units=imperial";


function getWeather(event){
    $("#currentWeatherCard").empty();
    event.preventDefault();

    var searchInput = document.getElementById("searchInput").value;

    var currentForcastUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + APIKey + "&units=imperial";

    fetch(currentForcastUrl)
    .then(response => response.json())
    .then(function(response) { 

        var cityName = "City: " + response.name;

        var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lat + "&appid=" + APIKey+ "&units=imperial";

        fetch(oneCallUrl)
        .then(response => response.json())
        .then(function(response) {
            

        var temp = "Temperature: " + response.current.temp;
        var iconImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");
         iconImage.attr("width", 50);
        var humidity = $("<h4>").html("Humidity: " + response.current.humidity);
        var windSpeed = $("<h4>").html("Wind Speed: " + response.current.wind_speed);
        var UVI = $("<h4>").html("UV Index: " + response.current.uvi)
            
        $("#currentWeatherCard").append(cityName, iconImage, temp, humidity, windSpeed, UVI);
        }) 




    })



}

searchButton.addEventListener("click", getWeather);