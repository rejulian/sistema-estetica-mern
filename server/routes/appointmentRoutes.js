import express from 'express';
import { createAppointment, deleteAppointment, getAppointmentById, getAppointments, updateAppointment } from '../controllers/appointmentController';
import { authMiddleware } from '../middleware/authMiddleware.js';

const appointmentRouter = express.Router();

appointmentRouter.use(authMiddleware)

appointmentRouter.get('/', getAppointments)
appointmentRouter.get('/:id', getAppointmentById)
appointmentRouter.post('/create', createAppointment)
appointmentRouter.put('/update/:id', updateAppointment)
appointmentRouter.delete('/delete/:id', deleteAppointment)