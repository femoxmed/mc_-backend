const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Joi = require('joi')
const { genreSchema } = require('../models/genre')


// schema and model plus valodation

const movieSchema = new mongoose.Schema({
    title: { type: String, minlength: 3, maxlength: 200, required: true },
    genre: genreSchema,
    dateShowing: { type: Date },
    dateRegistered: { type: Date, default: Date.now },
    dateExpired: Date,
    movieAmount: { type: String, required: true }
})

const Movie = mongoose.model('Movies', movieSchema)

function MovieVal(reqbody) {
    schema = {
        title: Joi.string().min(3).max(200).required(),
        genreId: Joi.string(),

        dateShowing: Joi.string(),
        dateExpired: Joi.string(),
        movieAmount: Joi.string()

    }
    return Joi.validate(reqbody, schema)
}

exports.Movie = Movie
exports.MovieVal = MovieVal,
    exports.movieSchema = movieSchema