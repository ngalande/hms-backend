const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const RoomType = sequelize.define("RoomType", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        room_type_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER
        },
        price: { 
            type: DataTypes.INTEGER
        }
    });

    RoomType.associate = (models) => {
        RoomType.belongs(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            as: 'roomtype'
        });
    };

    return RoomType
}

