const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const RestaurantItemSale = sequelize.define("RestaurantItemSale", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        item_name: {
            type: DataTypes.STRING(100),
        },
        item_id: {
            type: DataTypes.STRING(256),
        },
        item_quantity: {
            type: DataTypes.INTEGER
        },
        item_price : {
            type: DataTypes.INTEGER
        },
        net_amount : {
            type: DataTypes.INTEGER 
        }
    })
    return RestaurantItemSale
}