const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const RoomReservation = sequelize.define("RoomReservation", {
        id: { 
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        room_id:{
            type: DataTypes.STRING
        },
        number: {
            type: Sequelize.INTEGER
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        room_type: {
            type: DataTypes.STRING //link from roomtype
        },
        duration: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.INTEGER
        },
        net_amount : {
            type: DataTypes.INTEGER 
        },
        status: {
            type: DataTypes.ENUM, //link from room 
            values: ['BOOKED', 'RESERVED', 'UNRESERVED'],
            allowNull: false,
            defaultValue: 'UNRESERVED'
        }
    })

    return RoomReservation
}

