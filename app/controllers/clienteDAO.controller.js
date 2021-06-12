// === Implementación del CRUD ( POST, GET, PUT, DELETE )
/*
    - crearCliente ( POST )
    - obtenerClienteByID ( GET )
    - obtenerClientes ( GET ) - obtiene todos los clientes de la base de datos
    - actualizarClienteByID ( PUT )
    - borrarClienteByID ( DELETE )
    - borrarClientes ( DELETE ) - borrar todos los clientes de la base de datos

*/

const db = require("../models"); // importamos nuestro objeto de la base de datos
const Cliente = db.clientes; // asignamos a una variable nuestro modelo
const Op = db.Sequelize.Op;

// === Implementación del CRUD ( POST, GET, PUT, DELETE ) ===
exports.crearCliente = (req, res) => {
  // Validar la solicitud
  if (!req.body.nombre) {
    res.status(400).send({
      mensaje: "El contenido no puede estar vacío!",
    });
    return;
  }

  // Creamos un Restaurante
  const cliente = {
    cedula: req.body.cedula,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
  };

  // Guardamos el restaurante en la base de datos
  Cliente.create(cliente)
    .then((data) => {
      // console.log(data);
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Ocurrio algun error mientras se creaba el registro de un cliente. Eso es todo lo que sabemos!",
      });
    });
};

exports.obtenerClienteByID = (req, res) => {
  const id = req.params.id;
  console.log(req);
  console.log("Hola");
  Cliente.findByPk(id, include["cliente_reservas"])
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Ocurrio un error al obtener el cliente con el id = " + id,
      });
    });
};

exports.obtenerClientes = (req, res) => {
  Cliente.findAll(include["cliente_reservas"])
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Ocurrio un error mientras se trata de obtener los clientes. Eso es todo lo que sabemos!",
      });
    });
};

exports.actualizarClienteByID = (req, res) => {
  const id = req.params.id;
  Cliente.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mensaje: "Cliente fue actualizado exitosamente.",
        });
      } else {
        res.send({
          mensaje: `No se pudo actualizar el cliente con id=${id}. Quizas no exista.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          "Ocurrio un error mientras se trata de actualizar el cliente con id = " +
          id,
      });
    });
};

exports.borrarClienteByID = (req, res) => {
  const id = req.params.id;

  Cliente.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mensaje: "Cliente fue borrado exitosamente!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "No pudo ser borrado el cliente con id = " + id,
      });
    });
};

exports.borrarClientes = (req, res) => {
  Cliente.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ mensaje: `${nums} Clientes fueron borrados exitosamente!` });
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Algun error ocurrio mientras fueron removidos los cliente. Es todo lo que sabemos!",
      });
    });
};
