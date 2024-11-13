import { pool } from '../db.js'

export const getClients = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const result = await pool.query('SELECT * FROM Usuarios WHERE id = $1', [req.params.id]);
    if(result.rows.length == 0) {
        return res.status(404).json(["Usuario no encontrado"])
    }

    const response = await pool.query('SELECT Clientes.id, Clientes.nombre, correo, origen, Clientes.tipo, Clientes.descripcion, Propiedades.nombre NombrePropiedad FROM Clientes LEFT JOIN Propiedades ON Clientes.propiedadid = Propiedades.id WHERE Clientes.usuarioid = $1;', [req.params.id])

    response.rows.forEach(function(cliente) {
        //const namePropiedad = await pool.query('SELECT nombre from Propiedades WHERE id = $1', [cliente.propiedadid])
        //cliente.propiedadid =  namePropiedad.rows[0].nombre;
        if(cliente.tipo == 0){
            cliente.tipo = "Propietario"
        } else{
            cliente.tipo = "Agente inmobilario"
        }
    });
    console.log(response.rows)
    return res.status(200).json(response.rows)
}

export const postClient = async (req, res) => {
    const data = req.body;

    const response = await pool.query('SELECT * FROM Usuarios WHERE id = $1', [data.usuarioid])

    if (response.rows.length == 0){
        return res.status(400).json(["Usuario no encontrado"])
    }

    const result = await pool.query('SELECT * FROM Clientes WHERE propiedadId = $1 and usuarioId = $2', [data.propiedadId, data.usuarioid]);
    if (result.rows.length != 0) {
        return res.status(404).json(['El cliente ya existe.'])
    }

    const { rows } = await pool.query('INSERT INTO Clientes (nombre, correo, origen, tipo, usuarioId, propiedadId, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [data.name, data.email, data.origin, data.type, data.usuarioid, data.propertyId, data.details])
    return res.status(200).json(rows)
}

export const putClient = async (req, res) => {
    const data = req.body;

    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query('SELECT * FROM Clientes WHERE id = $1', [req.params.id])

    if (response.rows.length == 0){
        return res.status(404).json(["Usuario no encontrado"])
    }

    const result = await pool.query('UPDATE Clientes SET nombre = $1, correo = $2, origen = $3, tipo = $4, descripcion = $5 WHERE id = $6 RETURNING *', [data.name, data.email, data.origin, data.type, data.details, req.params.id]);//Falta ver como vamos a validar los otros

    return res.status(200).json(result.rows);
}

export const deleteClient = async (req, res) => {

    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query('SELECT * FROM Clientes WHERE id = $1', [req.params.id])

    if (response.rows.length == 0){
        return res.status(404).json(["Usuario no encontrado"])
    }

    const result = await pool.query('DELETE FROM Clientes WHERE id = $1', [req.params.id]);
    console.log(result)
    return res.status(200).json(['Cliente eliminado de forma exitosa'])
}

export const getInfoClient = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query('SELECT * FROM Clientes WHERE id = $1', [req.params.id])

    if (response.rows.length == 0){
        return res.status(404).json(["Usuario no encontrado"])
    }

    return res.status(200).json(response.rows);
}

export const getClientPropertie = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query('SELECT * FROM Clientes WHERE propiedadid = $1', [req.params.id])

    return res.status(200).json(response.rows)
}

export const fiveClients = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query('SELECT * FROM Clientes WHERE usuarioid = $1 LIMIT 5', [req.params.id])

    return res.status(200).json(response.rows)
}