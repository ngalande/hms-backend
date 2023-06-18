const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services');
const HotelController = require('../controllers/hotel/HotelController');
const HotelControllerHandler = HotelController(ServiceContainer);

router.post('/create-room', (req, res) => 
    HotelControllerHandler.createRoom(req, res)
)

router.get('/get-rooms', (req, res) => 
    HotelControllerHandler.getRooms(req, res)
);

router.get('/get-room/:id', (req, res) => 
    HotelControllerHandler.getRoom(req, res)
)

router.delete('/delete-room/:id', (req, res) => 
    HotelControllerHandler.deleteRoom(req, res)
)

module.exports = router;
