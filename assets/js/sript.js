var fiveDay = document.getElementById('five-day-container')
var citySearch = document.getElementById('citySearch')


//with a click of a button we create a function that looks for our city 
document.querySelector('#button').addEventListener('click', function () {
    var city = document.getElementById('city').value
    getCity(city)
    //saveHistory(city)
})

//with api we are finding the city we  are looking for 
function getCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b9ea86a571caec946a75119c52563ed&units=imperial`)
        .then(function (response) {
            return response.json()
        })
        //with the lon and lat from fetching the info we are finding curent parametars like city, temp, humid, wind
        .then(function (data) {
            console.log(data)
            var lat = data.coord.lat
            var lon = data.coord.lon
            getFiveDay(lat, lon)
            document.getElementById('City').textContent = 'City: ' + data.name
            document.getElementById('temperature').textContent = 'Temp: ' + data.main.temp + ' F'
            document.getElementById('humid').textContent = 'Humidity: ' + data.main.humidity + ' %'
            document.getElementById('wind').textContent = 'Wind: ' + data.wind.speed + ' Mph'
        })
}


function getFiveDay(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=8b9ea86a571caec946a75119c52563ed&units=imperial`)
        .then(function (response){
            return response.json()

        })
}