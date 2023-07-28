const {DataTypes} = require('sequelize');

module.exports =(sequelize, Sequelize) => {
    const Hire = sequelize.define("Hire", {
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
        item_id: {
            type: DataTypes.STRING(256),
        },
        item_name: {
            type: DataTypes.STRING
        },
        item_quantity: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        item_price : {
            type: DataTypes.INTEGER
        },
        net_amount : {
            type: DataTypes.INTEGER 
        },
        duration: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.ENUM, //link from room 
            values: ['Hired', 'DeHired', 'Pending'],
            allowNull: false,
            defaultValue: 'DeHired'
        }
    })
    return Hire;
}