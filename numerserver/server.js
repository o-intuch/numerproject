const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mySql = require("mysql");

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server listenning
app.listen(7879, function() {
  console.log("server start is port: 7879");
});

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "reactdb",
  multipleStatements: true,
});

//connect to database
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB Connected");
  }
});

//list customers
app.get("/get/service/numerlist", (req, res) => {
  connection.query("SELECT * FROM numer", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//post customers
app.post("/post/service/inputnumer", (req, res) => {
  const numerdata = req.body.numerdata;
  let command = "INSERT INTO numer SET ?";
  connection.query(command, numerdata, (error, results) => {
    if (!error) {
      console.log(numerdata);
      res.send(numerdata);
    } else {
      console.log(error);
      throw error;
    }
  });
});

//post numer
app.post("/post/service/inputnumer2", (req, res) => {
  const Eq = req.body.Eq;
  const XL = req.body.XL;
  const XR = req.body.XR;
  const email = req.body.email;

  let command = "INSERT INTO numer SET ?";
  connection.query(command, Eq, XL, XR, email, (error, results) => {
    if (!error) {
      console.log(results);
      res.send(results);
    } else {
      console.log(error);
      throw error;
    }
  });
});

//list customers last
app.get("/get/service/numerlast", (req, res) => { //ดึงข้อมูลตัวล่าสุดที่เรากรอกลงไป
  connection.query(
    "SELECT * FROM numer ORDER BY idbisection DESC LIMIT 1",
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});
