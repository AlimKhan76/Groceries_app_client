import { View, Text, TouchableOpacity, ScrollView, Animated, TextInput, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, DataTable, Divider } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserData } from '../../api/userAPI'
import { getItemsFromCartApi } from '../../api/cartAPI'
import { placeOrderApi } from '../../api/orderAPI'
import { Dialog } from 'react-native-alert-notification'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useCouponApi } from '../../api/adminAPIs/couponAPI'
import { BlurView } from "@react-native-community/blur";


const ExpandableView = ({ expanded = false, couponCode, refetch, setCouponCode, error, isError }) => {
    const [height] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(height, {
            toValue: !expanded ? responsiveHeight(15) : 0,
            duration: 150,
            useNativeDriver: false
        }).start();
    }, [expanded, height]);


    return (
        <Animated.View className={`${expanded && "hidden"} px-3`}
            style={{
                backgroundColor: 'white',
                marginTop: !expanded ? responsiveHeight(-1) : 0,
                height,
            }}
        >
            {!expanded && <Divider />}
            <View
                className='py-3 rounded-b-2xl flex-row justify-between items-center'>

                <TextInput
                    className={`${isError ? `border-red-400` : `border-gray-200`} px-5 border-2  rounded-xl font-mulish-semibold`}
                    placeholder='Enter Code'
                    value={couponCode}
                    onChangeText={(e) => setCouponCode(e)}
                    style={{
                        width: responsiveWidth(50),
                        color: "black",
                        fontSize: responsiveFontSize(2),
                    }}
                    maxLength={20}
                    placeholderTextColor={"black"}
                />

                <TouchableOpacity
                    disabled={couponCode?.length === 0 ? true : false}
                    onPress={refetch}
                    className={`${couponCode?.length === 0 ? "bg-gray-200" : 'bg-white'} border-2 border-gray-300 rounded-2xl p-3`} >
                    <Text
                        style={{
                            fontSize: responsiveFontSize(2)
                        }}
                        className="text-black font-mulish-semibold px-2">
                        Submit
                    </Text>
                </TouchableOpacity>

            </View>

            {isError &&
                <View className="flex-row items-center gap-x-1 ">
                    <MaterialIcons
                        name="error-outline"
                        size={responsiveHeight(2)} color="red" />

                    <Text className="text-red-500 font-mulish-regular"
                        style={{
                            fontSize: responsiveFontSize(1.5)
                        }}>
                        {error}
                    </Text>
                </View>
            }

        </Animated.View>

    );
};


const OrderConfirmationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const queryClient = useQueryClient()
    const [totalPrice, setTotalPrice] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [couponCode, setCouponCode] = useState("")


    const { address } = route?.params;
    const [isExpanded, setIsExpanded] = useState(true);


    const { data: couponDetails, refetch, error, isError, isFetching } = useQuery({
        queryKey: ["couponCode"],
        queryFn: () => useCouponApi(couponCode),
        enabled: false,
        refetchOnMount: true,
        retry: 1,
    })


    useFocusEffect(React.useCallback(() => {
        let amount = 0;
        for (let i = 0; i < cartItems?.cart?.length; i++) {
            amount = amount + Number(cartItems?.cart[i]?.totalPrice);
        }
        if (couponDetails !== undefined) {
            setTotalPrice(amount - couponDetails?.value)
        }
        else setTotalPrice(amount);

        setSubTotal(amount)
        return (() => {
            queryClient.invalidateQueries({
                queryKey: ['couponCode']
            })
            setSubTotal(0)
            setTotalPrice(0)
        })

    }, [cartItems, couponDetails]))

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

    { console.log(error) }
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

            <Appbar.Header mode='center-aligned'
                style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(10),
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}>
                <Appbar.BackAction iconColor='black'
                    onPress={() => navigation.goBack()} />
                <Appbar.Content title="Confirm Order"
                    titleStyle={{
                        fontFamily: "Mulish-Bold",
                        fontSize: responsiveFontSize(3),
                        color: "black"

                    }} />
            </Appbar.Header>
            <Divider />
            {isFetching &&

                <BlurView
                    className="items-center justify-center"
                    style={{
                        width: responsiveWidth(100),
                        height: responsiveHeight(100),
                        zIndex: 9999,
                        position: 'absolute',
                        right: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,

                    }}
                    blurType="dark"
                    blurAmount={5}
                    reducedTransparencyFallbackColor="white">
                    <ActivityIndicator style={{
                        height: responsiveHeight(100),
                    }}
                        size={"large"} color='rgb(83 177 117)' />
                </BlurView>
            }


            <ScrollView className="m-3  overflow-hidden mb-8"
                style={{

                }}>



                <View className="border-2 border-gray-100 bg-white rounded-2xl p-3 my-2">

                    <View className="mx-3 flex-row gap-x-2 items-center">
                        <MaterialCommunityIcons name="truck-delivery-outline" size={30} color="black" />
                        <Text
                            className='text-black font-mulish-semibold text-lg'
                            style={{ fontSize: responsiveFontSize(2.5) }}>
                            Shipping to {userData?.name}
                        </Text>
                    </View>
                    <Divider style={{
                        marginVertical: responsiveHeight(0.5)
                    }} />

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
                            <Text className='text-black font-mulish-regular text-base'>
                                Phone no: {userData?.contactNo}
                            </Text>
                        </View>

                    </View>

                </View>

                {/* Coupon Code Card Start */}

                <TouchableOpacity
                    className="bg-white rounded-t-2xl flex-row justify-between items-center"
                    style={{
                        padding: responsiveHeight(2),
                        marginBottom: responsiveHeight(1),
                    }}

                    onPress={() => setIsExpanded(!isExpanded)}>

                    <View className="flex-row gap-x-1 items-center">
                        <MaterialIcons name="discount"
                            size={responsiveHeight(2.5)}
                            color="black" />

                        <Text className="text-black font-mulish-semibold"
                            style={{
                                fontSize: responsiveFontSize(2.5)
                            }}>
                            Promo Code
                        </Text>

                    </View>

                    <AntDesign
                        name={`${isExpanded ? "down" : "up"}`}
                        size={responsiveHeight(2.5)}
                        color="black" />

                </TouchableOpacity>

                <ExpandableView expanded={isExpanded}
                    refetch={refetch}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    error={error}
                    isError={isError} />

                <View className=" bg-white rounded-2xl p-3 my-2">
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
                        <Divider bold />
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
                                    Sub Total :
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text className="text-base font-mulish-bold text-black">
                                    ₹ {subTotal}
                                </Text>
                            </DataTable.Cell>
                        </DataTable.Row>


                        {couponDetails !== undefined &&
                            <DataTable.Row style={{
                                height: responsiveHeight(8),
                            }}>
                                <DataTable.Cell >
                                    <Text className="text-base font-mulish-semibold text-black">
                                        Discount :({couponDetails?.code})
                                    </Text>
                                </DataTable.Cell>
                                <DataTable.Cell></DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text className="text-base font-mulish-semibold text-black">
                                        - ₹ {couponDetails?.value}
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>

                        }



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
                            subTotal: subTotal,
                            couponCode: couponDetails?.code,
                            discount: couponDetails?.value,
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