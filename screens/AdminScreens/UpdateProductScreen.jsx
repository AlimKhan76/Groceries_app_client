import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LeftArrow from "../../assets/icons/account/left_arrow.svg"
import RightArrow from "../../assets/icons/account/right_arrow.svg"
import Search from "../../assets/icons/commons/search.svg"
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


const UpdateProductScreen = ({ navigation }) => {

    const tableData = {
        tableHead: ['Crypto Name', 'Value', 'Mkt Cap'],
        tableData: [
            ['Bitcoin', '₹44,331', '₹839,702,328,904'],
            ['Ethereum', '₹3000.9', '₹359,080,563,225'],
            ['Tether', '₹1', '₹79,470,820,738'],
            ['BNB', '₹413.44', '₹69,446,144,361'],
            ['USD Coin', '₹1', '₹53,633,260,549'],
        ],
    };

    const [data, setData] = useState(tableData);

    const rightArrow = (value) => {
        return (
            <>
                <TouchableOpacity>
                    <RightArrow />

                </TouchableOpacity>
            </>
        )


    }

    return (
        <SafeAreaView className="flex-1 bg-white px-2">
            <View className="border-b-2 border-b-gray-300 py-5 ">
                <TouchableOpacity
                    onPress={() => navigation.navigate("AdminSetting")}
                    className="flex-row gap-2 items-center">
                    <LeftArrow />
                    <Text className='text-xl text-black font-mulish-regular'>
                        Back to Settings
                    </Text>
                </TouchableOpacity>
            </View>


            <View
                className="bg-gray-200 gap-x-2 m-2 p-1 rounded-2xl flex-row items-center ">
                <Search />

                <TextInput
                    maxLength={25}
                    className="text-black text-lg font-mulish-semibold p-1.5"
                    placeholder='Search Products' />
            </View>


            {/* <View
                className="flex-row fixed bg-gray-300 p-3 m-0.5 rounded-2xl justify-around items-center">
                <Text className="text-black text-base font-mulish-extrabold">Item Name</Text>
                <Text className="text-black text-base font-mulish-extrabold">Quantity</Text>
                <Text className="text-black text-base font-mulish-extrabold">Price</Text>
                <Text></Text>
            </View> */}



            <Table
                className=" "
            >

                <Row
                    data={['Sr', 'Items', 'Quantity', "Price", ""]}
                    className="bg-gray-200 p-3 rounded-2xl"
                    flexArr={[0.5, 1.5, 1, 1, 0.5]}
                    textStyle={{
                        textAlign: "center",
                        color: "black", fontFamily: "Mulish-Bold",
                        fontSize: 16
                    }}
                />
                <ScrollView className="">

                    <>

                        <Rows
                            className="bg-white p-3 border-b-2 border-gray-300 "
                            flexArr={[0.5, 1.5, 1, 1, 0.5]}
                            data={[
                                ["1", "Banana", "7pcs", '₹20', rightArrow(1)], 
                                ["2", "Apple", "1kg", "₹500", <RightArrow />]
                                // , ["2", "Apple", "1kg", "₹500", <RightArrow />], ["2", "Apple", "1kg", "₹500", <RightArrow />]

                            ]}
                            textStyle={{
                                textAlign: "center",
                                color: "black", fontFamily: "Mulish-Bold",
                                fontSize: 15
                            }}
                        />
                    </>

                </ScrollView>

            </Table>






            {/* <View className="gap-2">


                <View
                    className="flex-row border-gray-300 border-2 p-3 rounded-2xl justify-around items-center">
                    <View>

                        <Text
                            className="text-black text-base font-mulish-regular text-start">
                            Organic Banana
                        </Text>
                    </View>
                    <Text className="text-black text-base font-mulish-regular text-center" >7pcs</Text>
                    <Text className="text-black text-base font-mulish-regular text-center">₹400</Text>
                    <RightArrow />

                </View>

                <View
                    className="flex-row border-gray-300 border-2 p-3 rounded-2xl justify-around items-center">
                    <View>

                        <Text
                            className="text-black text-base font-mulish-regular text-center">
                            Apple
                        </Text>
                    </View>
                    <View>
                        <Text
                            className="text-black text-base font-mulish-regular text-center">
                            1kg
                        </Text>

                    </View>
                    <Text
                        className="text-black text-base font-mulish-regular text-center">
                        ₹400
                    </Text>
                    <RightArrow />

                </View>


                <View
                    className="flex-row border-gray-300 border-2 p-3 rounded-2xl justify-between items-center">
                    <Text className="text-black text-base">Organic Banana</Text>
                    <Text className="text-black text-base">Quantity</Text>
                    <Text className="text-black text-base">400</Text>
                    <RightArrow />

                </View>


            </View> */}


        </SafeAreaView>
    )
}

export default UpdateProductScreen

const styles = StyleSheet.create({
    container:
    {
        flex: 1, padding: 10, justifyContent: 'center', backgroundColor: '#fff'
    }
    ,
    head: {
        height: 44, backgroundColor: 'darkblue'
    },
    headText: {
        fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white'
    },
    text: {
        fontSize: 16, fontWeight: 'bold', textAlign: 'center',
    },
})