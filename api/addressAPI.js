const { API } = require("./config/axios")

exports.addAddressAPI = async (address) => {
    try {
        const { data } = await API.post("address/add", { address })
        console.log("Address added successfully " + data)
        return data;
    } catch (error) {
        console.log("Error in adding address " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}


exports.getUserAddressAPI = async () => {
    try {
        const { data } = await API.get("address/get")
        console.log(" User Addresses fetched successfully " + data)
        return data

    } catch (error) {
        console.log("Error in Fetching addresses " + error?.response?.data?.message)
        throw error?.response?.data?.message;

    }
}


exports.deleteAddressAPI = async (address) => {
    try {
        const { data } = await API.post("address/delete", { address })
        console.log("Address deleted successfully " + data)
        return data;
    } catch (error) {
        console.log("Error in Deleting the user address " + error?.respones?.data?.message)
        throw error?.response?.data?.message
    }
}


exports.editAddressAPI = async (addressData) => {
    try {
        const { data } = await API.post("address/edit", addressData)
        console.log("Address edited successfully " + data)
        return data;
    } catch (error) {
        console.log("Error in Editing the user address " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}