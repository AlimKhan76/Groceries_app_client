import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Cart from "../../assets/icons/tabs/cart.svg"
import Person from "../../assets/icons/tabs/person.svg"
import Phone from "../../assets/icons/admin/phone.svg"
import Time from "../../assets/icons/admin/time.svg"
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { useQuery } from '@tanstack/react-query'
import { getPendingProducts } from '../../api/adminAPIs/orderAPI'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

const PendingOrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([])

  const { data: pendingOrders, isLoading, refetch } = useQuery({
    queryKey: ['pendingOrders'],
    queryFn: getPendingProducts,
    staleTime: Infinity,

  })




  return (
    <SafeAreaView className="flex-1 bg-white "
      edges={["right", "top", "left"]}>

      <Appbar.Header mode='center-aligned' style={{
        backgroundColor: 'white',
        height: responsiveHeight(10),
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
        statusBarHeight={0} >
        <Appbar.Content title="Pending Orders"
          titleStyle={{
            fontFamily: "Mulish-SemiBold",
            color: "black",
            fontSize: responsiveFontSize(3.5),

          }} />
      </Appbar.Header>
      <Divider bold />


      <View className="flex-row gap-2 p-2">
        <TouchableOpacity className="p-3 border-2 border-gray-300 rounded-2xl bg-gray-200">
          <Text className="text-black font-mulish-bold">Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-3 border-2 border-gray-300 rounded-2xl bg-gray-200">
          <Text className="text-black font-mulish-bold ">Processed</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-3 border-2 border-gray-300 rounded-2xl bg-gray-200">
          <Text className="text-black font-mulish-bold">
            Packed
          </Text>
        </TouchableOpacity>

      </View>
      {isLoading ?
        <View className='flex-1 items-center justify-center'>

          <ActivityIndicator size={'large'} color='#53B175' />
        </View>
        :
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => { refetch() }}
              refreshing={false} />
          }
          className=" ">

          {pendingOrders?.map((order) => {
            return (
              <TouchableOpacity
                key={order?._id}
                onPress={() => navigation.navigate("OrderDetails", { order })}
              // activeOpacity={0.7}
              >
                <View
                  className="rounded-2xl bg-white mx-3 my-2.5 p-2.5 border-gray-200 border-2 
                shadow-black shadow-md">
                  <View
                    className="flex-row justify-between items-center  py-1.5 ">
                    <View className="justify-center items-start">
                      <Text
                        className=" text-black font-mulish-regular"
                        style={{ fontSize: responsiveFontSize(2.5) }}>
                        Order no
                      </Text>
                      <Text
                        className="text-xl text-black font-mulish-medium"
                        style={{ fontSize: responsiveFontSize(3) }}>
                        #{order?.orderNo}
                      </Text>
                    </View>
                    <View
                      className="flex-row border-2 border-gray-300 rounded-xl p-2.5 items-center ">
                      <Cart style={{ color: "black" }} />
                      <Text
                        className="px-1 font-mulish-bold text-black "
                        style={{ fontSize: responsiveFontSize(2.5) }}>
                        {order?.items?.length}
                      </Text>
                    </View>
                  </View>
                  <Divider/>

                  <View className="py-2 flex-row items-center justify-between">
                    <View className="px-2" >
                      <View className='flex-row py-1 items-center '>
                        <Person style={{ color: "black" }} />
                        <Text
                          className="font-mulish-semibold text-black px-1.5"
                          style={{ fontSize: responsiveFontSize(2) }}>

                          {order?.customerName}
                        </Text>

                      </View>

                      <View className='flex-row py-1 items-center'>
                        <Phone style={{ color: "black" }} />
                        <Text
                          className="font-mulish-semibold text-black px-1.5"
                          style={{ fontSize: responsiveFontSize(2) }}>

                          {order?.customerContact}
                        </Text>
                      </View>

                      <View className='flex-row py-1 items-center'>
                        <Time style={{ color: "black" }} />
                        <Text
                          className="font-mulish-semibold text-black px-1.5"
                          style={{ fontSize: responsiveFontSize(2) }}>

                          19-04-2024 16:04
                        </Text>
                      </View>

                    </View>
                    <Text className="font-mulish-bold text-black px-2"
                      style={{ fontSize: responsiveFontSize(3) }}>

                      ₹{order?.totalPrice}
                    </Text>
                  </View>

                </View>

              </TouchableOpacity>

            )
          })}

        </ScrollView>
      }
    </SafeAreaView>
  )
}

export default PendingOrderScreen