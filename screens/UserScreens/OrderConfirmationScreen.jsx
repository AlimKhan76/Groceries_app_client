import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, DataTable } from 'react-native-paper'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserData } from '../../api/userAPI'
import { getItemsFromCartApi } from '../../api/cartAPI'
import { placeOrderApi } from '../../api/orderAPI'
import { Dialog } from 'react-native-alert-notification'


const OrderConfirmationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const queryClient = useQueryClient()
    const [totalPrice, setTotalPrice] = useState(0)

    const { address } = route?.params;

    useFocusEffect(React.useCallback(() => {
        let amount = 0;
        for (let i = 0; i < cartItems?.cart?.length; i++) {
            amount = amount + Number(cartItems?.cart[i]?.totalPrice);
        }
        setTotalPrice(amount);
        return (() => {
            setTotalPrice(0)
        })

    }, [cartItems]))

    const { data: cartItems, isLoading } = useQuery({
        queryKey: ['cartItems'],
        queryFn: getItemsFromCartApi,
        staleTime: Infinity,
    })

    const { data: userData } = useQuery({
        queryKey: ['userData'],
        queryFn: getUserData,
        staleTime: Infinity,
    })


    const { mutate: placeOrder, isPending } = useMutation({
        mutationFn: placeOrderApi,
        onError: () => {
            Dialog.show({
                type: "DANGER",
                autoClose: 1000,
                button: "Ok",
                title: "Error in placing Order",
                textBody: "Please try again later ! !"
            })
        },
        onSuccess: () => {
            navigation.navigate("OrderAccepted")
            queryClient.invalidateQueries({
                queryKey: ['cartItems']
            })

        }
    })

    return (
        <SafeAreaView className="flex-1  ">

            <Appbar.Header mode='center-aligned'>
                <Appbar.BackAction
                    onPress={() => navigation.goBack()} />
                <Appbar.Content title="Confirm Order" />
            </Appbar.Header>


            <ScrollView className="m-3  overflow-hidden mb-8">

                <View className="border-2 border-gray-200 bg-white rounded-2xl p-3 my-2">

                    <View className="mx-3 border-b-2 border-gray-200 flex-row gap-x-2 items-center">
                        <MaterialIcon name="truck-delivery-outline" size={30} color="black" />
                        <Text
                            className='text-black font-mulish-semibold text-lg'>
                            Shipping to {userData?.name}
                        </Text>
                    </View>

                    <View className="m-3 ">
                        {/* <EntypoIcon name="address" size={20} color="black" /> */}
                        <View>

                            <Text className='text-black font-mulish-regular text-base'>
                                {address?.line1}
                            </Text>
                            <Text className='text-black font-mulish-regular text-base'>

                                {address?.line2}
                            </Text>
                            <Text className='text-black font-mulish-regular text-base'>

                                {address?.pincode}
                            </Text>
                            <Text className='text-black font-mulish-regular text-base'>

                                {address?.landmark}
                            </Text>
                        </View>

                    </View>

                </View>


                <View className="border-2 border-gray-200 bg-white rounded-2xl p-3 my-2">
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>
                                <Text className="text-black text-base font-mulish-bold">
                                    Item Name
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric >
                                <Text className="text-black text-base font-mulish-bold">
                                    Quantity
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric >
                                <Text className="text-black text-base font-mulish-bold">
                                    Price
                                </Text>
                            </DataTable.Title>
                        </DataTable.Header>

                        {cartItems?.cart?.map((product) => {
                            return (
                                <DataTable.Row key={product?._id}>
                                    <DataTable.Cell >
                                        <Text className="text-base text-gray-700 font-mulish-regular">
                                            {product?.title}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        <Text className="text-base text-gray-700 font-mulish-regular">
                                            {product?.quantity} {product?.unit}
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        <Text className="text-base text-gray-700 font-mulish-regular">
                                            ₹ {product?.totalPrice}
                                        </Text>
                                    </DataTable.Cell>
                                </DataTable.Row>

                            )
                        })}

                        <DataTable.Row>
                            <DataTable.Cell >
                                <Text className="text-base font-mulish-bold text-black">
                                    Total Price :
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text className="text-base font-mulish-bold text-black">
                                    ₹ {totalPrice}
                                </Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>


            </ScrollView>




            <View
                className="bottom-5 relative self-center w-full overflow-hidden  ">
                <TouchableOpacity
                    onPress={() => {
                        placeOrder({
                            items: cartItems?.cart,
                            address,
                            totalPrice: totalPrice,
                            name: userData?.name,
                            contactNo: userData?.contactNo
                        })
                    }}
                    className="bg-[#53B175] p-5 rounded-3xl flex-row mx-5 items-center justify-center ">
                    {isPending ?
                        <ActivityIndicator color='white' /> :
                        <Text
                            className='text-white text-xl font-mulish-semibold'>
                            Place Order
                        </Text>
                    }

                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default OrderConfirmationScreen