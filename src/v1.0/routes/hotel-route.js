const express = require('express');
const router = express.Router();
const ServiceContainer = require('../services');
const HotelController = require('../controllers/hotel/HotelController');
const HotelControllerHandler = HotelController(ServiceContainer);

//room ends
router.post('/create-room/:id', (req, res) => 
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
router.post('/create-roomtype', (req, res) => 
    HotelControllerHandler.createRoomType(req, res)
)

router.get('/get-roomtypes', (req, res) => 
    HotelControllerHandler.getRoomTypes(req, res)
)


router.get('/get-roomtype/:id', (req, res) => 
    HotelControllerHandler.getRoomTypeByID(req,res)
)

router.delete('/delete-roomtype/:id', (req, res)=> 
    HotelControllerHandler.deleteRoomType(req, res)
)

// router.get('/get-roomtypebyn/:name', (req, res) => 
//     HotelControllerHandler.getRoomTypeByName(req, res)
// )

//room reservation ends
router.post('/create-roomreservation/:id', (req, res)=> 
    HotelControllerHandler.createRoomReservation(req, res)
)

router.get('/get-roomreservation', (req, res)=> 
    HotelControllerHandler.getRoomReservations(req, res)
)


router.get('/get-reservedroom/:id', (req, res)=> 
HotelControllerHandler.getReservedRoom(req, res)
)

router.get('/get-reservedrooms', (req, res)=> 
    HotelControllerHandler.getReservedRooms(req, res)
)
router.get('/get-unreservedrooms', (req, res)=> 
    HotelControllerHandler.getUnreservedRooms(req, res)
)
router.put('/update-roomreservation/:id', (req, res)=> 
    HotelControllerHandler.updateRoomReservation(req, res)
)

router.delete('/delete-reservedroom/:id', (req, res) => 
    HotelControllerHandler.deleteReservedRoom(req, res)
)


module.exports = router;
