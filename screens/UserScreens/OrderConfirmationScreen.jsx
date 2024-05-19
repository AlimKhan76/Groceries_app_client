import { View, Text, TouchableOpacity, ScrollView, Animated, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, DataTable, Divider } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getItemsFromCartAPI } from '../../api/cartAPI'
import { placeOrderAPI } from '../../api/orderAPI'
import { Dialog } from 'react-native-alert-notification'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import useUserDataQuery from '../../hooks/useUserData'
import moment from 'moment-timezone'


// const ExpandableView = ({ expanded = false, couponCode, refetch, setCouponCode, error, isError, status }) => {
//     const [height] = useState(new Animated.Value(0));

//     useEffect(() => {
//         Animated.timing(height, {
//             toValue: !expanded ? responsiveHeight(13) : 0,
//             duration: 150,
//             useNativeDriver: false
//         }).start();
//     }, [expanded, height]);


//     return (
//         <Animated.View className={`${expanded && "hidden"} px-3`}
//             style={{
//                 backgroundColor: 'white',
//                 marginTop: !expanded ? responsiveHeight(-1) : 0,
//                 height,
//             }}
//         >
//             {!expanded && <Divider />}
//             <View
//                 className='py-3 rounded-b-2xl flex-row justify-between items-center'>

//                 <TextInput
//                     className={`${status === "error" ? `border-red-400` : status === "success" ? `border-[#53B175]` : 'border-gray-200'} px-4 border-2 rounded-xl font-mulish-semibold`}
//                     placeholder='Enter Code'
//                     value={couponCode}
//                     onChangeText={(e) => setCouponCode(e)}
//                     style={{
//                         width: responsiveWidth(50),
//                         color: "black",
//                         fontSize: responsiveFontSize(1.75),
//                     }}
//                     maxLength={20}
//                     placeholderTextColor={"black"}
//                 />

//                 <TouchableOpacity
//                     disabled={couponCode?.length === 0 ? true : false}
//                     onPress={refetch}
//                     className={`${couponCode?.length === 0 ? "opacity-50" : 'opacity-100'} border-2 border-gray-300 rounded-2xl p-3`} >
//                     <Text
//                         style={{
//                             fontSize: responsiveFontSize(1.75)
//                         }}
//                         className="text-black font-mulish-semibold px-2">
//                         Submit
//                     </Text>
//                 </TouchableOpacity>

//             </View>

//             {console.log(status)}
//             {status !== "pending" && status === "error" &&
//                 <View className="flex-row items-center gap-x-1 ">
//                     <MaterialIcons
//                         name="error-outline"
//                         size={responsiveHeight(2)} color="red" />

//                     <Text className="text-red-500 font-mulish-regular"
//                         style={{
//                             fontSize: responsiveFontSize(1.45)
//                         }}>
//                         {error}
//                     </Text>
//                 </View>
//             }

//             {status !== "pending" && status === "success" &&

//                 <View className="flex-row items-center gap-x-1 ">
//                     <MaterialIcons
//                         name="error-outline"
//                         size={responsiveHeight(2)} color="#53B175" />
//                     <Text className="text-[#53B175] font-mulish-regular"
//                         style={{
//                             fontSize: responsiveFontSize(1.45)
//                         }}>
//                         Coupon applied Successfully
//                     </Text>
//                 </View>
//             }

//         </Animated.View>

//     );
// };


const OrderConfirmationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const queryClient = useQueryClient()
    const [totalPrice, setTotalPrice] = useState(0)
    // const [subTotal, setSubTotal] = useState(0)
    // const [couponCode, setCouponCode] = useState("")


    const { address } = route?.params;
    // const [isExpanded, setIsExpanded] = useState(true);


    // const { data: couponDetails, refetch, error, isError, isFetching, status } = useQuery({
    //     queryKey: ["couponCode", couponCode],
    //     queryFn: ({ queryKey }) => useCouponApi(queryKey[1]),
    //     enabled: false,
    //     // refetchOnMount: false,
    //     retry: 1,
    //     // staleTime: ,
    // })


    useFocusEffect(React.useCallback(() => {
        // queryClient.invalidateQueries({ queryKey: ["couponCode"] })
        let amount = 0;
        for (let i = 0; i < cartItems?.cart?.length; i++) {
            const sumPrice = cartItems?.cart[i]?.cartItem?.price?.[userData?.category] * cartItems?.cart[i]?.quantity
            amount = amount + Number(sumPrice);
        }
        // if (couponDetails !== undefined) {
        //     setTotalPrice(amount - couponDetails?.value)
        // }
        // else 
        setTotalPrice(amount);

        // setSubTotal(amount)

        return (() => {
            // setSubTotal(0)
            setTotalPrice(0)
            // queryClient.invalidateQueries({ queryKey: ["couponCode"] })
        })

    }, [cartItems]))

    const { data: cartItems, isLoading } = useQuery({
        queryKey: ['cartItems'],
        queryFn: ({signal})=>getItemsFromCartAPI(signal),
        staleTime: Infinity,
    })

    const { data: userData } = useUserDataQuery()

    const { mutate: placeOrder, isPending } = useMutation({
        mutationFn: placeOrderAPI,
        onError: () => {
            Dialog.show({
                type: "DANGER",
                autoClose: 1000,
                button: "OK",
                title: "Error in placing Order",
                textBody: "Please try again later ! !"
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cartItems']
            })
            queryClient.invalidateQueries({
                queryKey: ['userOrders']
            })
            queryClient.invalidateQueries({
                queryKey: ['customerTransactions']
            })
            queryClient.invalidateQueries({
                queryKey: ['customerBalance']
            })
            navigation.navigate("OrderAccepted")
        }
    })


    // const setPriceCategory = (cartItems) => {
    //     const cart = cartItems.cart.map(obj => {
    //         return { ...obj, price: obj?.price?.[userData?.category] };
    //     });

    //     console.log(cart)
    //     return cart
    // }
    const optimizeOrder = () => {
        const newArray = cartItems?.cart?.map(item => {
            const { cartItem, quantity, _id } = item;
            const { description, baseQuantity, category, url, __v, ...newCartItem } = cartItem;
            return { cartItem: newCartItem, quantity, _id };
        });
        return newArray
    }

    return (
        <SafeAreaView className="flex-1"
            edges={['right', 'top', 'left']}>

            <Appbar.Header
                mode='center-aligned'
                style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(10),
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}>
                <Appbar.BackAction
                    iconColor='black'
                    onPress={() => navigation.goBack()} />
                <Appbar.Content
                    title="Confirm Order"
                    titleStyle={{
                        fontFamily: "Mulish-Bold",
                        fontSize: responsiveFontSize(3),
                        color: "black"
                    }} />
            </Appbar.Header>
            <Divider />


            


            <ScrollView className="m-3 overflow-hidden mb-5 "
                style={{

                }}>



                <View className="border-2 border-gray-100 bg-white rounded-2xl p-3 my-2">

                    <View className="mx-3 flex-row gap-x-2 items-center">
                        <MaterialCommunityIcons
                            name="truck-delivery-outline"
                            size={responsiveHeight(3.5)}
                            color="black" />
                        <Text
                            className='text-black font-mulish-semibold text-lg'
                            style={{ fontSize: responsiveFontSize(2.25) }}>
                            Shipping to {userData?.name}
                        </Text>
                    </View>
                    <Divider style={{
                        marginVertical: responsiveHeight(0.5)
                    }} />

                    <View className="m-3 ">
                        {/* <EntypoIcon name="address" size={20} color="black" /> */}
                        <View>
                            <Text className='text-black font-mulish-regular mb-1 ' style={{
                                fontSize: responsiveFontSize(1.75)
                            }}>
                                Phone no: {userData?.contactNo}
                            </Text>

                            <Text className='text-black font-mulish-regular '
                                style={{
                                    fontSize: responsiveFontSize(1.75)
                                }}>
                                {address?.line1}
                            </Text>
                            <Text className='text-black font-mulish-regular'
                                style={{
                                    fontSize: responsiveFontSize(1.75)
                                }}>

                                {address?.line2}
                            </Text>
                            <Text className='text-black font-mulish-regular '
                                style={{
                                    fontSize: responsiveFontSize(1.75)
                                }}>
                               Pincode: {address?.pincode}
                            </Text>

                            {address?.landmark.length > 0 &&
                                <Text className='text-black font-mulish-regular'
                                    style={{
                                        fontSize: responsiveFontSize(1.75)
                                    }}>
                                    Landmark: {address?.landmark}
                                </Text>
                            }

                        </View>

                    </View>

                </View>

                {/* Coupon Code Card Start */}
                {/* 
                <TouchableOpacity
                    className="bg-white rounded-t-2xl flex-row justify-between items-center"
                    style={{
                        padding: responsiveHeight(2),
                        marginBottom: responsiveHeight(1),
                    }}

                    onPress={() => setIsExpanded(!isExpanded)}>

                    <View className="flex-row gap-x-1 items-center">
                        <MaterialIcons
                            name="discount"
                            size={responsiveHeight(2.25)}
                            color="black" />

                        <Text className="text-black font-mulish-semibold"
                            style={{
                                fontSize: responsiveFontSize(2.25)
                            }}>
                            Promo Code
                        </Text>

                    </View>

                    <AntDesign
                        name={`${isExpanded ? "down" : "up"}`}
                        size={responsiveHeight(2.25)}
                        color="black" />

                </TouchableOpacity>

                <ExpandableView expanded={isExpanded}
                    refetch={refetch}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    error={error}
                    isError={isError}
                    status={status} /> */}

                <View className=" bg-white rounded-2xl px-1.5 py-3 my-2 ">
                    <DataTable >
                        <DataTable.Header>
                            <DataTable.Title
                                textStyle={{
                                    fontSize: responsiveFontSize(1.75),
                                    fontFamily: "Mulish-Bold",
                                    color: "black"
                                }}>

                                Item
                            </DataTable.Title>

                            <DataTable.Title
                                numeric
                                textStyle={{
                                    fontSize: responsiveFontSize(1.75),
                                    fontFamily: "Mulish-Bold",
                                    color: "black"
                                }}>
                                Quantity
                            </DataTable.Title>

                            <DataTable.Title
                                numeric
                                textStyle={{
                                    fontSize: responsiveFontSize(1.75),
                                    fontFamily: "Mulish-Bold",
                                    color: "black"
                                }} >
                                Price
                            </DataTable.Title>

                        </DataTable.Header>
                        <Divider bold />

                        {cartItems?.cart?.map((product) => {
                            return (
                                <DataTable.Row
                                    key={product?.cartItem?._id} className="">
                                    <DataTable.Cell
                                        textStyle={{
                                            fontSize: responsiveFontSize(1.75),
                                            fontFamily: "Mulish-Medium",
                                            color: "black"
                                        }}>
                                        <Text className="text-black flex-wrap" style={{
                                            fontSize: responsiveFontSize(1.75)
                                        }}>
                                            {product?.cartItem?.title}

                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric
                                        textStyle={{
                                            fontSize: responsiveFontSize(1.5),
                                            fontFamily: "Mulish-Medium",
                                            color: "black",
                                        }}>
                                        {product?.quantity} {product?.cartItem?.unit}
                                    </DataTable.Cell>

                                    <DataTable.Cell numeric
                                        textStyle={{
                                            fontSize: responsiveFontSize(1.75),
                                            fontFamily: "Mulish-Medium",
                                            color: "black"
                                        }}>
                                        ₹ {product?.quantity * product?.cartItem?.price?.[userData?.category]}
                                    </DataTable.Cell>

                                </DataTable.Row>

                            )
                        })}





                        <DataTable.Row>
                            <DataTable.Cell textStyle={{
                                fontSize: responsiveFontSize(1.85),
                                fontFamily: "Mulish-Bold",
                                color: "black"
                            }}>

                                Total Price :
                            </DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell numeric textStyle={{
                                fontSize: responsiveFontSize(1.85),
                                fontFamily: "Mulish-Bold",
                                color: "black"
                            }}>

                                ₹ {totalPrice}
                            </DataTable.Cell>
                        </DataTable.Row>


                    </DataTable>
                </View>


            </ScrollView>


            <View
                className="bottom-2.5 relative self-center w-full overflow-hidden  ">
                <TouchableOpacity
                    disabled={isPending}
                    onPress={() => {
                        placeOrder({
                            items: optimizeOrder(),
                            address: address,
                            orderedDate: moment.tz("Asia/Kolkata").format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                            totalPrice: totalPrice,
                            name: userData?.name,
                            contactNo: userData?.contactNo,
                            customerCategory: userData?.category
                        })
                    }}
                    className="bg-[#53B175] p-5 rounded-3xl flex-row mx-5 items-center justify-center ">
                    {isPending ?
                        <ActivityIndicator color='white' /> :
                        <Text
                            className='text-white font-mulish-semibold'
                            style={{ fontSize: responsiveFontSize(2.25) }}
                        >
                            Place Order
                        </Text>
                    }

                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default OrderConfirmationScreen