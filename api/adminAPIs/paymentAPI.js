const { API } = require("../config/axios")


exports.getAllCustomerPayment = async () => {
    try {

        const { data } = await API.get("payment/getAllCustomerPayment")
        console.log("All the orders of the customers are fetched " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error in fetching all the payment details of all the customers")
        throw error?.response?.data?.message

    }
}

exports.getCustomerPayment = async (customerId) => {
    try {
        console.log(customerId)
        const { data } = await API.get(`payment/getCustomerPayment/${customerId}`)

        console.log("All the orders of " + customerId + " are fetched " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error in fetching all the payment details of " + customerId)
        throw error?.response?.data?.message

    }
}