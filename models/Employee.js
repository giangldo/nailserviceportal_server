const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const employeeSchema = new Schema({
    work_schedule: {
        type: Array
    },
    work_start: {
        type: String
    },
    work_end: {
        type: String
    },
    appointments: [
        {
            type: ObjectId,
            ref: 'Appointment'
        }
    ],
    salon: {
        type: ObjectId,
        ref: 'Salon'
    },
    shops: [
        {
            type: ObjectId,
            ref: 'Shop'
        }
    ],
    user: {
        type: ObjectId,
        ref: 'User'
    }
});

module.exports.Employee = mongoose.model('Employee', employeeSchema);