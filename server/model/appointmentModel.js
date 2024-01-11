import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    treatment: {
        type: [String],
        required: true
    }
})

export const AppointmentModel = mongoose.model('Appointment', appointmentSchema)