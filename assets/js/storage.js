var cityArr = JSON.parse(localStorage.getItem("cityArr")) || [];

var loadCity = function(city) {
    if (cityArr.indexOf(city) === -1) {
        cityArr.push(city);
    }
console.log(cityArr);
};
