const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    nail: {
        type: Schema.Types.ObjectId,
        ref: 'Nail'
    }
});

module.exports.Customer = mongoose.model('Customer', customerSchema);