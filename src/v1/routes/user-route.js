// const express = require('express');
// const router = express.Router();
// const serviceContainer = require('../services');
// const UserController = require('../controllers/user/UserController');
// const LoginSignupController = require('../controllers/user/auth/signup-login');
// const auth = require('../middleware/auth');
// const UserControllerHandler = UserController(serviceContainer);



// router.post('/register', (req,res) =>
//     UserControllerHandler.registerUser(req,res)
// )

// router.post('/login', LoginSignupController.loginUser)

// router.get('/get-users', (req, res) =>
//     UserControllerHandler.getUsers(req,res)
// )

// router.get('/get-user/:id', (req,res) => 
//     UserControllerHandler.getUser(req, res)
// )

// router.delete('/delete-user/:id', (req, res)=>
//     UserControllerHandler.deleteUser(req,res)
// )

// router.put('/update-user/:id', (req, res) => 
//     UserControllerHandler.updateUser(req, res)
// )

// module.exports = router ;

const express = require('express');
const router  = express.Router();
const ServiceContainer = require('../services');
const UserController = require('../../controllers/user/UserController')
const LoginController = require('../../controllers/user/auth/signup-login');
const { auth } = require('../middleware/auth');
const UserControllerHandler = UserController(ServiceContainer);

//CRUD
/**
 * @swagger
 * components:
 *   schemas:
 *    User:
 *       type: object
 *       required:
 *         - username
 *         - roles
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         username: 
 *           type: string
 *           description: The user username
 *         roles: 
 *           type: string
 *           description: The user role
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: number
 *           description: The user phone number
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         id: 62e8decd00bb07167878eea0 
 *         username: Kunda
 *         roles: user
 *         email: kunda@gmail.com
 *         phone: 960000001
 *         password: cmdtransparency@2022
 *         date: 2022-08-02T08:22:37.063Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *    Admin:
 *       type: object
 *       required:
 *         - username
 *         - roles
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         username: 
 *           type: string
 *           description: The user username
 *         roles: 
 *           type: string
 *           description: The user role
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: number
 *           description: The user phone number
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         id: 62e8decd00bb07167878eea0 
 *         username: Kunda
 *         roles: user
 *         email: kunda@gmail.com
 *         phone: 960000001
 *         password: cmdtransparency@2022
 *         date: 2022-08-02T08:22:37.063Z
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       required:
 *         - username
 *         - roles
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         username: 
 *           type: string
 *           description: The user userrname
 *         roles: 
 *           type: string
 *           description: The user roles
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: number
 *           description: The user phone number
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         response: User successfully Signed up
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         response: User successfully Logged In
 */


/**
 * @swagger
 * /api/v2/user/register:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       200:
 *         description: The user was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSignup'
 *       500:
 *         description: Some server error
 */
router.post('/register', (req,res) =>
    UserControllerHandler.registerUser(req,res)
)

/**
 * @swagger
 * /api/v2/user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLogin'
 *       500:
 *         description: Some server error
 */
router.post('/login', LoginController.loginUser)

/**
 * @swagger
 * /api/v2/user/get-users:
 *   get:
 *     summary: Admin gets all users
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: The users have been fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Some server error
 */
router.get('/get-users',[auth], (req, res) =>
    UserControllerHandler.getUsers(req,res)
)

/**
 * @swagger
 * /api/v2/user/register:
 *   get:
 *     summary: User gets user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.get('/get-user/:id',[auth], (req,res) => 
    UserControllerHandler.getUser(req, res)
)

router.delete('/delete-user/:id', (req, res)=>
    UserControllerHandler.deleteUser(req,res)
)

router.put('/update-user/:id', (req, res) => 
    UserControllerHandler.updateUser(req, res)
)

module.exports = router;