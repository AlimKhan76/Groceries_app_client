import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'

const OrderAcceptedScreen = ({ navigation }) => {
    useFocusEffect(React.useCallback(() => {
        setTimeout(() => {
            navigation.navigate("Shop");
        }, 1000)
    },[]))
    return (
        <ImageBackground
            source={require("../../assets/images/order_accepted/background-accepted.png")}
            className="flex-1 items-center justify-center px-10">

            <Image
                source={require("../../assets/images/order_accepted/success.png")}
            />

            <View className="py-10">
                <Text
                    className="text-black pb-6 text-3xl text-center font-mulish-semibold">
                    Your Order has been accepted
                </Text>
                <Text
                    className="text-gray-600 text-center font-mulish-medium text-base">
                    Your items has been placed ans is on it's way to being processed
                </Text>
            </View>


            <TouchableOpacity
                onPress={() => navigation.navigate("Shop")}
                className="bg-[#53B175] w-full p-5 rounded-2xl mt-14">
                <Text className="text-white text-center text-xl font-mulish-medium">
                    Back to home
                </Text>
            </TouchableOpacity>




        </ImageBackground>

    )
}

export default OrderAcceptedScreen