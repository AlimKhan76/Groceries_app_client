import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback, Keyboard, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import firebase from '@react-native-firebase/auth';
// import appCheck from '@react-native-firebase/app-check';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ActivityIndicator } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const LandingScreen = ({ navigation }) => {
    const [confirm, setConfirm] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState("")

    // const [deviceId, setDeviceId] = useState('');

    // const userInfo = {
    //     iss: 'phmail',
    //     aud: 'user',
    //     country_code: '+91',
    //     phone_no: "8356857860"
    //   };

    //   const URI = `https://auth.phone.email/sign-in?countrycode=${userInfo.country_code}&phone_no=${userInfo.phone_no}&redirect_url=&auth_type=4&device=${deviceId}`;
    //   // Hooks
    //   useEffect(() => {
    //     // Method to fetch device ID
    //     const fetchDeviceId = async () => {
    //       // Getting unique ID
    //     //   const id = await getUniqueId();
    //       // Updating state
    //     //   setDeviceId(id);
    //       // Log the device ID to the console
    //       // console.log('Device ID:', id);
    //     };
    //     fetchDeviceId();
    //   }, []);
    //   const phoneAuthJwt = event => {
    //     // Getting encodedJWT
    //     const encodedJWT = event.nativeEvent.data;

    //     // Navigating to the EmailCount screen with the token param
    //     // navigation.navigate('Email Count', {token: encodedJWT});
    //   };




    // rnfbProvider = appCheck().newReactNativeFirebaseAppCheckProvider();
    // console.log(rnfbProvider)
    // rnfbProvider.configure({
    //     android: {
    //         provider: 'debug',
    //         debugToken: 'A8E611FA-1787-4E2F-B0BE-2E0604ABC6BC',
    //     },
    //     apple: {
    //         provider: 'debug',
    //         debugToken: 'A8E611FA-1787-4E2F-B0BE-2E0604ABC6BC',
    //     },
    // }
    // )

    // appCheck().initializeAppCheck({ provider: rnfbProvider, isTokenAutoRefreshEnabled: true });


    // try {
    //     appCheck().getToken(true).then((token)=>{
    //         if (token.length > 0) {
    //             console.log('AppCheck verification passed');
    //           }
    //     })


    //   } catch (error) {
    //     console.log('AppCheck verification failed');
    //   }
    // useEffect(() => {

    //     const backPress = () => {
    //         console.log("Backing")
    //         navigation.replace("OTPScreen")
    //     }
    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress', backPress
    //     );

    //     return () => {
    //         backHandler.remove();
    //     }
    // }, [])

    const signInWithPhoneNumber = async (phoneNumber) => {
        try {
            Keyboard.dismiss()
            setLoading(true)
            const confirmation = await firebase().signInWithPhoneNumber("+91 " + phoneNumber);
            setConfirm(confirmation);
            setLoading(false)
            navigation.replace("OTPScreen", { confirmation, phoneNumber })
        } catch (phoneAuthError) {
            setError(phoneAuthError.message.split("]")[1].split(".")[0])
            setLoading(false)
            console.log(phoneAuthError.message)
            console.log(phoneAuthError.code)

        }

    }


    return (
        <SafeAreaView className="bg-white flex-1">

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <KeyboardAwareScrollView className="bg-white"
                    scrollEnabled={false}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableOnAndroid={true}
                    extraScrollHeight={responsiveHeight(15)}
                    extraHeight={responsiveHeight(15)}>

                    <Image
                        resizeMode='cover'
                        style={{ height: responsiveHeight(50) }}
                        source={require("../assets/images/sign-in-background.png")}
                    />
                    <Text
                        style={{
                            width: responsiveWidth(70),
                            lineHeight: responsiveHeight(6),
                            fontSize: responsiveFontSize(3),
                            marginHorizontal: responsiveWidth(5),
                        }}
                        className='text-black font-mulish-semibold'>
                        Get your groceries with nectar
                    </Text>


                    <View
                        className={`flex-row border-b-2 ${error !== null ? "border-red-500" : 'border-gray-300'} items-center mx-5 `}
                        style={{
                            paddingVertical: responsiveHeight(0.5),
                            marginVertical: responsiveHeight(2)
                        }}>

                        <Text
                            className=' text-black px-2 font-mulish-medium'
                            style={{
                                fontSize: responsiveFontSize(2)
                            }}>
                            +91
                        </Text>

                        <TextInput
                            style={{
                                width: responsiveWidth(75),
                                fontSize: responsiveFontSize(2)
                            }}

                            value={phoneNumber}
                            onChangeText={(e) => {
                                setPhoneNumber(e)
                                setError(null)
                            }}
                            maxLength={11}
                            className='text-black font-mulish-medium'
                            keyboardType='numeric'
                            placeholder='Mobile Number'
                            placeholderTextColor={"black"}
                        />
                    </View>
                    {error !== null &&
                        <Text className="text-red-500 "
                            style={{
                                marginHorizontal: responsiveWidth(2),
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
                                style={{ paddingVertical: responsiveHeight(0.2) }} />
                            :
                            <Text
                                style={{
                                    fontSize: responsiveFontSize(2.5)
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

export default LandingScreen