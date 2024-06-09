const { API } = require("../config/axios")


exports.updatePriceOfProductApi = async (products, priceCategory) => {
    try {
        const { data } = await API.post("adminProduct/updatePrice", products, priceCategory)
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


exports.getAllProductAvailabilityAPI = async () => {
    try {
        const { data } = await API.get("adminProduct/loadProductsAvailability")
        console.log("All Products are fetched ")
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in fetching products availability " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}

exports.updateProductAvailabilityAPI = async (products) => {
    try {
        // throw "Something went wrong on the server"
        const { data } = await API.post("adminProduct/updateAvailability", { products })
        console.log("Products availability are updated ")
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in fetching products availability " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}


exports.addProductAPI = async (productData) => {
    try {
        const { data } = await API.post("adminProduct/add", productData)
        console.log("Product Added Successfully " + data)
        return data

    } catch (error) {
        console.log(error)
        console.log("Error in adding Product " + error?.response?.data?.message)
        throw error?.response?.data?.message

    }
}