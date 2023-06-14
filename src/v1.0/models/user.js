const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
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
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
        }
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return User;
  };