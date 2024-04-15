import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { moderateScale } from 'react-native-size-matters';
import Cart from "../../assets/icons/tabs/cart.svg"
import Time from "../../assets/icons/admin/time.svg"
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllOrdersApi } from '../../api/orderAPI'


const AllOrdersScreen = () => {
    const navigation = useNavigation();

    const { data: userOrders,
        refetch,
        fetchNextPage,
        // error,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        fetchPreviousPage,
        status,
        isError,
    } = useInfiniteQuery({
        queryKey: ["userOrders"],
        queryFn: getAllOrdersApi,
        staleTime: Infinity,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.nextPage
    })


    console.log(userOrders)
    return (
        <SafeAreaView className="flex-1 bg-white">
            <Appbar.Header
                mode='center-aligned'
                style={{
                    backgroundColor: 'transparent',
                    height: responsiveHeight(10),
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}>
                <Appbar.BackAction
                    iconColor='black'
                    onPress={() => navigation.goBack()} />
                <Appbar.Content title="Orders"
                    titleStyle={{
                        fontFamily: "Mulish-Bold",
                        // fontSize: responsiveFontSize(3),
                        color: "black"

                    }} />
            </Appbar.Header>


            {status === "error" ?
                <View className="text-black items-center justify-center flex-1 gap-y-2">
                    <Text className="text-black font-mulish-medium"
                        style={{ fontSize: responsiveFontSize(3) }}>
                        Orders cannot be fetched
                    </Text>
                    <TouchableOpacity
                        onPress={refetch}
                        className="p-3 border-2 rounded-xl border-gray-400">
                        <Text className="text-black font-mulish-medium"
                            style={{ fontSize: responsiveFontSize(3) }}>

                            Retry
                        </Text>
                    </TouchableOpacity>
                </View>
                :
                status === "pending"
                    ?
                    <View className='flex-1 items-center justify-center'>
                        <ActivityIndicator size={'large'} color='#53B175' />
                    </View>
                    :
                    <FlatList
                        onEndReached={() => isFetchingNextPage || !hasNextPage ? null : fetchNextPage()}
                        data={userOrders?.pages?.map(pages => pages?.docs).flat()}
                        initialNumToRender={10}
                        renderItem={({ item: order }) => {
                            return (
                                <TouchableOpacity
                                    key={order?._id}
                                    onPress={() => navigation.navigate("UserOrderDetails", { order })}
                                // activeOpacity={0.7}
                                >
                                    <View
                                        className="rounded-2xl bg-white mx-3 my-2.5 p-2.5 border-gray-200 border-2 
        shadow-black shadow-md">
                                        <View
                                            className="flex-row justify-between items-center  py-1.5 ">
                                            <View className="justify-center items-start">
                                                <Text
                                                    className=" text-black font-mulish-regular"
                                                    style={{ fontSize: moderateScale(20) }}>
                                                    Order no
                                                </Text>
                                                <Text
                                                    className="text-xl text-black font-mulish-medium"
                                                    style={{ fontSize: moderateScale(20) }}>
                                                    #{order?.orderNo}
                                                </Text>
                                            </View>
                                            <View
                                                className={`flex-row rounded-xl p-2.5 items-center
                                                         ${order?.status === "Pending" ? "bg-[#c2c2c2]"
                                                        : order?.status === "Cancelled" ? "bg-red-400" :
                                                            "bg-[#53B175]"}`}>
                                                <Text
                                                    className="px-1 font-mulish-bold text-white "
                                                    style={{ fontSize: moderateScale(15) }}>
                                                    {order?.status}
                                                </Text>
                                            </View>
                                        </View>
                                        <Divider />

                                        <View className="py-2 flex-row items-center justify-between">
                                            <View className="px-2" >


                                                <View className='flex-row py-1 items-center'>
                                                    <Time style={{ color: "black" }} />
                                                    <Text
                                                        className="font-mulish-semibold text-black px-1.5"
                                                        style={{ fontSize: responsiveFontSize(2) }}>
                                                        {order?.orderedDate?.split(" ")[0]}
                                                        {/* 18/20/2024 */}
                                                    </Text>
                                                </View>

                                                <View className='flex-row py-1 items-center'>
                                                    <Cart style={{ color: "black" }} />
                                                    <Text
                                                        className="font-mulish-semibold text-black px-1.5"
                                                        style={{ fontSize: responsiveFontSize(2) }}>
                                                        {/* {order?.orderedDate?.split(" ")[0]} */}
                                                        {/* 18 items    */}
                                                        {order?.items?.length} items

                                                    </Text>
                                                </View>

                                            </View>
                                            <Text className="font-mulish-bold text-black px-2"
                                                style={{ fontSize: responsiveFontSize(2.5) }}>
                                                {/* ₹ 400 */}
                                                ₹ {order?.totalPrice}
                                            </Text>
                                        </View>

                                    </View>

                                </TouchableOpacity>
                            )


                        }}
                        ListFooterComponent={isFetchingNextPage ?
                            <ActivityIndicator style={{
                                marginVertical: responsiveHeight(1)
                            }}
                                size={"small"} color='rgb(87,117,177)' /> :
                            !hasNextPage &&
                            <Text style={{
                                marginVertical: responsiveHeight(1),
                                fontSize: responsiveFontSize(2)
                            }}
                                className="text-black font-mulish-medium text-center">
                                No more orders
                            </Text>
                        }
                    >
                    </FlatList>
            }

        </SafeAreaView>
    )
}

export default AllOrdersScreen