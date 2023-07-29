const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("Expense", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        expense_name: {
            type: DataTypes.STRING(256),
        },
        description:{
            type: DataTypes.STRING(256),
        },
        amount: {
            type: DataTypes.INTEGER(256),
        }
    })
    return Expense
}