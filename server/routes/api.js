const express = require('express')
const router = express.Router()
const City = require("../model/City.js")
const request = require('request')


const url = 'http://api.apixu.com/v1/current.json?key=42b5a646298c4d8994d141522191707&q='

//This should be the route that makes a calls to your external API
router.get('/city/:cityName', function (req, res){
    let cityName = req.params.cityName
    request(url+cityName, function(err, response, body){
        const getBody = JSON.parse(response.body || "{}")
        res.send(getBody)
})})

//This route should find all of the city data saved in your DB, and send it to the client

router.get('/cities',function (req,res){
    City.find({}, function(err,data){
        res.send(data)}
    )})


//This route should take some data from the body, and save it as a new City to your DB
router.post('/city', function(req,res){
    const cityObject = req.body
    const newCity = new City({
        name: cityObject.name,
        updatedAt: cityObject.updatedAt,
        temperature: cityObject.temperature,
        condition: cityObject.condition,
        conditionPic: cityObject.conditionPic
    })
    newCity.save()
})


//This route should find the city's data in your DB and remove it from your DB

router.delete('/city/:cityName',function(req,res){
    let cityName = req.params.cityName
    City.findOneAndDelete({name:cityName}).exec(function(err,data){
        res.send(data)
    })
})

module.exports = router
