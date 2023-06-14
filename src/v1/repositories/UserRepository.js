const UserModel = require('../models/user');

const UserRepository = () => {
    const findUserByEmail = async (email) => {
        return UserModel.findOne({ email: email })
    }

    const findAllUsers = async () => {
        return UserModel.find()
    }

    const findUser = async (id) => {
        return UserModel.findById({_id: id})
    }

    const deleteUser = async (userid) => {
        return UserModel.findByIdAndDelete({_id: userid})
    }

    const findUserPassword = async(password) => {
        return UserModel.findOne({ password: password})
    }

    const findUserAndUpdate = async (userid, username, email, phone) => {
        return UserModel.findByIdAndUpdate({_id: userid}, {$set:{username:username, email:email, phone:phone}})
    }
    return {
        findUserByEmail,
        findAllUsers,
        findUser,
        findUserPassword,
        deleteUser,
        findUserAndUpdate
    }
}

module.exports = UserRepository();