const { API } = require("./config/axios")


exports.addAddressApi = async (address) => {
    try {
        const { data } = await API.post("address/add", { address })
        console.log("Address added successfully " + data)
        return data;
    } catch (error) {
        console.log("Error in adding address " + error.response.data.message)
        throw error.response.data.message
    }
}

exports.getAddresses = async () => {
    try {
        const { data } = await API.get("address/get")
        console.log("Addresses fetched successfully " + data)
        return data

    } catch (error) {
        console.log("Error in Fetching addresses " + error.response.data.message)
        throw error.response.data.message;

    }
}