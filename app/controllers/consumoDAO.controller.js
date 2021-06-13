const db = require("../models"); // importamos nuestro objeto de la base de datos
const Op = db.Sequelize.Op;
const Consumo = db.consumos;

exports.crearConsumo = (req, res) => {
  console.log(req.body);
  let consumo = {
    estado: req.body.estado,
  };

  Consumo.create(consumo)
    .then(ans => res.send(ans))
    .catch(err => res.status(500).send());
};
