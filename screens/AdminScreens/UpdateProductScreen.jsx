import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LeftArrow from "../../assets/icons/account/left_arrow.svg"
import RightArrow from "../../assets/icons/account/right_arrow.svg"
import Search from "../../assets/icons/commons/search.svg"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Appbar, DataTable, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { moderateScale, scale } from 'react-native-size-matters'


const UpdateProductScreen = ({ navigation }) => {


    return (

        <SafeAreaView className="flex-1 bg-white px-2 "
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
                    title="Update Products "
                    titleStyle={{
                        fontFamily: "Mulish-SemiBold",
                        color: "black",
                        fontSize: responsiveFontSize(3),
                    }} />
            </Appbar.Header>
            <Divider />
            {/* <ScrollView> */}



            <View
                className="bg-gray-200 gap-x-2 m-2 p-1 rounded-2xl flex-row items-center ">
                <Search />

                <TextInput
                    maxLength={25}
                    className="text-black font-mulish-semibold p-1.5 w-full"
                    style={{
                        fontSize: moderateScale(12.5)
                    }}
                    placeholder='Search Products'
                    placeholderTextColor={"black"} />
            </View>


            <DataTable
                className="bg-white border-2 border-gray-300 rounded-2xl my-2  h-4/6">


                <DataTable.Header>
                    <DataTable.Title
                        textStyle={{
                            color: "black",
                            // fontSize: responsiveFontSize(1.8),
                            fontSize: moderateScale(12.5),
                            fontFamily: "Mulish-Bold",
                        }}>
                        Name
                    </DataTable.Title>

                    <DataTable.Title
                        textStyle={{
                            color: "black",
                            // fontSize: responsiveFontSize(1.8),
                            fontSize: moderateScale(12.5),

                            fontFamily: "Mulish-Bold",
                        }}>
                        Quantity
                    </DataTable.Title>

                    <DataTable.Title
                        textStyle={{
                            color: "black",
                            fontSize: moderateScale(12.5),
                            fontFamily: "Mulish-Bold",
                        }}>
                        Price
                    </DataTable.Title>
                </DataTable.Header>

                <ScrollView className=" pb-4 ">

                    <DataTable.Row>
                        <DataTable.Cell
                            textStyle={{
                                color: "black",
                                fontSize: moderateScale(12.5),
                                fontFamily: "Mulish-Regular",
                            }}>
                            1.  Apple
                            {/* {product?.title} */}
                        </DataTable.Cell>

                        <DataTable.Cell
                            textStyle={{
                                color: "black",
                                fontSize: moderateScale(12.5),
                                fontFamily: "Mulish-Regular",
                            }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
                                style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular"
                                    style={{
                                        fontSize: moderateScale(12.5),
                                    }}>
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
                            font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={
                                        {
                                            fontSize: moderateScale(12.5),
                                        }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>


                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                    <DataTable.Row >
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}>

                            2.  Banana
                            {/* {product?.title} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.8),
                            fontFamily: "Mulish-Regular",
                        }}  >
                            {/* <Text className=" text-gray-700 font-mulish-regular text-start "
        style={{ fontSize: responsiveFontSize(1.8) }}> */}
                            1kg
                            {/* {product?.quantity} {product?.unit} */}
                            {/* </Text> */}
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <View
                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
                                <Text className="text-black font-mulish-regular">
                                    ₹
                                </Text>
                                <TextInput
                                    className=" text-gray-700 px-2 w-full py-1 items-center
    font-mulish-regular"
                                    maxLength={5}
                                    keyboardType='numeric'
                                    style={{ fontSize: responsiveFontSize(1.8) }}
                                    placeholder='400'
                                    placeholderTextColor={"black"}>


                                    {/* ₹ {product?.totalPrice} */}
                                </TextInput>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>



                </ScrollView>

            </DataTable>




            <View className="items-center w-full ">
                <TouchableOpacity
                    // disabled={isCheckoutDisabled}
                    onPress={() => navigation.navigate("Checkout")}
                    // bg-[#216239]
                    className=" bg-[#53B175] w-3/4 p-5 rounded-3xl mx-5 items-center justify-center">
                    <Text className=' text-white  font-mulish-semibold'
                        style={{ fontSize: moderateScale(18.5) }}>
                        Save
                    </Text>

                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}

export default UpdateProductScreen

