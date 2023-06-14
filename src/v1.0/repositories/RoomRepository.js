const RoomModel = require('../models/room');

const RoomRepository = () => {
    const findRoomByName = async (name) => {
        return RoomModel.findOne({name: name})
    }

    return {
        findRoomByName
    }
}

module.exports = RoomRepository();