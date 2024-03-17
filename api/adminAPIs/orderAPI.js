const { API } = require("../config/axios");


exports.getPendingProducts = async () => {
    try {
        const { data } = await API.get("adminOrder/getPendingOrders")
        console.log("Fetched pending products " + data)
        return data;

    } catch (error) {
        console.log("Error in fetching Pending Orders " + error?.response?.data?.message)
        throw error?.response?.data?.message;

    }
}

exports.getProcessedProducts = async () => {
    try {
        const { data } = await API.get("adminOrder/getProcessedOrders")
        console.log("Fetched Processed products " + data)
        return data;

    } catch (error) {
        console.log("Error in fetching Processed Orders " + error?.response?.data?.message)
        throw error?.response?.data?.message;

    }
}

exports.getPackedProducts = async () => {
    try {
        const { data } = await API.get("adminOrder/getPackedOrders")
        console.log("Fetched packed products " + data)
        return data;

    } catch (error) {
        console.log("Error in fetching packed Orders " + error?.response?.data?.message)
        throw error?.response?.data?.message;

    }
}

exports.downloadPendingOrders = async () => {
    try {
        // const url = 'https://http://192.168.0.106:3000/adminOrder/downloadPendingOrders';
        // const filePath = RNFS.DocumentDirectoryPath + '/order.csv';

        // RNFS.downloadFile({
        //     fromUrl: url,
        //     toFile: filePath,
        //     background: true, // Enable downloading in the background (iOS only)
        //     discretionary: true, // Allow the OS to control the timing and speed (iOS only)
        //     progress: (res) => {
        //       // Handle download progress updates if needed
        //       const progress = (res.bytesWritten / res.contentLength) * 100;
        //       console.log(`Progress: ${progress.toFixed(2)}%`);
        //     },
        //   })
        //     .promise.then((response) => {
        //       console.log('File downloaded!', response);
        //     })
        //     .catch((err) => {
        //       console.log('Download error:', err);
        //     });
        
        // const data = await API.get("adminOrder/downloadPendingOrders")
        // console.log(data)
        // return data;

    } catch (error) {
        console.log("Error in downloading Pending Orders " + error?.response?.data?.message)
        throw error?.response?.data?.message;

    }
}