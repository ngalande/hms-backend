const db = require('../models');
const User = db.user


const UserRepository = () => {
    const findUserByEmail = async (email) => {
        return User.findOne({ where: { email: email } })
    }

    const findAllUsers = async () => {
        return User.findAll()
    }

    const findUser = async (id) => {
        return User.findOne({ where: {_id: id} })
    }

    const deleteUser = async (userid) => {
        return User.Destroy({_id: userid})
    }

    const findUserPassword = async(password) => {
        return User.findOne({ password: password})
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