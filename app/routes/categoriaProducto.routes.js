module.exports = (app) => {
  const CategoriaProductos = require("../controllers/categoriaProductoDAO.controller.js");
  var router = require("express").Router();

  // Creamos un nuevo producto
  router.post("/", CategoriaProductos.crearCategoriaProducto);

  // Obtener un solo producto by id
  router.get("/:id", CategoriaProductos.obtenerCategoriaProductoByID);

  // Obtener todos los productos
  router.get("/", CategoriaProductos.obtenerCategoriaProductos);

  // Actualizar un producto by id
  router.put("/:id", CategoriaProductos.actualizarCategoriaProductoByID);

  // Borrar un producto by id
  router.delete("/:id", CategoriaProductos.borrarCategoriaProductoByID);

  // Borrar todos los productos
  router.delete("/", CategoriaProductos.borrarCategoriaProductos);

  app.use("/categoriaProductos", router);
};
