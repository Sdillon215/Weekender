//Third version: encompasses input city autocomplete text box, pulling API info for places, and mapping said places.
let map;
let autocomplete;
let service;
let cityCenterObj;
let mapMarkers = [];

function initialize() {
    initMap();
    initAutoComplete();
}

//creates the gMap
function initMap() {
    map = new google.maps.Map(document.getElementById("gMap"), {
        center: {
            lat: 40.7608,
            lng: -111.8910
        },
        zoom: 10
    })
}

//creates the autocomplete input text box functionality
function initAutoComplete() {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById("citySearch"), {
        types: ["(cities)"],
        componentRestrictions: { "country": ["US"] },
        fields: ["name", "geometry"]
    });

    //adds listener if the city is changed
    autocomplete.addListener("place_changed", onCityChanged);
}

//event listener to call map and places change if a city is entered/selected
function onCityChanged() {
    var city = autocomplete.getPlace();

    if (!city.geometry) {
        document.getElementById("citySearch").placeholder = "Enter City Name";
    }
    else {
        document.getElementById("citySearch").innerHTML = city.name;
        setCityCenter(city);
        //Placeholder for calling Weather App, recomment once both are in the same branch
        //getDailyWeather(cityCenterObj.Lat, cityCenterObj.Lng);
        updateMap();
    }
}

//updates the city center obj on city change
function setCityCenter(city) {
    cityCenterObj = {
        City: city.name,
        Lat: city.geometry.location.lat(),
        Lng: city.geometry.location.lng()
    }
}

//funciton to update the map and markers when city changes
function updateMap() {
    removeMapMarkers();
    map.setCenter({lat: cityCenterObj.Lat, lng: cityCenterObj.Lng});
    getPlaces();
}

//does what it says, removes markers on the map
function removeMapMarkers() {
    setMarkersOnMap(null);
    //as the markers need to be removed, setting the array to null
    mapMarkers = [];
}

//populates the markers array so they can be added/removed from the map
function setMarkersOnMap(map) {
    for (let i = 0; i < mapMarkers.length; i++) {
        mapMarkers[i].setMap(map);
    }
}

//function to call API to get places
function getPlaces() {
    // placeholders for html inputs for radius and activity
    var radius = 2000;
    var activity = "hiking";

    var request = {
        location: {lat: cityCenterObj.Lat, lng: cityCenterObj.Lng},
        //will need to replace radius and query once html is finished
        radius: radius,
        query: activity
        // radius: document.getElementById("radiusInput").value,
        // query: document.getElementById("radiusInput").value
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

//function similar to a fetch... i think
function callback(results, status) {
    // if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //         var resultObject = {
    //             name: results[i].name,
    //             geoLocation: results[i].geometry.location,
    //         };
    //         placesList.push(resultObject);
    //     }
    //   }
}



// //function to get places
// var getPlaces = function (city, activity, radius) {
//     var placesURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
//         + activity + "+near+" + city + "&radius=" + radius + "&key=AIzaSyAoe4eRIVCMKOzBIoL-f1UI_h8Ey3ZLMok";

//     //gets JSON results from API and pulls relevant info out into an array of objects
//     var placesList = [];

//     $.getJSON(placesURL, function(data) {
//         data.results.forEach(result => {
//             var resultObject = {
//                 name: result.name,
//                 lat: result.geometry.location.lat,
//                 lng: result.geometry.location.lng
//             };
//             placesList.push(resultObject);
//         });

//         //lists the first 5 places in the html and eventually maps them on the gMap, might change functionality later to include more places depending on group workload
//         var locationList = $("<ol>");
//         for (let i = 0; i < 5; i++) {
//             var locationName = $("<li>").text(placesList[i].name);
//             locationList.append(locationName)            
//         }

//         $("#places").append(locationList);
//     });

//     //for some reason the array loses some scope outside the getjson gotta move it inside scope.
//      console.log(placesList);
//     // console.log(placesList[0])
// }




//Unfinished second version: started to construct the client side API but wanted to try building differently to include city search/autocomplete and map markers all in one

// var map;
// var geocoder;
// var service;

// //initial function to generate map
// function initialize() {
//     geocoder = new google.maps.Geocoder();
//     var latlng = new google.maps.LatLng(-34.397, 150.644);
//     var mapOptions = {
//         zoom: 8,
//         center: latlng
//     }
//     map = new google.maps.Map(document.getElementById('gMap'), mapOptions);

//     initPlaces();
// }

// function codeAddress() {
//     //will need to code in elementID value once HTML is complete
//     var address = "Salt Lake City";
//     geocoder.geocode({ 'address': address }, function (results, status) {
//         if (status == 'OK') {
//             map.setCenter(results[0].geometry.location);
//             var marker = new google.maps.Marker({
//                 map: map,
//                 position: results[0].geometry.location
//             });
//         } else {
//             alert('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }

// //initial function to populate default values
// function initPlaces() {
//     //defaults to SLC
//     getPlaces("Salt Lake City", "hiking", "1000");
// }

// function getPlaces(city, activity, radius) {
//     var request = {
//         location: city,
//         radius: radius,
//         query: activity
//     };

//     service = new google.maps.places.PlacesService(map);
//     service.textSearch(request, callback);
// }

// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             var place = results[i];
//             createMarker(results[i]);
//         }
//     }
// }



// First Version uses server side API, need to switch to client side API

// //initial function to populate default values
// function initPlaces() {
//     //defaults to SLC
//     getPlaces("Salt Lake City", "hiking", "1000");
// }

// //function to get places
// var getPlaces = function (city, activity, radius) {
//     var placesURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
//         + activity + "+near+" + city + "&radius=" + radius + "&key=AIzaSyAoe4eRIVCMKOzBIoL-f1UI_h8Ey3ZLMok";

//     //gets JSON results from API and pulls relevant info out into an array of objects
//     var placesList = [];

//     $.getJSON(placesURL, function(data) {
//         data.results.forEach(result => {
//             var resultObject = {
//                 name: result.name,
//                 lat: result.geometry.location.lat,
//                 lng: result.geometry.location.lng
//             };
//             placesList.push(resultObject);
//         });

//         //lists the first 5 places in the html and eventually maps them on the gMap, might change functionality later to include more places depending on group workload
//         var locationList = $("<ol>");
//         for (let i = 0; i < 5; i++) {
//             var locationName = $("<li>").text(placesList[i].name);
//             locationList.append(locationName)            
//         }

//         $("#places").append(locationList);
//     });

//     //for some reason the array loses some scope outside the getjson gotta move it inside scope.
//      console.log(placesList);
//     // console.log(placesList[0])
// }