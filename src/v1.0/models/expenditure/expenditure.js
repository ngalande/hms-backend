const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Expenditure = sequelize.define("Expenditure", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        expense_name: {
            type: DataTypes.STRING(256),
        }
    })
    return Expenditure
}