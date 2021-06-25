const order = require('../../../models/order')

function orderController() {
    return {
        index(req, res) {
            order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).
                populate('customerId', '-passowrd').exec((err, orders) => {
                    if (req.xhr) {
                        return res.json(orders)
                        // console.log('hi xhr')
                    }
                    else {
                        return res.render('admin/orders')
                    }

                })
        }
    }
}

module.exports = orderController