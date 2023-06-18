const db = require('../models');
const Room = db.room
const RoomRepository = require('../repositories/RoomRepository')

const HotelService = () => {
    const addRoom = async (Data) => {
        const {name} = Data;

        //check if the room already exists
        const roomExists = await RoomRepository.findRoomByName(name);
        if(roomExists){
            throw new Error("Room already exists")
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

    const getRoom = async(roomid) => {
        const room = await RoomRepository.findRoom(roomid);
        if(!room){
            throw new Error("Room not found")
        }
        return room
    }

    const deleteRoom = async(roomid) => {
        const room = await RoomRepository.deleteRoom(roomid)
        if(!user) {
            throw new Error("Room not found")
        }
        return room
    }

    const updateRoom = async() => {
        
    }

    return{
        getRooms,
        addRoom,
        getRoom,
        deleteRoom
    }
}

module.exports = HotelService;