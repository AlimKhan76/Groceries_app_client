const { API } = require("./config/axios");


exports.placeOrderApi = async (orderData) => {
    try {
        const { data } = await API.post("order/placeOrder", orderData)
        console.log("Order Placed Successfully " + data)
        return data;

    } catch (error) {
        console.log("Error in placing orders " + error.response.data.message)
        throw error.response.data.message;

    }
}