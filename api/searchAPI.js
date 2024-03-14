const { API } = require("./config/axios")

exports.searchApi = async (searchQuery) => {
    try {
        if (searchQuery.length > 0) {
            const { data } = await API.get(`/search/?product=${searchQuery}`)
            console.log("Searched Product fetched " + data)
            console.log(data)
            return data;
        }
        return "";
    } catch (error) {
        console.log("Error in searching products " + error.response.data.message)
        throw error.response.data.message

    }
}