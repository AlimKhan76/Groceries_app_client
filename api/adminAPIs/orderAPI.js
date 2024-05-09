const { API } = require("../config/axios");

exports.getOrdersByStatusAPI = async (pageParam, status) => {
    try {
        const { data } = await API.get(`adminOrder/getOrders/${status}/${pageParam}`)
        console.log("Fetched " + status + " products " + data)
        return data;

    } catch (error) {
        console.log("Error in fetching Pending Orders " + error?.response?.data?.message)
        throw error?.response?.data?.message;
    }
}

// exports.downloadPendingOrders = async () => {
//     try {
//         // const url = 'https://http://192.168.0.106:3000/adminOrder/downloadPendingOrders';
//         // const filePath = RNFS.DocumentDirectoryPath + '/order.csv';

//         // RNFS.downloadFile({
//         //     fromUrl: url,
//         //     toFile: filePath,
//         //     background: true, // Enable downloading in the background (iOS only)
//         //     discretionary: true, // Allow the OS to control the timing and speed (iOS only)
//         //     progress: (res) => {
//         //       // Handle download progress updates if needed
//         //       const progress = (res.bytesWritten / res.contentLength) * 100;
//         //       console.log(`Progress: ${progress.toFixed(2)}%`);
//         //     },
//         //   })
//         //     .promise.then((response) => {
//         //       console.log('File downloaded!', response);
//         //     })
//         //     .catch((err) => {
//         //       console.log('Download error:', err);
//         //     });

//         // const data = await API.get("adminOrder/downloadPendingOrders")
//         // console.log(data)
//         // return data;

//     } catch (error) {
//         console.log("Error in downloading Pending Orders " + error?.response?.data?.message)
//         throw error?.response?.data?.message;

//     }
// }


exports.updateOrderStatusAPI = async (order) => {
    try {
        const { data } = await API.post("adminOrder/updateOrder", {
            orderId: order?.orderId,
            status: order?.status
        })

        console.log("Order has been updated " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error in updating order status " + error?.response?.data?.message)
        throw error?.response?.data?.message

    }


}


exports.searchOrdersByCustomerNameAPI = async (pageParam, customerName) => {
    try {
        const { data } = await API.get(`adminOrder/getCustomerOrder/${customerName}/${pageParam}`)
        console.log(`Orders of ${customerName} are fetched successfully ` + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in fetching order by customer name " + error?.response?.data?.message)
        throw error?.response?.data?.message

    }
}


exports.markAllPendingOrdersAsDeliveredAPI = async () => {
    try {
        const { data } = await API.post("adminOrder/markAllPendingAsDelivered")
        console.log("All Pending Orders are marked as Delivered " + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in marking all pending orders as Delivered " + error?.response?.data?.message)
        throw error?.response?.data?.message
    }
}