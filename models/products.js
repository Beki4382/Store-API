const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'product name must be provided']
    },
    price: {
        type: Number,
        require: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()

    },
    company: {
        type: String,
        enum: {
            values: ['likea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }

    },

})


module.exports = mongoose.model('product', productSchema);