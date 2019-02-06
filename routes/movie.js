const express = require('express')
const router = express.Router()
const { Genre, genreSchema } = require('../models/genre')
const _ = require('lodash')

const { Movie, MovieVal } = require('../models/movie')

router.post('/', async(req, res) => {
    //Register

    const { error } = MovieVal(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)

    if (!genre) {
        res.status(404).send('Genre selected does not exist')
        return
    }

    // let movie = new Movie(_.pick(req.body['title', _.pick(genre['id', 'name']), 'numberInStock', 'dailyRentalRate']))
    let movie = new Movie({
        title: req.body.title,
        genre: { _id: genre._id, name: genre.name },

        movieAmount: req.body.movieAmount
    })

    movie = await movie.save()
    res.send(movie)

})

router.delete('/:id', async(req, res) => {

    const movie = await Movie.findByIdAndRemove(req.params.id)
    if (!movie) return res.status(404).send('Movie does not Exist')

})
router.delete('/all', async(req, res) => {

    const movie = await Movie.remove()
    if (!movie) return res.status(500).send('Something went wrong')

})

router.put('/:id', async(req, res) => {
    const genre = Genre.findById(req.body.id)
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.name,
        genre: { _id: genre._id, name: genre.name },
        dateShowing: req.body.dateShowing,
        dateExpired: req.body.dateExpired,
        movieAmount: req.body.movieAmount
    }, { new: true })

    if (!movie) return res.status(404).send('Movie does not Exist')
})



module.exports = router