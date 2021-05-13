module.exports = app => {
    const rangos = require("../controllers/rangoDAO.controller.js");
    var router = require("express").Router();

    router.post("/", rangos.crearRango);

    router.get("/:id", rangos.obtenerRangoByID);

    router.get("/", rangos.obtenerRangos);

    router.delete("/:id", rangos.borrarRangoByID);

    router.delete("/", rangos.borrarRangos);

    app.use("/rangos", router);
};