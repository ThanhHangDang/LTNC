const mysql = require('mysql2');

// Kết nối đến cơ sở dữ liệu
const myDatabase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'caphemanhzu1997',
    database: 'LTNC'
});

module.exports = myDatabase;