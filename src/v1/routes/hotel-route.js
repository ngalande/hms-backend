const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services');
const HotelController = require('../../controllers/hotel/HotelController');
const HotelControllerHandler = HotelController(ServiceContainer);

router.get('/', HotelControllerHandler.getRooms);

module.exports = router;
