import { View, Text, TouchableOpacity, TextInput, ImageBackground, TouchableWithoutFeedback, Keyboard, } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { loginUserAPI } from '../api/userAPI'
import { useMutation } from '@tanstack/react-query'
import { Dialog } from 'react-native-alert-notification'
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, Appbar } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const UserRegisterationPage = () => {
    const navigation = useNavigation()
    const [name, setName] = useState("");

    const { params } = useRoute();

    const { mutate, isPending: loggingIn, error, isError } = useMutation({
        mutationKey: ["login"],
        mutationFn: loginUserAPI,
        onSuccess: async (data) => {
            await SecureStore.setItemAsync("token", data?.token)
            await SecureStore.setItemAsync("role", data?.role)

            Dialog.show({
                type: 'SUCCESS',
                title: 'Welcome',
                autoClose: 500,
                textBody: "Order before 10pm for next day delivery",
                button: '',
            })
            if (data?.role === "admin") {
                navigation.replace("Admin")
            }
            else {
                navigation.replace('Main')
            }
        },
        onError: (error) => {
            Dialog.show({
                type: 'DANGER',
                title: 'Error',
                autoClose: 1000,
                textBody: error,
                button: 'Close',
            })
        }
    })

    return (
        <ImageBackground
            resizeMode='cover'
            source={require("../assets/images/sign/background-top.png")}
            className='flex-1 px-5 '>

            <Appbar.Header
                mode='center-aligned'
                style={{
                    backgroundColor: 'transparent',
                    height: responsiveHeight(10),
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}>

                {/* <Appbar.BackAction
                    iconColor='black'
                    onPress={() => navigation.goBack()} /> */}

                <Appbar.Content
                    title="Enter your Name"
                    titleStyle={{
                        fontFamily: "Mulish-Bold",
                        fontSize: responsiveFontSize(3),
                        color: "black"
                    }} />

            </Appbar.Header>



            {/* Form area Start */}
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <KeyboardAwareScrollView
                    scrollEnabled={false}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableOnAndroid={true}
                    extraScrollHeight={responsiveHeight(20)}
                    extraHeight={responsiveHeight(20)}>



                    <View className='items-center justify-center'>

                        <View style={{
                            marginVertical: responsiveHeight(20)
                        }}>

                            <Text
                                className="font-mulish-semibold text-gray-500"
                                style={{ fontSize: responsiveFontSize(2) }}>
                                Name / Hotel Name *
                            </Text>

                            <View className="flex-row items-center">
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    className={`text-black border-b-2 ${error !== null ? "border-red-400 " : "border-gray-300 "} font-mulish-semibold px-2`}
                                    style={{
                                        fontSize: responsiveFontSize(2),
                                        width: responsiveWidth(70)
                                    }}
                                    placeholder='Enter here'
                                    placeholderTextColor={'black'}
                                />
                            </View>

                            {true &&
                                <Text className="text-red-500 text-start mt-2"
                                    style={{ fontSize: responsiveFontSize(1.5) }}>
                                    {error} 
                                </Text>
                            }
                        </View>



                        <TouchableOpacity
                            disabled={loggingIn || name.length < 0}
                            onPress={() => mutate({ contactNo: params, name })}
                            className={`${name.length < 0 && "opacity-50"} bg-[#53B175] rounded-full px-6 py-5 items-center`}
                            style={{ width: responsiveWidth(60) }}>

                            {loggingIn ? <ActivityIndicator color='white' />
                                :
                                <Text className="text-white font-mulish-semibold"
                                    style={{ fontSize: responsiveFontSize(2.25) }}>
                                    Submit
                                </Text>
                            }

                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>




                {/* <KeyboardAvoidingView
            behavior='position'
            className="absolute right-10 bottom-14 items-center w-fit">
            <TouchableOpacity
                onPress={() => confirmCode()}

                className="bg-[#53B175] rounded-full px-6 py-5 items-center">
                <RightArrow color="white" />
            </TouchableOpacity>
        </KeyboardAvoidingView> */}

            </TouchableWithoutFeedback>
        </ImageBackground>

    )
}

export default UserRegisterationPage