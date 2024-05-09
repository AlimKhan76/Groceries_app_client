import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const OrderAcceptedScreen = ({ navigation }) => {
    useFocusEffect(React.useCallback(() => {
        setTimeout(() => {
            navigation.navigate("Shop");
        }, 3000)
    }, []))

    return (
        <ImageBackground
            source={require("../../assets/images/order_accepted/background-accepted.png")}
            className="flex-1 items-center justify-center px-10">

            <Image
                className="self-center"
                style={{
                    width: responsiveWidth(70),
                    height: responsiveHeight(30)
                }}
                source={require("../../assets/images/order_accepted/success.png")}
            />

            <View className="py-10">
                <Text
                    className="text-black pb-6 text-center font-mulish-semibold"
                    style={{
                        fontSize: responsiveFontSize(3)
                    }}>

                    Your Order has been placed
                </Text>
                <Text
                    className="text-gray-600 text-center font-mulish-medium"
                    style={{
                        fontSize: responsiveFontSize(1.85)
                    }}>
                    Your order has been placed and is on it's way to being processed
                </Text>
            </View>


            <TouchableOpacity
                onPress={() => navigation.navigate("Shop")}
                className="bg-[#53B175] w-full p-4 rounded-2xl mt-14">
                <Text className="text-white text-center text-xl font-mulish-medium"
                    style={{
                        fontSize: responsiveFontSize(2.25)
                    }}>
                    Back to home
                </Text>
            </TouchableOpacity>
            <Text
                className="text-gray-600 text-center font-mulish-medium text-sm p-5"
                style={{
                    fontSize: responsiveFontSize(1.5)
                }}>
                You will be redirected to home shortly
            </Text>




        </ImageBackground>

    )
}

export default OrderAcceptedScreen