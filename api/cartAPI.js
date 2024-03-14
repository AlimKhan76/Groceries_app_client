const { API } = require("./config/axios")

exports.addToCartApi = async (product) => {
    try {
        const { data } = await API.post("cart/add", { product })
        console.log("Product is Added to Cart Successfully " + data)
        return data;
    }
    catch (error) {
        console.log("Error in adding product to cart " + error.response.data.message)
        throw error.response.data.message
    }
}


exports.removeFromCart = async (productId) => {
    try {
        const { data } = await API.post("cart/remove", { productId })
        console.log("Product removed from cart " + data)
        return data;
    }
    catch (error) {
        console.log("Error in removing Product from cart " + error.response.data.message)
        throw error.response.data.message
    }

}


exports.getItemsFromCartApi = async () => {
    try {
        const { data } = await API.get("cart/get")
        console.log("Cart Items fetched successfully ", data)
        return data;
    } catch (error) {
        console.log("Error in fetching cart items" + error.response.data.message)
        throw error.response.data.message

    }
}