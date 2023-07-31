const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services');
const ExpenseController = require('../controllers/expense/ExpenseController');
const ExpenseControllerHandler = ExpenseController(ServiceContainer);

// stock part
router.post('/create-expensestockitem', (req, res) => 
    ExpenseControllerHandler.createStockItem(req, res)
)

router.get('/get-expensestockitems', (req, res) => 
    ExpenseControllerHandler.getAllStockItems(req, res)
)

router.get('/get-expensestockitem/:id', (req, res) => 
    ExpenseControllerHandler.getStockItemByID(req, res)
)

router.delete('/delete-expensestockitem/:id', (req, res) => 
    ExpenseControllerHandler.deleteStockItem(req, res)
)

// expenditure eeds
router.post('/create-expenditure/:id', (req, res) => 
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