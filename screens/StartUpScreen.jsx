import { Image, StatusBar, Text, View } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import * as SecureStore from "expo-secure-store"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const StartUpScreen = ({ navigation }) => {
    const logo = require("../assets/images/logo.png")

    // Checking for token if present in localStorage of device, to see if the user is logged in
    const setInitialRoutes = async () => {
        const token = await SecureStore.getItemAsync("token")
        const role = await SecureStore.getItemAsync("role")

        if (token) {
            if (role === 'admin') {
                return 'Admin'
            }
            else {
                return "Main";
            }
        }
        else {
            return "GetStartedScreen"
        }
    }

    // Redirecting after a timeout for the splash screen
    useFocusEffect(React.useCallback(() => {
        setTimeout(() => {
            setInitialRoutes().then((route) => {
                navigation.replace(route)
            })
                .catch((err) => {
                    console.log(err)
                })
        }, 400)
    }, []))


    return (
        <View className="flex-1 items-center justify-center bg-[#53B175] ">

            <StatusBar backgroundColor={"#53B175"} barStyle={'light-content'} />

            <View className=" flex-row items-center justify-center">
                <Image source={logo}
                    resizeMode='cover'
                    style={{
                        width: responsiveWidth(15),
                        height: responsiveHeight(8)
                    }} />

                <View className="flex-col items-center px-2">
                    <Text
                        className="text-white font-mulish-semibold"
                        style={{ fontSize: responsiveFontSize(4) }}>
                        Biroba Vegetables
                    </Text>

                    <Text className="text-white flex-col font-mulish-regular"
                        style={{
                            fontSize: responsiveFontSize(1.5)
                        }}>
                        Delivering groceries for your needs
                    </Text>
                </View>

            </View>
        </View>
    )
}

export default StartUpScreen
