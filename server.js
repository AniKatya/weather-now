const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

const api = require('./server/routes/api')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cities', { useNewUrlParser: true })

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', api)

const port = 3000
app.listen(process.env.PORT || port, function () {
    console.log('Running on ' + port)
})

