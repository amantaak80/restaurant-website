const mongoose = require('mongoose')
const Schema = mongoose.Schema  // first letter capital becoz , Schema is class /constructor

const userSchema = new Schema({
    name: {
        type: String, required: true,
    },
    email: {
        type: String, required: true,
    },
    address: {
        type: String, required: true,
    },
    city: {
        type: String, required: true,
    },
    password: {
        type: String, required: true,
    },
    role: {
        type: String, default: "customer"
    }
}, { timestamps: true })
module.exports = mongoose.model('User', userSchema)
// module.exports = User