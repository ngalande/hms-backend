const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services');
const ExpenseController = require('../controllers/expense/ExpenseController');
const ExpenseControllerHandler = ExpenseController(ServiceContainer);

router.post('/create-expenditure', (req, res) => 
    ExpenseControllerHandler.CreateExpense(req, res)
)

router.get('/get-allexpenditure', (req, res) => 
    ExpenseControllerHandler.getAllExpenditure(req, res)
)

router.get('/get-expenditure/:id', (req, res) => 
    ExpenseControllerHandler.getSingleExpenditure(req, res)
)

router.delete('/delete-expenditure/:id', (req, res) => 
    ExpenseControllerHandler.deleteExpenditure(req, res)
)

module.exports = router;