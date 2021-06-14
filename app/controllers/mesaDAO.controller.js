// === Implementación del CRUD ( POST, GET, PUT, DELETE )
/*
    - crearMesa ( POST )
    - obtenerMesaByID ( GET )
    - obtenerMesas ( GET ) - obtiene todos las mesas de la base de datos
    - actualizarMesaByID ( PUT )
    - borrarMesaByID ( DELETE )
    - borrarMesas ( DELETE ) - borrar todos las mesas de la base de datos

*/

const db = require("../models"); // importamos nuestro objeto de la base de datos
const Mesa = db.mesas; // asignamos a una variable nuestro modelo
const Op = db.Sequelize.Op;
const Consumo = db.consumos;
const DetalleConsumo = db.detalleConsumo;

// === Implementación del CRUD ( POST, GET, PUT, DELETE ) ===
exports.crearMesa = (req, res) => {
  const mesa = {
    // Lo que viene como JSON en la solicitud del postman
    nombre: req.body.nombre,
    posicionX: req.body.posicionX,
    posicionY: req.body.posicionY,
    planta: req.body.planta,
    capacidad: req.body.capacidad,
    fk_restauranteid: req.body.fk_restauranteid,
  };
  // Función que guarda la mesa en la base de datos
  Mesa.create(mesa)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: err.mensaje || "Ocurrio algun error mientras se crea la mesa.",
      });
    });
};

exports.obtenerMesaByID = (req, res) => {
  const id = req.params.id;
  Mesa.findByPk(id, { include: ["mesas_reservas"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Error al obtener una mesa con el id=" + id,
      });
    });
};

exports.obtenerMesas = (req, res) => {
  Mesa.findAll({ include: ["mesas_reservas"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Ocurrio un error mientras se trata de obtener todas las mesas.",
      });
    });
};

exports.actualizarMesaByID = (req, res) => {
  const id = req.params.id;
  Mesa.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mensaje: "Mesa fue actualizado exitosamente.",
        });
      } else {
        res.send({
          mensaje: `No se pudo actualizar la mesa con id=${id}. Quizas no exista.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Error, no se pudo actualizar la mesa con id=" + id,
      });
    });
};

exports.borrarMesaByID = (req, res) => {
  const id = req.params.id;

  Mesa.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mensaje: "La mesa fue borrado exitosamente!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "No pudo ser borrado la mesa con id=" + id,
      });
    });
};

exports.borrarMesas = (req, res) => {
  Mesa.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ mensaje: `${nums} Mesas fueron borrados exitosamente!` });
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Algun error ocurrio mientras fueron removidos las mesas.",
      });
    });
};

exports.obtenerMesasRestaurante = (req, res) => {
  Mesa.findAll({
    where: {
      fk_restauranteid: req.params.id,
    },
  })
    .then((mesas) => {
      // console.log(mesas);
      /* const promises = [];
      mesas.map((mesa, key) => {
        // console.log(mesa.dataValues);
        promises.push(getMesasConsumo(mesa.dataValues));
      }); */
      res.send(mesas);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Algun error ocurrio al obtener las mesas del restaurante.",
      });
    });
};

/* const getMesasConsumo = async (mesa) => {
  return new Promise((resolve) => {
    let consumo = {};
    let detalle = {};
    let mesaConsumoDetalle = {};

    Consumo.findOne({
      where: {
        fk_mesaid: mesa.id,
      },
    }).then((consumo) => console.log(consumo));
  });
};
 */
