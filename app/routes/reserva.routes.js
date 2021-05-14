module.exports = app => {
    const reservas = require("../controllers/reservaDAO.controller.js");
    var router = require("express").Router();

    router.post("/", reservas.crearReserva);

    router.get("/", reservas.mesasDisponibles);
    
    router.get("/lista", reservas.listaReservas);

    app.use("/reservas", router);
};