require('dotenv').config()       //to use .env file
const express = require('express')
const app = express()

app.use(express.json())     //before this the json data will show undifined in terminal
app.use(express.urlencoded({ extended: false }))    //for urlencoded data

const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo');   //session store

//import passport for authentication
const passport = require('passport')


//database connection
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/restaurantDb";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection Failed...')
});


const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const initRoutes = require('./routes/web')
const { options } = require('laravel-mix')
const PORT = process.env.PORT || 8300

//session config
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        store: MongoDbStore.create({          //create new session
            mongoUrl: url
        }),
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 } //24hr

    }))
app.use(flash())   //calling flash function here

//Passport config
const passportInit = require('./app/config/passport')       //strategy for authentication ... since code is big so writing in diffrent file
passportInit(passport)                         //calling function in the passport.js file
app.use(passport.initialize())
app.use(passport.session())
//***PAssport config should always be below sessions */

//for availing session key on frontend we are creating a global middleware
app.use((req, res, next) => {
    res.locals.user = req.user;  // for makeing user available on frontend
    res.locals.session = req.session; // for makeing user available on frontend
    next();
})


// tell express where we have assets
app.use(express.static('public'))  //without this red color of css was not rendering to webpage

//set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')  //importing module
initRoutes(app)   //calling function

app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`)
})