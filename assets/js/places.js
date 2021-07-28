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
        getDailyWeather(cityCenterObj.Lat, cityCenterObj.Lng);
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
    for (let i = 0; i < mapMarkers.length; i++) {
        mapMarkers[i].setMap(null);
    }
    mapMarkers = [];
}

//function to call API to get places
function getPlaces() {
    // placeholders for html inputs for radius and activity
    var radius = 2000;
    //var activity = "hiking";

    var request = {
        location: {lat: cityCenterObj.Lat, lng: cityCenterObj.Lng},
        //will need to replace radius and query once html is finished
        radius: radius,
        //query: activity
        // radius: document.getElementById("radiusInput").value,
        query: document.getElementById("dropdownActivity").value
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

//function similar to a fetch... i think... or perhaps like an event listener?
function callback(results, status) {
    var placesList = [];

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var resultObject = {
                name: results[i].name,
                geoLocation: results[i].geometry.location,
                rating: results[i].rating
            };
            placesList.push(resultObject);
        }
    }

    //sorts results based on rating
    placesList.sort(function(a, b){
        return b.rating - a.rating;
    })

    //populates the top 5 palces, and creates markers for the map
    var locationList = $("<ol>");
    for (let i = 0; i < placesList.length; i++) {
        if (i===5) {
            break;
        };
        var locationName = $("<li>").text(placesList[i].name);
        locationList.append(locationName);       
        mapMarkers.push(new google.maps.Marker({
            position: placesList[i].geoLocation,
            label: (i + 1).toString(),
            map: map
        }))
    }

    //clears then updates places html
    $("#places").empty();
    $("#places").append(locationList);
}
