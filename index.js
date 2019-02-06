const error = require('./middleware/error')
const config = require('config')
const Joi = require('Joi')
Joi.objectId = require('joi-objectid')(Joi)
const login = require('./routes/login')
const genre = require('./routes/genre')
const movie = require('./routes/movie')
const customer = require('./routes/customer')
const bookMovie = require('./routes/bookMovie')
const user = require('./routes/user')
const concession = require('./routes/concession')
const express = require('express')
const app = express()


const mongoose = require('mongoose')
const con = config.get('mcPrivateKey')
if (!con) {
    console.error('FATAL ERROR: fatal error no config set')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/magnificient_cinemas', { useNewUrlParser: true })
    .then(() => { console.log('db connected') })
    .catch(err => { console.log(err) })

app.use(express.json())

app.use('/api/login', login)
app.use('/api/genre', genre)
app.use('/api/movie', movie)
app.use('/api/customer', customer)
app.use('/api/bookmovie', bookMovie)
app.use('/api/user', user)
app.use('/api/concession', concession)

//error fuction that takes 3 parameters req, res, err
app.use(error)

const port = process.env.PORT || 9191

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
})