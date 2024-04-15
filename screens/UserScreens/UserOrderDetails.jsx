import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'
import LeftArrow from "../../assets/icons/account/left_arrow.svg"
import Pin from "../../assets/icons/account/pin.svg"
import Person from "../../assets/icons/tabs/person.svg"
import Phone from "../../assets/icons/admin/phone.svg"
import { Appbar, DataTable, Divider } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters'
import { scale } from 'react-native-size-matters'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrderApi, placeOrderApi, reOrderApi } from '../../api/orderAPI'
import { Dialog } from 'react-native-alert-notification'


const UserOrderDetails = ({ navigation, route }) => {
    const { order } = route?.params;
    const queryClient = useQueryClient()

    const { mutate: cancelOrder, isPending: cancelling } = useMutation({
        mutationFn: cancelOrderApi,
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["userOrders"] })
            Dialog.show({
                type: "SUCCESS",
                button: "OK",
                title: "Order Cancelled",
                autoClose: 1000,
            })
            navigation.navigate("AllOrderScreen")
        },
        onError: () => {
            Dialog.show({
                type: "DANGER",
                button: "Ok",
                title: "Please Try again later",
                autoClose: 1000,
            })

        }

    })

    const { mutate: placeOrderAgain, isPending } = useMutation({
        mutationFn: reOrderApi,
        onError: () => {
            Dialog.show({
                type: "DANGER",
                autoClose: 1000,
                button: "OK",
                title: "Error in replacing the Order",
                textBody: "Please try again later ! !"
            })
        },
        onSuccess: () => {
            Dialog.show({
                type: "SUCCESS",
                title: "Order added to Cart",
                autoClose: 500,
            })
            navigation.navigate("Cart")
            queryClient.invalidateQueries({
                queryKey: ['cartItems']
            })

        }
    })


    return (
        <SafeAreaView className=" flex-1 "
            edges={["right", "left", "top"]}>


            <Appbar.Header mode='center-aligned'
                style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(10),
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
                statusBarHeight={0} >
                <Appbar.BackAction
                    iconColor="black"
                    onPress={() => navigation.goBack()} />

                <Appbar.Content
                    title="Order Details "
                    titleStyle={{
                        fontFamily: "Mulish-SemiBold",
                        color: "black",
                        fontSize: responsiveFontSize(3),
                    }} />
            </Appbar.Header>
            <Divider />



            <ScrollView className="my-5 px-2.5">

                <View className='flex-row pb-5 items-center'>
                    <Text
                        className=" font-mulish-regular text-slate-700"
                        style={{ fontSize: moderateScale(25) }}>
                        Order&nbsp;
                    </Text>
                    <Text
                        className=" text-black font-mulish-semibold"
                        style={{ fontSize: moderateScale(25) }}>
                        #{order?.orderNo}
                    </Text>
                </View>


                {/* Order Details Card */}
                <View
                    className='bg-white rounded-2xl p-3 mb-3 border-gray-200 border-2'>
                    <View
                        className=" flex-row justify-between items-center py-2 ">
                        <View>
                            <Text
                                className='text-xl text-black font-mulish-semibold'
                                style={{ fontSize: moderateScale(20) }}>
                                Order Details
                            </Text>
                            <Text
                                className="text-black py-2 font-mulish-regular"
                                style={{ fontSize: moderateScale(11) }}>

                                {order?.orderedDate.replace(" ", " at ")}
                            </Text>

                        </View>
                        <Text
                            className="font-mulish-semibold text-black"
                            style={{ fontSize: moderateScale(15) }}>

                            Total : ₹ {order?.totalPrice}
                        </Text>
                    </View>
                    <Divider />

                    <View
                        className="py-2 gap-2 justify-center">

                        <View className="flex-row gap-x-1">
                            <Pin style={{ color: "black" }} />
                            <View className='flex-shrink '>
                                <Text
                                    className="text-black font-mulish-regular "
                                    style={{ fontSize: moderateScale(15) }}>
                                    {order?.address?.line1}
                                </Text>

                                <Text
                                    className="text-black font-mulish-regular "
                                    style={{ fontSize: moderateScale(15) }}>
                                    {order?.address?.line2}
                                </Text>

                                <Text
                                    className="text-black font-mulish-regular "
                                    style={{ fontSize: moderateScale(15) }}>
                                    Pincode: {order?.address?.pincode}
                                </Text>

                                {order?.address?.landmark.length > 0 &&
                                    <Text
                                        className="text-black font-mulish-regular "
                                        style={{ fontSize: moderateScale(15) }}>
                                        Landmark : {order?.address?.landmark}
                                    </Text>
                                }
                            </View>

                        </View>

                    </View>

                </View>




                {/* Customer Details Card */}
                <View
                    className="bg-white rounded-2xl p-3 mb-3 ">
                    {/* <View
                        className="pb-3 ">
                        <Text
                            className="font-mulish-semibold text-black"
                            style={{ fontSize: moderateScale(20) }}>
                            Order Details
                        </Text>
                    </View> */}
                    {/* <Divider /> */}

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>
                                <Text className="text-black font-mulish-bold"
                                    style={{ fontSize: moderateScale(15) }}>
                                    Item Name
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric >
                                <Text className="text-black font-mulish-bold"
                                    style={{ fontSize: moderateScale(15) }}>

                                    Quantity
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric >
                                <Text className="text-black  font-mulish-bold"
                                    style={{ fontSize: moderateScale(15) }}>
                                    Price
                                </Text>
                            </DataTable.Title>
                        </DataTable.Header>

                        <Divider bold />

                        {order?.items?.map((product) => {
                            return (
                                <DataTable.Row key={product?._id}>
                                    <DataTable.Cell >
                                        <Text className=" text-gray-700 font-mulish-regular"
                                            style={{ fontSize: moderateScale(15) }}>
                                            {product?.title}
                                        </Text>
                                    </DataTable.Cell>


                                    <DataTable.Cell numeric>
                                        <Text className=" text-gray-700 font-mulish-regular"
                                            style={{ fontSize: moderateScale(15) }}>
                                            {product?.quantity} {product?.unit}
                                        </Text>
                                    </DataTable.Cell>


                                    <DataTable.Cell numeric>
                                        <Text className=" text-gray-700 font-mulish-regular"
                                            style={{ fontSize: moderateScale(15) }}>
                                            ₹ {product?.totalPrice}
                                        </Text>
                                    </DataTable.Cell>


                                </DataTable.Row>
                            )
                        })}


                    </DataTable>

                </View>


                {/* Payment Summary Card */}

                <View className="p-3 rounded-2xl bg-white mb-3 ">
                    <View
                        className=" py-2 flex-row items-center  gap-x-2">
                        <MaterialIcons name='payment' size={moderateScale(20)} color='black' />
                        <Text
                            className="font-mulish-bold text-black "
                            style={{ fontSize: moderateScale(18) }}>
                            Payment Details
                        </Text>
                    </View>
                    <Divider bold />
                    <View>


                        <DataTable numeric >

                            <DataTable.Row numeric>
                                <DataTable.Cell>
                                    <Text className=' text-black font-mulish-medium'
                                        style={{ fontSize: moderateScale(15) }}>
                                        Sub Total :
                                    </Text>
                                </DataTable.Cell>

                                <DataTable.Cell numeric>
                                    <Text className=' text-black font-mulish-medium'
                                        style={{ fontSize: moderateScale(15) }}>
                                        ₹ {order?.subTotal}
                                    </Text>
                                </DataTable.Cell>

                            </DataTable.Row>


                            {order?.couponCode !== "" &&
                                <>
                                    <DataTable.Row numeric>
                                        <DataTable.Cell>
                                            <Text className=' text-black font-mulish-medium'
                                                style={{ fontSize: moderateScale(15) }}>
                                                Discount  : ({order?.couponCode})
                                            </Text>
                                        </DataTable.Cell>

                                        <DataTable.Cell numeric>
                                            <Text className=' text-black font-mulish-regular'
                                                style={{ fontSize: moderateScale(15) }}>
                                                - ₹ {order?.discount}
                                            </Text>
                                        </DataTable.Cell>

                                    </DataTable.Row>
                                    <Divider bold />
                                </>
                            }

                            <DataTable.Row numeric>
                                <DataTable.Cell>
                                    <Text className=' text-black font-mulish-bold'
                                        style={{ fontSize: moderateScale(15) }}>
                                        Final Total :
                                    </Text>
                                </DataTable.Cell>

                                <DataTable.Cell numeric>
                                    <Text className=' text-black font-mulish-bold'
                                        style={{ fontSize: moderateScale(15) }}>
                                        ₹ {order?.totalPrice}
                                    </Text>
                                </DataTable.Cell>

                            </DataTable.Row>
                        </DataTable>

                    </View>

                </View>


            </ScrollView>


            {/* Bottom button */}
            {order?.status === "Pending"
                ?
                <View className="relative bottom-5 items-center">
                    <TouchableOpacity className='bg-red-400 p-5 rounded-2xl '
                        disabled={cancelling}
                        onPress={() => cancelOrder(order?._id)}
                        style={{ width: scale(300) }}>

                        <View
                            className="flex-row items-center justify-center gap-2">
                            <Text
                                className="text-white text-center font-mulish-semibold"
                                style={{ fontSize: moderateScale(20) }}>
                                Cancel Order
                            </Text>
                        </View>

                    </TouchableOpacity>
                </View>
                :
                <View className="relative bottom-5 items-center">
                    <TouchableOpacity className='bg-[#53B175] p-5 rounded-2xl '
                        disabled={isPending}
                        onPress={() => placeOrderAgain({
                            items: order?.items
                        })}
                        style={{ width: scale(300) }}>

                        <View className="flex-row items-center justify-center gap-2">
                            <Text
                                className="text-white text-center font-mulish-semibold"
                                style={{ fontSize: scale(20) }}>
                                Order Again
                            </Text>
                        </View>

                    </TouchableOpacity>
                </View>
            }


        </SafeAreaView>
    )
}

export default UserOrderDetails
