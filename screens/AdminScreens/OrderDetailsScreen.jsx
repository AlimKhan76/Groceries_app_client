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
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const OrderDetailsScreen = ({ navigation, route }) => {
    const { order } = route?.params;

    const data = [
        { label: 'Out for delivery', value: 'Out for delivery' },
        { label: 'Delivered', value: 'Delivered' },
    ];

    const [selected, setSelected] = useState("null");

    return (
        <SafeAreaView className="px-2.5 bg-gray-100 flex-1 "
            edges={["right", "left", "top"]}>


            <Appbar.Header mode='center-aligned'
                style={{
                    backgroundColor: ' rgb(243 244 246 )'
                }}
                statusBarHeight={0} >
                <Appbar.BackAction
                    iconColor="black"
                    onPress={() => navigation.goBack()} />

                <Appbar.Content title="Order Details "
                    titleStyle={{
                        fontFamily: "Mulish-SemiBold",
                        color: "black",
                        fontSize: responsiveFontSize(3.5),
                    }} />
            </Appbar.Header>
            <Divider bold />



            <ScrollView className="my-5">

                <View className='flex-row pb-5 items-center'>
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


                {/* Order Details Card */}
                <View
                    className='bg-white rounded-2xl p-3 mb-3 border-gray-300 border-2'>
                    <View
                        className="border-b-2 flex-row justify-between items-center border-gray-300 py-2.5 ">
                        <View>
                            <Text
                                className='text-xl text-black font-mulish-semibold'
                                style={{ fontSize: responsiveFontSize(3) }}>

                                Order Details
                            </Text>
                            <Text
                                className="text-black py-2 font-mulish-regular">
                                19-02-2024 at 16:04
                            </Text>
                        </View>
                        <Text
                            className="font-mulish-bold  text-black"
                            style={{ fontSize: responsiveFontSize(2.5) }}>

                            Total : ₹ {order?.totalPrice}
                        </Text>
                    </View>




                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>
                                <Text className="text-black font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(2) }}>
                                    Item Name
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric >
                                <Text className="text-black font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(2) }}>

                                    Quantity
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric >
                                <Text className="text-black  font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(2) }}>

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
                                            style={{ fontSize: responsiveFontSize(2) }}>

                                            {product?.title}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        <Text className=" text-gray-700 font-mulish-regular"
                                            style={{ fontSize: responsiveFontSize(2) }}>

                                            {product?.quantity} {product?.unit}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        <Text className=" text-gray-700 font-mulish-regular"
                                            style={{ fontSize: responsiveFontSize(2) }}>

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
                            style={{ fontSize: responsiveFontSize(3) }}>
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
                                style={{ fontSize: responsiveFontSize(2) }}>

                                {order?.customerName}
                            </Text>
                        </View>

                        <View className="flex-row gap-x-1 items-center ">
                            <Phone color="black" />
                            <Text
                                className="text-black font-mulish-regular "
                                style={{ fontSize: responsiveFontSize(2) }}>

                                {order?.customerContact}
                            </Text>
                        </View>

                        <View className="flex-row gap-x-1   ">
                            <Pin style={{ color: "black" }} />
                            <View className='flex-shrink '>
                                <Text
                                    className="text-black font-mulish-regular text-lg"
                                    style={{ fontSize: responsiveFontSize(2) }}>

                                    {order?.address?.line1}
                                </Text>
                                <Text
                                    className="text-black font-mulish-regular text-lg"
                                    style={{ fontSize: responsiveFontSize(2) }}>

                                    {order?.address?.line2}
                                </Text>
                                <Text
                                    className="text-black font-mulish-regular text-lg"
                                    style={{ fontSize: responsiveFontSize(2) }}>

                                    {order?.address?.pincode}
                                </Text>
                                <Text
                                    className="text-black font-mulish-regular text-lg"
                                    style={{ fontSize: responsiveFontSize(2) }}>

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
                            style={{ fontSize: responsiveFontSize(3) }}>

                            Payment Details
                        </Text>
                    </View>
                    <Divider bold />

                    <View>
                        <DataTable numeric >

                            <DataTable.Row numeric>
                                <DataTable.Cell>
                                    <Text className='text-lg text-black font-mulish-medium'
                                        style={{ fontSize: responsiveFontSize(2) }}>

                                        Sub Total :
                                    </Text>

                                </DataTable.Cell>

                                <DataTable.Cell numeric>
                                    <Text className='text-lg text-black font-mulish-medium'
                                        style={{ fontSize: responsiveFontSize(2) }}>

                                        ₹ {order?.totalPrice}
                                    </Text>

                                </DataTable.Cell>
                            </DataTable.Row>


                            <DataTable.Row numeric>
                                <DataTable.Cell>
                                    <Text className='text-lg text-black font-mulish-medium'
                                        style={{ fontSize: responsiveFontSize(2) }}>

                                        Discount  :
                                    </Text>

                                </DataTable.Cell>

                                <DataTable.Cell numeric>
                                    <Text className='text-lg text-black font-mulish-regular'
                                        style={{ fontSize: responsiveFontSize(2) }}>

                                        - ₹ 0
                                        {/* {order?.totalPrice} */}
                                    </Text>

                                </DataTable.Cell>
                            </DataTable.Row>
                            <Divider bold />

                            <DataTable.Row numeric>
                                <DataTable.Cell>
                                    <Text className='text-lg text-black font-mulish-semibold'
                                        style={{ fontSize: responsiveFontSize(2) }}>

                                        Final Total :
                                    </Text>
                                </DataTable.Cell>

                                <DataTable.Cell numeric>
                                    <Text className='text-lg text-black font-mulish-semibold'
                                        style={{ fontSize: responsiveFontSize(2) }}>

                                        ₹ {order?.totalPrice}
                                    </Text>

                                </DataTable.Cell>
                            </DataTable.Row>

                        </DataTable>

                    </View>



                </View>










            </ScrollView>

            <View className="relative bottom-5 ">
                <TouchableOpacity className='bg-[#53B175] p-5 rounded-2xl '
                // disabled={() =>  selected==="null" ? true : false }
                >

                    <View className="flex-row items-center justify-center gap-2">

                        <Text
                            className="text-white text-center font-mulish-semibold"
                            style={{ fontSize: responsiveFontSize(3) }}>
                            Mark as Delivered
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

        </SafeAreaView>
    )
}

export default OrderDetailsScreen


const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
});