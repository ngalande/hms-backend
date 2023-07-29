const db = require("../models");
const Expense = db.Expense;
const ExpenseRepository = require("../repositories/ExpenseRepository");

const ExpenseService = () => {
    // create expense
    const CreateExpense = async(Data) => {
        await Expense.create(Data)
    }

    // get all expenses
    const getAllExpenditure = async() => {
        const getallexpenditure = await ExpenseRepository.findAllExpenses()
        if(getallexpenditure.length < 1){
            throw new Error("No expenses recorded")
        }

        return getallexpenditure
    }

    // get single expense
    const getSingleExpenditure = async(id) => {
        const getsingleexpenditure = await ExpenseRepository.findExpenseByID(id);
        if(!getsingleexpenditure){
            throw new Error("Expense not found")
        }

        return getsingleexpenditure
    }

    // delete expense
    const deleteExpenditure = async(id) => {
        const deleteExpenditure = await ExpenseRepository.deleteExpense(id);
        if(!deleteExpenditure){
            throw new Error("Expense not found")
        }

        return deleteExpenditure
    }

    return {
        CreateExpense,
        getAllExpenditure,
        getSingleExpenditure,
        deleteExpenditure
    }
}

module.exports = ExpenseService;