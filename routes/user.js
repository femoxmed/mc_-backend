const _ = require('lodash')
const bcrypt = require('bcrypt')
const { Validate, Users } = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()


router.post('/', async(req, res) => {

    const Val = Validate(req.body)
    if (Val.error) {
        return res.status(404).send(Val.error.details[0].message)
    }


    let newUser = await Users.findOne({ email: req.body.email })
    if (newUser) return res.status(404).send('User Already exist')


    let user = new Users({
            name: req.body.name,
            email: req.body.email,
            isAdmin: req.body.isAdmin,
            phone: req.body.phone,
            role: req.body.role,
            password: req.body.password,

        })
        // newUser = new Users(_.pick(req.body, ['name', 'email', 'password', 'role', 'password']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    user = await user.save()
    const token = user.generateAuthToken()
    res.header('x-user-token', token).send(_.pick(user, ['_id', 'name', 'email', 'password', 'role', 'password']))

})

module.exports = router