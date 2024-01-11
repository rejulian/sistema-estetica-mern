import { AppointmentModel } from "../model/appointmentModel.js"

export const getAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find({})
        if (!appointments) {
            return res.status(404).json({ message: 'No se encontraron turnos' });
        }
        return res.json(appointments)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await AppointmentModel.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'No se encontro el turno' });
        }
        return res.json(appointment)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createAppointment = async (req, res) => {
    try {
        const { date, time, client, treatment } = req.body;
        if (!date || !time || !client || !treatment) {
            res.status(400).json({ message: 'Complete todos los campos' })
        }
        const appointment = await AppointmentModel.create({ date, time, client, treatment })
        return res.json(appointment)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, time, client, treatment } = req.body;
        if (!date || !time || !client || !treatment) {
            res.status(400).json({ message: 'Complete todos los campos' })
        }
        const appointment = await AppointmentModel.findByIdAndUpdate(id, { date, time, client, treatment })
        if (!appointment) {
            return res.status(404).json({ message: 'No se encontro el turno' })
        }
        return res.json({ message: 'Turno actualizado' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await AppointmentModel.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: 'No se encontro el turno' });
        }
        return res.json({ message: 'Turno eliminado' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}