const db = require('../models');
const Room = db.room
const RoomType = db.roomtype
const RoomRepository = require('../repositories/RoomRepository')

const HotelService = () => {
    //room section
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

    const updateRoom = async() => {
        
    }

    //roomtype
    const addRoomType = async(Data) => {
        const {name} = Data;

        //check if room type already exists
        const roomTypeExists = await RoomRepository.findRoomTypeByName(name);
        if(roomTypeExists) {
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

    const getRoomTypeByName = async(name) => {
        let roomType = await RoomRepository.findRoomTypeByName(name);
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
        let roomtype = await RoomRepository.findRoomTypeByID(id);
        if(!roomtype){
            throw new Error("Room type not found")
        }

        return roomtype
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
        deleteRoomType
    }
}

module.exports = HotelService;