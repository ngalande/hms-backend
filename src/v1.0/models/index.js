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
db.roomtype = require("./rooms/roomType")(sequelize, Sequelize);
db.roomreservation = require("./rooms/roomReservation")(sequelize, Sequelize);
db.BarStockItem = require("./bar/barItemstock")(sequelize, Sequelize);
db.BarItemSale = require("./bar/baritemsale")(sequelize, Sequelize);
db.RestaurantSale = require("./restaurant/restaurantitemsale")
db.RestaurantStockItem = require("./restaurant/restaurantitemstock")(sequelize, Sequelize);
module.exports = db;
