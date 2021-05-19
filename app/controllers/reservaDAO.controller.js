const db = require("../models");
const { obtenerClienteByCI } = require("./clienteDAO.controller");
const Reserva = db.reservas;
const Mesa = db.mesas;
const Op = db.Sequelize.Op;
const Cliente = db.clientes;


// === Implementación del CRUD ( POST, GET, PUT, DELETE ) ===
exports.crearReserva = (req, res) => {
     //para obtener el id del cliente
        Cliente.findOne({
            where: {
                cedula: req.body.clienteCI
            }
        }).then(data => {
            if(data){
                console.log(data.id); 
            const reserva = { // Lo que viene como JSON en la solicitud del postman 
                fecha: req.body.fecha,
                cantidadSolicitada: req.body.cantidadSolicitada,
                fk_restauranteid: req.body.fk_restauranteid,
                fk_mesaid: req.body.fk_mesaid,
                fk_clienteid: data.id,
                horaInicio: req.body.hora_inicio,
                horaFin: req.body.hora_fin
            };
                    // Función que guarda la mesa en la base de datos 
            Reserva.create(reserva).then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    mensaje: err.mensaje || "Ocurrio algun error mientras se crea la reserva."
                });
            });
            }else{
                res.status(204).send();
            }
            
        });    
};

exports.mesasDisponibles = (req, res) => {
    const restauranteid = req.query.restaurante;
    const fecha = req.query.fecha;
    const hora_Inicio = req.query.hora_inicio;
    const hora_Fin = req.query.hora_fin;
    
    Reserva.findAll({
        where:{ 
            fk_restauranteid:restauranteid,
            fecha: fecha,
            [Op.or]:[
                { horaInicio: hora_Inicio }, 
                { horaFin:hora_Fin},
                { horaInicio:
                    {
                        [Op.gt]:hora_Inicio,
                        [Op.lt]:hora_Fin
                    }
                },
                { horaFin:
                    {
                        [Op.gt]:hora_Inicio,
                        [Op.lt]:hora_Fin
                    }
                }
            ]
        }
    }).then(data =>  {
        let total_mesas =  Mesa.findAll({
            where:{
                fk_restauranteid:restauranteid
            }
        });
        
        let mesas_disponibles = [];

        total_mesas.then(tm=>{
            tm.forEach(mesa => {
                if (!data.some(reserva => reserva.fk_mesaid == mesa.id)){
                    mesas_disponibles = [...mesas_disponibles, mesa];
                }
            });
            res.send(mesas_disponibles);
        });
    }).catch(err => {
        res.status(500).send({
            mensaje: err.mensaje || "Ocurrio un error mientras se trata de obtener todas las mesas."
        });
    });
};

exports.listaReservas = (req, res) => {
    const restaurante = req.query.restaurante;
    const fecha = req.query.fecha;
    //const cliente = req.query.cliente;

    Reserva.findAll({
        where:{ 
            fk_restauranteid:restaurante,
            fecha:fecha,
            //fk_clienteid: {[Op.or]:cliente}
            },
        order: [
                ['horaInicio', 'ASC'],
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