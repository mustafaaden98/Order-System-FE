import {GET_ORDERS, GET_ITEMS_PER_ORDER, CREATE_ORDER, SEARCH_ORDERS, DELETE_ORDER, UPDATE_ORDER} from "../actions/constants"


const INITIAL_STATE = {
    orders:[]
}

export default function ordersReducer(state = INITIAL_STATE, {type, payload}) {
    switch(type){
        case  GET_ORDERS : 
            return {...state, orders: payload}
        case GET_ITEMS_PER_ORDER: 
        if(payload.length){
            let updatedOrders = state.orders.map((order, index) => {
                if(order.id == payload[0].orderId){
                    order['items'] = payload
                }
                return order
            });

            return {...state, orders: [...updatedOrders]}
        }
        else {
            return state
        }
        case CREATE_ORDER :
            let test = state.orders;
            test.push(payload)
            return {...state, orders: test}
        case SEARCH_ORDERS :
            return {...state, orders: payload}
        case DELETE_ORDER:
            return {...state, orders: payload}
        case UPDATE_ORDER:
            let updatedOrder = state.orders.map((order, index) => {
                if(order.id == payload.id){
                    return payload
                }
                else {
                    return order
                }
            })
            return {...state, orders: updatedOrder}
        default : return state
    }
}