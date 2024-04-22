import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { registerUserAPI } from '../api/userAPI'
import { Formik } from 'formik'
import { object, string, shape } from 'yup'
import { Dialog } from 'react-native-alert-notification'
import { useMutation } from '@tanstack/react-query'
import { ActivityIndicator } from 'react-native-paper'


const SignUpScreen = ({ navigation }) => {
    // height for the keyboaravoiding view
    const [scrollHeight, setScrollHeight] = useState(0)


    // Schema for formik and is used for validation 
    const registerSchema = object().shape({
        name: string()
            .required("Enter a name"),
        contactNo: string()
            .required("Enter your contact details")
            .min(10, "Enter at least 10 numbers"),
        // .matches("^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$", "Enter a valid number"),
        password: string()
            .required("Enter a password")
            .min(6, "Password has to be at least 6 characters")
    })

    // Function that will run on the submission of the form
    // const registerUserHandler = (data) => {
    //     registerUserAPI(data).then((res) => {
    //         Dialog.show({
    //             type: 'SUCCESS',
    //             title: 'Verification',
    //             autoClose: 1000,
    //             textBody: "Please enter the OTP sent to your number",
    //             button: '',
    //         })

    //         navigation.navigate("OTPScreen")
    //     })
    //         .catch((err) => {
    //             setError(err)
    //             setTimeout(() => {
    //                 setError('')
    //             }, 6000);
    //             Dialog.show({
    //                 type: 'DANGER',
    //                 title: 'Error',
    //                 autoClose: 1500,
    //                 textBody: err,
    //                 button: 'Close',
    //             })
    //         })
    // }


    const { mutate, isError, isPending, error } = useMutation({
        mutationKey: ['register'],
        mutationFn: registerUserAPI,
        onSuccess: () => {
            Dialog.show({
                type: 'SUCCESS',
                title: 'Verification',
                autoClose: 1000,
                // textBody: "Please enter the OTP sent to your number",
                textBody: "The User has been successfully registered",
                button: '',
            })
            navigation.navigate("Login")
            // navigation.navigate("OTPScreen")
        },

        // pattern="^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$"
        onError: (error) => {
            Dialog.show({
                type: 'DANGER',
                title: 'Error',
                autoClose: 1500,
                textBody: error,
                button: 'Close',
            })
        }
    })


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground
                source={require("../assets/images/sign/background-bottom.png")}
                className="flex-1 justify-start pt-16 "
                resizeMode='cover'>

                <KeyboardAwareScrollView
                    scrollEnabled={false}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableOnAndroid={true}
                    extraScrollHeight={scrollHeight}
                    extraHeight={scrollHeight}>

                    <View className="flex w-full items-center mb-16">
                        <Image source={(require("../assets/images/logo-colour.png"))} />
                    </View>

                    <View className="items-start mx-5 ">
                        <Text className="text-2xl text-black font-mulish-bold">
                            Sign Up
                        </Text>

                        <Text className="py-3 text-md font-mulish-medium  text-gray-400">
                            Enter you credentials to continue
                        </Text>



                        <Formik initialValues={{
                            name: "",
                            password: "",
                            contactNo: "",
                        }}
                            onSubmit={values => mutate(values)}
                            validationSchema={registerSchema}>
                            {({ handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                errors,
                                touched }) => (
                                <>
                                    <View className="w-full my-4">
                                        <Text className="text-sm font-mulish-medium text-gray-400">
                                            Name *
                                        </Text>
                                        <TextInput
                                            value={values.name}
                                            onChangeText={
                                                handleChange('name')
                                            }
                                            onBlur={handleBlur('name')}
                                            onPressIn={() => setScrollHeight(190)}
                                            className={`
                                            ${errors?.name && touched?.name ? "border-b-red-400" : "border-b-gray-200"}
                                            py-1 pb-2.5 text-md border-b-2 w-full font-mulish-semibold text-black`}
                                            placeholderTextColor='black'
                                            placeholder='Enter Your Name' />

                                        {errors?.name && touched?.name &&
                                            <Text
                                                className="text-xs text-red-400">
                                                {errors?.name}
                                            </Text>
                                        }
                                    </View>

                                    <View className="w-full my-4">

                                        <Text className=" text-sm font-mulish-medium text-gray-400" >
                                            Contact Number *
                                        </Text>
                                        <TextInput
                                            value={values.contactNo}
                                            onChangeText={
                                                handleChange('contactNo')
                                            }
                                            onBlur={handleBlur('contactNo')}
                                            onPressIn={() => setScrollHeight(140)}
                                            className={`
                                            ${errors.contactNo && touched.contactNo ?
                                                    "border-b-red-400" : "border-b-gray-200"}
                                            py-1 pb-2.5 text-md border-b-2 w-full font-mulish-semibold text-black`}
                                            placeholderTextColor='black'
                                            keyboardType='numeric'
                                            placeholder='Enter Your Contact Number'
                                        />

                                        {errors.contactNo && touched.contactNo &&
                                            <Text className='text-sm text-red-400'>
                                                {errors?.contactNo}
                                            </Text>
                                        }
                                    </View>

                                    <View className="w-full my-4">
                                        <Text className=" text-sm font-mulish-medium  text-gray-400">
                                            Password * (6 characters)
                                        </Text>
                                        <TextInput
                                            value={values.password}
                                            onChangeText={
                                                handleChange('password')
                                            }
                                            onBlur={handleBlur('password')}
                                            onPressIn={() => setScrollHeight(110)}
                                            className={`
                                            ${errors?.password && touched?.password ? "border-b-red-400" : "border-b-gray-200"}
                                            py-1 pb-2.5 text-md border-b-2 w-full font-mulish-semibold text-black`}
                                            placeholder='Enter Your Password'
                                            placeholderTextColor='black'
                                            secureTextEntry={true} />

                                        {errors?.password && touched?.password &&
                                            <Text className='text-sm text-red-400'>
                                                {errors.password}
                                            </Text>
                                        }
                                    </View>

                                    <View className="items-end pb-2.5 w-full">
                                        <Text className="font-semibold text-red-400">
                                            {isError && error}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        // disabled={!isValid}
                                        onPress={handleSubmit}
                                        // className={`my-3 p-4 w-full 
                                        // ${!isValid ? 'bg-[#CCC]' : 'bg-[#53B175]'} 
                                        // rounded-2xl items-center `
                                        className='my-3 p-4 w-full bg-[#53B175]
                                        rounded-2xl items-center' >
                                        {isPending ?
                                            <ActivityIndicator color='white' />
                                            :
                                            <Text
                                                className='text-lg font-mulish-semibold text-white'>
                                                SignUp
                                            </Text>
                                        }
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>




                        <View className="flex-row py-3 gap-1 justify-center w-full">
                            <Text className="text-black font-mulish-semibold">Already have a account?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Login")}>
                                <Text className="text-[#53B175] font-mulish-semibold">
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </KeyboardAwareScrollView>
            </ImageBackground >
        </TouchableWithoutFeedback>
    )
}

export default SignUpScreen