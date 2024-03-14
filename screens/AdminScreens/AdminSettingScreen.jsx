import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RightArrow from '../../assets/icons/account/right_arrow.svg'
import LogOut from '../../assets/icons/account/logout.svg'
import data from "../components/AdminAccountScreenCard"
import { downloadPendingOrders } from '../../api/adminAPIs/orderAPI'
import { useQuery } from '@tanstack/react-query'
import RNFS from 'react-native-fs';
import { BASE_URL } from "@env"



const AdminSettingScreen = ({ navigation }) => {

  const { data: download, refetch } = useQuery({
    queryKey: ['downloadPendingOrders'],
    queryFn: downloadPendingOrders,
    enabled: false,
  })


  const downloadCSV = () => {
    const url = 'http://192.168.0.106:3000/adminOrder/downloadPendingOrders';
    const filePath = RNFS.DownloadDirectoryPath + '/order.csv';

    RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,

      background: true, // Enable downloading in the background (iOS only)
      discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      progress: (res) => {

        // Handle download progress updates if needed
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
      },
    })
      .promise.then((response) => {
        console.log('File downloaded!', response);
      })
      .catch((err) => {
        console.log('Download error:', err);
      });

  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {console.log(BASE_URL)}
      <View className="flex-row py-8 px-4 border-b-gray-300 border-b-2">
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


      {data?.map((data, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              data?.title === "Download Pending Orders" ?
                downloadCSV()
                : navigation.navigate(data?.navigation)
            }
            }

            className="border-b-gray-300 border-b-2 px-5 flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              {data?.icon}
              <Text
                className="text-xl text-black px-3 text-start font-mulishsb">
                {data?.title}
              </Text>
            </View>
            <RightArrow />
          </TouchableOpacity>
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