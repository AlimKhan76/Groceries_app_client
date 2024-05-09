const { API } = require("../config/axios")


exports.updatePriceOfProductApi = async (products, priceCategory) => {
    try {
        const { data } = await API.post("adminProduct/updatePrice",  products, priceCategory )
        console.log("Prices of products are updated successfully " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error in Updating price of Products " + error?.response?.data?.message)
        throw error?.respones?.data?.message

    }
}

exports.getAllProductsPricesByCategoryApi = async (categoryName) => {
    try {
        const { data } = await API.get(`adminProduct/loadProducts/${categoryName}`)
        console.log("All the product prices are loaded of " + categoryName + " " + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Eroor in loading Product Prices by Category " + error?.response?.data?.message)
        throw error?.response?.data?.message

    }
}