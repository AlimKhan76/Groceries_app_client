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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateOrderApi } from '../../api/adminAPIs/orderAPI'
import { moderateScale, scale } from 'react-native-size-matters'

const OrderDetailsScreen = ({ navigation, route }) => {
    const { order } = route?.params;
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateOrderApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["order", "deliveredOrder"]
            })
            navigation.replace("Admin", { screen: "PendingOrders" })

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

                <View className='flex-row pb-5 items-center justify-between'>
                    <View className="flex-row items-center">
                        <Text
                            className=" font-mulish-regular text-slate-700"
                            style={{ fontSize: responsiveFontSize(3) }}>
                            Order&nbsp;
                        </Text>
                        <Text
                            className="text-2xl text-black font-mulish-semibold"
                            style={{ fontSize: responsiveFontSize(3) }}>
                            #{order?.orderNo}
                        </Text>
                    </View>

                    <View 
                    className=" flex-row p-2.5 bg-white border-gray-300 border-2 rounded-xl items-center gap-x-1">
                        {order?.status === "Pending" ?
                            <MaterialCommunityIcons 
                            name="timer-sand" size={moderateScale(20)} color="black" />
                            :
                            order?.status === "Packed" ?
                                <MaterialCommunityIcons 
                                name="package-variant-closed" size={moderateScale(20)} color="black" />
                                :
                                order?.status === "Delivered" ?
                                <MaterialCommunityIcons 
                                name="checkbox-multiple-marked-outline" size={moderateScale(20)} color="black" />
                                :
                                <MaterialCommunityIcons 
                                name="cancel" size={moderateScale(20)} color="black" />


                        }

                        <Text className="text-black font-mulish-semibold px-1"
                            style={{
                                fontSize: moderateScale(15)
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
                                style={{ fontSize: responsiveFontSize(2.5) }}>
                                Order Details
                            </Text>
                            <Text
                                className="text-black py-2 font-mulish-regular"
                                style={{ fontSize: responsiveFontSize(1.5) }}>

                                {order?.orderedDate.replace(" ", " at ")}
                            </Text>

                        </View>
                        <Text
                            className="font-mulish-bold  text-black"
                            style={{ fontSize: responsiveFontSize(2) }}>

                            Total : ₹ {order?.totalPrice}
                        </Text>
                    </View>
                    <Divider />




                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>
                                <Text className="text-black font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(1.8) }}>
                                    Item Name
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric >
                                <Text className="text-black font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(1.8) }}>

                                    Quantity
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric >
                                <Text className="text-black  font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(1.8) }}>

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
                                            style={{ fontSize: responsiveFontSize(1.8) }}>

                                            {product?.title}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        <Text className=" text-gray-700 font-mulish-regular"
                                            style={{ fontSize: responsiveFontSize(1.8) }}>

                                            {product?.quantity} {product?.unit}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        <Text className=" text-gray-700 font-mulish-regular"
                                            style={{ fontSize: responsiveFontSize(1.8) }}>

                                            ₹ {product?.totalPrice}
                                        </Text>
                                    </DataTable.Cell>
                                </DataTable.Row>

                            )
                        })}


                    </DataTable>

                </View>




                {/* Customer Details Card */}
                <View
                    className="bg-white rounded-2xl p-3 mb-3 border-gray-300 border-2">
                    <View
                        className="py-2">
                        <Text
                            className="font-mulish-semibold text-black"
                            style={{ fontSize: responsiveFontSize(2.5) }}>
                            Customer Details
                        </Text>
                    </View>
                    <Divider bold />

                    <View
                        className="py-2 gap-2 justify-center">
                        <View
                            className="flex-row gap-x-1 items-center ">
                            <Person style={{ color: "black" }} />
                            <Text
                                className="text-black font-mulish-regular "
                                style={{ fontSize: responsiveFontSize(1.8) }}>

                                {order?.customerName}
                            </Text>
                        </View>

                        <View className="flex-row gap-x-1 items-center ">
                            <Phone color="black" />
                            <Text
                                className="text-black font-mulish-regular "
                                style={{ fontSize: responsiveFontSize(1.8) }}>

                                {order?.customerContact}
                            </Text>
                        </View>

                        <View className="flex-row gap-x-1   ">
                            <Pin style={{ color: "black" }} />
                            <View className='flex-shrink '>
                                <Text
                                    className="text-black font-mulish-regular text-lg"
                                    style={{ fontSize: responsiveFontSize(1.8) }}>

                                    {order?.address?.line1}
                                </Text>
                                <Text
                                    className="text-black font-mulish-regular text-lg"
                                    style={{ fontSize: responsiveFontSize(1.8) }}>

                                    {order?.address?.line2}
                                </Text>
                                <Text
                                    className="text-black font-mulish-regular text-lg"
                                    style={{ fontSize: responsiveFontSize(1.8) }}>

                                    {order?.address?.pincode}
                                </Text>
                                <Text
                                    className="text-black font-mulish-regular text-lg"
                                    style={{ fontSize: responsiveFontSize(1.8) }}>

                                    Near: {order?.address?.landmark}
                                </Text>
                            </View>
                        </View>

                    </View>

                </View>


                {/* Payment Summary Card */}

                <View className="p-3 rounded-2xl bg-white mb-3 ">
                    <View
                        className=" py-2 flex-row items-center gap-x-2">
                        <MaterialIcons name='payment' size={20} color='black' />
                        <Text
                            className="font-mulish-semibold text-black text-xl"
                            style={{ fontSize: responsiveFontSize(2.5) }}>

                            Payment Details
                        </Text>
                    </View>
                    <Divider bold />

                    <View>
                        <DataTable numeric >

                            <DataTable.Row numeric>
                                <DataTable.Cell>
                                    <Text className='text-lg text-black font-mulish-medium'
                                        style={{ fontSize: responsiveFontSize(1.8) }}>

                                        Sub Total :
                                    </Text>

                                </DataTable.Cell>

                                <DataTable.Cell numeric>
                                    <Text className='text-lg text-black font-mulish-medium'
                                        style={{ fontSize: responsiveFontSize(1.8) }}>

                                        ₹ {order?.subTotal}
                                    </Text>

                                </DataTable.Cell>
                            </DataTable.Row>


                            {order?.couponCode !== "" &&
                                <>
                                    <DataTable.Row numeric>
                                        <DataTable.Cell>
                                            <Text className='text-lg text-black font-mulish-medium'
                                                style={{ fontSize: responsiveFontSize(1.8) }}>
                                                Discount  : ({order?.couponCode})
                                            </Text>

                                        </DataTable.Cell>

                                        <DataTable.Cell numeric>
                                            <Text className='text-lg text-black font-mulish-regular'
                                                style={{ fontSize: responsiveFontSize(1.8) }}>

                                                - ₹ {order?.discount}
                                            </Text>

                                        </DataTable.Cell>
                                    </DataTable.Row>
                                    <Divider bold />
                                </>

                            }

                            <DataTable.Row numeric>
                                <DataTable.Cell>
                                    <Text className='text-lg text-black font-mulish-bold'
                                        style={{ fontSize: responsiveFontSize(2) }}>

                                        Final Total :
                                    </Text>
                                </DataTable.Cell>

                                <DataTable.Cell numeric>
                                    <Text className='text-lg text-black font-mulish-bold'
                                        style={{ fontSize: responsiveFontSize(2) }}>

                                        ₹ {order?.totalPrice}
                                    </Text>

                                </DataTable.Cell>
                            </DataTable.Row>

                        </DataTable>

                    </View>



                </View>










            </ScrollView>


            {order?.status !== "Delivered" &&
                <View className="relative bottom-5 items-center">

                    <TouchableOpacity className='bg-[#53B175] p-5 rounded-2xl '
                        style={{ width: scale(300) }}
                        onPress={() => {
                            if (order?.status === "Pending") {
                                mutate({ orderId: order?._id, status: "Packed" })
                            }
                            else if (order?.status === "Packed") {
                                mutate({ orderId: order?._id, status: "Delivered" })
                            }
                        }}>

                        <View className="flex-row items-center justify-center gap-2">

                            <Text
                                className="text-white text-center font-mulish-semibold"
                                style={{ fontSize: moderateScale(20) }}>
                                {order?.status === "Pending" ? "Mark as Packed"
                                    // :
                                    // order?.status === "Processed" ? "Mark as Packed" 
                                    : "Mark as Delivered"}
                            </Text>

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