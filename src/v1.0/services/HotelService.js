const db = require('../models');
const RestaurantRepository = require('../repositories/RestaurantRepository');
const Room = db.room
const RoomType = db.roomtype
const RoomReservation = db.roomreservation
const RoomRepository = require('../repositories/RoomRepository');
const UserRepository = require('../repositories/UserRepository');

const HotelService = () => {
    //room section
    const addRoom = async (id, Data) => {
        const {name, number, room_type, capacity, status, amount} = Data;

        //user validation... must be receptionist
        // const usertype = await UserRepository.findUser(userid)

        //check if the room already exists
        const roomtype = await RoomRepository.findRoomTypeByID(id)
        const roomExists = await RoomRepository.findRoomByNumber(number);
        if(!roomtype){
            throw new Error("Roomtype does not exist")
        }

        const room_payload = {
            // userId: usertype.id,
            // username: usertype.username,
            room_type_id: roomtype.id,
            amount: roomtype.amount,
            name: name,
            room_type: room_type,
            number: number,
            capacity: capacity,
            status: status
        }

        await  Room.create(room_payload)
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
        const { room_type_name, amount } = Data;

        //check if room type already exists
        // const roomTypeExistsByNumber = await RoomRepository.findRoomTypeByNumber()
        // const usertype = await UserRepository.findUser(userid)
    
        const roomTypeExists = await RoomRepository.findRoomTypeByName(room_type_name);
        if(roomTypeExists) {
            throw new Error("Room Type Already exists")
        }

        const roomtypepayload = {
            room_type_name: room_type_name,
            amount: amount,
            // userId: usertype.id,
            // username: usertype.username,
        }

        await RoomType.create(roomtypepayload)
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
            throw new Error('Room not Not Found')
        }

        //user validation... must be receptionist
        // const usertype = await UserRepository.findUser(userid)
        

        const roomStatus = roomreservation.status
        if(roomStatus == 'BOOKED'){
            throw new Error('Room already booked')
        } else if( roomStatus == 'RESERVED'){
            throw new Error('Room already reserved')
        }


        // console.log(roomreservation)
        const {duration, phone, status, paid_status, net_amount, customer_phone_number, customer_name, customer_email} = Data
        
        const RoomPayload = {
            status: status
        }

        const ReservationPayload = {
            // userId: usertype.id,
            room_id: roomreservation.id,
            room_type: roomreservation.room_type,
            // username: usertype.username,
            customer_name: customer_name,
            customer_phone_number: customer_phone_number,
            customer_email: customer_email,
            amount: roomreservation.amount,
            duration: duration,
            net_amount: net_amount,
            status: status,
            paid_status: "Paid"
        }
        
        Room.update(RoomPayload, { where: {id: id}})
        // console.log(ReservationPayload)
        RoomReservation.create(ReservationPayload)
    }

    const updateRoomReservation = async(id, Data) => {
        const roomreserved = await RoomRepository.findRoomReservationbyID(id)
        const roomStatus = roomreserved?.status //room status
        const room_net_amount = roomreserved?.net_amount //reservation net_amount
        const final_amount = room_net_amount * -1

        const {status, paid_status} = Data
        if(!roomreserved){
            throw new Error('Room Not Found')
        } 

        if(roomStatus == "BOOKED" ){
            const cancelled_payload = {
                room_id: roomreserved.id,
                room_type: roomreserved.room_type,
                // username: usertype.username,
                customer_name: roomreserved.customer_name,
                customer_phone_number: roomreserved.customer_phone_number,
                customer_email: roomreserved.customer_email,
                amount: roomreserved.amount,
                duration: roomreserved.duration,
                net_amount: final_amount,
                status: status,
                paid_status: paid_status
            }

            const RoomReservationPayload = {
                status: status,
                paid_status:  paid_status
            } 
    
            Room.update(RoomReservationPayload, { where: {id: id}})
            RoomReservation.update(RoomReservationPayload, { where: {room_id: id}})  
            RoomReservation.create(cancelled_payload)

        } else if (roomStatus == "RESERVED"){
            const cancelled_payload = {
                room_id: roomreserved.id,
                room_type: roomreserved.room_type,
                // username: usertype.username,
                customer_name: roomreserved.customer_name,
                customer_phone_number: roomreserved.customer_phone_number,
                customer_email: roomreserved.customer_email,
                amount: roomreserved.amount,
                duration: roomreserved.duration,
                net_amount: final_amount,
                status: status,
                paid_status: paid_status
            }
            
            const RoomReservationPayload = {
                status: status,
                net_amount: 0,
                paid_status:  paid_status
            } 
    
            Room.update(RoomReservationPayload, { where: {id: id}})
            RoomReservation.update(RoomReservationPayload, { where: {room_id: id}})  
            RoomReservation.create(cancelled_payload)
        }

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

    const getReservedRoom = async(id) => {
        const reservedrooms = await RoomRepository.findRoomReservationbyID(id);
        if(!reservedrooms){
            throw new Error("Reserved room not found")
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

    const getAllRoomReservations = async(req, res) => {
        const allreservedrooms = await RoomRepository.findAllRoomReservations();
        if(!allreservedrooms){
            throw new Error("No Reserved rooms")
        }

        return allreservedrooms
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
        getReservedRoom,
        getUnreservedRooms,
        updateRoomReservation,
        getAllRoomReservations,
        deleteReservedRoom
    }
}

module.exports = HotelService;