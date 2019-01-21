const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports.Service = mongoose.model('Service', serviceSchema);