import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const LandingScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="bg-white flex-1">
            <Image
            className="h-2/5"
            resizeMode='cover'
                source={require("../assets/images/sign-in-background.png")}
            />
            <Text
                className='text-black font-mulish-semibold text-2xl p-5 w-3/4'>
                Get your groceries with nectar
            </Text>
          

                <View className='flex-row border-b-2 border-b-gray-200 items-center mx-5 py-2'>
                    <Text
                        className='text-lg text-black px-2 font-mulish-medium'>
                        +91
                    </Text>

                    <TextInput
                        className='text-lg text-black font-mulish-medium w-full '
                        keyboardType='numeric'
                        placeholder='mobile Number'
                    />
                </View>
                <TouchableOpacity
                    className="bg-[#53B175] m-4 p-5 rounded-2xl ">
                    <Text
                        className="text-center text-white text-lg font-mulish-semibold">
                        Login with OTP
                    </Text>
                </TouchableOpacity>

                <Text
                    className="text-center text-[#828282] font-mulish-semibold text-sm">
                    or
                </Text>


                <TouchableOpacity
                onPress={()=>navigation.navigate("SignUp")}
                    className='bg-[#4A66AC] p-5 m-4 rounded-2xl'>
                    <Text
                        className='text-center text-white font-mulish-semibold text-lg'>
                        Sign up using your mobile number
                    </Text>
                </TouchableOpacity>


        </SafeAreaView>
    )
}

export default LandingScreen