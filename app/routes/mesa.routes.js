module.exports = app => {
  const mesas = require("../controllers/mesaDAO.controller.js");
  var router = require("express").Router();

  // Creamos una nueva mesa
  router.post("/", mesas.crearMesa);

  // Obtener una sola mesa by id
  router.get("/:id", mesas.obtenerMesaByID);

  // Obtener todas las mesas
  router.get("/", mesas.obtenerMesas);

  //Obtener todas las mesas de un restauruante en especifico
  router.get("/restaurante/:id", mesas.obtenerMesasRestaurante);

  // Actualizar una mesa by id
  router.put("/:id", mesas.actualizarMesaByID);

  // Borrar una mesa by id
  router.delete("/:id", mesas.borrarMesaByID);

  // Borrar todas las mesas
  router.delete("/", mesas.borrarMesas);

  app.use("/mesas", router);
};
