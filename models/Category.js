const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Service'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports.Category = mongoose.model('Category', categorySchema);