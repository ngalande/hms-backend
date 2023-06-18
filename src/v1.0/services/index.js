const UserService = require('./UserService')
const HotelService = require('./HotelService')

const ServiceContainer = () => {
    return {
        userservice: UserService(),
        hotelservice : HotelService()
    }
}

module.exports = ServiceContainer();