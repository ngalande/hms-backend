const db = require('../models');
const User = db.user
const UserRepository = require('../repositories/UserRepository')

const UserService = () => {
    const addUser = async (Data) => {
        const { email } = Data;

        //check if the user already exists
        const userExists = await UserRepository.findUserByEmail(email);
        if (userExists){
            throw new Error("User already exists")
        } 

        await User.create(Data)
   }

   const loginUser = async (email) => {

        //check if user exists
        const userExists = await UserRepository.findUserByEmail(email)
        if(!userExists){
            throw new Error("Don't have an account? Please Register!")
        }

        // //checking user password
        // const isMatch = await bcrypt.compare(password, users.password);
        // if(!isMatch){
        //     throw new Error("Don't have an account? Please Register!")
        // }
        users.generateAuthToken();
   }

   const getUsers = async () => {
       const users = await UserRepository.findAllUsers();
       if(users.length<1){
        throw new Error("No users found")
       }
       return users
   }

   const getUser = async (userid) => {
        const user = await  UserRepository.findUser(userid);
        if(!user) {
            throw new Error(" User not found ")
        }
        return user
   }

   const getUserOperations = async(userid) => {
    
   }

   const deleteUser = async (userid) => {
        const user = await UserRepository.deleteUser(userid);
        if(!user) {
            throw new Error(" User not found ")
        }
        return user
   }

   const updateUser = async (userid, username, email, phone) => {
        const user = await UserRepository.findUserAndUpdate(userid, username, email,phone );
        if(!user) {
            throw new Error("User not found")
        }
   }

   return{
    addUser,
    loginUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
   }
}

module.exports = UserService;