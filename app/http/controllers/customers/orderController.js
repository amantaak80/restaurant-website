const { find } = require('../../../models/order')
const Order = require('../../../models/order')
const moment = require('moment')

function orderController() {          //factory function
    return {
        store(req, res) {
            //validate request
            const { mobile, address } = req.body
            if (!mobile || !address) {
                req.flash('error', 'All fields are required')
                return res.redirect('/cart')
            }
            else {
                const order = new Order({
                    customerId: req.user._id,
                    items: req.session.cart.items,
                    mobile,
                    address
                })

                order.save().then(result => {
                    req.flash('success', 'Order Placed SuccessFully')
                    delete req.session.cart
                    return res.redirect('/customer/orders')
                }).catch(err => {
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/cart')
                })
            }
        },
        async index(req, res) {

            const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { createdAt: -1 } })
            res.header('Cache-Control', 'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre=check=0')   //if we place order and again we go back to previous page and again come back to new page the 'Success ' message was appering
            res.render('customers/orders.ejs', { orders: orders, moment: moment })
            console.log(orders)
        }
    }
}

module.exports = orderController