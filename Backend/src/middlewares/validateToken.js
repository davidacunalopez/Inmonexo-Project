import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    console.log(token);
    if (!token) res.json({message : "Acceso denegado", access : false})

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({message : "Token invalido", access : false})
        req.user = user;
        next();
    })
}