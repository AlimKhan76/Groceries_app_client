const { API } = require("../config/axios")


exports.updatePriceOfProductApi = async (products) => {
    try {
        const { data } = await API.post("adminProduct/updatePrice", { products })
        console.log("Prices of products are updated successfully " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error in Updating price of Products " + error?.response?.data?.message)
        throw error?.respones?.data?.message

    }
}