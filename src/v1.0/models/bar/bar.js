const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const BarItemSale = sequelize.define("BarItemSale", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
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