import axios from "axios";
const url = "http://localhost:5000/graphql";



export const getOrders = () => {
    axios({
        url,
        method: "POST",
        data:{
            query: `
            query{
                getOrders{
                  customerName
                  customerAddress
                  orderDate
                  shipDate
                  shippingTax
                  totalTax
                  totalOrderAmount
                }
              }
            `
        }
    })
}