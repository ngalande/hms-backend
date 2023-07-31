const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const HireStock = sequelize.define("HireStock", {
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
            type: DataTypes.STRING
        },
        item_quantity: {
            type: DataTypes.INTEGER
        },
        item_price : {
            type: DataTypes.INTEGER
        },
        availabilty: {
            type: DataTypes.ENUM, //link from room 
            values: ['InStock', 'OutOfStock', 'Ordered'],
            allowNull: false,
            defaultValue: 'InStock'
        },
        status: {
            type: DataTypes.ENUM, //link from room 
            values: ['Hired', 'DeHired', 'Pending'],
            allowNull: false,
            defaultValue: 'DeHired'
        }
    })
    return HireStock;
}