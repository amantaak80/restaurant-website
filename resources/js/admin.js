// import axios from 'axios'

// function initAdmin() {
//     const orderTableBody = document.querySelector('#orderTableBody')

//     let orders = []
//     let markup


//     axios.get('/admin/orders', {                 //for ajax in admin orders
//         headers: {
//             "X-Requested-With": "XMLHttpRequest"
//         }
//     }).then(res => {
//         orders = res.data
//         markup = generateMarkup(orders)     //custom function
//         orderTableBody.innerHTML = markup
//     }).catch(err => {
//         console.log(err)
//     })

//     function generateMarkup(orders) {
//         return orders.map(order => {

//             return `
//             <tr>
//                     <th scope="col"><p>${order._id}</p></th>
//                     <th scope="col"><p>${order.customerId.name}</p></th>
//                     <th scope="col"><p>${order.address}</p></th>
//                     <th scope="col"><p>${order.mobile}</p></th>
//                     <th scope="col"><p>${order.createdAt}</p></th>

//                 </tr>
//             `
//         }).join('')
//     }

// }

// module.exports = initAdmin
// export default initAdmin