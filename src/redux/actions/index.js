import axios from "axios";
import {GET_ORDERS, GET_ITEMS_PER_ORDER, CREATE_ORDER, SEARCH_ORDERS, DELETE_ORDER, UPDATE_ORDER} from "./constants";

const url = "http://localhost:5000/graphql";


export const getOrders = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.post(url,{
            query: `
                query{
                    getOrders{
                    id
                    customerName
                    customerAddress
                    orderDate
                    shipDate
                    shippingTax
                    totalTax
                    totalOrderAmount
                    grossOrderAmount
                    }
                }
            `
        } ).then(response => {
            dispatch({
                type : GET_ORDERS,
                payload: response.data.data.getOrders
            });
            resolve(response);
        })
    })
}

// export const createOrder = (orderObj, items) => (dispatch) => {
//     console.log("orderObj: " + orderObj);
//     console.log("items", items);
//     const {customerName, customerAddress, orderDate,grossOrderAmount,shippingTax,totalTax,shipDate,totalOrderAmount} = orderObj;
//     return new Promise((resolve, reject) => {
//         axios.post(url,{
//             query: `
//                 mutation{
//                     addOrder(customerName:"${customerName}", customerAddress: "${customerAddress}", 
//                         orderDate:"${orderDate}", grossOrderAmount:${grossOrderAmount}, shippingTax:${shippingTax}, totalTax:${totalTax},
//                         shipDate : "${shipDate}", totalOrderAmount:${totalOrderAmount}, itemsL : ${items}){
//                         customerName
//                       }
//                 }
//             `
//         } ).then(response => {
//             dispatch({
//                 type : CREATE_ORDER,
//                 payload: response.data.data.getItems
//             });
//             resolve(response);
//         })
//     })
// }

export const createOrder = (orderObj, items) => (dispatch) => {

    const {customerName, customerAddress, orderDate,grossOrderAmount,shippingTax,totalTax,shipDate,totalOrderAmount} = orderObj;
    return new Promise((resolve, reject) => {
        axios.post(url,
 
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            query: `
                mutation test($customerName: String, $customerAddress: String, $orderDate: String, $grossOrderAmount: Float, $shippingTax: Float, $totalTax: Float, $shipDate: String, $totalOrderAmount: Float,
                    $itemsL : [ItemList]){
                    addOrder(customerName: $customerName, customerAddress: $customerAddress, orderDate: $orderDate, grossOrderAmount: $grossOrderAmount, shippingTax:$shippingTax, totalTax: $totalTax, shipDate: $shipDate, totalOrderAmount: $totalOrderAmount,
                        itemsL : $itemsL){
                            id
                            customerName
                            customerAddress
                            orderDate
                            shipDate
                            shippingTax
                            totalTax
                            totalOrderAmount
                            grossOrderAmount
                            items{
                                itemDescription
                                quantity
                                rate
                              }
                    }
                }`
                , 
                variables: {
                    customerName: `${customerName}`,
                    customerAddress: `${customerAddress}`,
                    orderDate: `${orderDate}`,
                    grossOrderAmount: parseFloat(grossOrderAmount),
                    shippingTax: parseFloat(shippingTax),
                    totalTax: parseFloat(totalTax),
                    shipDate: `${shipDate}`,
                    totalOrderAmount: parseFloat(totalOrderAmount), 
                    itemsL: [...items],
                }
            
        } ).then(response => {
            dispatch({
                type : CREATE_ORDER,
                payload: response.data.data.addOrder
            });
            resolve(response);
        })
    })
}



export const getItemsPerOrder = (orderId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.post(url,{
            query: `
                query{
                    getItems(orderId:${orderId}){
                        orderId
                        itemCode
                        itemDescription
                        quantity
                        rate
                        tax
                      }
                }
            `
        } ).then(response => {
            dispatch({
                type : GET_ITEMS_PER_ORDER,
                payload: response.data.data.getItems
            });
            resolve(response);
        })
    })
}

export const searchOrder = (search) => dispatch =>  {
    return new Promise((resolve, reject) => {
        axios.post(url, {
            query: `
                query getFilteredOrders($search: String){
                    getFilteredOrder(search : $search){
                        id
                        customerName
                        customerAddress
                        orderDate
                        shipDate
                        shippingTax
                        totalTax
                        totalOrderAmount
                        grossOrderAmount
                    }
                }
            `, 
            variables: {
                search: search,
            }
        }).then(response => {
            dispatch({
                type : SEARCH_ORDERS,
                payload: response.data.data.getFilteredOrder
            });
            resolve(response);
        })
    })
}
export const deleteOrder = (orderId) => dispatch =>  {
    return new Promise((resolve, reject) => {
        axios.post(url, {
            query: `
                mutation deleteOrder($id: Int!){
                    deleteOrder(id : $id){
                        id
                        customerName
                        customerAddress
                        orderDate
                        shipDate
                        shippingTax
                        totalTax
                        totalOrderAmount
                        grossOrderAmount
                    }
                }
            `, 
            variables: {
                id: parseInt(orderId)
            }
        }).then(response => {
            dispatch({
                type : DELETE_ORDER,
                payload: response.data.data.deleteOrder
            });
            resolve(response);
        })
    })
}
export const updateOrder = (orderId, customerName, customerAddress) => dispatch =>  {
    return new Promise((resolve, reject) => {
        axios.post(url, {
            query: `
                mutation updateOrder($id: Int!, $customerName: String, $customerAddress: String){
                    updateOrder(id : $id, customerName : $customerName, customerAddress: $customerAddress){
                        id
                        customerName
                        customerAddress
                        orderDate
                        shipDate
                        shippingTax
                        totalTax
                        totalOrderAmount
                        grossOrderAmount
                    }
                }
            `, 
            variables: {
                id: parseInt(orderId),
                customerName : customerName, 
                customerAddress : customerAddress
            }
        }).then(response => {
            dispatch({
                type : UPDATE_ORDER,
                payload: response.data.data.updateOrder
            });
            resolve(response);
        })
    })
}