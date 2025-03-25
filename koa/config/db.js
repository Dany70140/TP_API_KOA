// config/db.js
require('dotenv').config();
const mysql = require('mysql2'); // Importez mysql2 sans /promise

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_cinematic',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise(); // Conversion en promesse ici

module.exports = pool;