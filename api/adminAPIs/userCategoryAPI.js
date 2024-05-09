const { API } = require("../config/axios");


exports.fetchAllPriceCategoryAPI = async () => {
    try {
        const { data } = await API.get("adminCategory/loadAllCategory")
        console.log("All the Price Category fetched successfully " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error  in loading all the user category " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}



exports.addPriceCategoryAPI = async (categoryName) => {
    try {
        const { data } = await API.post("adminCategory/add", { categoryName })
        console.log("New Category added successfully " + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in adding new user category " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}


exports.renamePriceCategoryAPI = async (categoryData) => {
    try {
        const { data } = await API.post("adminCategory/rename", categoryData)
        console.log("Category Renamed successfully " + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in renaming Price category " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}


exports.deletePriceCategoryAPI = async (categoryName) => {
    try {
        const { data } = await API.post("adminCategory/delete", { categoryName })
        console.log(" Category " + categoryName + " Deleted successfully " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error in deleting user category " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}



exports.fetchAllUserCategoryDetails = async () => {
    try {
        const { data } = await API.get("adminCategory/getAllUserDetails")
        console.log("All user category fetched successfully " + data)
        return data

    } catch (error) {
        console.log(error)
        console.log("Error in loading all user category " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}

exports.updateUserCategoryAPI = async (updatedCustomer) => {
    try {
        const { data } = await API.post("adminCategory/updateCategoryOfUser", { updatedCustomer })
        console.log(" All the users category updated successfully " + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in updating customer categories " + error?.response?.data?.message)
        throw error?.reponse?.data?.message

    }
}