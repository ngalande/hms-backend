const { DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("Room", {
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
        name: {
            type: DataTypes.STRING
        },
        room_type_id: {
            type: DataTypes.STRING //from room type
        },
        room_type: {
            type: DataTypes.STRING //from room type 
        },
        number: {
            type: DataTypes.INTEGER,
            unique: true
        },
        amount: {
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