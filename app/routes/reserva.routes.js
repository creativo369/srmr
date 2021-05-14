module.exports = app => {
    const reservas = require("../controllers/reservaDAO.controller.js");
    var router = require("express").Router();

    router.post("/", reservas.crearReserva);

    router.get("/", reservas.mesasDisponibles);
    
    app.use("/reservas", router);
};