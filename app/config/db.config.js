// Configuración de base de datos PostgreSQL 
// Los 5 primeros parametros son para la conección con PostgreSQL 

module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgres", // En mi caso es admin la contraseña de mi usuario postgres
    PORT: 5432,
    DB: "srmr", // base de datos de sistema de reservas de mesas de restarurantes 
    dialect: "postgres",
    // pool es opcional, se utilizará para la configuración del grupo de conexiones Sequelize: 
    pool: {
        max: 5, // número máximo de conexiones en la pool
        min: 0, // número mínimo de conexiones en la pool  
        acquire: 30000, // tiempo máximo, en milisegundos, ese grupo intentará conectarse antes de lanzar el error  
        idle: 10000 // tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada
    }
};