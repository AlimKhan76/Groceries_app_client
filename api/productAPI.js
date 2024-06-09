const { API } = require("./config/axios")

exports.changeFavouriteProductAPI = async (productId) => {
    try {
        const { data } = await API.post("product/addToFavourite", productId);
        console.log(data)
        return data;
    }
    catch (error) {
        console.log("Error in changing favourite product " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}

exports.getProductByCategoryAPI = async (category, pageParam) => {
    try {
        const { data } = await API.get(`product/getByCategory/${category}/${pageParam}`)
        console.log(`All the products of ${category} are fetched ` + data)
        return data;
    }
    catch (error) {
        console.log(error)
        console.log(`Error in fetching products of  ${category}` + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}

exports.searchProductAPI = async (searchQuery) => {
    try {
        if (searchQuery.length > 0) {
            const { data } = await API.get(`product/search/?product=${searchQuery}`)
            console.log("Searched Product fetched " + data)
            console.log(data)
            return data;
        }
        return "";
    } catch (error) {
        console.log(error)
        console.log("Error in searching products " + error?.response?.data?.message)
        throw error?.response?.data?.message

    }
}