const config = require('config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { authUser, authVal } = require('../models/login')
const express = require('express')
const router = express.Router()
const { Validate, Users } = require('../models/user')
const { Customer } = require('../models/customer')


router.post('/user', async(req, res) => {

    const authValidation = authVal(req.body)

    if (authValidation.error) {
        res.status(400).send(authValidation.error);
        return
    }
    console.log(req.body.email)

    const user = await Users.findOne({ 'email': req.body.email })
    if (!user) {
        return res.status(400).send('Username or Password incorrect')

    }

    const validpassword = await bcrypt.compare(req.body.password, user.password)

    if (!validpassword) {
        res.status(400).send("Password Incorrect")
        return
    }

    const token = user.generateAuthToken()
    res.header('x-user-token', token).send(`You are succesfully loggedin ${token}`)

})

router.post('/customer', async(req, res) => {

    const authValidation = authVal(req.body)

    if (authValidation.error) {
        res.status(400).send(authValidation.error);
        return
    }
    console.log(req.body.email)

    const user = await Customer.findOne({ 'email': req.body.email })
    if (!user) {
        return res.status(400).send('Username or Password incorrect')

    }

    const validpassword = await bcrypt.compare(req.body.password, user.password)

    if (!validpassword) {
        res.status(400).send("Password Incorrect")
        return
    }

    const token = user.AuthTokenCustomer()
    res.header('x-cusAuthToken', token).send(`You are succesfully loggedin ${token}`)

})
module.exports = router