const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport) {

    passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        //Login Logic
        //check if email exists
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, { message: 'No User with this Email...' })
        }

        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, { message: 'Logged In Succesfully' })
            }
            return done(null, false, { message: "Wrong Username/Password" })
        }).catch(err => {
            console.log(err);
            return done(null, false, { message: "Something went wrong" })
        })

    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        //to extract user from its stored _id
        User.findById(id, (err, user) => {
            done(err, user)        //now we can use req.user here , becoz we fetch it from our database
        })
    })

}


module.exports = init