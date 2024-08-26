const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Amy189518',
    database: 'test'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();
