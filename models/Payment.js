const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    amount: {
        type: String
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    nail: {
        type: Schema.Types.ObjectId,
        ref: 'Nail'
    }
});

module.exports.Payment = mongoose.model('Payment', paymentSchema);