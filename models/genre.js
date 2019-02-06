const mongoose = require('mongoose')
const Joi = require('joi')


const genreSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const Genre = mongoose.model('genre', genreSchema)


function genreVal(reqbodyname) {
    schema = {
        name: Joi.string().min(2).max(256)
    }

    return Joi.validate(reqbodyname, schema)
}

exports.Genre = Genre
exports.genreVal = genreVal
exports.genreSchema = genreSchema