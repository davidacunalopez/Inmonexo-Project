import {pool} from '../db.js'

export const getPays = async (req, res) => {
    const response = await pool.query('SELECT PA.id, PA.detalles, PA.monto, PA.tipo ,P.nombre FROM Pagos PA JOIN Propiedades P ON PA.propiedadid = P.id');

    return res.status(200).json(response.rows)
}

export const getPaysUser = async (req, res) => {
    const response = await pool.query('SELECT PA.id, PA.detalles, PA.monto, PA.tipo ,P.nombre FROM Pagos PA JOIN Propiedades P ON PA.propiedadid = P.id WHERE PA.usuarioid = $1', [req.params.id]);

    return res.status(200).json(response.rows)
}

export const getPaysPropertie = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query('SELECT * FROM Pagos WHERE propiedadid = $1', [req.params.id]);

    return res.status(200).json(response.rows);
}

export const addPay = async (req, res) => {
    const data = req.body;

    const {rows} = await pool.query('INSERT INTO Pagos (detalles, monto, tipo, propiedadid, usuarioid) VALUES ($1, $2, $3, $4, $5) RETURNING *', [data.detalles, data.monto, data.tipo, data.propiedadid, data.usuarioid])
    return res.status(200).json(rows)
}

export const editPay = async (req, res) => {

}

export const deletePay = async (req, res) => {
    const integerNumberRegex = /^\d+$/;
    const isValid = integerNumberRegex.test(req.params.id)

    if (!isValid){
        return res.status(400).json(["Parametros inválidos"]);
    }

    const response = await pool.query('SELECT * FROM Pagos WHERE id = $1', [req.params.id]);

    if (response.rows.length == 0){
        return res.status(404).json(["Pago no encontrado"])
    }

    const result = await pool.query('DELETE FROM Pagos WHERE id = $1', [req.params.id]);
    console.log(result)
    return res.status(200).json(['Pago eliminado de forma exitosa'])
}
