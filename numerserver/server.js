const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mySql = require("mysql");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "INTUCH API DOCs",
      description: "Numer Project",
      contact: {
        name: "Intuch Chairaksirikul",
      },
      servers: ["http://localhost:7879"],
    },
  },
  apis: ["server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/swaggerserver", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/************************************************************************************************************************************/

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
    console.log("Database Connected");
  }
});

/************************************************************************************************************************************/

//ดึงข้อมูลจาก db ขึ้นมาโชว์บนเว็บ
/**
 * @swagger
 * /get/service/numerlist:
 *  get:
 *    tags: ["GET"]
 *    description: เรียก นิวเมอร์ทั้งหมดในฐานข้อมูล
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/get/service/numerlist", (req, res) => {
  connection.query("SELECT * FROM numer", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

/************************************************************************************************************************************/
//ดึงข้อมูลจากเว็บ ลงในดาต้าเบส
/**
 * @swagger
 * /post/service/inputnumer:
 *  post:
 *    tags: ["POST"]
 *    description: นำข้อมูลที่กรอกหน้าฟอร์มเข้า Database
 *    responses:
 *      '200':
 *        description: A successful response
 */
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

/************************************************************************************************************************************ */

//นำข้อมูลตัวสุดท้ายออกมาโชว์บนเว็บ
/**
 * @swagger
 * /get/service/numerlast:
 *  get:
 *    tags: ["GET"]
 *    description: ดึงข้อมูลตัวล่าสุดที่เรากรอกลงไปมาแสดง
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/get/service/numerlast", (req, res) => {
  connection.query(
    "SELECT * FROM numer ORDER BY idbisection DESC LIMIT 1",
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});
