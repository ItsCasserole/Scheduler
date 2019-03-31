const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "scheduler"
});


db.connect((err) => {
    if(err){
        throw err
    }
    console.log("MySQL connected...")
})


const app = express();


app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post table created...');
    });
});


app.listen('3000', () => {
    console.log('Server started on port 3000');
})
