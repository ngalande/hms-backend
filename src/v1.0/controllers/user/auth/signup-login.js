const bcrypt = require('bcrypt');
const db = require('../../../models')
const User = db.user
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

//env ends
const { JWT_SECRET } = process.env;

exports.loginUser = async (req, res) => {
    //return res.send("login")
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.status(401).json({ message: 'User not found',});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)return res.status(401).json({message: 'Incorrect password, try again'});
            // await user.generateAuthToken()
            //await user.generateRefreshToken();
            const token = jwt.sign({"id":user._id, "email":user.email }, JWT_SECRET)
            res.status(200).send({
                userid: user._id,
                token: token,
                message: "login successful",
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

exports.createUser = async (req, res) => {
    try{
        const { username, email, password, role } = req.body;
        console.log(email)

        const userExists = await User.findOne({ where: { email: email } })
        if (userExists){
            throw new Error("User already exists")
        }

        const newUser ={
            username,
            email, 
            role,
            password
        }

        await User.create(newUser)
        res.status(201).send({
            data: newUser,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error.message,
        });
    }
}
exports.resetPassword = async(req, res) => {
    try {
        const { email, newpassword } = req.body;
        const user = await User.findOne({ where: { email: email } })

        const isMatch = await bcrypt.compare(newpassword, user.password);
        if (isMatch){
            const pword = {
                newpassword: password
            }

            await User.Update(pword)
            res.status(201).send({
                message: "password reset",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}