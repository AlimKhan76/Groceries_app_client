import { View, Text, TouchableOpacity, Keyboard } from 'react-native'
import React, { Fragment } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import data from "../components/UserAccountScreenCard"
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from '@tanstack/react-query'
import { Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import useUserDataQuery from '../../hooks/useUserData';
import ReactNativeModal from 'react-native-modal';
import { Avatar } from 'react-native-paper';

const AccountScreen = ({ navigation }) => {

  const queryClient = useQueryClient()

  const { data: userData, isLoading } = useUserDataQuery()

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

      <View className="flex-row py-8 px-4 border-b-gray-300 border-b-2 justify-between">
        <View className="flex-row items-center justify-center">

          <Avatar.Icon size={responsiveHeight(6)} icon="account" color='white'
            style={{ backgroundColor: "#bbbbbb" }} />

          <View className="px-5">

            <Text className="text-black font-mulish-bold"
              style={{ fontSize: responsiveFontSize(2.5) }}>
              {isLoading ?
                "........" :
                userData?.name
              }
            </Text>

            <Text className="font-mulish-regular text-black"
              style={{ fontSize: responsiveFontSize(1.75) }}>
              {isLoading ?
                "........" :
                userData?.contactNo
              }
            </Text>
          </View>
        </View>
        {/* <TouchableOpacity
          disabled={isLoading}
          hitSlop={10}
          className="items-center justify-center px-2">
          <Feather name="edit" color={isLoading ? "#b2b2b2" : "#53B175"} size={responsiveHeight(3)} />
        </TouchableOpacity> */}

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
                fontSize: responsiveFontSize(2.5)
              }}>
              Log Out
            </Text>


          </View>
        </TouchableOpacity>
      </View>

      <ReactNativeModal testID={'modalForDownloading'}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationOutTiming={1000}
        animationInTiming={700}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        isVisible={false}
        onBackButtonPress={() => {
          Keyboard.dismiss()
          // setDownlaodModalVisible(false)
          // setStartDate("")
          // setEndDate("")
        }}
        onBackdropPress={() => {
          Keyboard.dismiss()
          // setDownlaodModalVisible(false)
          // setStartDate("")
          // setEndDate("")
        }}
      >

        <View className=" flex-1 justify-center flex-col ">

          <View className=" bg-white rounded-3xl p-5 items-center justify-center ">
            <Text className="text-black font-mulish-semibold text-center" style={{
              fontSize: responsiveFontSize(2.5)
            }}>
              Do you want to logout ?
            </Text>

            <View className="flex-row justify-around w-full my-4">
              <TouchableOpacity
                // onPress={() => setStartDateModalVisible(true)}
                className=" flex-row items-center gap-x-3 border-2 p-3 border-[#eeedf3] rounded-2xl">
                <Text className=" text-black font-mulish-semibold"
                  style={{
                    fontSize: responsiveFontSize(1.75)
                  }}>
                  Yes
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                //  onPress={() => { setEndDateModalVisible(true) }}
                className=" flex-row items-center gap-x-3 border-2 p-3 border-[#eeedf3] rounded-2xl">
                <Text className="text-black font-mulish-semibold" style={{
                  fontSize: responsiveFontSize(1.75)
                }}>
                  No
                </Text>

              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
              disabled={(startDate === "" || endDate === "" && true)}
              onPress={() => downloadTransactionPdf(params?.custoemrId, startDate, endDate)}
              className="bg-[#419a79] p-4  rounded-xl">
              <Text className="text-white font-mulish-semibold" style={{
                fontSize: responsiveFontSize(2)
              }}>
                Download PDF
              </Text>
            </TouchableOpacity> */}

          </View>

        </View>


      </ReactNativeModal>

    </SafeAreaView>
  )
}

export default AccountScreen