function authController() {
    return {
        login: (req, res) => {
            res.render('auth/login.ejs')
        },
        register(req, res) {     //we can write like this also
            res.render('auth/register.ejs')
        }
    }
}
module.exports = authController;