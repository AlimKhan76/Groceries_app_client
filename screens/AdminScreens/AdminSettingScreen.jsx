import React, { Fragment } from 'react'
import { View, Text, Image, TouchableOpacity, BackHandler } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RightArrow from '../../assets/icons/account/right_arrow.svg'
import LogOut from '../../assets/icons/account/logout.svg'
import data from "../components/AdminAccountScreenCard"
import { downloadPendingOrders } from '../../api/adminAPIs/orderAPI'
import { useQuery } from '@tanstack/react-query'
import RNFS from 'react-native-fs';
import { BASE_URL } from "@env"
import { IMAGE_URL } from "@env"
import { Divider } from 'react-native-paper'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import RNFetchBlob from 'rn-fetch-blob';




const AdminSettingScreen = ({ navigation }) => {


  const downloadCSV = async () => {
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,
        path: RNFS.DownloadDirectoryPath + `/orders-${new Date().toDateString()}.csv`,  // this is the path where your downloaded file will live in
        description: 'Downloading orders files.'
      }

    })
      .fetch("GET",
        `${BASE_URL}adminOrder/downloadPendingOrders`,
        // "http://192.168.0.106:5000/adminOrder/downloadPendingOrders", 
        {
          //some headers ..
        })
      .then((res) => {
        // the temp file path
        console.log("The file saved to ", res.path());
      });

  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row py-8 px-4 ">
        <Image
          className="w-14 h-14 rounded-xl"
          source={(require("../../assets/images/profile.png"))} />
        <View className="px-5">
          <Text className="text-black text-xl font-mulish-bold">
            Admin name
          </Text>
          <Text className="font-mulishr text-black">admin@gmail.com</Text>

        </View>
      </View>
      <Divider bold />


      {data?.map((data, index) => {
        return (
          <Fragment key={index}>

            <TouchableOpacity
              key={index}
              onPress={() => {
                data?.title === "Download Pending Orders" ?
                  downloadCSV()
                  : navigation.navigate(data?.navigation)
              }
              }

              className="border-b-gray-300 px-5 flex-row justify-between items-center py-3">
              <View className="flex-row items-center">
                {data?.icon}
                <Text
                  className="text-xl text-black px-3 text-start font-mulishsb">
                  {data?.title}
                </Text>
              </View>
              <RightArrow color="black" />
            </TouchableOpacity>
            <Divider style={{
              marginVertical: responsiveHeight(0.5),
              marginHorizontal: responsiveWidth(2.5)
            }} />
          </Fragment>

        )
      })}


      <View
        className='absolute overflow-hidden bottom-5 self-center w-full  '>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="bg-gray-200 mx-5 p-5 rounded-2xl ">
          <View className="flex-row items-center justify-center ">
            <View className="absolute left-0">
              <LogOut />
            </View>
            <Text
              className="text-[#53B175] text-xl font-mulishsb">
              Log Out
            </Text>


          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AdminSettingScreen