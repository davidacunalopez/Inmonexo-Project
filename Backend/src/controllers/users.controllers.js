import { pool } from '../db.js'
import bcrypt from 'bcryptjs'

export const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM Usuarios')

    return res.status(200).json(response.rows)
}

export const getInfoUser = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query('SELECT * FROM Usuarios WHERE id = $1', [req.params.id])

    if (response.rows.length == 0){
        return res.status(404).json(["Usuario no encontrado"])
    }

    return res.status(200).json(response.rows[0])
}

export const putUser = async (req, res) => {

    const data = req.body;

    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query('SELECT * FROM Usuarios WHERE id = $1', [req.params.id])

    if (response.rows.length == 0){
        return res.status(404).json(["Usuario no encontrado"])
    }

    const hash = await bcrypt.hash(data.password, 10)
    const result = await pool.query('UPDATE Usuarios SET nombre = $1, correo = $2, contrasena = $3 WHERE id = $4 RETURNING *', [data.name, data.email, hash, req.params.id])

    console.log(result)

    return res.status(200).json({message : "Usuario editado exitosamente"})
}