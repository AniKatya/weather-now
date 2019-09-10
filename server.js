// Node Modules Imports
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const moment = require('moment');


// Internal Modules Imports
const api = require('./server/routes/api')
let City = require("./server/model/City.js")

// Connecting to Mongo Database
mongoose.connect('mongodb://localhost/cities', { useNewUrlParser: true })

// Setting up express, serving client files, configuring bodyParser
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


// Connecting to "api", i.e our routes
app.use('/', api)

// Running the server
const port = 3000
app.listen(port, function () { 
    console.log('Running on ' + port) })

