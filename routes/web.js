const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController')
const guest = require('../app/http/middleware/guest')  //guest middleware is used to redirect user to homepage if user is already loged in

function initRoutes(app) {

    app.get('/', homeController().index)
    app.get('/cart', cartController().cart)

    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().postLogout)

    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)

    app.post('/update-cart', cartController().update)

}

module.exports = initRoutes