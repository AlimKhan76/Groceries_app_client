import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { Fragment } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import data from "../components/UserAccountScreenCard"
import * as SecureStore from "expo-secure-store";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserData } from '../../api/userAPI'
import { Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const AccountScreen = ({ navigation }) => {

  const queryClient = useQueryClient()
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
    staleTime: Infinity,
  })


  const logout = async () => {
    try {
      SecureStore.deleteItemAsync('token')
      SecureStore.deleteItemAsync('role').then((res) => {
        queryClient.invalidateQueries().then(res => console.log(res))
        console.log("User has been logged out successfully")
        navigation.replace("Login")
      })

    } catch (error) {
      console.log("Error in loging out " + error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white"
      edges={['right', 'top', 'left']}>

      <View className="flex-row py-8 px-4 border-b-gray-300 border-b-2">

        <Image
          className="w-14 h-14 rounded-xl"
          source={(require("../../assets/images/profile.png"))} />

        <View className="px-5">

          <Text className="text-black font-mulish-bold"
            style={{ fontSize: responsiveFontSize(2.5) }}>
            {userData?.name}
          </Text>

          <Text className="font-mulish-regular text-black"
            style={{ fontSize: responsiveFontSize(1.75) }}>
            {userData?.contactNo}
          </Text>
        </View>

      </View>


      {data?.map((data, index) => {
        return (
          <Fragment key={index} >
            <TouchableOpacity
              onPress={() => navigation.navigate(data?.navigation)}
              className="flex-row justify-between items-center"
              style={{
                paddingHorizontal: responsiveWidth(5),
                paddingVertical: responsiveHeight(1.75)
              }}>

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
            <Divider className="mx-3" />
          </Fragment>
        )
      })}


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
              className="text-[#53B175] font-mulish-semibold"
              style={{
                fontSize:responsiveFontSize(2.5)
              }}>
              Log Out
            </Text>


          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AccountScreen