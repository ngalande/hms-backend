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
            type: DataTypes.STRING
        },
        room_type: {
            type: DataTypes.STRING //from room type
        },
        number: {
            type: DataTypes.INTEGER,
            unique: true
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