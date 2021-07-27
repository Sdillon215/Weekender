//function to get places
var getPlaces = function (city, activity, radius) {
    var placesURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
        + activity + "+near+" + city + "&radius=" + radius + "&key=AIzaSyAoe4eRIVCMKOzBIoL-f1UI_h8Ey3ZLMok";

    //kept getting denied error due to CORS policy, had to install 3rd party extension to CHROME
    //which you can find here https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related?hl=en-GB
    //P.S. I'm not resposible if this breaks your pc
    //P.P.S. If you do use it then you will want to toggle it off once you're done with dev work

    //gets JSON results from API and pulls relevant info out into an array of objects
    var placesList = [];
    $.getJSON(placesURL, function(data) {
        data.results.forEach(result => {
            var resultObject = {};
            resultObject["name"] = result.name;
            //pull geo location to map on gMap
            resultObject["lat"] = result.geometry.location.lat;
            resultObject["lng"] = result.geometry.location.lng;
            placesList.push(resultObject);
        });
        console.log(placesList);
        console.log(placesList[0])
        var locationList = $("<ol>");
        for (let i = 0; i < 5; i++) {
            var locationName = $("<li>").text(placesList[i].name);
            locationList.append(locationName)            
        }

        $("#places").append(locationList);
    });

    //for some reason the array loses some scope outside the getjson gotta move it inside scope.
    // console.log(placesList);
    // console.log(placesList[0])

    //lists the first 5 places in the html and eventually maps them on the gMap, might change functionality later to include more places depending on group workload
    // var locationList = $("<ol>");
    //     for (let i = 0; i < 5; i++) {
    //         var locationName = $("<li>").text(placesList[i].name);
    //         locationList.append(locationName)            
    //     }

    //     $("#places").append(locationList);

}

//defaults to SLC
getPlaces("Salt Lake City", "hiking", "1000");
