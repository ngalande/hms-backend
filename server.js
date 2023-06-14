//modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');



//the start and entry point of the application
const app = express()
dotenv.config();

const db = require("./src/v1.0/models")


//importing routes
// const users = require('./src/v1/routes/user-route')
// const hotel = require('./src/v1/routes/hotel-route')

//routes v2
const users = require("./src/v1.0/routes/user-route")



//dependencies to keep the app stable
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    allowedHeaders: ['sessionId','Access-Control-Allow-Origin', 'Content-Type', 'master-token'],
    exposedHeaders: ['sessionId'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    }
));

//db connections
// db = process.env.DB

//configuring mongodb
// mongoose.set('strictQuery',false);
// mongoose
//         .connect(db, {useUnifiedTopology:true, useNewUrlParser:true})
//         .then(() => console.log("connected to db"))
//         .catch(err => console.log(err));

//database config
db.sequelize.sync({ force: true })
    .then(() => console.log("Database connected.."))
    .catch(err => console.log('Error: '+ err))

//configuring routes to be accessed by client
// app.use('/api/v1/user', users);
// app.use('/api/v1/hotel', hotel)

app.use('/api/v2/user', users)

//starting port 
port = process.env.PORT;
app.listen(port, (req, res) => {
    console.log(`Listening on ${port}`)
});