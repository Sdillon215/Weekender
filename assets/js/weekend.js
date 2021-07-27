// runs current weather api call with city name passed as a parameter
var getDailyWeather = function (lat, lon) {
    var currentApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=c845404333af03f8f793eadcc58eeb29";

    fetch(currentApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                // passes response data to display function
                displayDailyWeather(data);
            });
        };
    });

};

// recieves data parameter from getDailyWeather function and will dynamically display data to page
var displayDailyWeather = function (data) {
    
    var weatherList = $("<ul>");
    // need to add classes to style weather list ex: var cityname = $("<li>").addClass("new classes here").text(data.name);
    var cityName = $("<li>").text(data.name);
    var cityTemp = $("<li>").text("Temp: " + data.main.temp + "F");
    var cityWind = $("<li>").text("Wind: " + data.wind.speed + " Mph");
    var cityHumid = $("<li>").text("Humidity: " + data.main.humidity + "%");
    var cityImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
    // appends weather info to <ul> as <li>
    weatherList.append(cityName, cityTemp, cityWind, cityHumid, cityImage);
    // appends <ul> to div with the id of weather
    $("#weather").append(weatherList);
    
};
