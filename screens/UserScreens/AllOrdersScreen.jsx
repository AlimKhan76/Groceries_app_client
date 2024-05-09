import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllUserOrdersAPI } from '../../api/orderAPI'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Feather from "react-native-vector-icons/Feather"
import moment from "moment-timezone"


const AllOrdersScreen = () => {
    const navigation = useNavigation();

    const { data: userOrders,
        refetch,
        fetchNextPage,
        // error,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isRefetching,
        fetchPreviousPage,
        status,
        isError,
    } = useInfiniteQuery({
        queryKey: ["userOrders"],
        queryFn: getAllUserOrdersAPI,
        staleTime: Infinity,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.nextPage
    })


    return (
        <SafeAreaView className="flex-1 bg-white"
            edges={['right', 'top', 'left']}>

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
                        fontSize: responsiveFontSize(3),
                        color: "black"
                    }} />
            </Appbar.Header>
            <Divider />

            {status === "error" ?
                <View className="items-center justify-center flex-1 gap-y-2">
                    <Text className="text-black font-mulish-medium"
                        style={{ fontSize: responsiveFontSize(3) }}>
                        Orders cannot be fetched
                    </Text>
                    <TouchableOpacity
                        disabled={isFetching}
                        onPress={refetch}
                        className="px-5 py-2.5 my-3 border-2 rounded-xl border-gray-400">
                        <Text className="text-black font-mulish-medium"
                            style={{ fontSize: responsiveFontSize(3) }}>
                            Retry
                        </Text>
                    </TouchableOpacity>
                </View>
                :
                status === "pending" || isRefetching
                    ?
                    <View className='flex-1 items-center justify-center'>
                        <ActivityIndicator size={'large'} color='#53B175' />
                    </View>
                    :
                    userOrders?.pages[0]?.docs?.length > 0
                        ?
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
                                            className="rounded-2xl bg-white mx-3 my-2.5 p-2.5 border-gray-200 border-2 shadow-black shadow-md">
                                            <View
                                                className="flex-row justify-between items-center py-1.5 ">
                                                <View className="justify-center items-start">
                                                    <Text
                                                        className=" text-black font-mulish-medium"
                                                        style={{ fontSize: responsiveFontSize(2.25) }}>
                                                        Order no
                                                    </Text>
                                                    <Text
                                                        className=" text-black font-mulish-medium"
                                                        style={{ fontSize: responsiveFontSize(2) }}>
                                                        #{order?.orderNo}
                                                    </Text>
                                                </View>

                                                <View
                                                    className=" flex-row p-2.5 bg-white border-gray-300 border-2 rounded-xl items-center gap-x-1">
                                                    {order?.status === "Pending" ?
                                                        <MaterialCommunityIcons
                                                            name="timer-sand" size={responsiveHeight(2.25)} color="black" />
                                                        :
                                                        order?.status === "Delivered" ?
                                                            <MaterialCommunityIcons
                                                                name="checkbox-multiple-marked-outline" size={responsiveHeight(2.25)} color="black" />
                                                            :
                                                            <MaterialCommunityIcons
                                                                name="cancel" size={responsiveHeight(2.25)} color="black" />
                                                    }

                                                    <Text className="text-black font-mulish-semibold px-1"
                                                        style={{
                                                            fontSize: responsiveFontSize(1.85)
                                                        }}>
                                                        {order?.status}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Divider />

                                            <View className="py-2 flex-row items-center justify-between">
                                                <View className="px-1">
                                                    <View className='flex-row py-1 items-center'>
                                                        <MaterialCommunityIcons
                                                            name="clock-time-three-outline"
                                                            color="black"
                                                            size={responsiveHeight(2.75)} />
                                                        <Text
                                                            className="font-mulish-semibold text-black px-1.5"
                                                            style={{ fontSize: responsiveFontSize(1.75) }}>
                                                            {moment.tz(order?.orderedDate, "Asia/Kolkata").format("DD-MM-YYYY")}
                                                        </Text>
                                                    </View>

                                                    <View className='flex-row py-1 items-center'>
                                                        <Feather name="shopping-cart" size={responsiveHeight(2.5)} color="black" />
                                                        <Text
                                                            className="font-mulish-semibold text-black px-1.5"
                                                            style={{ fontSize: responsiveFontSize(1.75) }}>
                                                            {order?.items?.length} items

                                                        </Text>
                                                    </View>

                                                </View>
                                                <Text className="font-mulish-bold text-black px-2"
                                                    style={{ fontSize: responsiveFontSize(2.25) }}>
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

                        : <View className=" flex-1 justify-center items-center">
                            <Text className="text-black font-mulish-semibold"
                                style={{
                                    fontSize: responsiveFontSize(3)
                                }}>
                                No Orders
                            </Text>

                        </View>
            }

        </SafeAreaView>
    )
}

export default AllOrdersScreen