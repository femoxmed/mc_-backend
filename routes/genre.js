const express = require('express')
const router = express.Router()
const { Genre, genreVal } = require('../models/genre')
const auth = require('../middleware/auth')
const userAdminAuth = require('../middleware/userAdminAuth')



router.post('/', async(req, res) => {

    const { error } = genreVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let genreExist = await Genre.findOne({ name: req.body.name })

    if (genreExist) return res.status(404).send('Genre with Same Name Exist')
    const newGenre = new Genre({
        name: req.body.name
    })

    await newGenre.save()
    res.send(newGenre)
})


router.put('/:id', async(req, res) => {
    const Val = genreVal(req.body)
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    const genreExist = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

    if (!genreExist) return res.status(400).send('INVALID REQUEST, GENRE NOT FOUND')

    res.send(genreExist)

})

router.delete('/:id', auth, async(req, res) => {
    const Val = genreVal(req.body)
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    const genreExist = await Genre.findByIdAndRemove(req.params.id)

    if (!genreExist) return res.status(400).send('INVALID REQUEST, GENRE NOT FOUND')

    res.send(genreExist)
})

router.get('/', async(req, res) => {
    const genreAll = await Genre.find()
    res.send(genreAll)
})

router.get('/:id', async(req, res) => {
    const genreId = await Genre.findById({ _id: req.params.id })
    res.send(genreId)
})


module.exports = router