const db = require("../models");
const Room = db.room
const RoomType = db.roomtype

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
    const findRoomTypeByName = async(name) => {
        return RoomType.findOne({ where: {room_type_name: name }})
    }

    const findAllRoomTypes = async() => {
        return RoomType.findAll()
    }

    const findRoomTypeByID = async(id) => {
        return RoomType.findOne({ where:{id: id}})
    }

    const deleteRoomType = async (id) => {
        return RoomType.Destroy({ where:{id: id }})
    }

    const updateRoomType = async () => {

    }

    return {
        findRoomByName,
        findAllRooms,
        findRoom,
        deleteRoom,
        findRoomTypeByName,
        findAllRoomTypes,
        findRoomTypeByID,
        deleteRoomType
    }
}

module.exports = RoomRepository();