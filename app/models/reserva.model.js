// Definimos nuestro modelo mensa como tabla en la base de datos 
module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define("Reserva", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DATEONLY,
        },
        cantidadSolicitada: { // Capacidad de la mesa o cantidad de comensales.
            type: Sequelize.BIGINT
        },
        horaInicio:{
            type: Sequelize.BIGINT
        },
        
        horaFin:{
            type: Sequelize.BIGINT
        }
    });
    return Reserva;
};