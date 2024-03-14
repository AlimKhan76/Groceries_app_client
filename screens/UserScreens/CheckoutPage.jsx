import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import LeftArrow from "../../assets/icons/account/left_arrow.svg"
import RightArrow from "../../assets/icons/account/right_arrow.svg"

import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { getAddresses } from '../../api/addressAPI'
import OrderConfirmationScreen from './OrderConfirmationScreen'
import { Dialog } from 'react-native-alert-notification'

const CheckoutPage = () => {
    const navigation = useNavigation()

    const [address, setAddress] = useState({})

    const { data: userAddress, isLoading } = useQuery({
        queryKey: ['userAddresses'],
        queryFn: getAddresses,
    })

    const proceedToOrderConfirmation = () => {
        if (!address.hasOwnProperty("line1")) {
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
        <SafeAreaView className="flex-1  ">


            <Appbar.Header mode='center-aligned'>
                <Appbar.BackAction
                    onPress={() => navigation.goBack()} />
                <Appbar.Content title="Checkout Page" />
            </Appbar.Header>



            <Text className="m-5 text-lg text-black font-mulish-semibold">
                Select a Delivery Address
            </Text>


            <View className="mx-5">
                {isLoading ?
                    <ActivityIndicator size={'large'} /> :


                    <ScrollView horizontal={false} className="h-2/4 mb-2">
                        <View className="bg-white border-2 border-gray-200 p-2.5 rounded-2xl">
                            <RadioButton.Group
                                onValueChange={value => setAddress(value)}
                                value={address}>
                                {console.log(address)}

                                {userAddress?.address?.map((address, index) => {
                                    return (
                                        <View key={index}
                                            className='flex-row items-center w-full justify-between py-2 border-b-2 border-b-gray-100'>
                                            <RadioButton color='#53B175' value={address} />
                                            <View className="flex-shrink w-4/6 ">
                                                <Text className=" text-base text-black font-mulish-regular  ">
                                                    {address?.line1}
                                                </Text>
                                                <Text className=" text-base text-black font-mulish-regular  ">
                                                    {address?.line2}
                                                </Text>
                                                <Text className=" text-base text-black font-mulish-regular  ">
                                                    {address?.pincode}
                                                </Text>
                                                <Text className=" text-base text-black font-mulish-regular  ">
                                                    Near : {address?.landmark}
                                                </Text>

                                            </View>

                                        </View>
                                    )
                                })}


                            </RadioButton.Group>
                        </View>
                    </ScrollView>

                }

                <TouchableOpacity
                    onPress={() => navigation.navigate("AddAddress")}
                    className="flex-row  p-3  my-3 border-2 border-gray-200 rounded-2xl items-center justify-between bg-white">
                    <Text className="text-base font-mulish-regular text-black">
                        Add a new Address
                    </Text>
                    <RightArrow color="black" />
                </TouchableOpacity>
            </View>


            <View
                className="bottom-10 absolute self-center w-full overflow-hidden  ">
                <TouchableOpacity
                    onPress={proceedToOrderConfirmation}
                    className="bg-[#53B175] p-5 rounded-3xl flex-row mx-5 items-center justify-center ">
                    <Text
                        className=' text-white text-xl font-mulish-semibold'>
                        Proceed
                    </Text>

                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default CheckoutPage