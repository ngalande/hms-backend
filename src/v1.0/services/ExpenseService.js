const db = require("../models");
const Expenditure = db.Expenditure;
const Expense = db.Expense;
const ExpenseRepository = require("../repositories/ExpenseRepository");

const ExpenseService = () => {
    // stock part 
    const addExpenditure = async(Data) => {
        await Expenditure.create(Data)

    }

    const getAllStockExpenditure = async () => {
        const getexpenditures = await ExpenseRepository.findAllStock();
        if(getexpenditures.length < 1) {
            throw new Error("No Stock Items")
        }

        return getexpenditures
    }

    const getStockExpenditure = async (id) => {
        const getstockexpenditure = await ExpenseRepository.findStockItemByID(id);
        if(!getstockexpenditure){
            throw new Error("Stock Item not found")
        }

        return getstockexpenditure
    }

    const deleteStockExpenditure = async(id) => {
        const stockitem = await ExpenseRepository.deleteStockItemByID(id);

        if(!stockitem){
            throw new Error("Stock Item not found")
        }

        return stockitem
    }

    // create expense
    const CreateExpense = async(id, Data) => {
        const expenditure = await ExpenseRepository.findStockItemByID(id)
        if(!expenditure){
            throw new Error("Expense Stock not found")
        }

        const { description, amount } = Data

        const payload = {
            expense_name: expenditure.expense_name,
            description: description,
            amount: amount
        }

        await Expense.create(payload)
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
        addExpenditure,
        CreateExpense,
        getAllExpenditure,
        getSingleExpenditure,
        deleteExpenditure,
        getStockExpenditure,
        getAllStockExpenditure,
        deleteStockExpenditure
    }
}

module.exports = ExpenseService;