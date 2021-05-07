const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// app.use(...);
const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop  re-sync db.");
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
    res.json({ message: "Hola Mundo!." });
});


/* Aqui Agregamos las rutas del proyecto */
// require("./app/routes/post.routes.js")(app);
// require("./app/routes/comentario.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`El servidor esta siendo ejecutado en el puerto ${PORT}.`);
});