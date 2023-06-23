const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services');
const HotelController = require('../controllers/hotel/HotelController');
const HotelControllerHandler = HotelController(ServiceContainer);

//room ends
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

//room type ends
router.post('/create-roomtypes', (req, res) => 
    HotelControllerHandler.createRoomType(req, res)
)

router.get('/get-roomtypes', (req, res) => 
    HotelControllerHandler.getRoomTypes(req, res)
)

router.get('/get-roomtype/:name', (req, res) => 
    HotelControllerHandler.getRoomTypeByName(req, res)
)

router.get('/get-roomtype/:id', (req, res) => 
 HotelControllerHandler.getRoomTypeByID(req,res)
)

router.delete('/delete-roomtype/:id', (req, res)=> 
    HotelControllerHandler.deleteRoomType(req, res)
)

module.exports = router;
