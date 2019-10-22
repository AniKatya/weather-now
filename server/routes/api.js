const express = require('express')
const router = express.Router()
const City = require("../model/City.js")
const request = require('request')
const moment = require('moment');

const url = 'http://api.weatherstack.com/current?access_key=2911c30dc1c85ba2039ea8e41733a2c9&query='

router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(url + cityName, function (error, response) {
        const cityData = JSON.parse(response.body || "{}")
        if (!(response.body)) {
            console.log("no data from external api")
        } else {
            res.send({
                name: cityData.location.name,
                updatedAt: moment(cityData.current.last_updated).format('LL'),
                temperature: cityData.current.temp_c,
                condition: cityData.current.condition.text,
                conditionPic: cityData.current. weather_icons
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

router.delete('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    City.findOneAndDelete({ name: cityName }).exec(function (err, data) {
        res.send(data)
    })
})

module.exports = router
