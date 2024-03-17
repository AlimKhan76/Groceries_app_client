import { View, Text, ImageBackground, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'

const GetStartedScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require("../assets/images/onboarding-background.png")}
            className="flex-1 items-center justify-center">

            <StatusBar animated={true} hidden showHideTransition={true} />
            
            <View className=" absolute bottom-0 items-center mb-24 w-full">

                <Image source={require("../assets/images/logo.png")}
                    className="mb-2.5" />

                <Text className="text-white  font-mulish-sem-mediumbold text-4xl m-2">
                    Welcome
                </Text>
                <Text className="text-white font-mulish-semibold text-4xl mb-3">to our store</Text>
                <Text className="text-white font-mulish-medium mb-8" >Get your groceries to your doorstep</Text>
                <TouchableOpacity
                    className="p-5 w-3/4 rounded-2xl items-center bg-[#53B175] "
                    onPress={() => navigation.replace("Login")}
                >

                    <Text className="text-white font-mulish-semibold text-xl">Get Started</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}

export default GetStartedScreen