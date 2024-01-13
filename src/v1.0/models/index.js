// const db = require("../config/config");
const dbconfig = require("../config/config");
const Sequelize = require("sequelize");
require('dotenv').config();

const { DATABASE, USERNAME, PASSWORD, HOST, DB_PORT} = process.env;
console.log(PASSWORD)

const sequelize = new Sequelize("postgres://postgres:Gramosi@user@api.gramosi.com/hotel", {
    dialect: dbconfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
  // anything else you want to pass
})
// const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
//     host: dbconfig.host,
//     dialect: dbconfig.dialect,
//     operatorAliases: false,
//     pool: {
//         max: dbconfig.pool.max,
//         min: dbconfig.pool.min,
//         acquire: dbconfig.pool.acquire,
//         idle: dbconfig.pool.idle
//     }
// })

const db ={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user")(sequelize, Sequelize);
db.room = require("./rooms/room")(sequelize, Sequelize);
db.roomtype = require("./rooms/roomtype")(sequelize, Sequelize);
db.roomreservation = require("./rooms/roomreservation")(sequelize, Sequelize);
db.BarStockItem = require("./bar/barItemstock")(sequelize, Sequelize);
db.BarItemSale = require("./bar/baritemsale")(sequelize, Sequelize);
db.RestaurantSale = require("./restaurant/restaurantitemsale")(sequelize, Sequelize);
db.RestaurantStockItem = require("./restaurant/restaurantitemstock")(sequelize, Sequelize);
db.Hire = require("./hire/hire")(sequelize, Sequelize);
db.HireStock = require("./hire/hirestock")(sequelize, Sequelize);
db.Expense = require("./expenditure/expense")(sequelize, Sequelize);
db.Expenditure = require("./expenditure/expenditure")(sequelize, Sequelize);
module.exports = db;
