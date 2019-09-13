const express = require('express')
const router = express.Router()
const City = require("../model/City.js")
const request = require('request')
const moment = require('moment');


const url = 'http://api.apixu.com/v1/current.json?key=42b5a646298c4d8994d141522191707&q='

router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(url + cityName, function (response, ) {
        const getBody = JSON.parse(response.body || "{}")
        res.send(getBody)
    })
})

router.get('/cities', function (res) {
    City.find({}, function (data) {
        res.send(data)
    }
    )
})

router.post('/city', function (req) {
    const cityObject = req.body
    const newCity = new City({
        name: cityObject.name,
        updatedAt: moment(cityObject.updatedAt).format('LL'),
        temperature: cityObject.temperature,
        condition: cityObject.condition,
        conditionPic: cityObject.conditionPic
    })
    newCity.save()
})

router.delete('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    City.findOneAndDelete({ name: cityName }).exec(function (err, data) {
        res.send(data)
    })
})

module.exports = router
