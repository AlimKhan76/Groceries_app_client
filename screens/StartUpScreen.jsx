import { Image, StatusBar, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from "expo-secure-store"

const StartUpScreen = ({ navigation }) => {
    const logo = require("../assets/images/logo.png")


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


    // useEffect(() => {
    //     setInitialRoutes().then((route) => {
    //         navigation.navigate(route)
    //     })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    useFocusEffect(React.useCallback(() => {
        setInitialRoutes().then((route) => {
            navigation.navigate(route)
        })
            .catch((err) => {
                console.log(err)
            })
    }, []))


    return (

        <View className="flex-1 items-center justify-center bg-[#53B175] ">
            
            <View className=" flex-row items-center h-52 justify-center">

                <Image source={logo} className="aspect-auto" />

                <View className="flex-col items-center px-2">
                    <Text
                        className="font-base text-white text-6xl font-mulishsb">nectar</Text>
                    <Text className="text-white flex-col font-mulishr">
                        Delivering groceries to your doorstep
                    </Text>
                </View>

            </View>
        </View>
    )
}

export default StartUpScreen
