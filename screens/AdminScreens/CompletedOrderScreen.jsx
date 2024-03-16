import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Person from "../../assets/icons/tabs/person.svg"
import Phone from "../../assets/icons/admin/phone.svg"
import Time from "../../assets/icons/admin/time.svg"
import { Appbar, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

const CompletedOrderScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white"
      edges={["right", "top", "left"]}>

        <Appbar.Header mode='center-aligned' style={{
        backgroundColor: 'white',
        height: responsiveHeight(10),
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
        statusBarHeight={0} >
        <Appbar.Content title="Completed Orders"
          titleStyle={{
            fontFamily: "Mulish-SemiBold",
            color: "black",
            fontSize: responsiveFontSize(3.5),

          }} />
      </Appbar.Header>
      <Divider bold />


      <ScrollView className="my-2.5">

        <TouchableOpacity
          onPress={() => { }}
          className="rounded-2xl bg-white mx-3 my-2.5 p-2.5 border-gray-200 border-2  shadow-black shadow-md">
          <View
            className="flex-row justify-between items-center border-b-2
          border-gray-300 py-1.5 ">
            <View className="justify-center items-start">
              <Text
                className="text-sm text-black font-mulish-regular">
                Order no
              </Text>
              <Text
                className="text-xl text-black font-mulish-medium">
                #455552
              </Text>
            </View>
            <View
              className="flex-row border-2 border-gray-300 rounded-xl p-2.5 bg-[#53B175]">
              <Text className="px-1 font-mulish-black text-white">Delivered</Text>
            </View>
          </View>

          <View className="py-2 flex-row items-center justify-between">
            <View className="px-2" >
              <View className='flex-row py-1 items-center '>
                <Person style={{ color: "black" }} />
                <Text
                  className="font-mulish-semibold text-black px-1.5">
                  Alim Khan
                </Text>
              </View>

              <View className='flex-row py-1 items-center'>
                <Phone style={{ color: "black" }} />
                <Text
                  className="font-mulish-semibold text-black px-1.5">
                  989222224
                </Text>
              </View>

              <View className='flex-row py-1 items-center'>
                <Time />
                <Text
                  className="font-mulish-semibold text-black px-1.5">
                  19-04-2024 16:04
                </Text>
              </View>

            </View>
            <Text className="font-mulish-bold text-black text-xl px-2">
              ₹4000
            </Text>
          </View>

        </TouchableOpacity>




      </ScrollView>
    </SafeAreaView>
  )
}

export default CompletedOrderScreen