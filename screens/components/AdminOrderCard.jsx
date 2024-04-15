import { View, Text, TouchableOpacity, RefreshControl, FlatList } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Cart from "../../assets/icons/tabs/cart.svg"
import Person from "../../assets/icons/tabs/person.svg"
import Phone from "../../assets/icons/admin/phone.svg"
import Time from "../../assets/icons/admin/time.svg"
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { getOrdersByStatus, getPendingProducts, getProcessedProducts } from '../../api/adminAPIs/orderAPI'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import { moderateScale } from 'react-native-size-matters'

const AdminOrderCard = memo(({ order }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            key={order?._id}
            onPress={() => navigation.navigate("OrderDetails", { order })}
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
                            style={{ fontSize: responsiveFontSize(2.5) }}>
                            #{order?.orderNo}
                        </Text>
                    </View>
                    <View
                        className="flex-row border-2 border-gray-300 rounded-xl p-2.5 items-center ">
                        <Cart style={{ color: "black" }} />
                        <Text
                            className="px-1 font-mulish-bold text-black "
                            style={{ fontSize: responsiveFontSize(2) }}>
                            {order?.items?.length}
                        </Text>
                    </View>
                </View>
                <Divider />

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
                                {order?.orderedDate?.split(" ")[0]}
                            </Text>
                        </View>

                    </View>
                    <Text className="font-mulish-bold text-black px-2"
                        style={{ fontSize: responsiveFontSize(2.5) }}>

                        ₹{order?.totalPrice}
                    </Text>
                </View>

            </View>

        </TouchableOpacity>
    )
}
)

export default AdminOrderCard