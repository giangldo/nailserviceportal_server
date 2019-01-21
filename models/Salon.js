const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId

const salonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    shops: [
        {
            type: ObjectId,
            ref: 'Shop'
        }
    ]
}, { timestamps: { createdAt: 'created', updatedAt: false } });

module.exports.Salon = mongoose.model('Salon', salonSchema);