const UserService = require('./UserService')
const HotelService = require('./HotelService')
const BarService = require('./BarService')

const ServiceContainer = () => {
    return {
        userservice: UserService(),
        hotelservice : HotelService(),
        barservice : BarService()
    }
}

module.exports = ServiceContainer();