// === Implementación del CRUD ( POST, GET, PUT, DELETE )
/*
    - crearProducto ( POST )
    - obtenerProductoByID ( GET )
    - obtenerProductos ( GET ) - obtiene todos los productos de la base de datos
    - actualizarProductoByID ( PUT )
    - borrarProductoByID ( DELETE )
    - borrarProductos ( DELETE ) - borrar todos los productos de la base de datos

*/

const db = require("../models"); // importamos nuestro objeto de la base de datos
const Producto = db.productos; // asignamos a una variable nuestro modelo
const Op = db.Sequelize.Op; // Operación de consulta en la base de datos

// === Implementación del CRUD ( POST, GET, PUT, DELETE ) ===
exports.crearProducto = (req, res) => {
  const Producto = {
    // Lo que viene como JSON en la solicitud del postman
    nombre: req.body.nombre,
    fk_categoriaid: req.body.categoria,
    precio: req.body.precio,
  };
  // Función que guarda la mesa en la base de datos
  Producto.create(Producto)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje || "Ocurrio algun error mientras se crea un producto.",
      });
    });
};

exports.obtenerProductoByID = (req, res) => {
  const id = req.params.id;
  Producto.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Error al obtener el producto con el id=" + id,
      });
    });
};

exports.obtenerProductos = (req, res) => {
  Producto.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Ocurrio un error mientras se trata de obtener todos los productos.",
      });
    });
};

exports.actualizarProductoByID = (req, res) => {
  const id = req.params.id;
  Producto.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mensaje: "Producto fue actualizado exitosamente.",
        });
      } else {
        res.send({
          mensaje: `No se pudo actualizar el producto con id=${id}. Quizas no exista.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Error, no se pudo actualizar el producto con id=" + id,
      });
    });
};

exports.borrarProductoByID = (req, res) => {
  const id = req.params.id;

  Producto.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mensaje: "El producto fue borrado exitosamente!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "No pudo ser borrado el producto con id=" + id,
      });
    });
};

exports.borrarProductos = (req, res) => {
  Producto.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        mensaje: `${nums} productos fueron borrados exitosamente!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Algun error ocurrio mientras fueron removidos los productos.",
      });
    });
};
