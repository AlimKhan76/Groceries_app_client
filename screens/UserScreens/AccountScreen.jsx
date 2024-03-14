import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RightArrow from '../../assets/icons/account/right_arrow.svg'
import LogOut from '../../assets/icons/account/logout.svg'
import data from "../components/UserAccountScreenCard"
import * as SecureStore from "expo-secure-store";
import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../../api/userAPI'

const AccountScreen = ({ navigation }) => {

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
    staleTime: Infinity,
  })

  const logout = async () => {
    try {
      SecureStore.deleteItemAsync('token')
      SecureStore.deleteItemAsync('role').then((res) => {
        console.log("User has been logged out successfully")
        navigation.navigate("Login")
      })

    } catch (error) {
      console.log("Error in loging out " + error)

    }

  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row py-8 px-4 border-b-gray-300 border-b-2">
        <Image
          className="w-14 h-14 rounded-xl"
          source={(require("../../assets/images/profile.png"))} />
        <View className="px-5">
          <Text className="text-black text-xl font-mulish-bold">
            {userData?.name}
          </Text>
          <Text className="font-mulish-regular text-base text-black">
            {userData?.contactNo}
          </Text>

        </View>
      </View>


      {data?.map((data, index) => {
        return (
          <TouchableOpacity key={index}
            className="border-b-gray-300 border-b-2 px-5 flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              {data?.icon}
              <Text
                className="text-xl text-black px-3 text-start font-mulish-semibold">
                {data?.title}</Text>
            </View>
            <RightArrow color='black' />
          </TouchableOpacity>
        )
      })}


      <View
        className='absolute overflow-hidden bottom-5 self-center w-full  '>

        <TouchableOpacity
          onPress={logout}
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

export default AccountScreen