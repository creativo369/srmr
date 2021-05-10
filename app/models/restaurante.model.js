// Definimos nuestro modelo Restaurante como tabla en la base de datos 
module.exports = (sequelize, Sequelize) => {
    const Restaurante = sequelize.define("Restaurante", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        }
    });
    return Restaurante;
};