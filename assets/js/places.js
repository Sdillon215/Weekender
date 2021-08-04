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

function radiusChange() {
    console.log(autocomplete.getPlace());
    if (autocomplete.getPlace() != null) {
        valueChanged()
    }
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
    autocomplete.addListener("place_changed", valueChanged);
}

//event listener to call map and places change if a city is entered/selected
function valueChanged() {
    var city = autocomplete.getPlace();

    if (!city.geometry) {
        document.getElementById("citySearch").placeholder = "Enter City Name";
    }
    else {
        document.getElementById("citySearch").innerHTML = city.name;
        setCityCenter(city);
        //Passes lat and lon to weekend.js
        getDailyWeather(cityCenterObj.Lat, cityCenterObj.Lng);
        // passes city name to storage.js 
        loadCity(city.name);
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
    var request = {
        location: {lat: cityCenterObj.Lat, lng: cityCenterObj.Lng},
        query: "hiking",
        radius: document.getElementById("dropdownRadius").value
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

//function similar to a fetch... i think... or perhaps like an event listener?
function callback(results, status) {
    var placesList = [];

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        document.getElementById("postSearch").style.display = "block";
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
    var mapBoundry = new google.maps.LatLngBounds();
    for (let i = 0; i < placesList.length; i++) {
        if (i===5) {
            break;
        };
        var locationName = $("<li>").text(placesList[i].name);
        var placePosition = placesList[i].geoLocation;
        mapBoundry.extend(placePosition);
        locationList.append(locationName);       
        mapMarkers.push(new google.maps.Marker({
            position: placePosition,
            label: (i + 1).toString(),
            map: map
        }))
    }
    map.fitBounds(mapBoundry);

    //clears then updates places html
    $("#places").empty();
    $("#places").append(locationList);
}
