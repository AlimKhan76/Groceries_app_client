const { API } = require("./config/axios")

exports.getBestSellingProducts = async () => {
    try {

        const { data } = await API.get("product/bestSelling")
        console.log("All the best selling products are fetched " + data)
        return data;
    }
    catch (error) {
        console.log("Error in fetching best selling products " + error.response.data.message)
        throw error.response.data.message
    }
}

exports.changeFavouriteProduct = async (productId) => {
    try {
        const { data } = await API.post("product/addToFavourite", productId);
        console.log(data)
        return data;
    }
    catch (error) {
        console.log("Error in changing favourite product " + error.response.data.message)
        throw error.response.data.message
    }
}

exports.getProductByCategory = async (category) => {
    try {
        console.log(category)
        const { data } = await API.get(`product/getByCategory/${category}`)
        console.log(`All the products of ${category} are fetched` + data)
        return data;
    }
    catch (error) {
        console.log(`Error in fetching products of  ${category}` + error.response.data.message)
        throw error.response.data.message
    }
}