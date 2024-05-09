const { default: RNFetchBlob } = require("rn-fetch-blob");
const { API } = require("../config/axios");
const { Platform } = require("react-native");
const SecureStore = require("expo-secure-store");
const RNFS = require('react-native-fs');


exports.fetchAllCustomerBalancesAPI = async (pageParam) => {
    try {
        const { data } = await API.get(`transaction/fetchAllBalances/${pageParam}`)
        console.log("All the balances of all the customers are fetched " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error in fetching all the balances of all the customers " + error?.response?.data?.message)
        throw error?.response?.data?.message

    }
}



exports.addTransactionToCustomerAPI = async (transactionData) => {
    try {
        const { data } = await API.post("transaction/addTransaction", transactionData)
        console.log("Transaction added successfully " + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in adding transaction to " + transactionData?.customerName)
        throw error?.response?.data?.message

    }
}


exports.fetchOverallBalanceAPI = async () => {
    try {
        const { data } = await API.get("transaction/getOverallBalance")
        console.log("The overall balance is fetched successfully " + data)
        return data;
    } catch (error) {
        console.log(error)
        console.log("Error in fetching the overall balance pending " + error?.response?.data?.message)
        throw error?.response?.data?.message

    }
}



exports.downloadTransactionsAPI = async (customerId, startDate, endDate) => {
    console.log(customerId, startDate, endDate)
    const token = await SecureStore.getItemAsync("token")
    RNFetchBlob.config(Platform.select({
        ios: {
            fileCache: true,
            notification: true,
            title: `transactions-${new Date().toDateString()}`,
            path: RNFS.DocumentDirectoryPath + `/orders-${new Date().toDateString()}.pdf`,

        },
        android: {
            addAndroidDownloads: {
                title: `customerTransactions-${new Date().toDateString()}`,
                fileCache: true,
                useDownloadManager: true,
                // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: true,
                path: RNFS.DownloadDirectoryPath + `/transactions-${new Date().toDateString()}.pdf`,  // this is the path where your downloaded file will live in
                description: 'Downloading Transactions files.'
            }

            // fileCache: true,
            // useDownloadManager: true,
            // // setting it to true will use the device's native download manager and will be shown in the notification bar.
            // notification: true,
            // path: RNFS.DownloadDirectoryPath + `/orders-${new Date().toDateString()}.csv`,  // this is the path where your downloaded file will live in
            // description: 'Downloading orders files.'
        }
    })

    )


        .fetch("GET",
            `https://groceries-app-server.vercel.app/transaction/downloadTransactionDetails/${customerId}/${startDate}/${endDate}`,
            {
                Authorization: token
            })
        .then((res) => {
            // the temp file path
            console.log(res.data)
            console.log("The file saved to ", res.path());
            if (Platform.OS === "ios") {
                RNFetchBlob.ios.openDocument(res.data);
            }
            return res?.data
        }).catch((err) => {
            console.log(err)
            throw err?.response?.data?.message
        })

}


// Below APIs are used both by the user and the admin
exports.getCustomerLatestBalanceAPI = async (customerId) => {
    try {
        const { data } = await API.get(`transaction/getCustomerBalance/${customerId}`)

        console.log("The balance of " + customerId + " is fetched " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error in fetching the Balance of " + customerId)
        throw error?.response?.data?.message

    }
}



exports.getTransactionsByTypeAPI = async (customerId, transactionType, pageParam) => {
    try {
        const { data } = await API.get(`transaction/getCustomerTransaction/${customerId}/${transactionType}/${pageParam}`)
        console.log("All the orders of " + customerId + " are fetched " + data)
        return data;

    } catch (error) {
        console.log(error)
        console.log("Error in fetching all the transaction details of " + customerId)
        throw error?.response?.data?.message

    }
}