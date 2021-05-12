// Definimos nuestro modelo mensa como tabla en la base de datos 
module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define("Reserva", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DATE
        },
        hora_inicio: {
            type: Sequelize.BIGINT
        },
        hora_fin: {
            type: Sequelize.BIGINT
        },
        cantidadSolicitada: { // Capacidad de la mesa o cantidad de comensales.
            type: Sequelize.BIGINT
        }
    });
    return Reserva;
};