import { pool } from '../db.js'

export const getProperties = async (req, res) => {
    const response = await pool.query('SELECT * FROM Propiedades')

    return res.status(200).json(response.rows)
}

export const getUserProperties = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const existUser = await pool.query('SELECT * FROM Usuarios WHERE id = $1', [req.params.id])

    if(existUser.rows.length == 0){
        return res.status(404).json(["No existe el usuario"])
    }

    const response = await pool.query('SELECT * FROM Propiedades WHERE usuarioId = $1', [req.params.id])

    return res.status(200).json(response.rows)
}

export const addPropertie = async (req, res) => {
    const data = req.body;

    const response = await pool.query('SELECT * FROM Usuarios WHERE id = $1', [data.usuarioid])

    if (response.rows.length == 0){
        return res.status(400).json(["Usuario no encontrado"])
    }

    const {rows} = await pool.query('INSERT INTO Propiedades (nombre, direccion, tipo, precio, estado, descripcion, capacidad, usuarioId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [data.name, data.address, data.type, data.price, data.status, data.description, data.capacity, data.usuarioid])

    return res.status(200).json(rows)
}

export const editPropertie = async (req, res) => {
    const data = req.body;

    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const result = await pool.query('UPDATE Propiedades SET nombre = $1, direccion = $2, tipo = $3, precio = $4, estado = $5, descripcion = $6, capacidad = $7 WHERE id = $8 RETURNING *', [data.name, data.address, data.type, data.price, data.status, data.description, data.capacity, req.params.id]);//Falta ver como vamos a validar los otros

    return res.status(200).json(result.rows)
}

export const getPropertiesName = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const existUser = await pool.query('SELECT * FROM Usuarios WHERE id = $1', [req.params.id])

    if(existUser.rows.length == 0){
        return res.status(404).json(["No existe el usuario"])
    }

    const response = await pool.query('SELECT id, nombre FROM Propiedades WHERE usuarioId = $1', [req.params.id])
    return res.status(200).json(response.rows)
}

export const getPropertieInfo = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const existPropertie = await pool.query('SELECT * FROM Propiedades WHERE id = $1',  [req.params.id])

    if(existPropertie.rows.length == 0){
        return res.status(404).json(["No existe la propiedad"])
    }    

    return res.status(200).json(existPropertie.rows)
}

export const deletePropertie = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query('SELECT * FROM Propiedades WHERE id = $1', [req.params.id]);

    if (response.rows.length == 0){
        return res.status(404).json(["Propiedad no encontrado"])
    }

    //Aqui vamos a eliminar primero los pagos
    const propertiePays = await pool.query('SELECT id FROM Pagos WHERE Pagos.propiedadId = $1', [response.rows[0].id])

    //Recorro todos los pagos para eliminarlos y despues eliminar la propiedad
    for (let i = 0; i < propertiePays.rows.length; i++) {
        const deletePay = await pool.query('DELETE FROM Pagos WHERE id = $1', [propertiePays.rows[i].id])
    }

    try {
        const result = await pool.query('DELETE FROM Propiedades WHERE id = $1', [req.params.id]);
        return res.status(200).json(["Propiedad eliminada de forma exitosa."])
    } catch (err) {
        return res.status(404).json([err.message])
    } 
    
}

export const getPropertieRed = async (req, res) => {
    const response = await pool.query('SELECT * FROM Propiedades WHERE inRed = 1');

    return res.status(200).json(response.rows);
}

export const editRed = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const data = req.body;
    const response = await pool.query('SELECT * FROM Propiedades WHERE id = $1', [req.params.id]);

    if (response.rows.length == 0){
        return res.status(404).json(["Propiedad no encontrado"])
    }

    const result = await pool.query('UPDATE Propiedades SET inred = $1 WHERE id = $2 RETURNING *', [data.red, req.params.id])

    return res.status(200).json(result.rows)
}

export const editAgent = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const data = req.body;
    const response = await pool.query('SELECT * FROM Propiedades WHERE id = $1', [req.params.id]);

    if (response.rows.length == 0){
        return res.status(404).json(["Propiedad no encontrado"])
    }

    const result = await pool.query('UPDATE Propiedades SET getAgent = $1 WHERE id = $2 RETURNING *', [data.agent, req.params.id])

    return res.status(200).json(result.rows)
}

export const propertiesAlquiler = async (req, res) => {

    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query("SELECT * FROM Propiedades WHERE tipo = 'alquiler' and usuarioid = $1", [req.params.id]);

    return res.status(200).json(response.rows)
}

export const propertiesCompra = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query("SELECT * FROM Propiedades WHERE tipo = 'venta' and usuarioid = $1", [req.params.id]);

    return res.status(200).json(response.rows)
}