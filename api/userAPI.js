import { API } from "./config/axios"

export const loginUserAPI = async (loginData) => {
    try {
        console.log(loginData)
        const { data } = await API.post("user/login", loginData)
        console.log(" User is logged in successfully " + data)
        return data;
    }
    catch (error) {
        console.log("Error in registering User " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}

export const getUserDataAPI = async () => {
    try {
        const { data } = await API.get("user/userData")
        console.log("User data is fetched successfully " + data)
        return data;
    }
    catch (error) {
        console.log("Error in fetching User data " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}
