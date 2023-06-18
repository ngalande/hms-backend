const { DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("Room", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING //from room type
        },
        number: {
            type: Sequelize.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        },
        capacity: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.ENUM, //link from room 
            values: ['BOOKED', 'RESERVED', 'UNRESERVED'],
            allowNull: false,
            defaultValue: 'UNRESERVED'
        }
    })

    return Room
}