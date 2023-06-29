const UserService = require('./UserService')
const HotelService = require('./HotelService')
const BarService = require('./BarService')
const ResaurantService = require('./RestaurantService')

const ServiceContainer = () => {
    return {
        userservice: UserService(),
        hotelservice : HotelService(),
        barservice : BarService(),
        resaurantservice : ResaurantService()
    }
}

module.exports = ServiceContainer();