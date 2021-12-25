var fiveDay = document.getElementById('five-day-container')
var citySearch = document.getElementById('citySearch')


//with a click of a button we create a function that looks for our city 
document.querySelector('#button').addEventListener('click', function () {
    var city = document.getElementById('city').value
    getCity(city)
    saveHistory(city)
})


function saveHistory(city) {
    // save  searched citys to local storage
    localStorage.setItem('city', JSON.stringify(city));
    getHistory(city)
}


    // loop through storage and for each item in local storage  create a button with the id and the textContet to be equal to the value in storage
    // add event listener to each button
    // getCity(event.target.id)



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

//with the lat and lon we are fetching the parametars for the next 5 days 
function getFiveDay(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=8b9ea86a571caec946a75119c52563ed&units=imperial`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.getElementById('uv').textContent = 'Uv index: ' + data.current.uvi

            for (var i = 0; i < 5; i++) {
                //dynamicly we are creating cards with the parametars for the folowing 5 days 
                var card = document.createElement('div')
                card.setAttribute('class', `day-${i + 1} col bg-primary text-whie ml-3 rounded`)
                fiveDay.append(card)
                //we use moment.js to findt the curent day of the week so 
                var weekDay = document.createElement('h2')
                weekDay.textContent = moment().add(i + 1, 'days').format('dddd')
                card.prepend(weekDay)

                var fiveDayTemp = document.createElement('p')
                fiveDayTemp.textContent = 'Temp: ' + data.daily[i].temp.day + ' F'
                card.append(fiveDayTemp)

                fiveDayWind = document.createElement('p')
                fiveDayWind.textContent = 'Wind: ' + data.daily[i].wind_speed + ' Mph'
                card.append(fiveDayWind)

                fiveDayHumidity = document.createElement('p')
                fiveDayHumidity.textContent = 'Humidity: ' + data.daily[i].humidity + ' %'
                card.append(fiveDayHumidity)

            }
        })
}