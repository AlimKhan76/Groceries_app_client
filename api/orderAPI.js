const { API } = require("./config/axios");


exports.placeOrderAPI = async (orderData) => {
    try {
        const { data } = await API.post("order/placeOrder", orderData)
        console.log("Order Placed Successfully " + data)
        return data;

    } catch (error) {
        console.log("Error in placing orders " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}


exports.getAllUserOrdersAPI = async () => {
    try {
        const { data } = await API.get("order/getOrders")
        console.log("All the orders of the user are fetched successfully " + data)
        return data;
    } catch (error) {
        console.log("Error in fetching Orders of the user " + error)
        throw error?.response?.data?.message
    }
}


exports.cancelOrderAPI = async (orderId) => {
    try {
        const { data } = await API.post("order/cancelOrder", { orderId })
        console.log("Order cancelled " + data)
        return data
    } catch (error) {
        console.log(error)
        console.log("Error in cancelling order " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }

}


exports.reOrderAPI = async (orderData) => {
    try {
        const { data } = await API.post("order/reOrder", orderData)
        console.log("Order re-placed successfully " + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in Re-Ordering order " + error)
        throw error?.response?.data?.message
    }
}