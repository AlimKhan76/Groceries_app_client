import React, { Fragment, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import data from "../components/AdminAccountScreenCard"
import { downloadPendingOrders, markAllPendingOrdersAsDeliveredAPI } from '../../api/adminAPIs/orderAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import RNFS from 'react-native-fs';
import { BASE_URL } from "@env"
import { ActivityIndicator, Avatar, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import RNFetchBlob from 'rn-fetch-blob';
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import * as SecureStore from "expo-secure-store";
import { BlurView } from '@react-native-community/blur'
import { Dialog, Toast } from 'react-native-alert-notification'
import { downloadCSVForPendingOrders, downloadPendingInvoices } from '../../api/adminAPIs/downloadAPIs'
import Modal from "react-native-modal";
import { addProductAPI } from '../../api/adminAPIs/adminProductAPI'



const AdminSettingScreen = ({ navigation }) => {
  const [confirmation, setConfirmation] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newProductData, setNewProductData] = useState({
    title: "",
    baseQuantity: "",
    unit: "",
    category: ""
  })
  const queryClient = useQueryClient()

  const logout = async () => {
    try {
      SecureStore.deleteItemAsync('token')
      SecureStore.deleteItemAsync('role').then((res) => {
        queryClient.invalidateQueries();
        console.log("Admin has been logged out successfully")
        navigation.replace("Login")
      })

    } catch (error) {
      console.log("Error in loging out " + error)

    }

  }

  const { mutate, isPending } = useMutation({
    mutationFn: markAllPendingOrdersAsDeliveredAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"]
      })
      queryClient.invalidateQueries({
        queryKey: ["deliveredOrder"]
      })
      Toast.show({
        type: "SUCCESS",
        title: "Marked all pending orders as delivered",
        autoClose: 2000,
      })
      setConfirmation(false)
    }
  })


  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: addProductAPI,
    onSuccess: () => {
      setIsModalVisible(false)
      setNewProductData({
        title: "",
        baseQuantity: "",
        unit: "",
        category: ""
      })
      Dialog.show({
        type: "SUCCESS",
        autoClose: 1000,
        title: "Product Added"
      })
    },
    onError: () => {
      Dialog.show({
        type: "DANGER",
        autoClose: 1000,
        title: "Error in adding product"
      })
    }
  })

  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="flex-row py-8 px-4 border-b-gray-300 border-b-2 justify-between">
        <View className="flex-row items-center justify-center">

          <Avatar.Icon size={responsiveHeight(6)} icon="account" color='white'
            style={{ backgroundColor: "#bbbbbb" }} />

          <View className="px-5">

            <Text className="text-black font-mulish-bold"
              style={{ fontSize: responsiveFontSize(2.5) }}>
              Admin
            </Text>

            <Text className="font-mulish-regular text-black"
              style={{ fontSize: responsiveFontSize(1.75) }}>
              Admin
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true)
          }}
          hitSlop={10}
          className="items-center justify-center px-2">
          <Feather name="plus-circle" color="#53B175" size={responsiveHeight(3.5)} />
        </TouchableOpacity>

      </View>


      {data?.map((data, index) => {
        return (
          <Fragment key={index}>

            <TouchableOpacity
              key={index}
              style={{
                paddingHorizontal: responsiveWidth(5),
                paddingVertical: responsiveHeight(1.75)
              }}
              onPress={() => {
                data?.title === "Download Pending Orders" ?
                  downloadCSVForPendingOrders() :
                  data?.title === "Mark all pending orders as delivered" ?
                    setConfirmation(true) :
                    data?.title === "Download Pending Invoices" ?
                      downloadPendingInvoices()
                      :
                      navigation.navigate(data?.navigation)
              }
              }

              className="border-b-gray-300 px-5 flex-row justify-between items-center py-3">
              <View className="flex-row items-center">
                {data?.icon}
                <Text
                  className=" text-black px-3 text-start font-mulish-semibold"
                  style={{
                    fontSize: responsiveFontSize(2)
                  }}>
                  {data?.title}
                </Text>
              </View>
              <Feather
                name="chevron-right"
                color="black" size={responsiveHeight(3.5)} />
            </TouchableOpacity>
            <Divider style={{
              marginVertical: responsiveHeight(0.5),
              marginHorizontal: responsiveWidth(2.5)
            }} />
          </Fragment>

        )
      })}


      {confirmation &&
        <BlurView
          className="items-center justify-center"
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(100),
            zIndex: 9999999,
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
          }}
          blurType="materialLight"
          blurAmount={5}
        // reducedTransparencyFallbackColor="white"
        >

          <View className=" flex-1 items-center bg-transparent justify-center ">

            {isPending ?
              <ActivityIndicator size={"large"} color='#53B175' />
              :
              <View className="bg-white p-5 rounded-2xl border-2 border-gray-300  w-[85%]">
                <Text className="text-black text-center font-mulish-semibold"
                  style={{
                    fontSize: responsiveFontSize(2.15)
                  }}>
                  Marking all packed orders as delivered. Proceed ?
                </Text>
                <View className="flex-row justify-around mt-7 ">
                  <TouchableOpacity
                    disabled={isPending}
                    onPress={mutate}
                    className="py-3 px-5 bg-[#53B175] rounded-xl">
                    <Text className="text-white font-mulish-semibold" style={{
                      fontSize: responsiveFontSize(1.85)
                    }}>
                      Proceed
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setConfirmation(false)}
                    className="py-3 px-5 bg-red-400 rounded-xl">
                    <Text className="text-white font-mulish-semibold" style={{
                      fontSize: responsiveFontSize(1.85)
                    }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
        </BlurView>
      }

      <View
        className='absolute overflow-hidden bottom-5 self-center w-full  '>

        <TouchableOpacity
          onPress={logout}
          className="bg-gray-200 mx-5 p-5 rounded-2xl ">
          <View className="flex-row items-center justify-center ">
            <View className="absolute left-0">
              <MaterialIcons name="logout" color="#53B175" size={responsiveHeight(3.5)} />
            </View>
            <Text
              className="text-[#53B175] font-mulish-semibold" style={{
                fontSize: responsiveFontSize(2.5)
              }}>
              Log Out
            </Text>


          </View>
        </TouchableOpacity>
      </View>


      <Modal
        testID={'modalForStartDate'}
        animationIn={"slideInLeft"}
        animationOut={"slideOutLeft"}
        animationOutTiming={500}
        animationInTiming={700}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        isVisible={isModalVisible}
        onBackButtonPress={() => {
          setIsModalVisible(false)
          setNewProductData({
            title: "",
            baseQuantity: "",
            unit: "",
            category: ""
          })
        }}
      >

        <View className="flex-1 justify-center flex-col ">


          <View className="bg-white justify-center items-center w-full rounded-xl">
            <View className=" p-4 w-full  max-h-full">
              <View className="flex-row items-center justify-between p-4 border-b rounded-t ">
                <Text className="text-xl font-semibold text-gray-900 ">
                  Add Product
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false)
                    setNewProductData({
                      title: "",
                      baseQuantity: "",
                      unit: "",
                      category: ""
                    })
                  }}
                  className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ">
                  <MaterialIcons name="close" color="black" size={responsiveHeight(3)} />
                </TouchableOpacity>
              </View>
              <View className="p-4 gap-y-4 ">
                <View>
                  <Text
                    className="block mb-2 text-sm font-medium text-gray-900 ">
                    Product Name
                  </Text>
                  <TextInput
                    onChangeText={(e) => setNewProductData({ ...newProductData, title: e })}
                    value={newProductData?.title}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholderTextColor={"black"} />
                </View>
                <View>
                  <Text
                    className="block mb-2 text-sm font-medium text-gray-900 ">
                    Starting Quantity
                  </Text>
                  <TextInput
                    keyboardType='numeric'
                    onChangeText={(e) => setNewProductData({ ...newProductData, baseQuantity: e })}
                    value={newProductData?.baseQuantity}

                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholderTextColor={"black"} />
                </View>
                <View>
                  <Text
                    className="block mb-2 text-sm font-medium text-gray-900 ">
                    Category
                  </Text>
                  <TextInput
                    onChangeText={(e) => setNewProductData({ ...newProductData, category: e })}
                    value={newProductData?.category}

                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholderTextColor={"black"} />
                </View>
                <View>
                  <Text
                    className="block mb-2 text-sm font-medium text-gray-900 ">
                    Unit
                  </Text>


                  <TextInput
                    onChangeText={(e) => setNewProductData({ ...newProductData, unit: e })}
                    value={newProductData?.unit}

                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholderTextColor={"black"} />
                </View>


                <TouchableOpacity
                  disabled={isAdding}
                  onPress={() => addProduct(newProductData)}
                  className="w-full  text-white bg-[#53B175]  focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  {isAdding ?
                    <ActivityIndicator color='white' size={"small"} />
                    :
                    <Text className="text-center font-mulish-semibold text-base text-white">
                      Add product
                    </Text>
                  }
                </TouchableOpacity>

              </View>
            </View>
          </View>

        </View>


      </Modal>

    </SafeAreaView >
  )
}


export default AdminSettingScreen