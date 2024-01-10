import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const authRouter = express.Router(); 

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', authMiddleware, logoutUser)