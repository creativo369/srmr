module.exports = (sequelize, Sequelize) => {
  const Consumo = sequelize.define("Consumo", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    estado: {
      type: Sequelize.STRING,
      defaultValue: "abierto",
    },
    total: {
      type: Sequelize.BIGINT,
    },
    fecha_creacion: {
      type: Sequelize.DATEONLY,
    },
    fecha_cierre: {
      type: Sequelize.DATEONLY,
    },
    hora_creacion: {
      type: Sequelize.STRING,
    },
    hora_cierre: {
      type: Sequelize.STRING,
    },
  });
  return Consumo;
};
