const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    updatedAt: String,
    temperature: String,
    condition: String,
    conditionPic: String,
    star: String
})

const City = mongoose.model("City", citySchema)

module.exports = City


