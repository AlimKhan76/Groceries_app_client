import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import LeftArrow from '../assets/icons/account/left_arrow.svg'
import RightArrow from '../assets/icons/account/right_arrow.svg'
import firebase from '@react-native-firebase/auth';

const ForgotPasswordScreen = ({ navigation }) => {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    const [phoneNumber, setPhoneNumber]= useState("")

    // Handle login
    function onAuthStateChanged(user) {
        if (user) {
            // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
            // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
            // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
            // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
        }
    }

    // useEffect(() => {
    //     const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    // Handle the button press
    function signInWithPhoneNumber(phoneNumber) {
        const confirmation = firebase().signInWithPhoneNumber(phoneNumber)
        console.log(confirmation)
        setConfirm(confirmation);
    }

    // async function confirmCode() {
    //     try {
    //         await confirm.confirm(code);
    //     } catch (error) {
    //         console.log('Invalid code.');
    //     }
    // }

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
                    onPress={() => signInWithPhoneNumber('+91 8356857860')}

                    className="bg-[#53B175] rounded-full px-6 py-5 items-center">
                    <RightArrow color="white" />
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </ImageBackground>
    )



    //   const [phoneNumber, setPhoneNumber] = useState('');
    //   const [verificationCode, setVerificationCode] = useState('');

    //   const handleSendOtp = async () => {
    //     try {
    //       const confirmation = await firebase().signInWithPhoneNumber(phoneNumber);
    //     //   console.log(confirmation.confirm(123456))
    //       setConfirm(confirmation);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   const handleVerifyOtp = async () => {
    //     try {
    //       await confirm.confirm(verificationCode);
    //       console.log('User is logged in!');
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   return (
    //     <View>
    //       <Text>Phone Number:</Text>
    //       <TextInput className="text-black"
    //         placeholder="Enter your phone number"
    //         value={phoneNumber}
    //         onChangeText={setPhoneNumber}
    //       />
    //       <Button title="Send OTP" onPress={handleSendOtp} />
    //       <Text>Verification Code:</Text>
    //       <TextInput
    //       className="text-black"
    //         placeholder="Enter the verification code"
    //         value={verificationCode}
    //         onChangeText={setVerificationCode}
    //       />
    //       <Button title="Verify OTP" onPress={handleVerifyOtp} />
    //     </View>
    //   );
    // };

};

export default ForgotPasswordScreen