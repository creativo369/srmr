// === Exportamos el módulo de configuración donde tenemos los parametros de configuración de nuestra base de datos postgreSQL  === 
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize"); // Exportamos del (node_modules) la libreria de sequelize

// === Establecemos las configuraciones de inicialización de nuestro Sequelize y base de datos PostgreSQL === 
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// === Una variable constante para nuestra base de datos === 
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// === Aqui inicializamos los sequelize y establecemos en el Sequelize los modelos, es decir utilizamos y hacemos referencia a las tablas de la base de datos ===  
db.restaurantes = require("./restaurante.model.js")(sequelize, Sequelize);
db.mesas = require("./mesa.model.js")(sequelize, Sequelize);
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.reservas = require("./reserva.model.js")(sequelize, Sequelize);

// === Establecemos las relaciones que existiesen entre las tablas o modelos. ===  

// Esta relación va agregar un atributo a la tabla Mesa llamada fk_restauranteid 
db.restaurantes.hasMany(db.mesas, {
    foreignKey: 'fk_restauranteid',
    sourceKey: 'id',
    as: "mesas"
});

db.restaurantes.hasMany(db.reservas, {
    foreignKey: 'fk_restauranteid',
    sourceKey: 'id',
    as: "reservas"
});

db.mesas.hasMany(db.reservas, {
    foreignKey: 'fk_mesaid',
    sourceKey: 'id',
    as: "mesas_reservas"
});

db.clientes.hasMany(db.reservas, {
    foreignKey: 'fk_clienteid',
    sourceKey: 'id',
    as: "cliente_reservas"
});

// === Exportamos nuestro base de datos con las tablas ya creadas === 
module.exports = db;