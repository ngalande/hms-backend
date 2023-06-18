// const db = require("../config/config");
const dbconfig = require("../config/config");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
    host: dbconfig.host,
    dialect: dbconfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
})

const db ={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user")(sequelize, Sequelize);
db.room = require("./rooms/room")(sequelize, Sequelize);
db.roomtype = require("./rooms/roomtype")(sequelize, Sequelize);
db.roomreservation = require("./rooms/roomreservation")(sequelize, Sequelize);
module.exports = db;