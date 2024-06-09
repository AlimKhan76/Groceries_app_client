import axios from "axios"
import * as SecureStore from 'expo-secure-store';

export const API = axios.create({
    // http://192.168.217.35:5000/
    // baseURL: "http://192.168.29.107:5000/"
    baseURL: "https://groceries-app-server.vercel.app/"
})

API.interceptors.request.use(async function (config) {
    try {
        if (config.url.startsWith("/login") || config.url.startsWith("/register")) {
            return config
        }
        const token = await SecureStore.getItemAsync("token")
        config.headers.Authorization = token ? token : "";
        return config;
    }
    catch (err) {
        console.log("Error in setting authorization headers " + err)
        return config;
    }
});
