module.exports = app => {
    const reservas = require("../controllers/reservaDAO.controller.js");
    var router = require("express").Router();

    router.post("/", reservas.crearReserva);

    app.use("/reservas", router);
};