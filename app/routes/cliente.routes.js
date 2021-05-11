module.exports = app => {
    const clientes = require("../controllers/clienteDAO.controller.js");
    var router = require("express").Router();

    // Creamos un nuevo cliente
    router.post("/", clientes.crearCliente);

    // Obtener un solo cliente by id 
    router.get("/:id", clientes.obtenerClienteByID);

    // Obtener todos los clientes
    router.get("/", clientes.obtenerClientes);

    // Actualizar un cliente by id 
    router.put("/:id", clientes.actualizarClienteByID);

    // Borrar un cliente by id 
    router.delete("/:id", clientes.borrarClienteByID);

    // Borrar todos los cliente 
    router.delete("/", clientes.borrarClientes);

    app.use("/clientes", router);
};