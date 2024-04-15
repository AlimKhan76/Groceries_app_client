const { API } = require("./config/axios");


exports.placeOrderApi = async (orderData) => {
    try {
        const { data } = await API.post("order/placeOrder", orderData)
        console.log("Order Placed Successfully " + data)
        return data;

    } catch (error) {
        console.log("Error in placing orders " + error.response.data.message)
        throw error?.response?.data?.message;

    }
}


exports.getAllOrdersApi = async () => {
    try {
        const { data } = await API.get("order/getOrders")
        console.log("All the orders of users are fetched successfully " + data)
        return data;
    } catch (error) {
        console.log("Error in fetching Orders for user " + error)
        throw error?.response?.data?.message
    }
}


exports.cancelOrderApi = async (orderId) => {
    try {
        const { data } = await API.post("order/cancelOrder", { orderId })
        console.log("Order cancelled " + data)
        return data
    } catch (error) {
        console.log(error)
        console.log("Error in cancelling order " + error)
        throw error?.response?.data?.message

    }

}


exports.reOrderApi = async (orderData) => {
    try {
        const { data } = await API.post("order/reOrder", orderData)
        console.log("Order re-placed successfully " + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in reOrdering order " + error)
        throw error?.response?.data?.message


    }

}