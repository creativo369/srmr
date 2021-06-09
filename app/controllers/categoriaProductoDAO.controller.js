// === Implementación del CRUD ( POST, GET, PUT, DELETE )
/*
    - crearCategoriaProducto ( POST )
    - obtenerCategoriaProductoByID ( GET )
    - obtenerCategoriaProductos ( GET ) - obtiene todos los productos de la base de datos
    - actualizarCategoriaProductoByID ( PUT )
    - borrarCategoriaProductoByID ( DELETE )
    - borrarCategoriaProductos ( DELETE ) - borrar todos los productos de la base de datos

*/

const db = require("../models"); // importamos nuestro objeto de la base de datos
const CategoriaProducto = db.categoriaProductos; // asignamos a una variable nuestro modelo
const Op = db.Sequelize.Op; // Operación de consulta en la base de datos

// === Implementación del CRUD ( POST, GET, PUT, DELETE ) ===
exports.crearCategoriaProducto = (req, res) => {
  console.log("ENTRANDOOOOOOOOOOOOOO 2");
  const categoriaProducto = {
    // Lo que viene como JSON en la solicitud del postman
    nombre: req.body.nombre,
  };
  // Función que guarda la mesa en la base de datos
  CategoriaProducto.create(categoriaProducto)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Ocurrio algun error mientras se crea la categoria de un producto.",
      });
    });
};

exports.obtenerCategoriaProductoByID = (req, res) => {
  const id = req.params.id;
  CategoriaProducto.findByPk(id, { include: ["productos"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Error al obtener la categoria de un producto con el id=" + id,
      });
    });
};

exports.obtenerCategoriaProductos = (req, res) => {
  CategoriaProducto.findAll({ include: ["productos"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Ocurrio un error mientras se trata de obtener todas las categorias de los productos.",
      });
    });
};

exports.actualizarCategoriaProductoByID = (req, res) => {
  const id = req.params.id;
  CategoriaProducto.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mensaje:
            "Nombre de la categoria de un producto fue actualizado exitosamente.",
        });
      } else {
        res.send({
          mensaje: `No se pudo actualizar el nombre de la categorai de un producto con id=${id}. Quizas no exista.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          "Error, no se pudo actualizar el nombre de la categoria de un producto con id=" +
          id,
      });
    });
};

exports.borrarCategoriaProductoByID = (req, res) => {
  const id = req.params.id;

  CategoriaProducto.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mensaje: "La categoria del producto fue borrado exitosamente!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "No pudo ser borrado la categoria de producto con id=" + id,
      });
    });
};

exports.borrarCategoriaProductos = (req, res) => {
  CategoriaProducto.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        mensaje: `${nums} categorias de productos fueron borrados exitosamente!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Algun error ocurrio mientras fueron removidos las categorias de productos.",
      });
    });
};
