const UserService = require('./UserService')
const HotelService = require('./HotelService')
const BarService = require('./BarService')
const RestaurantService = require('./RestaurantService')
const HireService = require("./HireService")

const ServiceContainer = () => {
    return {
        userservice: UserService(),
        hotelservice : HotelService(),
        barservice : BarService(),
        restaurantservice : RestaurantService(),
        hireservice : HireService()
    }
}

module.exports = ServiceContainer();