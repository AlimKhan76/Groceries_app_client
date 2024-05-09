import { View, Text, ImageBackground, Image, TouchableOpacity, StatusBar, BackHandler } from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const GetStartedScreen = ({ navigation }) => {
    return (
        <ImageBackground
            resizeMode='cover'
            source={require("../assets/images/onboarding-background.png")}
            className="flex-1 items-center justify-center">

            <View className=" absolute bottom-0 items-center mb-24 w-full">

                <Image source={require("../assets/images/logo.png")}
                    className="mb-2.5" />

                <Text
                    className="text-white font-mulish-semibold  m-2"
                    style={{
                        fontSize:responsiveFontSize(4)
                    }}>
                    Welcome to
                </Text>

                <Text className="text-white font-mulish-semibold  mb-3"
                style={{
                    fontSize:responsiveFontSize(3.5)
                }}>
                    Shri Biroba app
                </Text>

                <Text className="text-white font-mulish-medium mb-8">
                    Get your fresh groceries to your doorstep
                </Text>

                <TouchableOpacity
                    className="p-4 w-3/4 rounded-2xl items-center bg-[#53B175] "
                    onPress={() => navigation.replace("Login")}>
                    <Text className="text-white font-mulish-semibold text-lg">
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}

export default GetStartedScreen