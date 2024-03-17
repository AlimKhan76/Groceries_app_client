const { API } = require("../config/axios");

exports.addCouponApi = async (coupon) => {
    try {
        console.log(coupon)
        const { data } = await API.post("coupon/add", coupon)
        console.log("Coupon Added Successfully " + data)
        return data;

    } catch (error) {
        console.log("Error in adding coupon " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}

exports.useCouponApi = async (couponCode) => {
    try {
        console.log(couponCode)
        const { data } = await API.get(`coupon/use/${couponCode}`)
        console.log("Coupon Fetched Successfully " + data)
        return data;
    } catch (error) {
        console.log("Error in fetching coupon " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}

exports.deleteCouponApi = async (couponID) => {
    try {
        console.log(couponID)
        const { data } = await API.delete("coupon/use", couponID)
        console.log("Coupon Deleted Successfully " + data)
        return data;

    } catch (error) {
        console.log("Error in deleting coupon " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}

