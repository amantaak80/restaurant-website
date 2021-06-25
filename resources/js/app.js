import axios from 'axios';
import Noty from "noty";
import moment from 'moment'
// import { initAdmin } from './admin'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cart-counter')

function updateCart(pizza) {

    axios.post('/update-cart', pizza).then(res => {
        console.log(res);
        cartCounter.innerText = res.data.totalQty     //it will help to show cart value on every single click
        new Noty({               //this will give a pop of item added into cart
            type: 'success',
            timeout: 300,
            text: "Item added to cart",
            progressBar: true,
            // layout: 'topLeft'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 300,
            text: "Something went wrong",
            progressBar: true,
            // layout: 'topLeft'
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {   //e=event
        let pizza = JSON.parse(btn.dataset.pizza)
        // console.log(pizza)
        updateCart(pizza)
    })
})

const alertMsg = document.querySelector('#success-alert')  //in all orders we want to hide success msg after 1 sec
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 1000)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   unable to connect below function thats why wrrithing the whole code here

// initAdmin()
function initAdmin() {
    const orderTableBody = document.querySelector('#orderTableBody')

    let orders = []
    let markup


    axios.get('/admin/orders', {                 //for ajax in admin orders
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        markup = generateMarkup(orders)     //custom function
        orderTableBody.innerHTML = markup
    }).catch(err => {
        console.log(err)
    })

    function itemList(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
            <p>${menuItem.item.name} - ${menuItem.qty} pcs </p>
            `
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.map(order => {

            return `
                                <tr>
                                    <td>
                                    <p> ${order._id}</p>
                                    <div>${itemList(order.items)} </div>
                                       </td>
                                    <td>
                                    ${order.customerId.name}
                                    </td>
                                    <td>
                                        <select name="status" id="orderStatus">
                                        <option value="order_placed" ${order.status === 'Order_placed' ? 'selected' : ''}> Order Placed</option>
                                        <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                                        <option value="prepared" ${order.status === 'prepared' ? 'selected' : ''}>Prepared</option>
                                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                                        </select>
                                    </td>
                                    <td>
                                    ${order.address}
                                    </td>
                                    <td>
                                    ${moment(order.createdAt).format('hh: mm A')}
                                    </td>
                                </tr>
            `
        }).join('')
    }

}
initAdmin()