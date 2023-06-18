const db = require("../models");
const Room = db.room

const RoomRepository = () => {
    const findRoomByName = async (name) => {
        return Room.findOne({ where: {name: name} })
    }

    const findAllRooms = async() => {
        return Room.findAll()
    }

    const findRoom = async (roomid) => {
        return Room.findOne({ where: {id: roomid}})
    }

    const deleteRoom = async (roomid) => {
        return Room.findOne({ where:{id: roomid} })
    }

    const updateRoom = async () => {

    }

    return {
        findRoomByName,
        findAllRooms,
        findRoom,
        deleteRoom
    }
}

module.exports = RoomRepository();