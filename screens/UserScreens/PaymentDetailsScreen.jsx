import { View, Text, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import React, { Fragment, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import useUserDataQuery from '../../hooks/useUserData'
import { getCustomerLatestBalanceAPI, getTransactionsByTypeAPI } from '../../api/adminAPIs/transactionsAPI'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { ActivityIndicator, Divider } from 'react-native-paper'
import moment from 'moment-timezone'

const PaymentDetailsScreen = () => {
    const navigation = useNavigation()

    const { data: userData } = useUserDataQuery()
    const [transactionType, setTransactionType] = useState("All")




    const { data: transactionDetails,
        isLoading: isLoadingAllTransactions,
        isRefetching: isRefetchingAllTransactions,
        isFetching: isFetchingAllTransactions,
        refetch: refetchAllTransactions,
        fetchNextPage: fetchNextPageAllTransactions,
        error: errorAllTransactions,
        hasNextPage: hasNextPageAllTransactions,
        isFetchingNextPage: isFetchingNextPageAllTransactions,
        fetchPreviousPage: fetchPreviousPageAllTransactions,
        status: statusAllTransactions,
        isError: isErrorAllTransactions,
    } = useInfiniteQuery({
        queryKey: ["customerTransactions", userData?._id, transactionType],
        queryFn: ({ queryKey, pageParam }) => getTransactionsByTypeAPI(queryKey[1], queryKey[2], pageParam),
        staleTime: Infinity,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
    })

    const { data: customerBalance,
        isLoading: isLoadingBalance,
        isRefetching: isRefetchingBalance
    } = useQuery({
        queryKey: ["customerBalance", userData?._id],
        queryFn: ({ queryKey }) => getCustomerLatestBalanceAPI(queryKey[1]),
        staleTime: Infinity,
    })


    return (
        <SafeAreaView className="flex-1 bg-white "
            edges={['right', 'top', 'left']}>

            <StatusBar backgroundColor={"#419a79"} />

            <View className="bg-[#419a79] rounded-b-2xl py-2 mb-5"
                style={{ height: responsiveHeight(35) }}>

                <View className="flex-row items-center py-2 gap-y-2  ">
                    <TouchableOpacity
                        style={{
                            padding: responsiveHeight(2)
                        }}
                        onPress={() => navigation.goBack()}>

                        <Ionicons name="arrow-back" color="white" size={responsiveHeight(3)} />

                    </TouchableOpacity>

                    <Text className="text-white font-mulish-semibold text-center w-4/6 "
                        style={{
                            fontSize: responsiveFontSize(3),
                        }}>
                        {/* Hotel Lemon Rice  */}
                        {/* {userData?.name} */}
                        Transaction Details
                    </Text>



                </View>

                <View className=" items-center flex-1 my-5  ">

                    <View className="bg-[#eeedf3] rounded-2xl items-center justify-center px-10 py-5">
                        <Text className="text-black font-mulish-medium text-center"
                            style={{
                                fontSize: responsiveFontSize(2.25)
                            }}>
                            Balance
                        </Text>

                        {isLoadingBalance || isRefetchingBalance ?
                            <ActivityIndicator color='black' style={{
                                padding: responsiveHeight(0.5),
                                alignItems: "center"
                            }} />
                            :
                            <Text className="text-black font-mulish-semibold text-center"
                                style={{
                                    fontSize: responsiveFontSize(2.75)
                                }}>
                                ₹ {customerBalance?.balance !== undefined ? customerBalance?.balance : 0}
                            </Text>
                        }
                    </View>







                </View>

            </View>



            <View className="px-4 gap-y-2">
                <Text className="text-black font-mulish-bold"
                    style={{
                        fontSize: responsiveFontSize(2.75)
                    }}>
                    Recent Transactions
                </Text>

                <View className="flex-row items-center gap-x-3">

                    <TouchableOpacity
                        onPress={() => setTransactionType("All")}
                        className={`p-3 border-2 border-gray-300 rounded-2xl 
                  ${transactionType === "All" ? " bg-[#eeedf3]" : "bg-white"}`}>
                        <Text className="text-black font-mulish-semibold">
                            All
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setTransactionType("Purchase")}
                        className={`p-3 border-2 border-gray-300 rounded-2xl 
                  ${transactionType === "Purchase" ? " bg-[#eeedf3]" : "bg-white"}`}>
                        <Text className="text-black font-mulish-semibold">
                            Purchase
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setTransactionType("Payment")}
                        className={`p-3 border-2 border-gray-300 rounded-2xl 
                  ${transactionType === "Payment" ? " bg-[#eeedf3]" : "bg-white"}`}>
                        <Text className="text-black font-mulish-semibold">
                            Payment
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>


            {isLoadingAllTransactions || isRefetchingAllTransactions ?
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color='#419a79' size={"large"} />
                </View>
                :
                transactionDetails?.pages[0]?.docs?.length > 0
                    ?
                    <FlatList
                        className="m-2 "
                        onEndReached={() => isFetchingNextPageAllTransactions || !hasNextPageAllTransactions ? null : fetchNextPageAllTransactions()}
                        data={transactionDetails?.pages?.map(pages => pages?.docs).flat()}
                        initialNumToRender={10}
                        renderItem={({ item: order }) => {
                            return (
                                <Fragment key={order?._id}>
                                    <View key={order?._id}
                                        className="py-3 px-3  my-1 flex-row items-center rounded-2xl justify-between">
                                        <View className="flex-row items-center gap-x-4 flex-1">
                                            <MaterialCommunityIcons
                                                name={order?.type === "Purchase" ? "arrow-up" : "arrow-down"}
                                                size={responsiveHeight(3.5)}
                                                color="black" />
                                            <View style={{ width: responsiveWidth(50) }} >

                                                <Text className="text-black font-mulish-semibold flex-wrap"
                                                    style={{
                                                        fontSize: responsiveFontSize(2.25)
                                                    }}>
                                                    {order?.type}
                                                </Text>
                                                <Text className="text-black font-mulish-semibold"
                                                    style={{
                                                        fontSize: responsiveFontSize(1.65)
                                                    }}>
                                                    {order?.type === "Purchase" ? "Order No:" : "Bill No:"} {order?.ref}
                                                </Text>
                                                <Text className="text-black font-mulish-semibold" style={{
                                                    fontSize: responsiveFontSize(1.5)
                                                }}>
                                                    {moment.tz(order?.dateOfTransaction, "Asia/Kolkata").format("DD/MM/yy hh:mm A")}
                                                </Text>

                                            </View>


                                        </View>
                                        <Text className={
                                            `${order?.type === "Payment" ? "text-red-700" : "text-black"}
                       font-mulish-semibold`
                                        }
                                            style={{
                                                fontSize: responsiveFontSize(2)
                                            }}>
                                            {order?.type === "Purchase" ? " + " : " - "}
                                            ₹ {order?.amount}
                                        </Text>
                                    </View>
                                    <Divider />
                                </Fragment>
                            )
                        }}

                        ListFooterComponent={isFetchingNextPageAllTransactions ?
                            <ActivityIndicator color="#419a79"
                                style={{
                                    marginVertical: responsiveHeight(1.5)
                                }}
                                size={"small"} /> :
                            !hasNextPageAllTransactions &&
                            <Text style={{
                                marginVertical: responsiveHeight(1.5),
                                fontSize: responsiveFontSize(2)
                            }}
                                className="text-black font-mulish-medium text-center">
                                No more transactions
                            </Text>

                        }
                    >
                    </FlatList>
                    :
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-black font-mulish-semibold"
                            style={{
                                fontSize: responsiveFontSize(3)
                            }}>
                            No transactions
                        </Text>
                    </View>
            }





        </SafeAreaView>

    )

}

export default PaymentDetailsScreen