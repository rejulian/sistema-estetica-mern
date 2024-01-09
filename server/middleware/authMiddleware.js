import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.json({ message: 'No esta autorizado para esta accion' })
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, (error, user) => {
        if (error) {
            return res.json({ message: 'No esta autorizado para esta accion' })
        }
        req.user = user
        next()
    })
}