const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const RoomType = sequelize.define("RoomType", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        }
    })
    return RoomType
}

