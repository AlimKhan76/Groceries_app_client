const { API } = require("../config/axios");

exports.getOrdersByStatusAPI = async (pageParam, status) => {
    try {
        const { data } = await API.get(`adminOrder/getOrders/${status}/${pageParam}`)
        console.log("Fetched " + status + " products " + data)
        return data;

    } catch (error) {
        console.log("Error in fetching Pending Orders " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}


exports.updateOrderStatusAPI = async (order) => {
    try {
        const { data } = await API.post("adminOrder/updateOrder", {
            orderId: order?.orderId,
            status: order?.status
        })

        console.log("Order has been updated " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error in updating order status " + error?.response?.data?.message)
        throw error?.response?.data?.message

    }


}


exports.searchOrdersByCustomerNameAPI = async (pageParam, customerName) => {
    try {
        const { data } = await API.get(`adminOrder/getCustomerOrder/${customerName}/${pageParam}`)
        console.log(`Orders of ${customerName} are fetched successfully ` + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in fetching order by customer name " + error?.response?.data?.message)
        throw error?.response?.data?.message

    }
}


exports.markAllPendingOrdersAsDeliveredAPI = async () => {
    try {
        const { data } = await API.post("adminOrder/markAllPendingAsDelivered")
        console.log("All Pending Orders are marked as Delivered " + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in marking all pending orders as Delivered " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}