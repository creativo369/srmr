const db = require("../models"); // importamos nuestro objeto de la base de datos
const Consumo = db.consumos; // asignamos a una variable nuestro modelo
const DetalleConsumo = db.detalleConsumo; // asignamos a una variable nuestro modelo
const Op = db.Sequelize.Op; // Operación de consulta en la base de datos

exports.crearConsumo = (consumo) => {
  Consumo.create(consumo)
    .then((data) => {
      // console.log(data);
      res.status(200).send(data);
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
  const id_mesa = req.query.idm; // id de la mesa
  const id_cliente = req.query.idc;
  const datos_consumo = {};
  Consumo.findOne({
    where: {
      estado: "abierto",
      fk_mesaid: id_mesa,
      fk_clienteid: id_cliente,
    },
  })
    .then((data) => {
      // console.log(data);
      getCliente(data.fk_clienteid).then((cliente) => {
        datos_consumo = {
          estado: data.estado,
          total: data.total,
          fecha_creacion: data.fecha_creacion,
          fecha_cierre: data.fecha_cierre,
          hora_inicio: data.hora_inicio,
          hora_cierre: data.hora_cierre,
          fk_mesid: data.fk_mesid,
          fk_clienteid: cliente,
        };
        res.send(datos_consumo);
      });
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          "Ocurrio un error al obtener el consumo de la mesa con el id = " + id,
      });
    });
};

actualizarConsumoByID = (id_consumo) => {
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
  const detalleCon = {
    cantidad: req.body.cantidad, // tambien seteamos por front-end
    fk_consumoid: req.body.consumoid, // aqui agregamos el id del consumo y id del producto que recibimos por frontend
    fk_productoid: req.body.productoid,
  };
  DetalleConsumo.create(detalleCon)
    .then((data) => {
      // console.log(data);
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send({
        mensaje:
          err.mensaje ||
          "Ocurrio algun error mientras se creaba el detalle de un consumo. Eso es todo lo que sabemos!",
      });
    });
};

exports.actualizarConsumoByID = (req, res) => {
  const id = req.params.id;
  Consumo.update(
    { fk_clienteid: req.body.fk_clienteid },
    {
      // solo recibimos para cambiar el cliente
      where: { id: id }, // id del consumo
    }
  )
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

const getCliente = async (id_cliente) => {
  return new Promise((resolve) => {
    let cliente = {};
    Cliente.findOne({
      where: {
        id: id_cliente,
      },
    })
      .then((c) => {
        cliente = c.dataValues;
      })
      .then(() => {
        // console.log(r);
        resolve(cliente);
      });
  });
};

const getTotal = async (id_consumo) => {
  return new Promise((resolve) => {
    let total_consumo;
    Cliente.findOne({
      where: {
        id: id_cliente,
      },
    })
      .then((c) => {
        cliente = c.dataValues;
      })
      .then(() => {
        // console.log(r);
        resolve(cliente);
      });
  });
};
