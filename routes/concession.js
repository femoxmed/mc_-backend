const express = require('express')
const router = express.Router()
const { Concession, concessionVal } = require('../models/concession')
const auth = require('../middleware/auth')
const userAdminAuth = require('../middleware/userAdminAuth')



router.post('/', async(req, res) => {

    const { error } = concessionVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let concession = await Concession.findOne({ name: req.body.name })
    if (concession) return res.status(404).send('Concession with Same Name Exist')
    concession = new Concession({
        name: req.body.name,
        amount: [req.body.amount]
    })

    await concession.save()
    res.send(concession)
})


router.put('/:id', async(req, res) => {
    const Val = concessionVal(req.body)
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    let concession = await Concession.findByIdAndUpdate(req.params.id, { name: req.body.name, amount: req.body.amount }, { new: true })

    if (!concession) return res.status(400).send('INVALID REQUEST, GENRE NOT FOUND')

    res.send(concession)

})

router.delete('/:id', auth, async(req, res) => {
    const Val = concessionVal(req.body)
    if (Val.error) return res.status(400).send(Val.error.details[0].message)

    const concession = await Concession.findByIdAndRemove(req.params.id)

    if (!concession) return res.status(400).send('INVALID REQUEST, GENRE NOT FOUND')

    res.send(genreExist)
})

router.get('/', async(req, res) => {
    const concession = await Concession.find()
    if ((concession) == []) return res.send('Empty Concession, Add a concession')
    res.send(concession)
})

router.get('/:id', async(req, res) => {
    const concession = await Genre.findById({ _id: req.params.id })
    if (!concession) res.return(404).send('concession with given Id not found')
    res.send(concession)
})


module.exports = router