import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { loginUserAPI } from '../api/userAPI'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { Dialog } from 'react-native-alert-notification'
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator } from 'react-native-paper'

// Not in use
const LoginScreen = ({ navigation }) => {
    const [scrollHeight, setScrollHeight] = useState(0)


    const loginSchema = object().shape({
        contactNo: string()
            .required("Enter your contact details")
            .min(10, "Enter at least 10 numbers"),
        // .matches("^(\[+]91[\-\s]?)?[0]?(91)?[789]\d{9}$", "Enter a valid number"),
        password: string()
            .required("Enter a password")
            .min(6, "Password has to be at least 6 characters")
    })

    const { mutate, isPending: loggingIn } = useMutation({
        mutationKey: ["login"],
        mutationFn: loginUserAPI,
        onSuccess: async (data) => {
            await SecureStore.setItemAsync("token", data?.token)
            await SecureStore.setItemAsync("role", data?.role)

            Dialog.show({
                type: 'SUCCESS',
                title: 'Logged in',
                autoClose: 500,
                textBody: "Logged in successfully",
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground
                source={require("../assets/images/sign/background-bottom.png")}
                className="flex-1 justify-start pt-24 "
                resizeMode='cover'>
                <KeyboardAwareScrollView
                    scrollEnabled={false}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableOnAndroid={true}
                    extraScrollHeight={scrollHeight}
                    extraHeight={scrollHeight}>

                    <View className="flex w-full items-center mb-24">
                        <Image source={(require("../assets/images/logo-colour.png"))} />
                    </View>

                    <View className="items-start mx-5 ">
                        <Text className="text-2xl font-mulish-bold text-black ">
                            Loging In
                        </Text>
                        <Text className="font-mulish-medium py-3 text-gray-400">
                            Enter you mobile number and password
                        </Text>



                        <Formik initialValues={{
                            contactNo: "",
                            password: "",
                        }}
                            onSubmit={(values, { errors }) => {
                                mutate(values)
                                //     if (!error)
                                //         // resetForm()
                                //
                            }}
                            validationSchema={loginSchema}
                        >{({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <>
                                <View className="w-full my-5">
                                    <Text className="text-sm  font-mulish-semibold text-gray-400">
                                        Contact Number *
                                    </Text>
                                    <TextInput
                                        value={values.contactNo}
                                        onChangeText={handleChange("contactNo")}
                                        onBlur={handleBlur('contactNo')}
                                        onPressIn={() => setScrollHeight(150)}
                                        className={
                                            ` ${errors.contactNo && touched.contactNo ? "border-b-red-400" : "border-b-gray-200"}
                                            py-1 pb-2.5 text-md border-b-2 font-mulish-medium w-full text-black `}
                                        placeholderTextColor={"black"}
                                        keyboardType='numeric'
                                        placeholder='Enter Your mobile number' />
                                </View>
                                {errors?.contactNo && touched?.contactNo &&
                                    <Text className='text-sm text-red-400'>
                                        {errors?.contactNo}
                                    </Text>
                                }

                                <View className="w-full my-5">
                                    <Text className="font-mulish-semibold text-sm text-gray-400">
                                        Password * (6 characters)
                                    </Text>
                                    <TextInput
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        onPressIn={() => setScrollHeight(110)}
                                        className={
                                            ` ${errors.contactNo && touched.contactNo ? "border-b-red-400" : "border-b-gray-200"}
                                            py-1 pb-2.5 text-md border-b-2 font-mulish-medium w-full text-black `}
                                        placeholder='Enter Your password'
                                        placeholderTextColor={"black"}
                                        secureTextEntry={true} />
                                </View>
                                {errors?.password && touched?.password &&
                                    <Text className='text-sm text-red-400'>
                                        {errors?.password}
                                    </Text>
                                }

                                <View className="items-end pb-2.5 w-full">
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("ForgotPassword")}>
                                        <Text
                                            className=" text-black font-mulish-medium">
                                            Forgot password ?
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    className="my-3 p-4 w-full rounded-2xl items-center bg-[#53B175]">
                                    {loggingIn ?
                                        <ActivityIndicator color='white' />
                                        :
                                        <Text
                                            className="text-white text-lg font-mulish-semibold">
                                            Log in
                                        </Text>
                                    }
                                </TouchableOpacity>
                            </>
                        )}
                        </Formik >






                        <View className="flex-row py-3 gap-1 justify-center w-full">
                            <Text className="font-mulish-semibold text-black">Don't have an account?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignUp")}>
                                <Text className="text-[#53B175] font-mulish-semibold ">
                                    Signup
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </KeyboardAwareScrollView>
            </ImageBackground >
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen