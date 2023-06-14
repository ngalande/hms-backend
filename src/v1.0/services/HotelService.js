const room = require('../models/room');
const RoomRepository = require('../repositories/RoomRepository')

const HotelService = () => {
    const getRooms = async () => {
        const rooms = await RoomRepository.findRoomByName();
        if(!rooms){
            throw new Error("No rooms created")
        }
        return rooms
    }

    return{
        getRooms
    }
}

module.exports = HotelService;