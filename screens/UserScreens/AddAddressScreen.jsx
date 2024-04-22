import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAddressApi } from '../../api/addressAPI'
import { Dialog } from 'react-native-alert-notification'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

const AddAddressScreen = () => {
  const navigation = useNavigation()
  const [scrollHeight, setScrollHeight] = useState(0)
  const queryClient = useQueryClient()

  const addressSchema = object().shape({
    line1: string()
      .required("Enter your address details")
      .max(50),
    line2: string()
      .required("Enter your area and street details")
      .max(50),
    pincode: string()
      .required("Enter your Pincode")
      .max(10),
  })


  const { mutate: addAddress, isPending } = useMutation({
    mutationFn: addAddressApi,
    onError: () => {
      Dialog.show({
        type: "DANGER",
        title: "Error in adding address",
        textBody: "Please try again later",
        autoClose: 1000,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] })
      navigation.goBack();
      Dialog.show({
        type: "SUCCESS",
        title: "Address added",
        autoClose: 1000,
        // button: 'close'
      })
    }
  })


  return (
    <SafeAreaView className="flex-1 bg-white"
    edges={['right', 'top', 'left']}>

      <Appbar.Header
        mode='center-aligned'
        style={{
          backgroundColor: 'white',
          height: responsiveHeight(10),
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        statusBarHeight={0}>

        <Appbar.BackAction
          iconColor='black'
          onPress={() => navigation.goBack()} />

        <Appbar.Content
          title="Add Address"
          titleStyle={{
            fontFamily: "Mulish-Bold",
            color: "black",
            fontSize: responsiveFontSize(3)
          }} />

      </Appbar.Header>

      <Divider
        style={{
          marginBottom: responsiveHeight(1)
        }} />


      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollView className="m-5"
          scrollEnabled={true}
          resetScrollToCoords={{ x: 0, y: 0 }}
          enableOnAndroid={true}
          extraScrollHeight={scrollHeight}
          extraHeight={scrollHeight}>


          <Formik initialValues={{
            line1: "",
            line2: "",
            pincode: "",
            landmark: "",
          }}
            onSubmit={(values) => {
              addAddress(values)
            }}
            validationSchema={addressSchema}
          >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <>
              <View className="w-full my-3">
                <Text
                  className=" font-mulish-semibold text-gray-400"
                  style={{
                    fontSize: responsiveFontSize(1.45)
                  }}>
                  Building Name, Company, Shop No *
                </Text>
                <TextInput
                  maxLength={50}
                  value={values?.line1}
                  onChangeText={handleChange("line1")}
                  onBlur={handleBlur('line1')}
                  className={
                    ` ${errors.line1 && touched.line1 ? "border-b-red-400" : "border-b-gray-200"}
                   py-1 pb-2 mb-1 border-b-2 font-mulish-medium w-full text-black `}
                  placeholderTextColor={"black"}
                  style={{
                    fontSize: responsiveFontSize(1.5)
                  }}
                />

                {errors?.line1 && touched?.line1 &&
                  <Text className='text-sm text-red-400'
                    style={{
                      fontSize: responsiveFontSize(1.25)
                    }}>
                    {errors?.line1}
                  </Text>
                }
              </View>

              <View className="w-full my-3">
                <Text
                  className="font-mulish-semibold text-gray-400"
                  style={{
                    fontSize: responsiveFontSize(1.45)
                  }}>
                  Street / Road Name, Area *
                </Text>
                <TextInput
                  maxLength={50}
                  value={values?.line2}
                  onChangeText={handleChange('line2')}
                  onBlur={handleBlur('line2')}
                  onPressIn={() => setScrollHeight(100)}
                  className={
                    `${errors?.line2 && touched?.line2 ? "border-b-red-400" : "border-b-gray-200"} 
                  py-1 pb-2.5 mb-1 border-b-2 font-mulish-medium w-full text-black `
                  }
                  style={{
                    fontSize: responsiveFontSize(1.35)
                  }}
                />
                {errors?.line2 && touched?.line2 &&
                  <Text className=' text-red-400' style={{
                    fontSize: responsiveFontSize(1.35)
                  }}>
                    {errors?.line2}
                  </Text>
                }
              </View>




              <View className="w-full my-3">
                <Text className=" font-mulish-semibold text-gray-400" style={{
                  fontSize: responsiveFontSize(1.45)
                }}>
                  Pincode *
                </Text>
                <TextInput
                  maxLength={10}
                  value={values?.pincode}
                  onChangeText={handleChange("pincode")}
                  onBlur={handleBlur('pincode')}
                  onPress={() => setScrollHeight(50)}
                  className={
                    ` ${errors?.pincode && touched?.pincode ? "border-b-red-400" : "border-b-gray-200"}
                   py-1 pb-2.5 mb-1 border-b-2 font-mulish-medium w-full text-black `}
                  placeholderTextColor={"gray"}
                  keyboardType='numeric'
                  style={{
                    fontSize: responsiveFontSize(1.35)
                  }}
                  placeholder='Eg: 400024' />
                {errors?.pincode && touched?.pincode &&
                  <Text className=' text-red-400' style={{
                    fontSize: responsiveFontSize(1.35)
                  }}>
                    {errors?.pincode}
                  </Text>
                }
              </View>


              <View className="w-full my-3">
                <Text className="font-mulish-semibold text-gray-400" style={{
                  fontSize: responsiveFontSize(1.45)
                }}>
                  Land Mark ( If Any )
                </Text>
                <TextInput
                  value={values?.landmark}
                  onChangeText={handleChange("landmark")}
                  onBlur={handleBlur('landmark')}
                  onPressIn={() => setScrollHeight(50)}
                  className={
                    ` ${errors?.landmark && touched?.landmark ? "border-b-red-400" : "border-b-gray-200"}
                   py-1 pb-2.5 mb-1 border-b-2 font-mulish-medium w-full text-black `}
                  placeholderTextColor={"gray"}
                  style={{
                    fontSize: responsiveFontSize(1.5)
                  }}
                  placeholder='Eg : Near Apollo Hospital' />
                {errors?.landmark && touched?.landmark &&
                  <Text className='text-sm text-red-400'
                    style={{
                      fontSize: responsiveFontSize(1.35)
                    }}>
                    {errors?.landmark}
                  </Text>
                }
              </View>



              <TouchableOpacity
              disabled={isPending}
                onPress={handleSubmit}
                className="my-3 p-4 w-full rounded-2xl items-center bg-[#53B175]">

                {isPending ? <ActivityIndicator color='white' style={{ paddingVertical: responsiveHeight(0.5) }} /> :
                  <Text
                    className="text-white font-mulish-semibold"
                    style={{
                      fontSize: responsiveFontSize(2.25)
                    }}>
                    Add this Address
                  </Text>
                }
              </TouchableOpacity>
            </>

          )}
          </Formik >



        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

    </SafeAreaView>
  )
}

export default AddAddressScreen