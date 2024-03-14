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

exports.changeFavouriteProduct = async (productData) => {
    try {
        const { data } = await API.post("product/addToFavourite", productData);
        console.log(data)
        return data;
    }
    catch (error) {
        console.log("Error in changing favourite product " + error.response.data.message)
        throw error.response.data.message
    }
}