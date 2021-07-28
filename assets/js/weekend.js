// runs current weather api call with city name passed as a parameter
var getDailyWeather = function (lat, lon) {
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=c845404333af03f8f793eadcc58eeb29";
    fetch(forecastApiUrl).then(function (response) {
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
    for (var i = 0; i < 7; i++) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var dailyUnixTime = data.daily[i].dt;
        var millisecond = dailyUnixTime * 1000;

        var dailyDate = new Date(millisecond);
        var dailyDate = dailyDate.toLocaleString("en-US", options);

        var weatherList = $("<div>").addClass("columns");
        // need to add classes to style weather list ex: var cityname = $("<li>").addClass("new classes here").text(data.name);
        var date = $("<div>").text(dailyDate);
        var cityTemp = $("<div>").text("Tempurature: " + data.daily[i].temp.day + "F");
        var cityWind = $("<div>").text("Wind: " + data.daily[i].wind_speed + " Mph");
        var cityHumid = $("<div>").text("Humidity: " + data.daily[i].humidity + "%");
        var cityImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
        // appends weather info to <ul> as <li>
        weatherList.append(date, cityTemp, cityWind, cityHumid, cityImage);
        // appends <ul> to div with the id of weather
        $("#weather").append(weatherList);
    };
};