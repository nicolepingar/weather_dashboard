var inputField = $(".inputField");
var searchButton = $(".searchButton");
var ulEl = $(".ul")
var form = $(".input-group")
var cityStorage = [];
var urlFront = "https://api.openweathermap.org/data/2.5/weather?q="
var urlEnd = "&units=imperial&appid=25228def002124465df0a57cc9a5803b"
var currentWeatherContainer = $(".currentWeather")
var weekWeatherContainer = $(".weekForecast")
var today = moment();
var localButton = $(".localButton")
// this function renders the data from local storage and creates buttons for each string in the object 
function renderCities() {
    ulEl.empty(); // this prevents it from creating new buttons twice, once from storage and once from adding the button new
    for (var i = 0; i < cityStorage.length; i++) {
        var cityEl = cityStorage[i];
        console.log(cityEl);
        var liEl = $("<button>");
        liEl.text(cityEl).addClass("btn btn-secondary btn-lg btn-block localButton");
        ulEl.append(liEl);
    }
}
// this function gets the data from local storage and calls renderCities to create buttons
function init() {
    var storedCities = JSON.parse(localStorage.getItem("cityStorage"))
    if (storedCities !== null) { // upon refresh, local storage buttons are still there
        cityStorage = storedCities;
    }
    renderCities();
}
// this function is how new buttons are created upon clicking the search button
function searchForm(event) {
    event.preventDefault();
    var cities = inputField.val();
    console.log(cities);
    if (cities === "") {
        return;
    }
    cityStorage.push(cities);
    inputField.val("");
    localStorage.setItem("cityStorage", JSON.stringify(cityStorage));
    renderCities();


    // if (!cities) {
    //     cities = localButton.val();
    // }


    var newURL = urlFront.concat(cities, urlEnd)
    console.log(newURL);
    fetch(newURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var currentDateEl = $("<h2>").text(today.format("ddd, MMM Do, YYYY"))
            currentWeatherContainer.append(currentDateEl);

            var currentTemp = data.main.temp
            var currentTempEl = $("<h3>");
            currentTempEl.text("Temp: " + currentTemp + "°F");
            currentWeatherContainer.append(currentTempEl);

            var currentWind = data.wind.speed
            var currentWindEl = $("<h3>");
            currentWindEl.text("Wind: " + currentWind + " MPH");
            currentWeatherContainer.append(currentWindEl);

            var currentHumid = data.main.humidity
            var currentHumidEl = $("<h3>");
            currentHumidEl.text("Humidity: " + currentHumid + "%");
            currentWeatherContainer.append(currentHumidEl);

            var lat = data.coord.lat
            var lon = data.coord.lon
            console.log(lat);
            console.log(lon);

            var newURL2 = urlFront2 + lat + "&lon=" + lon + urlEnd2
            console.log(newURL2);

            fetch(newURL2)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var uvi = data.current.uvi
                    var uviEl = $("<h3>");
                    uviEl.text("UV Index: " + uvi)
                    currentWeatherContainer.append(uviEl);
                    console.log(typeof uvi);
                    if (uvi < 2) {
                        uviEl.css("background-color", "green")
                    }
                    else if (3 < uvi < 5) {
                        uviEl.css("background-color", "yellow")
                    }
                    else if (6 < uvi < 7) {
                        uviEl.css("background-color", "orange")
                    }
                    else
                        uviEl.css("background-color", "red")
                    for (var i = 0; i < 5; i++) {
                        var weekDateEl = $("<h4>").text(today.add((24), "hours").format("ddd, MMM Do, YYYY"))
                        currentWeatherContainer.append(weekDateEl);

                        var weekTemp = data.daily[i].temp.day
                        var weekTempEl = $("<h5>");
                        weekTempEl.text("Temp: " + weekTemp + "°F");
                        weekDateEl.append(weekTempEl);

                        var weekWind = data.daily[i].wind_speed
                        var weekWindEl = $("<h5>");
                        weekWindEl.text("Wind: " + weekWind + " MPH");
                        weekTempEl.append(weekWindEl);

                        var weekHumid = data.daily[i].humidity
                        var weekHumidEl = $("<h5>");
                        weekHumidEl.text("Humidity: " + weekHumid + "%");
                        weekWindEl.append(weekHumidEl);
                    }

                })


        })

}

searchButton.on("click", searchForm)
// localButton.on("click", searchForm)
// calls init function 
init();


// !!! weather data 

// var ogUrl = "https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&units=imperial&appid=25228def002124465df0a57cc9a5803b"

var urlFront2 = "https://api.openweathermap.org/data/2.5/onecall?lat="
var urlEnd2 = "&units=imperial&exclude=minutely,hourly,alerts&appid=25228def002124465df0a57cc9a5803b"

    // fetch("https://api.openweathermap.org/data/2.5/onecall?lat=39.9523&lon=-75.1638&units=imperial&exclude=minutely,hourly,alerts&appid=25228def002124465df0a57cc9a5803b")
    //     .then(function (potato) {
    //         return potato.json();
    //     })
    //     .then(function (banana) {
    //         console.log(banana);
    //         console.log(banana.current.uvi);
    //         console.log(banana.daily[0].temp.day);
    //         console.log(banana.daily[0].wind_speed);
    //         console.log(banana.daily[0].humidity);

    //     })

// current need temp, wind, humidity, uv index
// 5 day need date, temp, wind, humidity 