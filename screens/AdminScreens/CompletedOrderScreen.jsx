import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getOrdersByCustomerName, getOrdersByStatus } from '../../api/adminAPIs/orderAPI'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AdminOrderCard from '../components/AdminOrderCard'
import { useDebounce } from "use-debounce"


const CompletedOrderScreen = ({ navigation }) => {

  const [customerName, setCustomerName] = useState("");
  const [value] = useDebounce(customerName, 1000)
  const [customerOrderEnabled, setCustomerOrderEnabled] = useState(false);

  const { data: orders,
    refetch,
    fetchNextPage,
    error,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
    fetchPreviousPage,
    status,
    isError,

  } = useInfiniteQuery({
    queryKey: ['deliveredOrder'],
    queryFn: ({ pageParam }) => getOrdersByStatus(pageParam, "Delivered"),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage?.nextPage
  })


  const { data: customerOrder,
    refetch: refetchOfCustomerOrder,
    fetchNextPage: fetchNextPageOfCustomerOrder,
    error: errorOfCustomerOrder,
    hasNextPage: hasNextPageOfCustomerOrder,
    isRefetching: isRefetchingOfCustomerOrder,
    isFetchingNextPage: isFetchingNextPageOfCustomerOrder,
    fetchPreviousPage: fetchPreviousPageOfCustomerOrder,
    status: statusOfCustomerOrder,
    isError: isErrorOfCustomerOrder,
  } = useInfiniteQuery({
    queryKey: ["customerOrder", value],
    queryFn: ({ pageParam }) => getOrdersByCustomerName(pageParam, value),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
    enabled: !!value,
  })
  { console.log(value) }
  // useEffect(() => {
  //   setCustomerOrderEnabled(Boolean(customerName))

  //   return (() => {
  //     setCustomerOrderEnabled(false)
  //   })
  // }, [customerName])


  return (
    <SafeAreaView className="flex-1 bg-white"
      edges={["right", "top", "left"]}>

      <Appbar.Header mode='center-aligned' style={{
        backgroundColor: 'white',
        height: responsiveHeight(10),
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
        statusBarHeight={0} >
        <Appbar.Content title="Completed Orders"
          titleStyle={{
            fontFamily: "Mulish-SemiBold",
            color: "black",
            fontSize: responsiveFontSize(3.5),

          }} />
      </Appbar.Header>
      <Divider bold />

      <View
        className='bg-gray-200 mx-3 my-2 rounded-2xl px-3 flex-row items-center'>
        <MaterialCommunityIcons name="archive-search-outline" size={responsiveFontSize(3)} color="black" />
        <TextInput
          maxLength={20}
          value={customerName}
          style={{
            fontSize: responsiveFontSize(1.85)
          }}
          onChangeText={e => setCustomerName(e)}
          className='px-2.5 py-3.5  font-mulish-semibold w-full text-black'
          placeholder='Search Orders by Vendor name'
          placeholderTextColor={'gray'}
        />
      </View>

      {status === "error" || statusOfCustomerOrder === "error" ?
        <View className="text-black items-center justify-center flex-1 gap-y-2">
          <Text className="text-black font-mulish-medium"
            style={{ fontSize: responsiveFontSize(3) }}>
            {statusOfCustomerOrder === "error" ?
              `Order of ${customerName} cannot be fetched`
              :
              "Orders cannot be fetched"
            }
          </Text>
          {statusOfCustomerOrder !== "error" &&
            <TouchableOpacity
              disabled={isRefetching}
              onPress={refetch}
              className="p-3 border-2 rounded-xl border-gray-400">
              <Text className="text-black font-mulish-medium"
                style={{ fontSize: responsiveFontSize(3) }}>
                Retry
              </Text>
            </TouchableOpacity>
          }
        </View>
        :
        (status === "pending" || isRefetching) || (statusOfCustomerOrder === "pending" && customerName.length > 0 || isRefetchingOfCustomerOrder)
          ?
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size={'large'} color='#53B175' />
          </View>
          :
          customerName?.length > 0 && statusOfCustomerOrder === "success" ?
            customerOrder?.pages[0]?.docs?.length > 0 ?
              <FlatList
                onEndReached={() => isFetchingNextPageOfCustomerOrder || !hasNextPageOfCustomerOrder ? null : fetchNextPageOfCustomerOrder()}
                data={customerOrder?.pages?.map(pages => pages?.docs).flat()}
                initialNumToRender={10}
                renderItem={({ item: order }) => {
                  return (
                    <AdminOrderCard order={order} />
                  )
                }}

                ListFooterComponent={isFetchingNextPageOfCustomerOrder ?
                  <ActivityIndicator style={{
                    marginVertical: responsiveHeight(1)
                  }}
                    size={"small"} color='rgb(87,117,177)' /> :
                  !hasNextPageOfCustomerOrder &&
                  <Text style={{
                    marginVertical: responsiveHeight(1),
                    fontSize: responsiveFontSize(2)
                  }}
                    className="text-black font-mulish-medium text-center">
                    No more completed orders
                  </Text>

                }
              >
              </FlatList>
              :
              <View className=" flex-1 justify-center items-center">
                <Text className="text-black font-mulish-semibold"
                  style={{
                    textAlign: "center",
                    fontSize: responsiveFontSize(3)
                  }}>
                  No Delivered Orders of {customerName} found
                </Text>

              </View>
            :
            orders?.pages[0]?.docs?.length > 0
              ?
              <FlatList
                onEndReached={() => isFetchingNextPage || !hasNextPage ? null : fetchNextPage()}
                data={orders?.pages?.map(pages => pages?.docs).flat()}
                initialNumToRender={10}
                renderItem={({ item: order }) => {
                  return (
                    <AdminOrderCard order={order} />
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
                    No more completed orders
                  </Text>

                }
              >
              </FlatList>
              :
              <View className=" flex-1 justify-center items-center">
                <Text className="text-black font-mulish-semibold"
                  style={{
                    fontSize: responsiveFontSize(3)
                  }}>
                  No Completed Orders
                </Text>

              </View>
      }
    </SafeAreaView >
  )
}

export default CompletedOrderScreen