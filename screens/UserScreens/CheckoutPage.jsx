import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider, RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { getAddresses } from '../../api/addressAPI'
import OrderConfirmationScreen from './OrderConfirmationScreen'
import { Dialog } from 'react-native-alert-notification'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"

const CheckoutPage = () => {
    const navigation = useNavigation()
    const [address, setAddress] = useState({})

    const { data: userAddress, isLoading } = useQuery({
        queryKey: ['userAddresses'],
        queryFn: getAddresses,
    })

    const proceedToOrderConfirmation = () => {
        if (!address?.hasOwnProperty("line1")) {
            Dialog.show({
                type: "WARNING",
                autoClose: 500,
                button: "Close",
                title: "Select a address for delivery"
            })
        }
        else if (address) {
            navigation.navigate("OrderConfirmation", { address })
        }
    }


    return (
        <SafeAreaView className="flex-1  "
            edges={['right', 'top', 'left']}>


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
                    iconColor='black'
                    onPress={() => navigation.goBack()} />

                <Appbar.Content
                    title="Checkout Page"
                    titleStyle={{
                        fontFamily: "Mulish-Bold",
                        color: "black",
                        fontSize: responsiveFontSize(3)
                    }} />

            </Appbar.Header>
            <Divider />


            <Text className="m-5 text-black font-mulish-semibold"
                style={{ fontSize: responsiveFontSize(2.25) }}>
                Select a Delivery Address
            </Text>
            <View className="mx-5">
                {isLoading ?
                    <ActivityIndicator size={'large'} color='rgb(83,177,117)'
                        style={{
                            height: responsiveHeight(40)
                        }} />
                    :
                    <ScrollView horizontal={false} className="mb-2"
                        style={{
                            maxHeight: responsiveHeight(40)
                        }}>

                        <View className="bg-white border-2 border-gray-200 p-2.5 rounded-2xl">

                            {userAddress?.address?.length !== 0 ?
                                <RadioButton.Group
                                    onValueChange={value => setAddress(value)}
                                    value={address}>

                                    {userAddress?.address?.map((address, index) => {
                                        return (
                                            <View key={index}
                                                className='flex-row items-center w-full justify-between py-2 border-b-2 border-b-gray-100'>
                                                <RadioButton color='#53B175' value={address} />
                                                <View className="flex-shrink w-4/6 ">
                                                    <Text className="text-black font-mulish-regular"
                                                        style={{
                                                            fontSize: responsiveFontSize(1.75)
                                                        }}>
                                                        {address?.line1}
                                                    </Text>

                                                    <Text className="text-black font-mulish-regular" style={{
                                                        fontSize: responsiveFontSize(1.75)
                                                    }}>
                                                        {address?.line2}
                                                    </Text>

                                                    <Text className="text-black font-mulish-regular" style={{
                                                        fontSize: responsiveFontSize(1.75)
                                                    }}>
                                                        {address?.pincode}
                                                    </Text>

                                                    {address?.landmark.length > 0 &&
                                                        <Text className="text-black font-mulish-regular"
                                                            style={{
                                                                fontSize: responsiveFontSize(1.75)
                                                            }}>
                                                            Landmark : {address?.landmark}
                                                        </Text>
                                                    }

                                                </View>

                                            </View>
                                        )
                                    })}


                                </RadioButton.Group>
                                :
                                <View className="p-5">
                                    <Text className="text-black text-center font-mulish-semibold"
                                        style={{ fontSize: responsiveFontSize(3) }}>
                                        No address available
                                    </Text>
                                </View>

                            }



                        </View>
                    </ScrollView>


                }



                <TouchableOpacity
                    onPress={() => navigation.navigate("AddAddress")}
                    className="flex-row  p-3  my-3 border-2 border-gray-200 rounded-2xl items-center justify-center bg-white">
                    <Text className=" font-mulish-medium text-[#53B175]"
                        style={{
                            fontSize: responsiveFontSize(2),
                            paddingHorizontal: responsiveWidth(2)
                        }}>
                        Add New Address
                    </Text>
                    <Feather
                        name="plus"
                        color="#53B175" size={responsiveHeight(3)} />
                </TouchableOpacity>
            </View>


            <View
                className="bottom-2.5 absolute self-center w-full overflow-hidden  ">
                <TouchableOpacity
                    onPress={proceedToOrderConfirmation}
                    className="bg-[#53B175] p-5 rounded-3xl flex-row mx-5 items-center justify-center ">
                    <Text
                        className=' text-white font-mulish-semibold'
                        style={{
                            fontSize: responsiveFontSize(2.25)
                        }}>
                        Proceed
                    </Text>

                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default CheckoutPage