

const express = require('express');
const router  = express.Router();
const ServiceContainer = require('../services/');
const UserController = require('../controllers/user/UserController')
const LoginController = require('../controllers/user/auth/signup-login');
const { auth } = require('../middleware/auth');
const UserControllerHandler = UserController(ServiceContainer);


router.post('/register', (req,res) =>
    UserControllerHandler.registerUser(req,res)
)

router.post('create-user', (req, res) => 
    UserControllerHandler.registerUser(req, res)
)

router.post('/login', LoginController.loginUser)

router.post('/reset-password', LoginController.resetPassword)

router.get('/get-users', (req, res) =>
    UserControllerHandler.getUsers(req,res)
)

router.get('/get-user/:id', (req,res) => 
    UserControllerHandler.getUser(req, res)
)

router.delete('/delete-user/:id', (req, res)=>
    UserControllerHandler.deleteUser(req,res)
)

router.put('/update-user/:id', (req, res) => 
    UserControllerHandler.updateUser(req, res)
)

module.exports = router;