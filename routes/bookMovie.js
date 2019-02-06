const express = require('express')
const router = express.Router()
const { bookMovieVal, BookMovie } = require('../models/bookMovie')
const { Movie } = require('../models/movie')
const { Customer } = require('../models/customer')
const userAdminAuth = require('../middleware/userAdminAuth')
const { Concession } = require('../models/concession')
const asyncMiddleware = require('../middleware/asyncMiddleware')



router.post('/', userAdminAuth, async(req, res, next) => {
    //validate te data collected b t

    try {
        const { error } = bookMovieVal(req.body)
        if (error) return res.status(404).send(error.details[0].message)



        // for (req.body.customerId, request.body.customerId.length, )
        let customer = await Customer.findOne({ _id: req.body.customerId })
        if (!customer) return res.status(404).send(`Customer  does not exist`)
        let movie = await Movie.findOne({ _id: req.body.movieId })
        if (!movie) return res.status(404).send('invalid movie selected')
        console.log(customer.passworjjjd)

        const bookMovie = new BookMovie({
            // sn: BookMovie.length + 1,
            customerName: customer.name,
            phone: customer.phone,
            movieTitle: movie.title,
            movieGenre: movie.genre,
            movieTime: req.body.movieTime,
            movieAmount: req.body.movieAmount,

        })

        await Concession.findById(req.body.concessionId.forEach(async(concessionId) => {
            let condata = await Concession.findById(concessionId)
            bookMovie.concession.push({ name: condata.name, amount: condata.amount })
            console.log(condata.amount = condata.amount++)
        }))



        customer.tickets.push(bookMovie.id)

        await bookMovie.save();
        await customer.save();

        res.send(bookMovie);
    } catch (ex) {
        next(ex)
    }

})

router.post('/addticket', async(req, res) => {
    let customer = await Customer.findOne({ _id: req.user.customerId })
    customer.tickets.push(bookMovie.id)

})


module.exports = router