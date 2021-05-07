// Para inicializar el Sequelize 

const dbConfig = require("../config/db.config.js"); // Exportamos el módulo de configuración donde
// tenemos los parametros de configuración de nuestra base de datos,

const Sequelize = require("sequelize"); // Exportamos del (node_modules) la libreria de sequelize

// Establecemos las configuraciones de inicialización de nuestro Sequelize y base de datos PostgreSQL 
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

const db = {}; // Una variable constante para nuestra base de datos
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Aqui inicializamos los sequelize de cada modelo, es decir utilizamos y hacemos referencia a las tablas de la base de datos 
// db.posts = require("./post.model.js")(sequelize, Sequelize); // Establecemos nuestro modelo en el Sequelize 
// db.comments = require("./comment.model.js")(sequelize, Sequelize);
// db.tags = require("./tag.model.js")(sequelize, Sequelize);

// Establecemos las relaciones  bidireccionales que hay entre Post y Comentario
/* Usamos hasMany() para indicar que un Post tine muchos Comentarios, y belongsTo() para indicar que un Comentario solo 
pertenece a un Post */


// db.posts.hasMany(db.comments, { as: "comentarios" }); // El hasMany() crea un atributo en la tabla de Comment y establece la relacion
// Un post puede tener muchos comentarios es para ir 
// en el sentido Post -> Comentarios ( OneToMany)

// Establecemos la relación bidireccional de comentario a post, porque un comentario solo puede estar en 1 posts o, 
// varios comentarios solo pueden pertenecer a un posts ( ManyToOne )
// Como la cardinalida es 1:N, osea muchos comentarios a un posts, por lo tanto la tabla o modelo Comentario es dueña de 
// la relación por ser N, por lo tanto tiene la clave ajena o foranea que hace referencia Post
/* db.comments.belongsTo(db.posts, {
    foreignKey: "postId",
    as: "post",
});
 */

module.exports = db; // exportamos nuestro base de datos con sequelize y nuestro modelo