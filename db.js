import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',        // altere se necessário
  password: '1234',    // altere conforme sua senha
  database: 'dblivraria',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;
