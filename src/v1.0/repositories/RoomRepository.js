const db = require("../models");
const Room = db.room
const RoomType = db.roomtype
const RoomReservation = db.roomreservation

const RoomRepository = () => {
    // room section
    const findRoomByName = async (name) => {
        return Room.findOne({ where: {name: name} })
    }

    const findAllRooms = async() => {
        return Room.findAll()
    }

    const findRoom = async (id) => {
        return Room.findOne({ where: {id: id}})
    }

    const deleteRoom = async (id) => {
        return Room.Destroy({ where:{id: id} })
    }

    const updateRoom = async () => {

    }

    //room type section
    const findRoomTypeByName = async(room_type_name) => {
        return RoomType.findOne({ where: {room_type_name: room_type_name }})
    }

    const findAllRoomTypes = async() => {
        return RoomType.findAll()
    }

    const findRoomTypeByID = async(id) => {
        return RoomType.findOne({ where:{id: id}})
    }

    const deleteRoomType = async (id) => {
        return RoomType.destroy({ where:{id: id }})
    }

    const updateRoomType = async () => {

    }

    //room reservation section

    const findAllRoomReservations = async() => {
        return  RoomReservation.findAll()
    }

    const findRoomReservationbyID = async(id) => {
        return RoomReservation.findOne({ where:{id: id}})
    }

    const findReservedRooms = async() => {
        return RoomReservation.findAll({ where:{status:"RESERVED"} })
    }

    const findUnreservedRooms = async() => {
        return RoomReservation.findAll({ where:{status:"UNRESERVED"} })
    }



    return {
        findRoomByName,
        findAllRooms,
        findRoom,
        deleteRoom,
        findRoomTypeByName,
        findAllRoomTypes,
        findRoomTypeByID,
        deleteRoomType,
        findAllRoomReservations,
        findRoomReservationbyID,
        findReservedRooms,
        findUnreservedRooms
    }
}

module.exports = RoomRepository();