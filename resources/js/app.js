import axios from 'axios';
import Noty from "noty";


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