// Definimos nuestro modelo mensa como tabla en la base de datos 
module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        cedula: {
            type: Sequelize.BIGINT,
            unique: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        }
    });
    return Cliente;
};