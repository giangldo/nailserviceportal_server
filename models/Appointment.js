const mongoose = require('mongoose');
const { Schema } = mongoose;
const { format, isToday, isYesterday } = require('date-fns');

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    services: {

    },
    nail: {
        type: Schema.Types.ObjectId,
        ref: 'Nail'
    }
});

appointmentSchema.methods.todayAppointment = function(date) {

}

appointmentSchema.methods.expireAppointment = function(date) {

}

appointmentSchema.statics.loadAppointments = function() {
    // now 
    const todayDate = new Date();

    Appointment.find().then(appointments => {
        
        appointments = appointments.filter(appointment => {
            return appointment.todayAppointment(todayDate);
        });

        //
        if(appointments.length > 0) {
            
        }
    });
}

module.exports.Appointment = mongoose.model('Appointment', appointmentSchema);

// deleteAppointment
// createAppointment
// queryAppointment
