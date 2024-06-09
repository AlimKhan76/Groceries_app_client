import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import RNFS from 'react-native-fs';
import RNFetchBlob from "rn-fetch-blob";
import { Dialog } from "react-native-alert-notification";

const baseURL = "https://groceries-app-server.vercel.app/"
// const baseURL = "http://192.168.0.102:5000/"
// const baseURL = "http://192.168.29.107:5000/"

export const downloadInvoiceByOrderId = async (orderId) => {
    try {
        const token = await SecureStore.getItemAsync("token")
        RNFetchBlob.config(Platform.select({
            ios: {
                fileCache: true,
                notification: true,
                title: `Invoice`,
                path: RNFS.DocumentDirectoryPath + `/Invoice.pdf`,

            },
            android: {
                addAndroidDownloads: {
                    title: `Invoice`,
                    fileCache: true,
                    useDownloadManager: true,
                    // setting it to true will use the device's native download manager and will be shown in the notification bar.
                    notification: true,
                    path: RNFS.DownloadDirectoryPath + `/Invoice.pdf`,  // this is the path where your downloaded file will live in
                    description: 'Downloading Invoice.'
                }
            }
        })

        )
            .fetch("GET",
                `${baseURL}adminOrder/downloadInvoice/${orderId}`,
                {
                    Authorization: token
                })
            .then((res) => {
                // console.log(res)
                // the temp file path
                console.log("The file saved to ", res.path());
                Dialog.show({
                    type: "SUCCESS",
                    title: "Downloaded",
                    textBody: "Invoice downloaded",
                    autoClose: 1000
                })
                if (Platform.OS === "ios") {
                    RNFetchBlob.ios.openDocument(res.data);
                }
            })
            .catch((error) => {
                console.log(error)
                Dialog.show({
                    type: "DANGER",
                    title: "Error in downloading Orders",
                    textBody: "Please try again later",
                    autoClose: 1000
                })
            })
    }
    catch (err) {
        console.log(err)
        Dialog.show({
            type: "DANGER",
            title: "Error in downloading Invoice",
            textBody: "Please try again later",
            autoClose: 1000
        })
    }

}

export const downloadPendingInvoices = async () => {
    try {
        const token = await SecureStore.getItemAsync("token")
        RNFetchBlob.config(Platform.select({
            ios: {
                fileCache: true,
                notification: true,
                title: `Pending Invoices of ${new Date().toDateString()}`,
                path: RNFS.DocumentDirectoryPath + `/All Invoices.pdf`,

            },
            android: {
                addAndroidDownloads: {
                    title: `Pending Invoices of ${new Date().toDateString()}`,
                    fileCache: true,
                    useDownloadManager: true,
                    // setting it to true will use the device's native download manager and will be shown in the notification bar.
                    notification: true,
                    path: RNFS.DownloadDirectoryPath + `/All Invoices.pdf`,  // this is the path where your downloaded file will live in
                    description: 'Downloading Invoices.'
                }
            }
        })

        )
            .fetch("GET",
                `${baseURL}adminOrder/downloadPendingInvoices`,
                {
                    Authorization: token
                })
            .then((res) => {
                // console.log(res)
                // the temp file path
                console.log("The file saved to ", res.path());
                Dialog.show({
                    type: "SUCCESS",
                    title: "Downloaded Invoices",
                    textBody: "All Pending Invoices downloaded",
                    autoClose: 1000
                })
                if (Platform.OS === "ios") {
                    RNFetchBlob.ios.openDocument(res.data);
                }
            })
            .catch((error) => {
                console.log(error)
                Dialog.show({
                    type: "DANGER",
                    title: "Error in downloading Orders",
                    textBody: "Please try again later",
                    autoClose: 1000
                })
            })
    }
    catch (err) {
        console.log(err)
        Dialog.show({
            type: "DANGER",
            title: "Error in downloading Invoice",
            textBody: "Please try again later",
            autoClose: 1000
        })
    }

}

export const downloadCSVForPendingOrders = async () => {
    try {
        const token = await SecureStore.getItemAsync("token")
        RNFetchBlob.config(Platform.select({
            ios: {
                fileCache: true,
                notification: true,
                title: `orders-${new Date().toDateString()}`,
                path: RNFS.DocumentDirectoryPath + `/orders-${new Date().toDateString()}.csv`,

            },
            android: {
                addAndroidDownloads: {
                    title: `orders-${new Date().toDateString()}`,
                    fileCache: true,
                    useDownloadManager: true,
                    // setting it to true will use the device's native download manager and will be shown in the notification bar.
                    notification: true,
                    path: RNFS.DownloadDirectoryPath + `/orders-${new Date().toDateString()}.xlsx`,  // this is the path where your downloaded file will live in
                    description: 'Downloading orders files.'
                }
            }
        })

        )
            .fetch("GET",
                `${baseURL}adminOrder/downloadPendingOrders`,
                {
                    Authorization: token

                })
            .then((res) => {
                // the temp file path
                console.log("The file saved to ", res.path());
                Dialog.show({
                    type: "SUCCESS",
                    title: "Downloaded",
                    textBody: "Downloaded KOT List",
                    autoClose: 1000

                })
                if (Platform.OS === "ios") {
                    RNFetchBlob.ios.openDocument(res.data);
                }
            })
            .catch((error) => {
                console.log(error)
                Dialog.show({
                    type: "DANGER",
                    title: "Error in downloading Orders",
                    textBody: "Please try again later",
                    autoClose: 1000
                })
            })
    }
    catch (err) {
        console.log(err)
        Dialog.show({
            type: "DANGER",
            title: "Error in downloading Orders",
            textBody: "Please try again later",
            autoClose: 1000
        })
    }

}