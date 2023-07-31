const db = require("../models");
const Expenditure = db.Expenditure;
const Expense = db.Expense;

const ExpenseRepository = () => {
    // stock
    const findAllStock = async () => {
        return Expenditure.findAll()
    }

    const findStockItemByID = async(id) => {
        return Expenditure.findOne({
            where: {
                id: id
            }
        })
    }

    const deleteStockItemByID = async (id) => {
        return Expenditure.destroy({
            where:{
                id: id
            }
        })
    }


    // Expenditure
    const findExpenseByID = async (id) => {
        return Expense.findOne({
            where: {
                id: id
            }
        })
    }

    const findAllExpenses = async() => {
        return Expense.findAll()
    }

    const deleteExpense = async(id) => {
        return Expense.destroy({
            where: {
                id: id
            }
        })
    }

    return {
        findAllStock,
        findStockItemByID,
        deleteStockItemByID,
        findAllExpenses,
        findExpenseByID,
        deleteExpense
    }
}

module.exports = ExpenseRepository();