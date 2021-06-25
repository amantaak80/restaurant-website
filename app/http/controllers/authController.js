const User = require('../../models/user')
const bcrypt = require('bcrypt')

const { response } = require('express')
const passport = require('passport')

function authController() {

    function _getRedirectUrl(user) {     //function for redirecting user to its specific Order path
        if (user.role == 'admin') {
            return '/admin/orders'
        }
        return '/customer/orders'
    }

    return {
        login: (req, res) => {
            res.render('auth/login.ejs')
        },

        postLogin(req, res, next) {   //post login req
            passport.authenticate('local', (err, user, info) => {         // same as done function in passport.js ,,err=null, user=user, message=info
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {       //if not have user , email/passowrd is incorect
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, (err) => {     //if user is present than login
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    //now if user is a Customer then redirect them to placed orders and if user is Admin redirect them to recieved orders
                    return res.redirect(_getRedirectUrl(req.user))    //if true
                })
            })(req, res, next)       //we are calling function, becoz this passport.authenticate return us a functio  which we have to call at end

        },



        register(req, res) {     //for get req of Register
            res.render('auth/register.ejs')
        },

        async postRegister(req, res) {       //since we are using await in code so we have to write async in parent function
            const { name, email, address, city, password } = req.body;   //as we are using all varibale next first we have to store here

            //validate request
            if (!name || !email || !password || !city || !address) {
                req.flash('error', 'All fields are required')    //error is the Key which we are using in register.ejs

                //as we refresh the page, present data should not be removed
                req.flash('name', name)
                req.flash('email', email)
                req.flash('password', password)
                req.flash('address', address)
                req.flash('city', city)
                return res.redirect('/register')
            }

            //check if email exists or not
            User.exists({ email: email }, (err, result) => {  //1st email is which is present in database , 2nd is our input email by client   //this is an query
                if (result) {         //if user email and database email matches than following result will take place
                    req.flash('error', 'Email already exits')
                    req.flash('name', name)
                    req.flash('password', password)
                    req.flash('address', address)
                    req.flash('city', city)
                    return res.redirect('/register')
                }
            })

            //hashpassword
            const hasedPassword = await bcrypt.hash(password, 10)

            //craete a user
            const user = new User({
                name,        //since here Key and value both are same you can only write one
                email,        // eg. name,email
                address,
                city,
                password: hasedPassword,

            });
            console.log(user)

            //creating user //inserting user into database
            user.save().then((user) => {

                return res.redirect('/')

            }).catch(err => {
                req.flash('error', 'Something Went Wrong')
                console.log(err)
                return res.redirect('/register')
            })

            // console.log(req.body);
        },

        postLogout(req, res) {      //for LogOut
            req.logout()
            return res.redirect('/login')
        }
    }
}
module.exports = authController;