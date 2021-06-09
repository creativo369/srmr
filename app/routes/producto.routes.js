module.exports = (app) => {
  const Productos = require("../controllers/productoDAO.controller.js");
  var router = require("express").Router();

  // Creamos un nuevo producto
  router.post("/", Productos.crearProducto);

  // Obtener un solo producto by id
  router.get("/:id", Productos.obtenerProductoByID);

  // Obtener todos los productos
  router.get("/", Productos.obtenerProductos);

  // Actualizar un producto by id
  router.put("/:id", Productos.actualizarProductoByID);

  // Borrar un producto by id
  router.delete("/:id", Productos.borrarProductoByID);

  // Borrar todos los productos
  router.delete("/", Productos.borrarProductos);

  app.use("/productos", router);
};
