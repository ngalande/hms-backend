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

    const getRoomTypeByName = async (req, res) => {
        let room_type_name = req.params.room_type_name;
        try {
            const roomtypes = await serviceContainer.hotelservice.getRoomTypeByName(room_type_name);
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
            const roomtypes = await serviceContainer.hotelservice.getRoomTypeByID(id);
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
            await serviceContainer.hotelservice.deleteRoomType(id)
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

    //room reservation
    const createRoomReservation = async(req, res) => {
        let id = req.params
        try {
            const createroomreservation = await serviceContainer.hotelservice.addRoomReservation(id, req.body)
            return res.status(201).json({
                success: true,
                message: `Room Reservation successfully Created`,
                data: createroomreservation
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getRoomReservations = async(req, res) => {
        try {
            const roomreservations = await serviceContainer.hotelservice.getRoomReservation();
            if(roomreservations.length < 1){
                throw new Error("No room reservations")
            }
            return res.status(200).send(roomreservations)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getReservedRooms = async (req, res) => {
        try {
            const reservedrooms = await serviceContainer.hotelservice.getReservedRooms()
            if(reservedrooms.length < 1){
                throw new Error("No reserved rooms")
            }
            return res.status(200).send(reservedrooms)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
            })
        }
    }

    const getUnreservedRooms = async (req, res) => {
        try {
            const unreservedrooms = await serviceContainer.hotelservice.getUnreservedRooms()
            if(unreservedrooms.length < 1){
                throw new Error("No reserved rooms")
            }
            return res.status(200).send(unreservedrooms)
        } catch (error) {
            return res.status(400).json({
                success: false,
                error:error.message
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
        deleteRoomType,
        createRoomReservation,
        getRoomReservations,
        getReservedRooms,
        getUnreservedRooms
    }
}

module.exports = HotelController;