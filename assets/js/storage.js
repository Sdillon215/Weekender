var cityArr = JSON.parse(localStorage.getItem("cityArr")) || [];

var loadCity = function(city) {
    if (cityArr.indexOf(city) === -1) {
        cityArr.push(city);
        localStorage.setItem("cityArr", JSON.stringify(cityArr));
    }
console.log(cityArr);
};
