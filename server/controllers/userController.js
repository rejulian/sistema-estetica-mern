import { comparePassword, hashPassword } from '../helpers/authHelpers.js';
import { UserModel } from '../model/userModel.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.json({ message: 'Debes completas todos los campos' })
        }
        const exist = await UserModel.findOne({ email })
        if (exist) {
            return res.json({ message: 'Ya existe una cuenta con ese email' })
        }
        const hashedPassword = await hashPassword(password)

        const user = await UserModel.create({ username, email, password: hashedPassword })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({ message: 'Credenciales invalidas' })
        }
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, {}, (error, token) => {
                if (error) throw error;
                res.cookie('token', token).json(user)
            })
        } else {
            return res.json({ message: 'Credenciales invalidas' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.json({ message: 'Cerro sesion' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}