const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services');
const BarController = require('../controllers/bar/BarController');
const BarControllerHandler = BarController(ServiceContainer);

//create stock
router.post('/create-stockitem', (req, res) => 
    BarControllerHandler.createStockItem(req, res)
)

//get all stock
router.get('/get-stockitems', (req, res) =>
    BarControllerHandler.getAllStockItems(req, res)
)

//get single stock
router.get('/get-stockitem/:id', (req, res) => 
    BarControllerHandler.getStockItemByID(req, res)
)

//delete stock entry
router.delete('/delete-stockitem/:id', (req, res) => 
    BarControllerHandler.deleteStockItem(req, res)
)

router.post('/purchase-item/:id', (req, res) => 
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