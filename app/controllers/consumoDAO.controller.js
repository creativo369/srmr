const db = require("../models"); // importamos nuestro objeto de la base de datos
const Consumo = db.consumos; // asignamos a una variable nuestro modelo
const DetalleConsumo = db.detalleConsumo; // asignamos a una variable nuestro modelo
const Op = db.Sequelize.Op; // Operación de consulta en la base de datos

exports.crearConsumo = (req, res) => {
  // Validar la solicitud
  if (!req.body.nombre) {
    res.status(400).send({
      mensaje: "El contenido no puede estar vacío!",
    });
    return;
  }

  // Creamos un Restaurante
  const consumo = {
    estado: req.body.estado,
    total: req.body.total,
    fecha_creacion: req.body.creacion,
    fecha_cierre: req.body.cierre,
    horaInicio: req.body.hora_inicio,
    horaFin: req.body.hora_fin,
    fk_mesaid: req.body.mesaid,
    fk_clienteid: req.body.clienteid,
  };

  // Guardamos el restaurante en la base de datos
  Consumo.create(consumo)
    .then((data) => {
      // console.log(data);
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Ocurrio algun error mientras se creaba el consumo de la mesa. Eso es todo lo que sabemos!",
      });
    });
};

exports.obtenerConsumoMesa = (req, res) => {
  const id = req.params.id; // id de la mesa
  Consumo.findOne({
    where: {
      estado: "Abierto",
      fk_mesid: id,
    },
  })
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          "Ocurrio un error al obtener el consumo de la mesa con el id = " + id,
      });
    });
};

exports.actualizarConsumoByID = (req, res) => {
  const id = req.params.id;
  Consumo.update(req.body, {
    // solo recibimos para cambiar el cliente
    where: { id: id }, // id del consumo
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mensaje: "Se cambio el cliente exitosamente.",
        });
      } else {
        res.send({
          mensaje: `No se pudo cambiar el cliente. Quizas no exista.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Ocurrio un error mientras se trata de cambiar de cliente",
      });
    });
};

exports.crearDetalleConsumo = (req, res) => {
  // Validar la solicitud
  if (!req.body.nombre) {
    res.status(400).send({
      mensaje: "El contenido no puede estar vacío!",
    });
    return;
  }

  // Creamos un Restaurante
  const detalleCon = {
    cantidad: req.body.cantidad,
    fk_consumoid: req.body.consumoid, // aqui agregamos el id del consumo que recibimos por frontend
    fk_productoid: req.body.productoid,
  };

  // Guardamos el restaurante en la base de datos
  DetalleConsumo.create(detalleCon)
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

exports.actualizarConsumoByID = (req, res) => {
  const id = req.params.id;
  Consumo.update(req.body, {
    // solo recibimos para cambiar el cliente
    where: { id: id }, // id del consumo
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mensaje: "Se cambio el cliente exitosamente.",
        });
      } else {
        res.send({
          mensaje: `No se pudo cambiar el cliente. Quizas no exista.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Ocurrio un error mientras se trata de cambiar de cliente",
      });
    });
};

const PDFGenerator = require("pdfkit");
const fs = require("fs");

exports.cerrarConsumoByID = (req, res) => {
  const id = req.params.id;
  Consumo.update(req.body, {
    // solo recibimos para cambiar el estado
    where: { id: id }, // id del consumo
  })
    .then((num) => {
      if (num == 1) {
        // Generamos el ticket pdf
        obtenerConsumoMesa();

        let theOutput = new PDFGenerator();
        theOutput.pipe(fs.createWriteStream("ticket.df"));
        // add in a local image and set it to be 250px by 250px
        theOutput.image("../static/img/logo.png", { fit: [250, 250] });

        theOutput.text("Fecha, Cliente, Detalles, Total ");

        theOutput.end();

        res.send(
          theOutput /* {
          mensaje: "Se cerro el consumo exitosamente.",
        } */
        );
      } else {
        res.send({
          mensaje: `No se pudo cerrar el consumo. Quizas no exista.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        mensaje: "Ocurrio un error mientras se trata de cambiar de cliente",
      });
    });
};
