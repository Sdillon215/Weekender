//function to get places
var getPlaces = function (city, activity) {
    var placesURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
        + activity + "+in" + city + "&key=AIzaSyAoe4eRIVCMKOzBIoL-f1UI_h8Ey3ZLMok";

    fetch(placesURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // passes response data to display function
                displayPlaces(data);
            });
        } else {
            // if user enters an invalid city name they will be alerted
            // need to change to modul
            alert("Please enter a city name!");
        };
    });
}

var displayPlaces = function (data) {
    
    
    
};

//defaults to SLC
getPlaces("Salt Lake City");