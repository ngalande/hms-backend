const UserService = require('./UserService')
const HotelService = require('./HotelService')
const BarService = require('./BarService')
const RestaurantService = require('./RestaurantService')

const ServiceContainer = () => {
    return {
        userservice: UserService(),
        hotelservice : HotelService(),
        barservice : BarService(),
        restaurantservice : RestaurantService()
    }
}

module.exports = ServiceContainer();