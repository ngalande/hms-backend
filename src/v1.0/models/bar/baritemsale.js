const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const BarItemSale = sequelize.define("BarItemSale", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
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
        }
    })
    return BarItemSale
}