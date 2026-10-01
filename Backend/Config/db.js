const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',       // Di Laragon biasanya kosong
  database: 'db_desa',
  port: 3308          // <-- INI YANG PENTING (sesuai Laragon Anda)
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Berhasil terhubung ke database MySQL!');
});

module.exports = db;