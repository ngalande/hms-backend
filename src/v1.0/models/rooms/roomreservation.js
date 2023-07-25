const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const RoomReservation = sequelize.define("RoomReservation", {
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
        customer_name: {
            type: DataTypes.STRING
        },
        customer_phone_number: {
            type: Sequelize.INTEGER
        },
        customer_email: {
            type: DataTypes.STRING
        },
        room_type: {
            type: DataTypes.STRING //link from roomtype
        },
        duration: {
            type: DataTypes.STRING
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
        },
        paid_status: {
            type: DataTypes.ENUM, //link from room 
            values: ['NotPaid', 'Pending', 'Paid'],
            allowNull: false,
            defaultValue: 'Pending'
        }
    })

    return RoomReservation
}

