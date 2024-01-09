import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authRouter } from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import "dotenv/config.js";

// MONGODB CONNECTION
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log(`Connected to MongoDB`))
    .catch(err => console.error(err))

const app = express();

app.use(cors({
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Routes
app.use('/auth', authRouter)

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));