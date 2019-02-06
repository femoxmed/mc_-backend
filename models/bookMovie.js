const mongoose = require('mongoose')
const Joi = require('Joi')

const { customerSchema } = require('../models/customer')
const { movieSchema } = require('../models/movie')
const { concessionSchema } = require('../models/concession')

const bookMovieSchema = new mongoose.Schema({

    customerName: String,
    phone: String,
    movieTitle: String,
    movieGenre: String,
    bookDate: { type: Date, required: true, default: Date.now },
    movieTime: { type: String },
    movieAmount: { type: Number },
    concession: { type: Array }

})

const BookMovie = mongoose.model('booked movies', bookMovieSchema)


function bookMovieVal(reqbody) {
    schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
        movieTime: Joi.string().required(),
        movieAmount: Joi.number().required(),
        concessionId: Joi.array()
    }
    return Joi.validate(reqbody, schema)
}

exports.bookMovieSchema = bookMovieSchema;
exports.BookMovie = BookMovie;
exports.bookMovieVal = bookMovieVal;