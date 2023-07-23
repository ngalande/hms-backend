const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const RoomType = sequelize.define("RoomType", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        room_type_name: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        paranoid: true
    });

    RoomType.associate = (models) => {
        RoomType.belongsTo(models.User, {
            foreignKey: {
                name: 'id',
                allowNull: false
            },
            as: 'roomtype'
        });
    };

    return RoomType
}

