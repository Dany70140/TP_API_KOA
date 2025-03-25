const mysql = require('mysql2') // Importez mysql2

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_cinematic',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise() // Conversion en promesse

module.exports = pool