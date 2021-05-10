// === Implementación del CRUD ( POST, GET, PUT, DELETE )
/*
    - crearRestaurante ( POST )
    - obtenerRestauranteByID ( GET )
    - obtenerRestaurantes ( GET ) - obtiene todos los restaurantes de la base de datos
    - actualizarRestauranteByID ( PUT )
    - borrarRestauranteByID ( DELETE )
    - borrarRestaurantes ( DELETE ) - borrar todos los restaurantes de la base de datos

*/
const db = require("../models"); // importamos nuestro objeto de la base de datos 
const Restaurante = db.restaurantes; // asignamos a una variable nuestro modelo
const Op = db.Sequelize.Op;

// === Implementación del CRUD ( POST, GET, PUT, DELETE ) === 
exports.crearRestaurante = (req, res) => {
    // Validar la solicitud 
    if (!req.body.titulo) {
        res.status(400).send({
            mensaje: "El contenido no puede estar vacío!"
        });
        return;
    }

    // Creamos un Restaurante
    const restaurante = {
        nombre: req.body.titulo,
        direccion: req.body.descripcion
    };

    // Guardamos el restaurante en la base de datos 
    Restaurante.create(restaurante).then(data => {
        // console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Ocurrio algun error mientras se creaba el registro del restaurante. Eso es todo lo que sabemos!"
        });
    });
};

exports.obtenerRestauranteByID = (req, res) => {
    const id = req.params.id;
    Restaurante.findByPk(id).then(data => {
        // console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            mensaje: "Ocurrio un error al obtener el restaurante con el id = " + id
        });
    });
};

exports.obtenerRestaurantes = (req, res) => {
    Restaurante.findAll().then(data => {
        // console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Ocurrio un error mientras se trata de obtener los restaurantes. Eso es todo lo que sabemos!"
        });
    });
};

exports.actualizarRestauranteByID = (req, res) => {
    const id = req.params.id;
    Restaurante.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                mensaje: "Restaurante fue actualizado exitosamente."
            });
        } else {
            res.send({
                mensaje: `No se pudo actualizar el restaurante con id=${id}. Quizas no exista.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            mensaje: "Ocurrio un error mientras se trata de actualizar el restaurante con id = " + id
        });
    });
};

exports.borrarRestauranteByID = (req, res) => {
    const id = req.params.id;

    Restaurante.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                mensaje: "Restaurante fue borrado exitosamente!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            mensaje: "No pudo ser borrado el restaurante con id = " + id
        });
    });
};

exports.borrarRestaurantes = (req, res) => {
    Restaurante.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ mensaje: `${nums} Restaurantes fueron borrados exitosamente!` });
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Algun error ocurrio mientras fueron removidos los restaurantes. Es todo lo que sabemos!"
        });
    });
};