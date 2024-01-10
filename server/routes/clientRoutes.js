import express from 'express';
import { createClient, deleteClient, getAllClients, getClientById, updateClient } from '../controllers/clientController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


export const clientRouter = express.Router();

clientRouter.use(authMiddleware)

clientRouter.post('/create', createClient)
clientRouter.put('/update/:id', updateClient)
clientRouter.delete('/delete/:id', deleteClient)
clientRouter.get('/', getAllClients)
clientRouter.get('/:id', getClientById)