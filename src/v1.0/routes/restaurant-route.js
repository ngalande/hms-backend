const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services');
const RestaurantController = require('../controllers/restaurant/RestaurantController');
const RestaurantControllerHandler = RestaurantController(ServiceContainer);

//create stock
router.post('/create-stockitem', (req, res) => 
    RestaurantControllerHandler.createStockItem(req, res)
)

//get all stock
router.get('/get-stockitems', (req, res) => 
    RestaurantControllerHandler.getAllStockItems(req, res)
)

//get single stock
router.get('/get-stockitem/:id', (req, res) => 
    RestaurantControllerHandler.getStockItemByID(req, res)
)

//delete stock entry
router.delete('/delete-stockitem/:id', (req, res) =>
    RestaurantControllerHandler.deleteStockItem(req, res)
)

//purchase item
router.post('/purchase-item', (req, res) => 
    RestaurantControllerHandler.purchaseItem(req, res)
)

//get purchased items
router.get('/get-purchaseditems', (req, res) => 
    RestaurantControllerHandler.getPurchasedItems(req, res)
)

//get purchased item
router.get('/get-purchaseditem/:id', (req, res) => 
    RestaurantControllerHandler.getPurchasedItem(req, res)
)

//delete purchased item
router.delete('/delete-purchaseditem/:id', (req, res) => 
    RestaurantControllerHandler.deletePurchasedItem(req, res)
)

module.exports = router;
