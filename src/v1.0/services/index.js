const UserService = require('./UserService')

const ServiceContainer = () => {
    return {
        userservice: UserService()
    }
}

module.exports = ServiceContainer();