var inputField = $(".inputField");
var searchButton = $(".searchButton");
var ulEl = $(".ul")

var cityStorage = [];

function renderCities() {
    for (var i = 0; i < cityStorage.length; i++) {
       var todo = cityStorage[i];
       var liEl = $("<button>");
       liEl.text(todo);
       liEl.attr("data-index", i);

       ulEl.append(liEl);    
    }
}

function init() {
    var storedCities = localStorage.getItem("cityStorage")

    if (storedCities !== null) {
        cityStorage = storedCities;
    }
    renderCities();
}

localStorage.getItem("cityStorage")
 
$(".searchButton").on("click", function () {
    var cityStorage = $(".inputField").val();
    localStorage.setItem("cityStorage", cityStorage);  
})

function searchForm(event) {
    event.preventDefault();
    var cities = $('input[name="inputField"]').val();
    ulEl.append('<button>' + cities)
    $('input[name="inputField"]').val('');
}
searchButton.on("click", searchForm)


fetch("https://api.openweathermap.org/data/2.5/weather?zip=19382&appid=25228def002124465df0a57cc9a5803b")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.main.temp);
    })


init();
// current need temp, wind, humidity, uv index 
// 5 day need date, temp, wind, humidity 