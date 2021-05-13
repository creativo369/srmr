// Definimos nuestro modelo mensa como tabla en la base de datos 
module.exports = (sequelize, Sequelize) => {
    const Rango = sequelize.define("Rango", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        rango: {
            type: Sequelize.STRING
        },
    });
    return Rango;
};