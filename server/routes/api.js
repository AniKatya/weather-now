const express = require('express')
const router = express.Router()
const City = require("../model/City.js")
const request = require('request')
const moment = require('moment');

const url = 'http://api.openweathermap.org/data/2.5/weather?appid=53f30963f218784f0d4b569a6f1e3158&units=metric&';
router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(url + "q="+cityName, function (error, response) {
        console.log(url+cityName)
        const cityData = JSON.parse(response.body || "{}")
        if (!cityData) {
            console.log("no data from external api")
        } else {
            console.log(cityData)
            res.send({
                name: cityData.name,
                updatedAt: moment().format('MMMM Do, h:mm a'),
                temperature: Math.round(cityData.main.temp)+'º',
                condition: cityData.weather[0].main,
                conditionPic: 'http://openweathermap.org/img/wn/'+ cityData.weather[0].icon +'@2x.png' 
            })
        }
    })
})

router.get('/cities', function (req, res) {
    City.find({}, function (error, data) {
        res.send(data)
    }
    )
})

router.post('/city', function (req, res) {
    const cityObject = req.body
    const newCity = new City(cityObject)
    newCity.save()
})

router.get('/city/:lat/:lon', function(req,res){
    let lat = req.params.lat;
    let lon = req.params.lon;
    request(url+"lat="+lat+"&lon="+lon, function(error,response){
        const cityData = JSON.parse(response.body || "")
        if (!(response.body)) {
            console.log("no data from external api")
        } else {
            res.send({
                name: cityData.name,
                updatedAt: moment().format('MMMM Do, h:mm a'),
                temperature: Math.round(cityData.main.temp)+'º',
                humidity: cityData.main.humidity+'%',
                windSpeed: "w "+cityData.wind.speed+" m/s",
                sunrise: cityData.sys.sunrise,
                sunset: cityData.sys.sunset,
                localTime: cityData.dt,
                condition: cityData.weather[0].main,
                conditionPic: 'http://openweathermap.org/img/wn/'+ cityData.weather[0].icon +'@2x.png' 

            })
    }

})
})

router.delete('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    City.findOneAndDelete({ name: cityName }).exec(function (err, data) {
        res.send(data)
    })
})

module.exports = router;
