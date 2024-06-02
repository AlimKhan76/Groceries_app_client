import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import RNFS from 'react-native-fs';
import RNFetchBlob from "rn-fetch-blob";
import { Dialog } from "react-native-alert-notification";

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
                `https://groceries-app-server.vercel.app/adminOrder/downloadInvoice/${orderId}`,
                // `http://192.168.0.102:5000/adminOrder/downloadInvoice/${orderId}`,
                {
                    Authorization: token
                })
            .then((res) => {
                // console.log(res)
                // the temp file path
                console.log("The file saved to ", res.path());
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

export const downloadPendingInvoices = async (orderId) => {
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
                `https://groceries-app-server.vercel.app/adminOrder/downloadPendingInvoices`,
                // `http://192.168.0.102:5000/adminOrder/downloadPendingInvoices`,
                {
                    Authorization: token
                })
            .then((res) => {
                // console.log(res)
                // the temp file path
                console.log("The file saved to ", res.path());
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