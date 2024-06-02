import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'
import { ActivityIndicator, Appbar, DataTable, Divider } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrderAPI, reOrderAPI } from '../../api/orderAPI'
import { Dialog } from 'react-native-alert-notification'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import moment from "moment-timezone";
import useUserDataQuery from '../../hooks/useUserData'
import { useFocusEffect } from '@react-navigation/native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const UserOrderDetails = ({ navigation, route }) => {
    const { order } = route?.params;
    const queryClient = useQueryClient()
    const { data: userData } = useUserDataQuery()
    const [isPastCutOff, setIsPastCutOff] = useState(false)


    const { mutate: cancelOrder, isPending: cancelling } = useMutation({
        mutationFn: cancelOrderAPI,
        onSuccess: (data) => {
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

    const { mutate: placeOrderAgain, isPending: orderingAgain } = useMutation({
        mutationFn: reOrderAPI,
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

    const isBetween2AMAnd11AM = () => {
        const currentTime = moment.tz("Asia/Kolkata");
        const start = moment.tz("02:00:00", "HH:mm:ss", "Asia/Kolkata");
        const end = moment.tz("11:00:00", "HH:mm:ss", "Asia/Kolkata");
        console.log(currentTime, start, end)
        setIsPastCutOff(currentTime.isBetween(start, end))
        return currentTime.isBetween(start, end);
    };
    useFocusEffect(React.useCallback(() => {
        isBetween2AMAnd11AM()
    }, []))


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
                        fontFamily: "Mulish-Bold",
                        color: "black",
                        fontSize: responsiveFontSize(3),
                    }} />
            </Appbar.Header>
            <Divider />



            <ScrollView className="my-5 px-2.5">

                <View className='flex-row pb-3 items-center justify-between'>
                    <View className="flex-row items-center">

                        <Text
                            className=" font-mulish-regular text-slate-700"
                            style={{ fontSize: responsiveFontSize(2.75) }}>
                            Order&nbsp;
                        </Text>
                        <Text
                            className=" text-black font-mulish-semibold"
                            style={{ fontSize: responsiveFontSize(2.25) }}>
                            #{order?.orderNo}
                        </Text>
                    </View>


                    <View
                        className=" flex-row p-2.5 bg-white border-gray-300 border-2 rounded-xl items-center gap-x-1">
                        {order?.status === "Pending" ?
                            <MaterialCommunityIcons
                                name="timer-sand" size={responsiveHeight(2.25)} color="black" />
                            :
                            order?.status === "Delivered" ?
                                <MaterialCommunityIcons
                                    name="checkbox-multiple-marked-outline" size={responsiveHeight(2.25)} color="black" />
                                :
                                <MaterialCommunityIcons
                                    name="cancel" size={responsiveHeight(2.25)} color="black" />
                        }

                        <Text className="text-black font-mulish-semibold px-1"
                            style={{
                                fontSize: responsiveFontSize(1.85)
                            }}>
                            {order?.status}
                        </Text>
                    </View>
                </View>


                {/* Order Details Card */}
                <View
                    className='bg-white rounded-2xl p-3 mb-3 border-gray-200 border-2'>
                    <View
                        className=" flex-row justify-between items-center py-2 ">
                        <View>
                            <Text
                                className='text-black font-mulish-semibold'
                                style={{ fontSize: responsiveFontSize(2.25) }}>
                                Order Details
                            </Text>
                            <Text
                                className="text-black py-2 font-mulish-regular"
                                style={{ fontSize: responsiveFontSize(1.5) }}>
                                {moment.tz(order?.orderedDate, "Asia/Kolkata").format("DD-MM-YYYY hh:mm A")}

                            </Text>

                        </View>
                        <Text
                            className="font-mulish-semibold text-black"
                            style={{ fontSize: responsiveFontSize(2.25) }}>

                            Total : ₹ {order?.totalPrice}
                        </Text>
                    </View>
                    <Divider />

                    <View
                        className="py-2 gap-2 justify-center">

                        <View className="flex-row gap-x-0.5">
                            <EvilIcons name="location" color="black" size={responsiveHeight(3)} />
                            <View className='flex-shrink '>
                                <Text
                                    className="text-black font-mulish-regular "
                                    style={{ fontSize: responsiveFontSize(1.75) }}>
                                    {order?.address?.line1}
                                </Text>

                                <Text
                                    className="text-black font-mulish-regular "
                                    style={{ fontSize: responsiveFontSize(1.75) }}>
                                    {order?.address?.line2}
                                </Text>

                                <Text
                                    className="text-black font-mulish-regular "
                                    style={{ fontSize: responsiveFontSize(1.75) }}>
                                    Pincode: {order?.address?.pincode}
                                </Text>

                                {order?.address?.landmark?.length > 0 &&
                                    <Text
                                        className="text-black font-mulish-regular "
                                        style={{ fontSize: responsiveFontSize(1.75) }}>
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
                                    style={{ fontSize: responsiveFontSize(1.65) }}>
                                    Item Name
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric >
                                <Text className="text-black font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(1.65) }}>

                                    Quantity / Price
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric >
                                <Text className="text-black  font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(1.65) }}>
                                    Price
                                </Text>
                            </DataTable.Title>
                        </DataTable.Header>

                        <Divider bold />

                        {order?.items?.map((product) => {
                            return (
                                <DataTable.Row key={product?._id}>
                                    <DataTable.Cell >
                                        <Text className=" text-black font-mulish-medium"
                                            style={{ fontSize: responsiveFontSize(1.65) }}>
                                            {product?.cartItem?.title[0]}

                                        </Text>
                                    </DataTable.Cell>


                                    <DataTable.Cell numeric
                                        textStyle={{
                                            fontSize: responsiveFontSize(1.5),
                                            color: "black",
                                            fontFamily: "Mulish-Medium"
                                        }}>

                                        {product?.quantity} {product?.cartItem?.unit} / ₹{product?.cartItem?.price?.[order?.customerCategory]}
                                    </DataTable.Cell>


                                    <DataTable.Cell numeric
                                        textStyle={{
                                            fontSize: responsiveFontSize(1.65),
                                            color: "black",
                                            fontFamily: "Mulish-Medium"

                                        }}>
                                        ₹ {Number((Number(product?.quantity) * Number(product?.cartItem?.price?.[userData?.category])).toFixed(2))}
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
                        <MaterialIcons name='payment' size={responsiveFontSize(2.5)} color='black' />
                        <Text
                            className="font-mulish-bold text-black "
                            style={{ fontSize: responsiveFontSize(2.25) }}>
                            Payment Details
                        </Text>
                    </View>
                    <Divider bold />
                    <View>


                        <DataTable  >




                            <DataTable.Row numeric>
                                <DataTable.Cell>
                                    <Text className=' text-black font-mulish-bold'
                                        style={{ fontSize: responsiveFontSize(1.85) }}>
                                        Final Total :
                                    </Text>
                                </DataTable.Cell>

                                <DataTable.Cell numeric>
                                    <Text className=' text-black font-mulish-bold'
                                        style={{ fontSize: responsiveFontSize(1.85) }}>
                                        ₹ {order?.totalPrice}
                                    </Text>
                                </DataTable.Cell>

                            </DataTable.Row>
                        </DataTable>

                    </View>

                </View>


            </ScrollView>


            {/* Bottom button */}
            {/* {order?.status === "Pending"
                ?
                <View className="relative bottom-2.5 items-center">
                    <TouchableOpacity className='bg-red-400 p-5 rounded-2xl '
                        disabled={cancelling || isPastCutOff}
                        onPress={() => cancelOrder(order?._id)}
                        style={{ width: responsiveWidth(90) }}>

                        {cancelling ?
                            <ActivityIndicator
                                color='white'
                                style={{
                                    paddingVertical: responsiveHeight(0.5)
                                }} />
                            :
                            <Text
                                className="text-white text-center font-mulish-semibold"
                                style={{
                                    fontSize: isPastCutOff ? responsiveFontSize(2) : responsiveFontSize(2.5)
                                }}>
                                {isPastCutOff ?
                                    "Cancelling order not allowed between 2am and 11pm" :
                                    "Cancel Order"
                                }
                            </Text>
                        }

                    </TouchableOpacity>
                </View>
                : */}
            <View className="relative bottom-2.5 items-center">
                <TouchableOpacity className='bg-[#53B175] p-5 rounded-2xl '
                    disabled={orderingAgain}
                    onPress={() => placeOrderAgain({
                        items: order?.items
                    })}
                    style={{ width: responsiveWidth(90) }}>

                    {orderingAgain ?
                        <ActivityIndicator
                            color='white'
                            style={{
                                paddingVertical: responsiveHeight(0.5)
                            }} />
                        :
                        <Text
                            className="text-white text-center font-mulish-semibold"
                            style={{ fontSize: responsiveFontSize(2.5) }}>
                            Order Again
                        </Text>
                    }

                </TouchableOpacity>
            </View>
            {/*  } */}


        </SafeAreaView>
    )
}

export default UserOrderDetails
