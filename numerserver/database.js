const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const r = require("./data.json");
const app = express();
const port = 7900;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "INTUCH API2 PackageJson",
      description: "Numer Project",
      contact: {
        name: "Intuch Chairaksirikul",
      },
      servers: ["http://localhost:7900"],
    },
  },
  apis: ["database.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swaggerdata", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
/**
 * @swagger
 * /data:
 *  get:
 *    tags : ["Getpackage.json"]
 *    description: Json ทั้งหมด
 *    responses:
 *      '200':
 *        description: อ่าน Api สำเร็จ
 */
app.get("/data", (req, res) => {
  res.json(r);
});

/**
 * @swagger
 * /data/{name}:
 *  get:
 *    tags : ["Getpackage.json"]
 *    parameters:
 *       - name: name
 *         in: path
 *         required: true
 *    description: Json บางส่วน
 *    responses:
 *      '200':
 *        description: อ่าน Api สำเร็จ
 */
app.get("/data/:name", (req, res) => {
  const resalt = r.filter(function(r) {
    return r.name == req.params.name;
  });
  // console.log(resalt.length);
  if (resalt.length > 0) {
    res.json(resalt[Math.floor(Math.random() * resalt.length)]);
  } else {
    res.json({});
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
