import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, DataTable, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchAllCustomerBalancesAPI, fetchOverallBalanceAPI } from '../../api/adminAPIs/transactionsAPI'

const AllCustomerPaymentScreen = () => {
  const navigation = useNavigation()
  // const [totalBalance, setTotalBalance] = useState()

  const { data: allCustomerBalances,
    isLoading: isLoadingAllCustomerBalances,
    isRefetching: isRefetchingAllCustomerBalances,
    isFetching: isFetchingAllCustomerBalances,
    refetch: refetchAllCustomerBalances,
    fetchNextPage: fetchNextPageAllCustomerBalances,
    error: errorAllCustomerBalances,
    hasNextPage: hasNextPageAllCustomerBalances,
    isFetchingNextPage: isFetchingNextPageAllCustomerBalances,
    fetchPreviousPage: fetchPreviousPageAllCustomerBalances,
    status: statusAllCustomerBalances,
    isError: isErrorAllCustomerBalances,
  } = useInfiniteQuery({
    queryKey: ["allCustomerBalance"],
    queryFn: (pageParam) => fetchAllCustomerBalancesAPI(pageParam),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
  })

  const { data: overallBalance, isLoading: isLoadingOverallBalance } = useQuery({
    queryKey: ["totalBalance"],
    queryFn: fetchOverallBalanceAPI,
    staleTime: Infinity,
  })


  return (
    <SafeAreaView className="flex-1 bg-white">


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
          title="Payment Details "
          titleStyle={{
            fontFamily: "Mulish-SemiBold",
            color: "black",
            fontSize: responsiveFontSize(3),
          }} />
      </Appbar.Header>
      <Divider />


      <View className="bg-[#419a79] py-6 gap-y-2 items-center justify-center m-2 rounded-3xl ">
        <Text className="text-white text-center font-mulish-semibold"
          style={{
            fontSize: responsiveFontSize(2)
          }}>
          {("Total Balance Receivable").toUpperCase()}

        </Text>
        {isLoadingOverallBalance ?
          <ActivityIndicator color='white' size="small" style={{ paddingVertical: responsiveHeight(0.5) }} />
          :
          <Text className="text-white text-center font-mulish-semibold"
            style={{
              fontSize: responsiveFontSize(3)
            }}>
            ₹ {overallBalance.toLocaleString()}
          </Text>
        }
      </View>

      {isLoadingAllCustomerBalances || isRefetchingAllCustomerBalances ?
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color='#419a79' size={"large"} />
        </View>
        :
        allCustomerBalances?.pages[0]?.docs?.length > 0
          ?
          <FlatList
            className="m-3 "
            onEndReached={() => isFetchingNextPageAllCustomerBalances || !hasNextPageAllCustomerBalances ? null : fetchNextPageAllCustomerBalances()}
            data={allCustomerBalances?.pages?.map(pages => pages?.docs).flat()}
            initialNumToRender={10}
            renderItem={({ item: customer }) => {
              return (
                <Fragment key={customer?._id}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CustomerPaymentDetailsScreen",
                      {
                        customerId: customer?._id,
                        customerContact: customer?.customerContact,
                        balance: customer?.balance,
                        customerName: customer?.customerName

                      })}
                    className="py-3 px-3  my-1 flex-row items-center rounded-2xl justify-between">
                    <View className="flex-row items-center gap-x-4 flex-1">
                      <View style={{ width: responsiveWidth(50) }} >

                        <Text className="text-black font-mulish-semibold flex-wrap"
                          style={{
                            fontSize: responsiveFontSize(2.25)
                          }}>
                          {customer?.customerName}
                        </Text>
                        <Text className="text-black font-mulish-semibold" style={{
                          fontSize: responsiveFontSize(1.65)
                        }}>
                          Contact No: {customer?.customerContact}
                        </Text>

                      </View>


                    </View>
                    <Text className={`font-mulish-semibold text-black`
                    }
                      style={{
                        fontSize: responsiveFontSize(2)
                      }}>
                      ₹ {customer?.balance?.toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                  <Divider />
                </Fragment>
              )
            }}

            ListFooterComponent={isFetchingNextPageAllCustomerBalances ?
              <ActivityIndicator style={{
                marginVertical: responsiveHeight(1.5)
              }}
                size={"small"} color='#419a79' /> :
              !hasNextPageAllCustomerBalances &&
              <Text style={{
                marginVertical: responsiveHeight(1.5),
                fontSize: responsiveFontSize(2)
              }}
                className="text-black font-mulish-medium text-center">
                No more customers left
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
              No customers
            </Text>
          </View>
      }



    </SafeAreaView>
  )
}

export default AllCustomerPaymentScreen