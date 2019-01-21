const mongoose = require('mongoose');
const { Schema } = mongoose;

const holidaySchema = new Schema({
    date: {
        type: Date
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    name: {
        type: String
    },
    nail: {
        type: Schema.Types.ObjectId,
        ref: 'Nail'
    }
});

module.exports.Holiday = mongoose.model('Holiday', holidaySchema);