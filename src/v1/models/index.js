const UserModel = require("./user");
const RoomModel = require("./room");

const ModelContainer = () => {
    return{
        usermodel: UserModel(),
        roommodel: RoomModel()
    }
}

module.exports = ModelContainer()