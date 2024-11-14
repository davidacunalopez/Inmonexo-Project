import pg from 'pg'

export const pool = new pg.Pool({
    user : "postgres",
    host : "localhost",
    password : "12345",
    database : "inmonexodb",
    port : "5432"
})