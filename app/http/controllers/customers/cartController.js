function cartController() {

    return {
        cart(req, res) {
            res.render('customers/cart.ejs')
        },

        update(req, res) {
            //for the first time creating cart and adding basic obj structure
            // let cart = {
            //     items: {
            //         pizzaId: { item: pizzaObject, qty: 0 }
            //     }, totalQty: 0,
            //     totalPrice: 0
            // }

            if (!req.session.cart) {     //to check cart is already in cart pr not
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }

            }
            let cart = req.session.cart;

            if (!cart.items[req.body._id])        //req.body is the whole pizza deatil    //if there is no pizza in cart with this id
            {
                cart.items[req.body._id] = {       //req.bosy._id is behaving as pizzaId as in sample structure
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1,
                    cart.totalPrice = cart.totalPrice + req.body.price;
            }
            else {                                                                  //if there will be already a pizza
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }

            return res.json({ totalQty: req.session.cart.totalQty });

        }
    }
}
module.exports = cartController;