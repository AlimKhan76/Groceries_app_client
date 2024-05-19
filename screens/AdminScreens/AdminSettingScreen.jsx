import React, { Fragment, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import data from "../components/AdminAccountScreenCard"
import { downloadPendingOrders, markAllPendingOrdersAsDeliveredAPI } from '../../api/adminAPIs/orderAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import RNFS from 'react-native-fs';
import { BASE_URL } from "@env"
import { ActivityIndicator, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import RNFetchBlob from 'rn-fetch-blob';
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import * as SecureStore from "expo-secure-store";
import { BlurView } from '@react-native-community/blur'
import { Dialog, Toast } from 'react-native-alert-notification'



const AdminSettingScreen = ({ navigation }) => {
  const [confirmation, setConfirmation] = useState(false)
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

  const downloadCSV = async () => {
    try {
      const token = await SecureStore.getItemAsync("token")
      RNFetchBlob.config(Platform.select({
        ios: {
          fileCache: true,
          notification: true,
          title: `orders-${new Date().toDateString()}`,
          path: RNFS.DocumentDirectoryPath + `/orders-${new Date().toDateString()}.csv`,

        },
        android: {
          addAndroidDownloads: {
            title: `orders-${new Date().toDateString()}`,
            fileCache: true,
            useDownloadManager: true,
            // setting it to true will use the device's native download manager and will be shown in the notification bar.
            notification: true,
            path: RNFS.DownloadDirectoryPath + `/orders-${new Date().toDateString()}.xlsx`,  // this is the path where your downloaded file will live in
            description: 'Downloading orders files.'
          }
        }
      })

      )
        .fetch("GET",
          `https://groceries-app-server.vercel.app/adminOrder/downloadPendingOrders`,
          // "http://192.168.0.100:5000/adminOrder/downloadPendingOrders",
          {
            Authorization: token

          })
        .then((res) => {
          // the temp file path
          console.log("The file saved to ", res.path());
          if (Platform.OS === "ios") {
            RNFetchBlob.ios.openDocument(res.data);
          }
        })
        .catch((error) => {
          console.log(error)
          Dialog.show({
            type: "DANGER",
            title: "Error in downloading Orders",
            textBody: "Please try again later",
            autoClose: 1000
          })
        })
    }
    catch (err) {
      console.log(err)
      Dialog.show({
        type: "DANGER",
        title: "Error in downloading Orders",
        textBody: "Please try again later",
        autoClose: 1000
      })
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


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row py-8 px-4 ">
        <Image
          className="w-14 h-14 rounded-xl"
          source={(require("../../assets/images/profile.png"))} />
        <View className="px-5">
          <Text className="text-black text-xl font-mulish-bold">
            Admin
          </Text>
          <Text className="font-mulish-regular text-black">Admin</Text>

        </View>
      </View>
      <Divider bold />


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
                  downloadCSV() :
                  data?.title === "Mark all pending orders as delivered" ?
                    setConfirmation(true) :
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




    </SafeAreaView>
  )
}

export default AdminSettingScreen