const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { customerVal, Customer, customerAuthVal } = require('../models/customer')


router.post('/', async(req, res) => {
    const { error } = customerVal(req.body)

    if (error) return res.status(404).send(error.details[0].message)

    // to check if customer already exist
    let customerExist = await Customer.findOne({ email: req.body.email })
    if (customerExist) return res.status('404').send('Customer Already Exist')

    // let customer = new Customer(_.pick(req.body, ['name', 'email', 'isGold', 'phone', 'password']))
    let customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password


    })
    if (!customer) return res.status(400).send('Invalid data Entry')

    //this is to hash the password to the database
    const salt = await bcrypt.genSalt(10)
    customer.password = await bcrypt.hash(customer.password, salt)

    const token = customer.AuthTokenCustomer()

    console.log(token)

    res.header('x-cusAuthToken', token).send({ customer })
    customer = await customer.save()

})

router.post('/login', async(req, res) => {

    const { error } = customerAuthVal(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    let customer = await Customer.findOne({ email: req.body.email })
    if (!customer) return res.status(404).send('Invalid Username or Password')

    isPassword = await bcrypt.compare(req.body.password, customer.password)
    if (!isPassword) return res.status(404).send('Invalid Password')

    token = customer.AuthTokenCustomer()

    res.header('x-cusAuthToken', token).send(`You have succesful logged in ${customer.name}`)

})
module.exports = router