const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); //import jwt
const Schema = mongoose.Schema;
const dotenv = require('dotenv');

dotenv.config()

//env ends
const { JWT_SECRET } = process.env;
const { REF_TOKEN_SECRET } = process.env;


//User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    roles: {
        type: String,
        default:  "user",
        enum: ["Superadmin", "Admin", "Receptionist", "BarAttendant", "RestaurantManager", "User"]
    },
    email:{
        type: String,
        required: false
    },
    phone:{
        type: String,
        required: false
    },
    password:{
        type: String,
        required: false
    },
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default:Date.now()
    }
});

//middleware function defining the token expiry time 2m
UserSchema.methods.generateAuthToken = function () {
    const User = this;
    const secret = JWT_SECRET;
    const token = jwt.sign({ _id: User._id }, secret, {
        expiresIn: '2m',
    },);
  User.token = token;
}

//middleware function to refresh a token 5m
UserSchema.methods.generateRefreshToken = function () {
    const User = this;
    const secret = REF_TOKEN_SECRET;
    const refreshToken = jwt.sign({ _id: User._id }, secret, {
        expiresIn: '30m',
    },);
    User.refreshToken = refreshToken;
}

UserSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12);
    }
    next();
    return {
        //user
    }
});

const User = mongoose.model("user", UserSchema)
module.exports =  User;