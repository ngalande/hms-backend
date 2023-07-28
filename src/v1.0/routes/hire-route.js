const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services');
const HireController = require('../controllers/hire/HireController');
const HireControllerHandler = HireController(ServiceContainer);

// stock ends

// create stock
router.post('/create-hirestockitem', (req, res) => 
    HireControllerHandler.createStockItemForHire(req, res)
)

// update stock

// get all stock
router.get('/get-hirestockitems', (req, res) => 
    HireControllerHandler.getalldehiredstockitems(req, res)
)

// get single stock
router.get('/get-hirestockitem/:id', (req, res) => 
    HireControllerHandler.getStockItemToHire(req, res)
)

// delete stock
router.delete('/delete-hirestockitem/:id', (req, res) => 
    HireControllerHandler.deleteStockItemToHire(req, res)
)


// Hire ends

// hire stock
router.post('/hire-item/:id', (req, res) => 
    HireControllerHandler.HireItem(req, res)
)

// update hired item
router.put('/update-hireditem/:id', (req, res) => 
    HireControllerHandler.updateHiredItem(req, res)
)

// get all hired stock
router.get('/get-allhireditems', (req, res) => 
    HireControllerHandler.getAllHired(req, res)
)

// get hired stock
router.get('/get-hireditems', (req, res) => 
    HireControllerHandler.getHiredItems(req, res)
)

// get single hired stock
router.get('/get-hiredstockitem/:id', (req, res) => 
    HireControllerHandler.getHiredItem(req, res)
)

// delete hired stock
router.delete('/delete-hiredstockitem/:id', (req, res) => 
    HireControllerHandler.deleteHiredItem(req, res)
)

module.exports = router;
