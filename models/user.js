const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Joi = require('joi')
    // const PassWordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String },
    role: {
        type: Array,
        default: [{ frontDesk: false }, { itDept: false }, { superUser: true }]
    },
    password: { type: String }
})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin, role: this.role }, config.get('mcPrivateKey'))

}


const Users = mongoose.model('Users', userSchema)

function Validate(reqbody) {
    const schema = {
        name: Joi.string().min(5).max(250),
        email: Joi.string().min(5).max(250).email(),
        isAdmin: Joi.boolean(),
        phone: Joi.string(),
        role: Joi.array(),
        password: Joi.string().min(5).max(250).required().strict(),
        confirm_password: Joi.string().valid(Joi.ref('password')).required().strict()

    }
    return Joi.validate(reqbody, schema)
}



exports.Validate = Validate
exports.Users = Users