const db = require("../models");
const Reserva = db.reservas;
const Op = db.Sequelize.Op;



// === Implementación del CRUD ( POST, GET, PUT, DELETE ) ===
exports.crearReserva = (req, res) => {
    const reserva = { // Lo que viene como JSON en la solicitud del postman 
        fecha: req.body.fecha,
        cantidadSolicitada: req.body.cantidadSolicitada,
        fk_restauranteid: req.body.fk_restauranteid,
        fk_mesaid: req.body.fk_mesaid,
        fk_clienteid: req.body.fk_clienteid,
        fk_rangoid: req.body.fk_rangoid
    };
    // Función que guarda la mesa en la base de datos 
    Reserva.create(reserva).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Ocurrio algun error mientras se crea la reserva."
        });
    });
};


/* exports.reservas = (req, res) => {
    Reserva.findAll({
        where: {
            fk_restauranteid: req.body.id_restaurante,
            fecha: req.body.fecha
        },
        include: ["reservas_mesas"]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Ocurrio un error mientras se trata de obtener todas las mesas."
        });
    });
}; */