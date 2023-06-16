const { DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("Room", {
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        status: {
            type: DataTypes.ENUM,
            values: ['BOOKED', 'RESERVED', 'UNRESERVED'],
            allowNull: false,
            defaultValue: 'UNRESERVED'
        }
    })

    const RoomType = sequelize.define("RoomType", {

    })

    return {
        Room,
        RoomType
    }
}