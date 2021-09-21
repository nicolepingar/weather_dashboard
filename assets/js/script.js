// global variables
var inputField = $(".inputField");
var searchButton = $(".searchButton");
var ulEl = $(".ul")
var form = $(".input-group")
var cityStorage = [];
var urlFront = "https://api.openweathermap.org/data/2.5/weather?q="
var urlEnd = "&units=imperial&appid=25228def002124465df0a57cc9a5803b"
var urlFront2 = "https://api.openweathermap.org/data/2.5/onecall?lat="
var urlEnd2 = "&units=imperial&exclude=minutely,hourly,alerts&appid=25228def002124465df0a57cc9a5803b"
var currentWeatherContainer = $(".currentWeather")
var weekWeatherContainer = $(".weekForecast")
var weekHeaderClass = $(".weekHeader")
var localButton = $(".localButton")
currentDateEl = $("<h2>")
currentDateEl.val("");
// this function renders the data from local storage and creates buttons for each string in the object 
function renderCities() {
    ulEl.empty(); // this prevents it from creating new buttons twice, once from storage and once from adding the button new
    for (var i = 0; i < cityStorage.length; i++) {
        var cityEl = cityStorage[i];
        var liEl = $("<button>");
        liEl.text(cityEl).addClass("btn btn-secondary btn-lg btn-block localButton");
        ulEl.append(liEl);
    }
}
// this function gets the data from local storage and calls renderCities to create buttons
function init() {
    var storedCities = JSON.parse(localStorage.getItem("cityStorage")) // gets cities from local storage 
    if (storedCities !== null) { // upon refresh, local storage buttons are still there
        cityStorage = storedCities;
    }
    renderCities();
}
// this function is how new buttons are created upon clicking the search button and calls getCityInfo function for information on searched city
function searchForm(event) {
    event.preventDefault();
    var cities = inputField.val();
    if (cities === "") { // if there is nothing in the input field, nothing happens 
        return;
    }
    cityStorage.push(cities); // pushes input field value onto empty array 
    localStorage.setItem("cityStorage", JSON.stringify(cityStorage)); // sets input field value in local storage 
     
    getCityInfo(cities) // calls function with cities as variable
    renderCities(); // calls function so buttons are created for new cities from input field
}
// when the user presses a button for a city that was previously searched, this button executes the function 
function buttonClick(event) {
    event.preventDefault();
    var cities2 = $(this).text(); // this is the input field 
    getCityInfo(cities2); // calls function with cities2 as variable
}
// this function has the fetch method that pulls all the weather information 
var getCityInfo = function (cities, cities2) {
    var newURL = urlFront.concat(cities, urlEnd)
    console.log(newURL);
    fetch(newURL) // creates new url based off of what was searched 
        .then(function (response) {
            if (response.status === 404) { // if the user types something that is not a city and it responds with 404, user is redirected to the website again 
                document.location.replace("https://nicolepingar.github.io/weather_dashboard/")
            } else {
                return response.json();
            }
        })
        .then(function (data) {
            currentWeatherContainer.empty(); // empties the container so each time a button is pressed or a city is searched, it replaced the old data 
            $(".col-10").addClass("border my-3") 
            var currentCity = data.name
            var today = moment(); // displays the current date
            currentDateEl.text(currentCity + " (" + today.format("ddd, MMM Do, YYYY") + ")")
            currentWeatherContainer.append(currentDateEl);
            var description = data.weather[0].description // conditional statement so the icon displayed matches the weather description 
            if (description === "clear sky") {
                var icon = $('<img />',
                    {
                        id: 'myid',
                        src: './assets/images/clear-sky.jpg',
                        width: 50
                    })
                currentDateEl.append(icon)
            } else if (description === "few clouds") {
                var icon = $('<img />',
                    {
                        id: 'myid',
                        src: './assets/images/few-clouds.jpg',
                        width: 50
                    })
                currentDateEl.append(icon)
            } else if (description === "scattered clouds") {
                var icon = $('<img />',
                    {
                        id: 'myid',
                        src: './assets/images/scattered-clouds.jpg',
                        width: 50
                    })
                currentDateEl.append(icon)
            } else if (description === "broken clouds") {
                var icon = $('<img />',
                    {
                        id: 'myid',
                        src: './assets/images/broken-clouds.jpg',
                        width: 50
                    })
                currentDateEl.append(icon)
            } else if (description = "shower rain") {
                var icon = $('<img />',
                    {
                        id: 'myid',
                        src: './assets/images/shower.jpg',
                        width: 50
                    })
                currentDateEl.append(icon)
            } else if (description = "rain") {
                var icon = $('<img />',
                    {
                        id: 'myid',
                        src: './assets/images/rain.jpg',
                        width: 50
                    })
                currentDateEl.append(icon)
            } else if (description = "thunderstorm") {
                var icon = $('<img />',
                    {
                        id: 'myid',
                        src: './assets/images/idk.jpg',
                        width: 50
                    })
                currentDateEl.append(icon)
            } else if (description = "snow") {
                var icon = $('<img />',
                    {
                        id: 'myid',
                        src: './assets/images/snow.jpg',
                        width: 50
                    })
                currentDateEl.append(icon)
            } else
                var icon = $('<img />',
                    {
                        id: 'myid',
                        src: './assets/images/mist.jpg',
                        width: 50
                    })
            currentDateEl.append(icon)
           // current weather information 
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
            // lat&lon coordinates to pull current uv index and daily forecast for new api code
            var lat = data.coord.lat
            var lon = data.coord.lon    
            var newURL2 = urlFront2 + lat + "&lon=" + lon + urlEnd2
                fetch(newURL2) // second fetch for new api
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var uvi = data.current.uvi // un index information 
                    var uviEl = $("<h3>");
                    uviEl.text("UV Index: " + uvi)
                    uviEl.addClass("uvi")
                    currentWeatherContainer.append(uviEl);
                    console.log(typeof uvi);
                    if (uvi < 2) { //conditional statement so that uvi background color changes based on the number
                        uviEl.css("background-color", "#66FF99")
                    }
                    else if (3 < uvi < 5) {
                        uviEl.css("background-color", "	#FFFFE0")
                    }
                    else if (6 < uvi < 7) {
                        uviEl.css("background-color", "#ffc87c")
                    }
                    else
                        uviEl.css("background-color", "#FFCCCB")
                    // start of weekly weather
                    weekHeaderClass.empty(); // empties the weekly container so each time a button is pressed or a city is searched, it replaced the old data 
                    inputField.val(""); // empties input field after button is pressed
                    var headerWeek = $('<h2>');
                    headerWeek.text("Five Day Weather Forecast");
                    weekWeatherContainer.append(headerWeek);
                    // for loop to retrieve 5 day weather forecast
                    for (var i = 0; i < 5; i++) {
                        var weekDateEl = $("<h4>").text(today.add((24), "hours").format("ddd, MMM Do")) // adds 24 hours to current date 
                        weekDateEl.addClass("col card m-1")
                        weekHeaderClass.append(weekDateEl);
                        var description = data.daily[i].weather[0].description;
                        if (description === "clear sky") { // conditional statement so the icon displayed matches the weather description
                            var icon = $('<img />',
                                {
                                    id: 'myid',
                                    src: './assets/images/clear-sky.jpg',
                                    width: 50
                                })
                            weekDateEl.append(icon)
                        } else if (description === "few clouds") {
                            var icon = $('<img />',
                                {
                                    id: 'myid',
                                    src: './assets/images/few-clouds.jpg',
                                    width: 50
                                })
                            weekDateEl.append(icon)
                        } else if (description === "scattered clouds") {
                            var icon = $('<img />',
                                {
                                    id: 'myid',
                                    src: './assets/images/scattered-clouds.jpg',
                                    width: 50
                                })
                            weekDateEl.append(icon)
                        } else if (description === "broken clouds") {
                            var icon = $('<img />',
                                {
                                    id: 'myid',
                                    src: './assets/images/broken-clouds.jpg',
                                    width: 50
                                })
                            weekDateEl.append(icon)
                        } else if (description = "shower rain") {
                            var icon = $('<img />',
                                {
                                    id: 'myid',
                                    src: './assets/images/shower.jpg',
                                    width: 50
                                })
                            weekDateEl.append(icon)
                        } else if (description = "rain") {
                            var icon = $('<img />',
                                {
                                    id: 'myid',
                                    src: './assets/images/rain.jpg',
                                    width: 50
                                })
                            weekDateEl.append(icon)
                        } else if (description = "thunderstorm") {
                            var icon = $('<img />',
                                {
                                    id: 'myid',
                                    src: './assets/images/idk.jpg',
                                    width: 50
                                })
                            weekDateEl.append(icon)
                        } else if (description = "snow") {
                            var icon = $('<img />',
                                {
                                    id: 'myid',
                                    src: './assets/images/snow.jpg',
                                    width: 50
                                })
                            weekDateEl.append(icon)
                        } else
                            var icon = $('<img />',
                                {
                                    id: 'myid',
                                    src: './assets/images/mist.jpg',
                                    width: 50
                                })
                        weekDateEl.append(icon)
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
// when button in elEl container is clicked, if it has the class of localButton, call buttonClick function
ulEl.on("click", ".localButton", buttonClick)
// when search button is clicked, call searchForm function
searchButton.on("click", searchForm)
// calls init function 
init();






