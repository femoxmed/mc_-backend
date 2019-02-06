const jwt = require('jsonwebtoken')
const config = require('config')
const { BookedMovie, bookMovieSchema } = require('../models/bookMovie')

const mongoose = require('mongoose')
const joi = require('joi')


const customerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 200 },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    dateCreated: { type: Date, default: Date.now },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'booked movies' }],
    password: { type: String, required: true }
})

customerSchema.methods.AuthTokenCustomer = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin, role: this.role }, config.get('mcPrivateKey'))
}

const Customer = mongoose.model('customers', customerSchema)


function customerVal(reqbody) {
    schema = {
        name: joi.string().min(3).max(200).required(),
        email: joi.string().email().required(),
        phone: joi.number(),
        // ticketNumber: joi.string().required(),
        password: joi.string().min(7).required(),
        confirm_password: joi.string().valid(joi.ref('password')).required().strict(),

    }
    return joi.validate(reqbody, schema)
}

function customerAuthVal(reqbody) {
    schema = {
        email: joi.string().min(3).max(256).email().required(),
        password: joi.string().min(3).max(256).required()
    }
    return joi.validate(reqbody, schema)
}

exports.Customer = Customer
exports.customerAuthVal = customerAuthVal
exports.customerSchema = customerSchema
exports.customerVal = customerVal