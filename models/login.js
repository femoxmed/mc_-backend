const mongoose = require('mongoose')
const Joi = require('Joi')

const schema = new mongoose.Schema({
    email: {
        type: String,
        min: 3,
        max: 256
    },
    password: { type: String }

})

const authUser = mongoose.model('authUsers', schema)

function authVal(reqBody) {

    schemaVal = {
        email: Joi.string().email(),
        password: Joi.string().min(5).max(100)

    }

    return Joi.validate(reqBody, schemaVal)

}

exports.authUser = authUser
exports.authVal = authVal