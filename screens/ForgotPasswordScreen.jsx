import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ImageBackground } from 'react-native'
import React from 'react'
import LeftArrow from '../assets/icons/account/left_arrow.svg'
import RightArrow from '../assets/icons/account/right_arrow.svg'

const ForgotPasswordScreen = ({ navigation }) => {
    return (
        <ImageBackground
        resizeMode='stretch'
        source={require("../assets/images/sign/background-top.png")}
         className='flex-1 px-5 '>

            <TouchableOpacity className="w-1/4 py-5 "
                onPress={() => { navigation.goBack() }}>
                <LeftArrow color="black" />
            </TouchableOpacity>

            <Text
                className="text-black text-2xl font-mulish-semibold my-5">
                Enter your mobile number
            </Text>


            <View className="gap-y-2 border-b-2 border-gray-200">
                <Text
                    className='text-gray-500 font-mulish-semibold text-base'>
                    Mobile Number
                </Text>

                <View className="flex-row items-center ">
                    <Text
                        className="text-black text-lg font-mulish-semibold">
                        +91
                    </Text>
                    <TextInput
                        className="text-black w-full text-lg font-mulish-semibold px-2"
                        keyboardType='numeric'
                        placeholder='Mobile Number'
                        placeholderTextColor={"gray"}
                    />
                </View>

            </View>

            <KeyboardAvoidingView
            behavior='position'
             className="absolute right-10 bottom-14  items-center w-fit">
                <TouchableOpacity 
                onPress={()=>navigation.navigate("OTPScreen")}
                
                className="bg-[#53B175] rounded-full px-6 py-5 items-center">
                    <RightArrow color="white" />
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </ImageBackground>
    )
}

export default ForgotPasswordScreen