const db = require("../models");
const Reserva = db.reservas;
const Mesa = db.mesas;
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


exports.mesasDisponibles = (req, res) => {
    const restauranteid = req.query.restaurante;
    const fecha = req.query.fecha;
    const rangoid = req.query.rango;

    Mesa.findAll({
        where:{ 
            fk_restauranteid:restauranteid,
            '$mesas_reservas.fecha$': { [Op.ne]: fecha },
            '$mesas_reservas.fk_rangoid$': { [Op.ne]: rangoid }
            },
        include:["mesas_reservas"]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Ocurrio un error mientras se trata de obtener todas las mesas."
        });
    });
};


exports.listaReservas = (req, res) => {
    const restaurante = req.query.restaurante;
    const fecha = req.query.fecha;
    const cliente = req.query.cliente;

    Reserva.findAll({
        where:{ 
            fk_restauranteid:restaurante,
            fecha:fecha,
            //fk_clienteid: {[Op.or]:cliente}
            },
        order: [
                ['fk_rangoid', 'ASC'],
                ['fk_mesaid', 'ASC'],
            ]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Ocurrio un error mientras se trata de obtener todas las reservas."
        });
    });
};