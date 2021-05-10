const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// app.use(...);
const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop re-sync database.");
});
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type . application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hola Mundo!. Bienvenidos al Sistema de reservas de mesas en restaurantes." });
});

/* === Aqui Agregamos las rutas del proyecto === */
require("./app/routes/restaurantes.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`El servidor esta siendo ejecutado en el puerto ${PORT}.`);
});

// Se ejecuta en : http://127.0.0.1:8080/