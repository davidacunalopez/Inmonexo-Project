import jwt from 'jsonwebtoken'
import {SECRET_KEY} from '../config.js'

export function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            SECRET_KEY,
            {
                expiresIn : '1d'
            },
            (err, token) => {
                if(err) reject
                resolve(token)
            });
    });
}