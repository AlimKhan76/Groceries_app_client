import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'
import { ActivityIndicator, Appbar, DataTable, Divider } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateOrderStatusAPI } from '../../api/adminAPIs/orderAPI'
import moment from 'moment-timezone'
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { Toast } from 'react-native-alert-notification'

const OrderDetailsScreen = ({ navigation, route }) => {
    const { order } = route?.params;
    const queryClient = useQueryClient();

    const { mutate, isPending: markingOrder } = useMutation({
        mutationFn: updateOrderStatusAPI,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["order"]
            })
            queryClient.invalidateQueries({
                queryKey: ["deliveredOrder"]
            })
            Toast.show({
                type: "SUCCESS",
                autoClose: 1500,
                title: data,
            })
            navigation.replace("Admin", { screen: "PendingOrders" })
        },
        onError: (error) => {
            Toast.show({
                type: "DANGER",
                title: error,
                autoClose: 1500,
                textBody: "Please Try Again",

            })
        }

    })

    const data = [
        { label: 'Out for delivery', value: 'Out for delivery' },
        { label: 'Delivered', value: 'Delivered' },
    ];

    const [selected, setSelected] = useState("null");

    return (
        <SafeAreaView className=" flex-1 "
            edges={["right", "left", "top"]}>


            <Appbar.Header
                mode='center-aligned'
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



            <ScrollView className="my-4 px-2.5">

                <View className='flex-row pb-5 items-center justify-between'>
                    <View className="flex-row items-center">
                        <Text
                            className=" font-mulish-medium text-slate-700"
                            style={{ fontSize: responsiveFontSize(2.75) }}>
                            Order&nbsp;
                        </Text>
                        <Text
                            className="text-2xl text-black font-mulish-semibold"
                            style={{ fontSize: responsiveFontSize(2.75) }}>
                            #{order?.orderNo}
                        </Text>
                    </View>

                    <View
                        className=" flex-row p-2.5 bg-white border-gray-300 border-2 rounded-xl items-center gap-x-1">
                        {order?.status === "Pending" ?
                            <MaterialCommunityIcons
                                name="timer-sand" size={responsiveHeight(2.25)} color="black" />
                            :
                            order?.status === "Packed" ?
                                <MaterialCommunityIcons
                                    name="package-variant-closed" size={responsiveHeight(2.25)} color="black" />
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
                        className=" flex-row justify-between items-center py-2.5 ">
                        <View>
                            <Text
                                className='text-xl text-black font-mulish-semibold'
                                style={{ fontSize: responsiveFontSize(2.35) }}>
                                Order Details
                            </Text>
                            <Text
                                className="text-black py-2 font-mulish-regular"
                                style={{ fontSize: responsiveFontSize(1.5) }}>

                                {moment.tz(order?.orderedDate, "Asia/Kolkata").format("DD-MM-YYYY hh:mm A")}
                            </Text>

                        </View>
                        <Text
                            className="font-mulish-bold  text-black"
                            style={{ fontSize: responsiveFontSize(2) }}>

                            Total : ₹ {order?.totalPrice}
                        </Text>
                    </View>
                    <Divider />

                    <View
                        className="py-2 gap-y-2 justify-center">

                        <View
                            className="flex-row gap-x-1.5 items-center ">
                            <Ionicons name="person-outline" color="black" size={responsiveHeight(2.25)} />
                            <Text
                                className="text-black font-mulish-medium "
                                style={{ fontSize: responsiveFontSize(1.65) }}>

                                {order?.customerName}
                            </Text>
                        </View>

                        <View className="flex-row gap-x-1.5 items-center ">
                            <Feather name="phone" color="black" size={responsiveHeight(2.25)} />
                            <Text
                                className="text-black font-mulish-regular "
                                style={{ fontSize: responsiveFontSize(1.65) }}>

                                {order?.customerContact}
                            </Text>
                        </View>

                        <View className="flex-row gap-x-1">
                            <Ionicons name="location-outline" color="black" size={responsiveHeight(2.75)}
                                style={{
                                    paddingVertical: responsiveHeight(0.25)
                                }} />
                            <View className='flex-shrink '>
                                <Text
                                    className="text-black font-mulish-regular "
                                    style={{ fontSize: responsiveFontSize(1.65) }}>

                                    {order?.address?.line1}
                                </Text>
                                <Text
                                    className="text-black font-mulish-regular "
                                    style={{ fontSize: responsiveFontSize(1.65) }}>

                                    {order?.address?.line2}
                                </Text>
                                <Text
                                    className="text-black font-mulish-regular "
                                    style={{ fontSize: responsiveFontSize(1.65) }}>

                                    Pincode: {order?.address?.pincode}
                                </Text>

                                {order?.address?.landmark?.length > 0 &&
                                    <Text
                                        className="text-black font-mulish-regular "
                                        style={{ fontSize: responsiveFontSize(1.65) }}>

                                        Landmark : {order?.address?.landmark}
                                    </Text>
                                }
                            </View>
                        </View>

                    </View>


                </View>




                {/* Customer Details Card */}
                <View
                    className="bg-white rounded-2xl p-3 mb-3 border-gray-300 border-2">

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title
                                textStyle={{
                                    fontSize: responsiveFontSize(1.65),
                                    fontFamily: "Mulish-Bold",
                                    color: "black",
                                }}>
                                Item Name
                            </DataTable.Title>

                            <DataTable.Title numeric
                                textStyle={{
                                    fontSize: responsiveFontSize(1.65),
                                    fontFamily: "Mulish-Bold",
                                    color: "black",
                                }}>
                                Quantity
                            </DataTable.Title>

                            <DataTable.Title numeric
                                textStyle={{
                                    fontSize: responsiveFontSize(1.65),
                                    fontFamily: "Mulish-Bold",
                                    color: "black",
                                }}>
                                Price
                            </DataTable.Title>
                        </DataTable.Header>

                        <Divider bold />

                        {order?.items?.map((product) => {
                            return (
                                <DataTable.Row key={product?.cartItem?._id}>

                                    <DataTable.Cell >
                                        <Text className=" text-black font-mulish-medium"
                                            style={{ fontSize: responsiveFontSize(1.65) }}>

                                            {product?.cartItem?.title}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric
                                        textStyle={{
                                            fontSize: responsiveFontSize(1.5),
                                            fontFamily: "Mulish-Medium",
                                            color: "black",
                                        }}>

                                        {product?.quantity} {product?.cartItem?.unit} / ₹{product?.cartItem?.price?.[order?.customerCategory]}
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric
                                        textStyle={{
                                            fontSize: responsiveFontSize(1.65),
                                            fontFamily: "Mulish-Bold",
                                            color: "black",
                                        }}>
                                        ₹ {product?.quantity * product?.cartItem?.price?.[order?.customerCategory]}
                                    </DataTable.Cell>
                                </DataTable.Row>

                            )
                        })}


                    </DataTable>

                </View>


                {/* Payment Summary Card */}

                <View className="p-3 rounded-2xl bg-white mb-3 ">
                    <View
                        className=" py-2 flex-row items-center gap-x-2">
                        <MaterialIcons name='payment' size={responsiveHeight(2.5)} color='black' />
                        <Text
                            className="font-mulish-bold text-black "
                            style={{ fontSize: responsiveFontSize(2.25) }}>

                            Payment Details
                        </Text>
                    </View>
                    <Divider bold />

                    <View>
                        <DataTable numeric >

                            <DataTable.Row numeric>
                                <DataTable.Cell
                                    textStyle={{
                                        fontSize: responsiveFontSize(1.75),
                                        fontFamily: "Mulish-Bold",
                                        color: "black",
                                    }}>
                                    Final Total :
                                </DataTable.Cell>

                                <DataTable.Cell numeric
                                    textStyle={{
                                        fontSize: responsiveFontSize(1.75),
                                        fontFamily: "Mulish-Bold",
                                        color: "black",
                                    }}>
                                    ₹ {order?.totalPrice}

                                </DataTable.Cell>
                            </DataTable.Row>

                        </DataTable>

                    </View>



                </View>










            </ScrollView>


            {order?.status !== "Delivered" &&
                <View className="relative bottom-2.5 items-center">

                    <TouchableOpacity
                        disabled={markingOrder}
                        className='bg-[#53B175] p-5 rounded-2xl '
                        style={{ width: responsiveWidth(90) }}
                        onPress={() => {
                            // if (order?.status === "Pending") {
                            // mutate({ orderId: order?._id, status: "Packed" })
                            // }
                            // else if (order?.status === "Packed") {
                            mutate({ orderId: order?._id, status: "Delivered" })
                            // }
                        }}>

                        <View className="flex-row items-center justify-center gap-2">

                            {markingOrder ?
                                <ActivityIndicator color="white" style={{
                                    paddingVertical: responsiveHeight(0.3)
                                }} />
                                :
                                <Text
                                    className="text-white text-center font-mulish-semibold"
                                    style={{ fontSize: responsiveFontSize(2.5) }}>
                                    {/* {order?.status === "Pending" ? "Mark as Packed" */}
                                    {/* // : */}
                                    {/* // order?.status === "Processed" ? "Mark as Packed"  */}
                                    Mark as Delivered
                                </Text>
                            }

                            {/* <Dropdown
                            className=" items-center px-2 py-1 justify-center rounded-2xl 
                            w-48 bg-[#53B175] border-2 border-white"
                            dropdownPosition="top"
                            containerStyle={{
                                justifyContent: 'center',
                                marginBottom: 12,
                                backgroundColor: "white", borderRadius: 16, color: 'white',
                                borderColor: 'white'
                            }}
                            itemTextStyle={{
                                alignContent: "center",
                                color: '#53B175',
                                fontFamily: "Mulish-SemiBold"
                            }}
                            selectedTextStyle={{
                                color: "white", fontSize: 20, fontFamily: "Mulish-SemiBold"
                            }}
                            iconColor='white'
                            placeholderStyle={{
                                color: "white", fontSize: 20, fontFamily: "Mulish-SemiBold"
                            }}
                            data={data}
                            labelField="label"
                            valueField="value"
                            placeholder="Select status"
                            value={selected}
                            onChange={item => {
                                setSelected(item);
                            }}
                        /> */}
                        </View>
                    </TouchableOpacity>
                </View>
            }

        </SafeAreaView >
    )
}

export default OrderDetailsScreen