const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING
      },
      role: {
        type: DataTypes.ENUM,
        values: ['ADMIN', 'USER', 'RECEPTIONIST', 'BARATTENDANT', 'RESTAURANTMANAGER'],
        allowNull: false,
        defaultValue: 'USER'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
        }
      }
    }, {
      paranoid: true
    });

    User.associate = (models) => {
      User.hasMany(models.RoomType, {
        foreignKey: {
          name: 'id',
          allowNull: false
      },
      as: 'roomtype'
      })
    }

    return User;
  };