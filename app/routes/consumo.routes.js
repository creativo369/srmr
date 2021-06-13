module.exports = app => {
  var router = require("express").Router();
  const consumo = require("../controllers/consumoDAO.controller.js");

  router.post("/", consumo.crearConsumo);

  app.use("/consumo", router);
};
