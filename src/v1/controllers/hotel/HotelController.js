const HotelController = (serviceContainer) => {
    const createRoom = async (req, res) => {
        try {
            const room = await serviceContainer.hotelservice.addRoom(req.body)
            return res.status(201).json({
                success: true,
                message: `Room successfully Registered`,
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
            return res.status(200).send(rooms)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getRoom = async (req, res) => {
        try {
            const room = await serviceContainer.hotelservice.getRoom(req.params.id);
            return res.status(200).send(room)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const deleteRoom = async (req, res) => {
        const userid = req.params.id;
        try {
            await serviceContainer.hotelservice.deleteRoom(userid)
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

    return {
        createRoom,
        getRooms,
        getRoom,
        deleteRoom
    }
}

module.exports = HotelController;