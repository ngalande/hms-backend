const { Op } = require("sequelize");
const db = require("../models");
const Room = db.room
const RoomType = db.roomtype
const RoomReservation = db.roomreservation

const RoomRepository = () => {
    // room section
    const findRoomByName = async (name) => {
        return Room.findOne({ where: {name: name} })
    }

    const findRoomByNumber = async (number) => {
        return Room.findOne({ where: {number: number} })
    }

    const findAllRooms = async() => {
        return Room.findAll()
    }

    const findRoom = async (id) => {
        return Room.findOne({ where: {id: id}})
    }

    const deleteRoom = async (id) => {
        return Room.destroy({ where:{id: id} })
    }

    const updateRoom = async () => {

    }

    //room type section
    const findRoomTypeByName = async(room_type_name) => {
        return RoomType.findOne({ where: {room_type_name: room_type_name }})
    }

    const findRoomTypeByNumber = async(number) => {
        return RoomType.findOne({ where: {number: number }})
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
        return RoomReservation.findOne({ where:{ room_id: id} })
    }

    const findReservedRooms = async() => {
        return RoomReservation.findAll({ where:{ [Op.or]: [ {status:"RESERVED"}, {status:"BOOKED"}]} })
    }

    const findUnreservedRoomByID = async(id) => {
        return Room.findOne({ where: {
            id: id
        } 
    })
    }

    const findUnreservedRooms = async() => {
        return RoomReservation.findAll({ where:{status:"UNRESERVED"} })
    }

    const deleteReservedRoom = async(id) => {
        return RoomReservation.findOne({where: {
            id: id
        }})
    }

    return {
        findRoomByName,
        findRoomByNumber,
        findAllRooms,
        findRoom,
        deleteRoom,
        findRoomTypeByName,
        findAllRoomTypes,
        findRoomTypeByID,
        deleteRoomType,
        findAllRoomReservations,
        findRoomReservationbyID,
        findUnreservedRoomByID,
        findReservedRooms,
        findUnreservedRooms,
        findRoomTypeByNumber,
        deleteReservedRoom
    }
}

module.exports = RoomRepository();