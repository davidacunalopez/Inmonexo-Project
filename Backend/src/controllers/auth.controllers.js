import { pool } from '../db.js'
import {createAccesToken} from '../libs/jwt.js'
import { SECRET_KEY } from '../config.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//Registrar usuario (Se define si es propietario o agente por el rol)
export const registerUser = async (req, res) => {
    //Datos de la petición
    const data = req.body;

    const result = await pool.query('SELECT * FROM Usuarios WHERE correo = $1', [data.email])
    if (result.rows.length != 0){
        return res.status(400).json(['El correo ya esta en uso.'])
    }

    //Falta encriptar la contraseña
    const passwordHash = await bcrypt.hash(data.password, 10);

    const { rows } = await pool.query('INSERT INTO Usuarios (nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *', [data.name, data.email, passwordHash, data.rol])
    res.status(200).json(rows)
}

//Login
export const loginUser = async (req, res) => {
    //Datos de la petición
    const data = req.body;

    try{
        const result = await pool.query('SELECT * FROM Usuarios WHERE correo = $1', [data.email])
        if (result.rows.length == 0){
            return res.status(400).json(['No existe este usuario'])
        } 
    
        //Comparar las contaseñas
        const isMatch = await bcrypt.compare(data.password, result.rows[0].contrasena);
    
        if (!isMatch){
            return res.status(400).json(['Credenciales invalidas'])
        }

        //Falta definir el token de autorización 
        const token = await createAccesToken({userId : result.rows[0].id})
        res.cookie('token', token);
        return res.status(200).json({message : "Login efectuado", token : token, userId : result.rows[0].id})
    } catch(error){
        return res.status(500).json({message : error.message})
    }


} 

export const logout = async (req, res) => {
    
}

export const verifyTokenRoute = async (req, res) => {
    const {token} = req.body
    console.log(token)
    if(!token) return res.status(401).json({message : "No existe token"})

    jwt.verify(token, SECRET_KEY, async (err, user)  => {
        if (err) {
            console.log(err)
            return res.status(401).json({message : "No autorizado"})
        }
        const result = await pool.query("SELECT * FROM Usuarios WHERE id = $1", [user.userId])

        if (result.rows.length == 0){
            return res.status(401).json(["No existe el usuario"])
        }
        return res.json({
            id : result.rows[0].id,
            name : result.rows[0].nombres
        })
    })
}