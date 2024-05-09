const { API } = require("./config/axios")


exports.addToCartAPI = async (product) => {
    try {
        const { data } = await API.post("cart/add", { product })
        console.log("Product is Added to Cart " + data)
        return data;
    }
    catch (error) {
        console.log("Error in adding product to cart " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}


exports.removeFromCartAPI = async (productId) => {
    try {
        const { data } = await API.post("cart/remove", { productId })
        console.log("Product removed from cart " + data)
        return data;
    }
    catch (error) {
        console.log("Error in removing Product from cart " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}


exports.getItemsFromCartAPI = async () => {
    try {
        const { data } = await API.get("cart/get")
        console.log("Cart Items fetched successfully ")
        return data;
    } catch (error) {
        console.log("Error in fetching cart items" + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}