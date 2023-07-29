const db = require("../models");
const Expense = db.Expense;

const ExpenseRepository = () => {
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
        findAllExpenses,
        findExpenseByID,
        deleteExpense
    }
}

module.exports = ExpenseRepository();