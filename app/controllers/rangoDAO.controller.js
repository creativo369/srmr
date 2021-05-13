// === Implementación del CRUD ( POST, GET, PUT, DELETE )
/*
    - crearRango( POST )
    - obtenerRangoByID ( GET )
    - obtenerRangos ( GET ) - obtiene todos los rangos de la base de datos
    - actualizarRangoByID ( PUT )
    - borrarRangoByID ( DELETE )
    - borrarRangos ( DELETE ) - borrar todos los rangos de la base de datos

*/
const db = require("../models"); // importamos nuestro objeto de la base de datos 
const Rango = db.rangos; // asignamos a una variable nuestro modelo
const Op = db.Sequelize.Op;

// === Implementación del CRUD ( POST, GET, PUT, DELETE ) === 
exports.crearRango = (req, res) => {
    // Validar la solicitud 
    if (!req.body.rango) {
        res.status(400).send({
            mensaje: "El contenido no puede estar vacío!"
        });
        return;
    }

    // Creamos un Restaurante
    const rango = {
        rango: req.body.rango
    };

    // Guardamos el restaurante en la base de datos 
    Rango.create(rango).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Ocurrio algun error mientras se creaba el registro de rango. Eso es todo lo que sabemos!"
        });
    });
};

exports.obtenerRangoByID = (req, res) => {
    const id = req.params.id;
    Rango.findByPk(id, { include: ["rangos_reservas"] }).then(data => {
        // console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            mensaje: "Ocurrio un error al obtener el rango con el id = " + id
        });
    });
};

exports.obtenerRangos = (req, res) => {
    Rango.findAll({ include: ["rangos_reservas"] }).then(data => {
        // console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Ocurrio un error mientras se trata de obtener los rangos. Eso es todo lo que sabemos!"
        });
    });
};

exports.borrarRangoByID = (req, res) => {
    const id = req.params.id;

    Rango.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                mensaje: "Rango fue borrado exitosamente!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            mensaje: "No pudo ser borrado el rango con id = " + id
        });
    });
};

exports.borrarRangos = (req, res) => {
    Rango.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ mensaje: `${nums} Rangos fueron borrados exitosamente!` });
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Algun error ocurrio mientras fueron removidos los rangos. Es todo lo que sabemos!"
        });
    });
};