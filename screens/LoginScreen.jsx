import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import firebase from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const LoginScreen = ({ navigation }) => {
    const [confirm, setConfirm] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState("")


    const signInWithPhoneNumber = async (phoneNumber) => {
        try {
            Keyboard.dismiss()
            setLoading(true)
            const confirmation = await firebase().signInWithPhoneNumber("+91 " + phoneNumber);
            setConfirm(confirmation);
            setLoading(false)
            navigation.replace("OTPScreen", { confirmation, phoneNumber })
        } catch (phoneAuthError) {
            setError(phoneAuthError?.message?.split("]")[1]?.split(".")[0])
            setLoading(false)
            console.log(phoneAuthError?.message)
            console.log(phoneAuthError?.code)
        }
    }

    return (
        <SafeAreaView className="bg-white flex-1">

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    className="bg-white"
                    scrollEnabled={false}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableOnAndroid={true}
                    extraScrollHeight={responsiveHeight(12)}
                    extraHeight={responsiveHeight(12)}
                >

                    <Image
                        resizeMode='cover'
                        style={{ height: responsiveHeight(50) }}
                        source={require("../assets/images/sign-in-background.png")}
                    />
                    <Text
                        style={{
                            width: responsiveWidth(75),
                            fontSize: responsiveFontSize(3.25),
                            marginHorizontal: responsiveWidth(6),
                        }}
                        className='text-black font-mulish-semibold'>
                        Get your groceries with Shri Biroba
                    </Text>


                    <View
                        className={`flex-row border-b-2 
                        ${error !== null ? "border-red-500" : 'border-gray-300'} 
                        items-center mx-5 `}
                        style={{
                            paddingVertical: responsiveHeight(0.5),
                            marginVertical: responsiveHeight(2)
                        }}>

                        <Text
                            className='text-black px-2 font-mulish-medium'
                            style={{
                                fontSize: responsiveFontSize(1.75)
                            }}>
                            +91
                        </Text>

                        <TextInput
                            style={{
                                width: responsiveWidth(75),
                                fontSize: responsiveFontSize(1.75)
                            }}
                            value={phoneNumber}
                            onChangeText={(e) => {
                                setPhoneNumber(e)
                                setError(null)
                            }}
                            maxLength={10}
                            className='text-black font-mulish-medium'
                            keyboardType='numeric'
                            placeholder='Mobile Number'
                            placeholderTextColor={"black"}
                        />
                    </View>

                    {error !== null &&
                        <Text className="text-red-500 "
                            style={{
                                fontSize: responsiveFontSize(1.5),
                                marginHorizontal: responsiveWidth(6),
                            }}>
                            {error} Please try again later
                        </Text>
                    }

                    <TouchableOpacity
                        disabled={isLoading || phoneNumber.length < 10 && true}
                        onPress={() => signInWithPhoneNumber(phoneNumber)}
                        className={`${phoneNumber.length < 10 && "opacity-50"}
                     mx-5 my-8 p-5 rounded-2xl bg-[#53B175]`}>

                        {isLoading ?
                            <ActivityIndicator color='white' size={"small"}
                                style={{ paddingVertical: responsiveHeight(0.5) }} />
                            :
                            <Text
                                style={{
                                    fontSize: responsiveFontSize(2.25)
                                }}
                                className="text-center text-white font-mulish-semibold">
                                Login with OTP
                            </Text>
                        }
                    </TouchableOpacity>

                    {/* <Text
                        className="text-center text-[#828282] font-mulish-semibold text-sm">
                        An OTP will be sent to your phone number
                    </Text> */}

                    {/* 
            <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                className='bg-[#4A66AC] p-5 m-4 rounded-2xl'>
                <Text
                    className='text-center text-white font-mulish-semibold text-lg'>
                    Sign in later
                </Text>
            </TouchableOpacity> */}

                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>

        </SafeAreaView >
    )
}

export default LoginScreen