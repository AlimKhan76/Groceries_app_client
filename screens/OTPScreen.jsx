import { View, Text, TouchableOpacity, ImageBackground, Keyboard, BackHandler } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { getUserDataAPI, loginUserAPI } from '../api/userAPI'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Dialog } from 'react-native-alert-notification'
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, Appbar } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BlurView } from '@react-native-community/blur'
import { OtpInput } from "react-native-otp-entry";
import { LogBox } from 'react-native';
import auth from '@react-native-firebase/auth';


const OTPScreen = ({ navigation }) => {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    const [code, setCode] = useState("");
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { params } = useRoute()


    useFocusEffect(
        React.useCallback(() => {
            const subscription = BackHandler.addEventListener('hardwareBackPress',
                () => {
                    navigation.replace("Login")
                    return true;
                });

            return () => subscription.remove();
        }, [])
    );

    // const { data: userData } = useQuery({
    //     queryKey: ['userData'],
    //     queryFn: getUserDataAPI,
    //     staleTime: Infinity,
    // })


    const { mutate, isPending: loggingIn, isError, error: appError } = useMutation({
        mutationKey: ["login"],
        mutationFn: loginUserAPI,
        onSuccess: async (data) => {
            await SecureStore.setItemAsync("token", data?.token)
            await SecureStore.setItemAsync("role", data?.role)
            Dialog.show({
                type: 'SUCCESS',
                title: 'Welcome Back',
                autoClose: 500,
                textBody: "Order before 10pm for next day delivery",
                button: '',
            })
            if (data?.role === "admin") {
                navigation.replace("Admin")
                setLoading(false)
            }
            else {
                navigation.replace('Main')
            }
        },

        onError: (error) => {
            console.log(error)
            let user = auth().currentUser;
            user.delete()
                .then(() => console.log("User deleted"))
                .catch((error) => console.log(error));
            Dialog.show({
                type: 'DANGER',
                title: 'Error',
                autoClose: 1000,
                textBody: "Please try again later",
                button: 'Close',
            })
        }
    })


    const confirmCode = async (code) => {
        try {
            Keyboard.dismiss()
            setLoading(true)
            const result = await params?.confirmation?.confirm(code)
            console.log(result?.additionalUserInfo?.isNewUser)
            if (result?.additionalUserInfo?.isNewUser === true) {
                navigation.replace("UserRegisterationPage", params?.phoneNumber)
                setLoading(false)
            }
            else {
                mutate({ contactNo: params?.phoneNumber })
            }

        } catch (phoneAuthError) {
            console.log(phoneAuthError)
            console.log(phoneAuthError.message.split("]")[1].split(".")[0])
            setError(phoneAuthError.message.split("]")[1].split(".")[0])
            console.log(phoneAuthError.message);
            setLoading(false)
        }
    }

    return (
        <ImageBackground
            resizeMode='cover'
            source={require("../assets/images/sign/background-top.png")}
            className='flex-1 px-5 '>
            {/* {console.log(userData)} */}

            <Appbar.Header
                mode='center-aligned'
                style={{
                    backgroundColor: 'transparent',
                    height: responsiveHeight(10),
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}>

                <Appbar.BackAction
                    iconColor='black'
                    onPress={() => navigation.replace("Login")} />

                <Appbar.Content title="Confirm OTP"
                    titleStyle={{
                        fontFamily: "Mulish-Bold",
                        fontSize: responsiveFontSize(3),
                        color: "black"
                    }} />
            </Appbar.Header>

            {loggingIn && !isError &&
                <BlurView
                    className="items-center justify-center"
                    style={{
                        width: responsiveWidth(100),
                        height: responsiveHeight(100),
                        zIndex: 9999,
                        position: 'absolute',
                        right: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    blurType="dark"
                    blurAmount={5}
                    reducedTransparencyFallbackColor="white">
                    <ActivityIndicator style={{
                        height: responsiveHeight(100),
                    }}
                        size={"large"} color='rgb(83 177 117)' />
                </BlurView>
            }

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
                        <View className="flex-row items-center">

                            <OtpInput
                                className="text-black"
                                numberOfDigits={6}
                                focusColor="green"
                                onFilled={confirmCode}
                                focusStickBlinkingDuration={500}
                                theme={{
                                    pinCodeContainerStyle: { borderColor: "#c2c2c2" },
                                    pinCodeTextStyle: {
                                        color: "black",
                                        fontSize: responsiveFontSize(2.5),
                                        fontFamily: "Mulish-SemiBold"
                                    },
                                }}
                                onTextChange={(e) => setCode(e)}
                            />

                        </View>

                        {error !== null &&
                            <Text className="text-red-500 text-start mt-2"
                                style={{ fontSize: responsiveFontSize(1.5) }}>
                                {error} Please try again later
                            </Text>
                        }
                    </View>

                    <TouchableOpacity
                        disabled={isLoading || code.length < 6}
                        onPress={() => confirmCode()}
                        className={`${isLoading || code.length < 6 && "opacity-50"} bg-[#53B175] rounded-full px-5 py-4 items-center`}
                        style={{ width: responsiveWidth(60) }}>

                        {isLoading && !isError ?
                            <ActivityIndicator color='white'
                                style={{ paddingVertical: responsiveHeight(0.5) }} />
                            :
                            <Text className="text-white font-mulish-semibold"
                                style={{ fontSize: responsiveFontSize(2.25) }}>
                                Verify
                            </Text>
                        }
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>


        </ImageBackground>
    )
}

export default OTPScreen