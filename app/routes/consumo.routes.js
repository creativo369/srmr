module.exports = (app) => {
  const consumo = require("../controllers/consumoDAO.controller.js");
  var router = require("express").Router();

  router.post("/producto", consumo.crearDetalleConsumo);

  /* // Obtener una sola mesa by id
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
  router.delete("/", mesas.borrarMesas); */

  app.use("/consumo", router);
};
