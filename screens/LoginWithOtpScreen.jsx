import { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { getUniqueId } from 'react-native-device-info';
import { useMutation } from '@tanstack/react-query';
import { loginWithPhoneEmailOTPAPI } from '../api/userAPI';
import * as SecureStore from 'expo-secure-store';
import { Dialog } from 'react-native-alert-notification';

// Functional component
const LoginWithOtpScreen = ({ navigation }) => {
    // Local states
    const [deviceId, setDeviceId] = useState('');


    const { mutate } = useMutation({
        mutationFn: loginWithPhoneEmailOTPAPI,
        onError: (error) => {
            console.log(error)
        },
        onSuccess: async (data) => {
            console.log(data)
            if (data?.isNew === true) {
                navigation.replace("UserRegisterationPage", data?.contactNo)
            }
            else {
                await SecureStore.setItemAsync("token", data?.token)
                await SecureStore.setItemAsync("role", data?.role)
                Dialog.show({
                    type: 'SUCCESS',
                    title: 'Welcome Back',
                    autoClose: 500,
                    textBody: "Orders not allowed between 2AM and 11AM",
                    button: '',
                })
                if (data?.role === "admin") {
                    navigation.replace("Admin")
                }
                else {
                    navigation.replace('Main')
                }
            }

        }
    })

    // Declaring an object
    const userInfo = {
        iss: 'phmail',
        aud: 'user',
        country_code: '+91',
        phone_no: "8356857860"
        // phone_no: "8356857860"
    };

    // Declaring sign-in URL
    const URI = `https://auth.phone.email/sign-in?countrycode=${userInfo.country_code}&phone_no=${userInfo.phone_no}&redirect_url=&auth_type=4&device=${deviceId}`;


    // Hooks
    useEffect(() => {
        // Method to fetch device ID
        const fetchDeviceId = async () => {
            // Getting unique ID
            const id = await getUniqueId();

            // Updating state
            setDeviceId(id);

            // Log the device ID to the console
            // console.log('Device ID:', id);
        };

        fetchDeviceId();
    }, []);

    const phoneAuthJwt = event => {
        const encodedJWT = event.nativeEvent.data;
        console.log(encodedJWT)

        mutate(encodedJWT)



    };

    // Returning JSX
    return (
        <WebView
            style={{
                flex: 1,
            }}
            source={{ uri: URI }}
            onMessage={phoneAuthJwt}
            ref={webView => {
                this.webView = webView;
            }}
        />
    );
};

// Exporting
export default LoginWithOtpScreen;