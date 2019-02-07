const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const tokenSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    shop: {
        type: ObjectId,
        ref: 'Shop'
    },
    created: {
        type: Date,
        default: Date.now,
        expires: 43200
    }
});

module.exports.Token = mongoose.model('Token', tokenSchema);