const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sizeSchema = new Schema({
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
    },
    sizes: [sizeSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Size', sizeSchema)
module.exports = mongoose.model('Product', productSchema);