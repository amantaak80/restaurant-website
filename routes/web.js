const authController = require('../app/http/controllers/authContoller')
const cartController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController')

function initRoutes(app) {

    app.get('/', homeController().index)

    app.get('/cart', cartController().cart)

    app.get('/login', authController().login)

    app.get('/register', authController().register)

    app.post('/update-cart', cartController().update)
}

module.exports = initRoutes