// Definimos nuestro modelo producto como tabla en la base de datos
module.exports = (sequelize, Sequelize) => {
  const CategoriaProducto = sequelize.define("CategoriaProducto", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
  });
  return CategoriaProducto;
};
