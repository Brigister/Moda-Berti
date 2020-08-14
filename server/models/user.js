const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
    },
    cart: {
        type: Schema.Types.ObjectId, ref: 'Cart'
    },
    addresses: [{
        type: Schema.Types.ObjectId, ref: 'Address'
    }],
    isAdmin: {
        type: Boolean,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('User', userSchema);