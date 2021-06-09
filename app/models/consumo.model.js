module.exports = (sequelize, Sequelize) => {
  const Consumo = sequelize.define("Consumo", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    estado: {
      type: Sequelize.STRING,
    },
    total: {
      type: Sequelize.BIGINT,
    },
    fecha_creación: {
      type: Sequelize.DATEONLY,
    },
    fecha_cierre: {
      type: Sequelize.DATEONLY,
    },
    horaInicio: {
      type: Sequelize.BIGINT,
    },
    horaFin: {
      type: Sequelize.BIGINT,
    },
  });
  return Consumo;
};
