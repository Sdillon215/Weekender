// runs current weather api call with city name passed as a parameter
var getDailyWeather = function (city) {
    var currentApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c845404333af03f8f793eadcc58eeb29";

    fetch(currentApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                // passes response data to display function
                displayDailyWeather(data);
            });
        } else {
            // if user enters an invalid city name they will be alerted
            // need to change to modul
            alert("Please enter a city name!");
        };
    });

};

// recieves data parameter from getDailyWeather function and will dynamically display data to page
var displayDailyWeather = function (data) {
    console.log(data.name);
    console.log(data.main.temp);
    console.log(data.wind.speed);
    console.log(data.main.humidity);
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
    
};

// calls getDailyWeather function to run current weather api with hard coded value of Salt Lake City
// will be changed to an event listener capturing the value of the user input city name
getDailyWeather("Salt Lake City");