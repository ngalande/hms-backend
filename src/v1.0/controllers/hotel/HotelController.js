const HotelController = (serviceContainer) => {
    const createRoom = async (req, res) => {
        // room ends
        try {
            const room = await serviceContainer.hotelservice.addRoom(req.body)
            return res.status(201).json({
                success: true,
                message: `Room successfully Created`,
                data: room
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getRooms = async (req, res) => {
        try {
            const rooms = await serviceContainer.hotelservice.getRooms();
            if(rooms.length < 1){
                throw new Error("No rooms created")
            }
            return res.status(200).send(rooms)

        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getRoom = async (req, res) => {
        let id = req.params.id;
        try {
            const room = await serviceContainer.hotelservice.getRoom(id);
            return res.status(200).send(room)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const deleteRoom = async (req, res) => {
        let id = req.params.id;
        try {
            await serviceContainer.hotelservice.deleteRoom(id)
            return res.status(200).send({
                success: true,
                message: `Room deleted!`
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message,
                message: `Room doesn't exist`
            })
        }
    }

    const updateRoom = async (req, res) => {

    }

    //room type ends
    const createRoomType = async (req, res) => {
        // room ends
        try {
            const roomtype = await serviceContainer.hotelservice.addRoomType(req.body)
            return res.status(201).json({
                success: true,
                message: `Room Type successfully Created`,
                data: roomtype
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getRoomTypes = async (req, res) => {
        try {
            const roomtypes = await serviceContainer.hotelservice.getRoomTypes();
            if(roomtypes.length < 1){
                throw new Error("No rooms types created")
            }
            return res.status(200).send(roomtypes)

        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getRoomTypeByName = async () => {
        let name = req.params.name;
        try {
            const roomtypes = await serviceContainer.hotelservice.getRoomTypeByName(name);
            return res.status(200).send(roomtypes)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getRoomTypeByID = async (req, res) => {
        let id = req.params.id;
        try {
            const roomtypes = await serviceContainer.hotelservice.getRoomTypeByName(id);
            return res.status(200).send(roomtypes)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const deleteRoomType = async (req, res) => {
        let id = req.params.id;
        try {
            await serviceContainer.hotelservice.deleteRoom(id)
            return res.status(200).send({
                success: true,
                message: `Room type deleted!`
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message,
                message: `Room type doesn't exist`
            })
        }
    }


    return {
        createRoom,
        getRooms,
        getRoom,
        deleteRoom,
        createRoomType,
        getRoomTypes,
        getRoomTypeByID,
        getRoomTypeByName,
        deleteRoomType
    }
}

module.exports = HotelController;