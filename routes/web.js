const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController')
const orderController = require('../app/http/controllers/customers/orderController')  //for customer
const adminOrderController = require('../app/http/controllers/admin/orderController')

//middlewares
const guest = require('../app/http/middleware/guest')  //guest middleware is used to redirect user to homepage if user is already loged in
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')

function initRoutes(app) {

    app.get('/', homeController().index)
    app.get('/cart', cartController().cart)

    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().postLogout)

    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)

    app.post('/update-cart', cartController().update)



    //customer Routes
    app.post('/orders', auth, orderController().store)         //this will redirect when we click on order now
    app.get('/customer/orders', auth, orderController().index)       //this is for all order items


    //admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
}

module.exports = initRoutes