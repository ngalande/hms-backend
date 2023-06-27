const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services');
const BarController = require('../controllers/bar/BarController');
const BarControllerHandler = BarController(ServiceContainer);

router.post('/purchase-item', (req, res) => 
    BarControllerHandler.purchaseItem(req, res)
)

router.get('/get-purchaseditems', (req, res) => 
    BarControllerHandler.getPurchasedItems(req, res)
)

router.get('/get-purchaseditem/:id', (req, res) => 
    BarControllerHandler.getPurchasedItem(req, res)
)

router.delete('/delete-purchaseditem/:id', (req, res) => 
    BarControllerHandler.deletePurchasedItem(req, res)
)

module.exports = router;