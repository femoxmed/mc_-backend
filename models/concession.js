const mongoose = require('mongoose')
const joi = require('joi')


const concessionSchema = new mongoose.Schema({
    name: { type: String },
    amount: { type: Number }
})

const Concession = mongoose.model('concession', concessionSchema)


function concessionVal(reqbodyname) {
    schema = {
        name: joi.string().min(2).max(256),
        amount: joi.number().required()
    }

    return joi.validate(reqbodyname, schema)
}

exports.Concession = Concession
exports.concessionVal = concessionVal
exports.concessionSchema = concessionSchema