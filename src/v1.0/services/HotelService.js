const db = require('../models');
const RestaurantRepository = require('../repositories/RestaurantRepository');
const Room = db.room
const RoomType = db.roomtype
const RoomReservation = db.roomreservation
const RoomRepository = require('../repositories/RoomRepository')

const HotelService = () => {
    //room section
    const addRoom = async (id, Data) => {
        const {number} = Data;

        //check if the room already exists
        const roomtype = await RoomRepository.findRoomTypeByID(id)
        const roomExists = await RoomRepository.findRoomByNumber(number);
        if(roomExists){
            throw new Error("Room already exists")
        }

        const room_payload = {
            number: number,
            amount: amount,
            capacity
        }

        await  Room.create(Data)
    }

    const getRooms = async () => {
        const rooms = await RoomRepository.findAllRooms();
        if(!rooms){
            throw new Error("No rooms created")
        }
        return rooms
    }

    const getRoom = async(id) => {
        const room = await RoomRepository.findRoom(id);
        if(!room){
            throw new Error("Room not found")
        }
        return room
    }

    const deleteRoom = async(id) => {
        const room = await RoomRepository.deleteRoom(id)
        if(!room) {
            throw new Error("Room not found")
        }
        return room
    }


    //roomtype
    const addRoomType = async(Data) => {
        const { number} = Data;

        //check if room type already exists
        const roomTypeExistsByNumber = await RoomRepository.findRoomTypeByNumber(number)
        // const roomTypeExists = await RoomRepository.findRoomTypeByName(room_type_name);
        if(roomTypeExistsByNumber) {
            throw new Error("Room Type Already exists")
        }

        await RoomType.create(Data)
    }

    const getRoomTypes = async() => {
        const roomTypes = await RoomRepository.findAllRoomTypes()
        if(roomTypes.lenght<1) {
            throw new Error("No Room Type found")
        }

        return roomTypes
    }

    const getRoomTypeByName = async(room_type_name) => {
        let roomType = await RoomRepository.findRoomTypeByName(room_type_name);
        if(!roomType) {
            throw new Error("Room Type not found")
        }

        return roomType
    }

    const getRoomTypeByID = async(id) => {
        let roomtypeid = await RoomRepository.findRoomTypeByID(id);
        if(!roomtypeid){
            throw new Error("Room type not found")
        }

        return roomtypeid
    }

    const deleteRoomType = async(id) => {
        let roomtype = await RoomRepository.deleteRoomType(id);
        if(!roomtype){
            throw new Error("Room type not found")
        }

        return roomtype
    }

    //room reservation ends
    const addRoomReservation = async(id, Data) => {
        const roomreservation = await RoomRepository.findUnreservedRoomByID(id)
        if(!roomreservation){
            throw new Error('Not Found')
        }
        const roomStatus = roomreservation.status
        if(roomStatus == 'BOOKED'){
            throw new Error('Room already booked')
        } else if( roomStatus == 'RESERVED'){
            throw new Error('Room already reserved')
        }


        // console.log(roomreservation)
        const {username, duration, phone, email, status, net_amount} = Data

        const RoomPayload = {
            status: status
        }

        const ReservationPayload = {
            room_id: roomreservation.id,
            number: roomreservation.number,
            name: roomreservation.name,
            room_type: roomreservation.room_type,
            username: username,
            duration: duration,
            phone: phone,
            amount: roomreservation.amount,
            net_amount: net_amount,
            email: email,
            status: status
        }
        
        Room.update(RoomPayload, { where: {id: id}})
        // console.log(ReservationPayload)
        RoomReservation.create(ReservationPayload)
    }

    const updateRoomReservation = async(id, Data) => {
        const roomreserved = await RoomRepository.findRoomReservationbyID(id)
        if(!roomreserved){
            throw new Error('Not Found')
        }
        const {status} = Data
        const RoomReservationPayload = {
            status: status
        }
        RoomReservation.update(RoomReservationPayload, { where: {room_id: id}})
        Room.update(RoomReservationPayload, { where: {id: id}})

    }
    const getRoomReservation = async(req, res) => {
        const roomreservations = await RoomRepository.findAllRoomReservations();
        if(!roomreservations){
            throw new Error("No Room Reservations")
        }

        return roomreservations
    }

    const getReservedRooms = async(req, res) => {
        const reservedrooms = await RoomRepository.findReservedRooms();
        if(!reservedrooms){
            throw new Error("No Reserved rooms")
        }

        return reservedrooms
    }

    const getUnreservedRooms = async(req, res) => {
        const unreservedrooms = await RoomRepository.findUnreservedRooms();
        if(!unreservedrooms){
            throw new Error("No Reserved rooms")
        }

        return unreservedrooms
    }

    const deleteReservedRoom = async(id) => {
        const reservedroom = await RoomRepository.deleteReservedRoom(id);
        if(!reservedroom) {
            throw new Error("reserved room not found")
        }
        return reservedroom
    }

    return{
        getRooms,
        addRoom,
        getRoom,
        deleteRoom,
        addRoomType,
        getRoomTypes,
        getRoomTypeByID,
        getRoomTypeByName,
        deleteRoomType,
        addRoomReservation,
        getRoomReservation,
        getReservedRooms,
        getUnreservedRooms,
        updateRoomReservation,
        deleteReservedRoom
    }
}

module.exports = HotelService;