import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import moment from "moment-timezone"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const AdminOrderCard = memo(({ order }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            key={order?._id}
            onPress={() => navigation.navigate("OrderDetails", { order })}>

            <View
                className="rounded-2xl bg-white mx-3 my-2.5 p-2.5 border-gray-200 border-2 
          shadow-black shadow-md">
                <View
                    className="flex-row justify-between items-center py-1.5 ">
                    <View className="justify-center items-start">
                        <Text
                            className=" text-black font-mulish-regular"
                            style={{ fontSize: responsiveFontSize(2.25) }}>
                            Order no
                        </Text>
                        <Text
                            className="text-xl text-black font-mulish-medium"
                            style={{ fontSize: responsiveFontSize(2.25) }}>
                            #{order?.orderNo}
                        </Text>
                    </View>
                    <View
                        className="flex-row border-2 border-gray-300 rounded-xl p-2.5 items-center justify-center ">
                        <Feather name="shopping-cart" size={responsiveHeight(2.5)} color="black" />
                        <Text
                            className="px-1 font-mulish-bold text-black "
                            style={{ fontSize: responsiveFontSize(2) }}>
                            {order?.items?.length}
                        </Text>
                    </View>
                </View>
                <Divider />

                <View className="py-2 flex-row items-center justify-between">
                    <View className="px-1" >
                        <View className='flex-row py-1 items-center '>
                            <Ionicons name="person-outline" color="black" size={responsiveHeight(2)} />
                            <Text
                                className="font-mulish-semibold text-black px-1.5"
                                style={{ fontSize: responsiveFontSize(1.85) }}>

                                {order?.customerName}
                            </Text>

                        </View>

                        <View className='flex-row py-1 items-center'>
                            <Feather name="phone" color="black" size={responsiveHeight(2)} />
                            <Text
                                className="font-mulish-semibold text-black px-1.5"
                                style={{ fontSize: responsiveFontSize(1.85) }}>

                                {order?.customerContact}
                            </Text>
                        </View>

                        <View className='flex-row py-1 items-center'>
                            <MaterialCommunityIcons
                                name="clock-time-three-outline"
                                color="black"
                                size={responsiveHeight(2)} />
                            <Text
                                className="font-mulish-semibold text-black px-1.5"
                                style={{ fontSize: responsiveFontSize(1.85) }}>
                                {moment.tz(order?.orderedDate, "Asia/Kolkata").format("DD-MM-YYYY")}
                            </Text>
                        </View>

                    </View>
                    <Text className="font-mulish-bold text-black px-2"
                        style={{ fontSize: responsiveFontSize(2.25) }}>

                        ₹{order?.totalPrice}
                    </Text>
                </View>

            </View>

        </TouchableOpacity>
    )
}
)

export default AdminOrderCard