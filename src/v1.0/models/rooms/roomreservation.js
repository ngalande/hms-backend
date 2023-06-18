const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const RoomType = sequelize.define("RoomReservation", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING
        },
        roomtype: {
            type: Sequelize.STRING //link from roomtype
        },
        duration: {
            type: DataTypes.INTEGER
        },
        phone: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.ENUM, //link from room 
            values: ['BOOKED', 'RESERVED', 'UNRESERVED'],
            allowNull: false,
            defaultValue: 'UNRESERVED'
        }
    })
    return RoomType
}

