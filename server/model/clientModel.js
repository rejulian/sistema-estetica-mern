import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    phone: {
        type:Number,
        required: true
    },
    dni: {
        type:Number,
        required: true,
        unique: true
    },
    notes: {
        type:String,
        required: false
    }
})

export const ClientModel = mongoose.model('Client', clientSchema)