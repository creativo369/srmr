// Definimos nuestro modelo mensa como tabla en la base de datos
module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define("Producto", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    precio: {
      type: Sequelize.BIGINT,
    },
  });
  return Producto;
};
