module.exports = app => {
    const restaurantes = require("../controllers/restauranteDAO.controller.js");
    var router = require("express").Router();

    // Creamos un nuevo restaurante
    router.post("/", restaurantes.crearRestaurante);

    // Obtener un solo restaurante by id 
    router.get("/:id", restaurantes.obtenerRestauranteByID);

    // Obtener todos los restaurantes
    router.get("/", restaurantes.obtenerRestaurantes);

    // Actualizar un restaurante by id 
    router.put("/:id", restaurantes.actualizarRestauranteByID);

    // Borrar un restaurante by id 
    router.delete("/:id", restaurantes.borrarRestauranteByID);

    // Borrar todos los restaurantes 
    router.delete("/", restaurantes.borrarRestaurantes);

    app.use("/restaurantes", router);
};