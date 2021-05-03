const express = require("express"); //libary เอาไว้ทำหลังบ้านโดยใช้nodejs
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mySql = require("mysql");

app.use(cors());

// server listenning
app.listen(7879, function () {
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

//list all blog
app.get("/get/service/blog", (req, res) => {
  connection.query("SELECT * FROM blog", (error, results) => {
    if (error) throw error;
    res.send(results);
    console.log(results);
  });
});

//show title and author
app.get("/get/service/titleauthor", (req, res) => {
  connection.query("SELECT post_title, post_author FROM blog", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//list all blogid
app.get("/get/service/blog/id", (req, res) => {
  connection.query("SELECT * FROM blog WHERE post_status =1 ", (error, results) => {
    if (error) throw error;
    res.send(results);
    console.log(results);
  });
});
