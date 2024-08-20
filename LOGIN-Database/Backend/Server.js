const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");//npm install cors

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "4yen7r6A",
    database: "login_react"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

app.listen(8083, () => {
    console.log("listening on port 8083");
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO registration (`name`, `email`, `password`) values (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        console.log(values);
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    const sql = "SELECT * FROM registration WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    });
});
