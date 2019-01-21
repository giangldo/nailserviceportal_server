const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    days: {
        type: Array
    },
    open: {
        type: String
    },
    close: {
        type: String
    },
    nail: {
        type: Schema.Types.ObjectId,
        ref: 'Nail'
    }
});

module.exports.Schedule = mongoose.model('Schedule', scheduleSchema);