import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, {  useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { getOrdersByStatusAPI } from '../../api/adminAPIs/orderAPI'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import AdminOrderCard from '../components/AdminOrderCard'

const PendingOrderScreen = ({ navigation }) => {

  const [orderStatus, setOrderStatus] = useState("Pending")
  const queryClient = useQueryClient()


  const { data: orders,
    refetch,
    fetchNextPage,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchPreviousPage,
    status,
    isError,
    isRefetching,

  } = useInfiniteQuery({
    queryKey: ['order', orderStatus],
    queryFn: ({ queryKey, pageParam }) => getOrdersByStatusAPI(pageParam, queryKey[1]),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
  })



  // useEffect(() => {
  //   refetch(1, orderStatus)
  // }, [orderStatus])



  return (
    <SafeAreaView className="flex-1 bg-white "
      edges={["right", "top", "left"]}>

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

        <Appbar.Content
          title=" Orders"
          titleStyle={{
            fontFamily: "Mulish-SemiBold",
            color: "black",
            fontSize: responsiveFontSize(3.5),
          }} />


      </Appbar.Header>
      <Divider bold />

{/* 
      <View className="flex-row gap-2 p-2">
        <TouchableOpacity
          onPress={() => { setOrderStatus("Pending") }}

          className={`p-3 ${orderStatus === "Pending" ? " bg-gray-200 border-gray-300" : " border-gray-200 bg-white"}  border-2 rounded-2xl `}>
          <Text className="text-black font-mulish-bold">
            Pending
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setOrderStatus("Packed")
          }}
          className={`p-3 
          ${orderStatus === "Packed" ? " bg-gray-200 border-gray-300" : " border-gray-200 bg-white"} 
           border-2 rounded-2xl `}>
          <Text className="text-black font-mulish-bold ">Packed</Text>
        </TouchableOpacity>

      </View> */}


      {status === "error" ?
        <View className="text-black items-center justify-center flex-1 gap-y-2">
          <Text className="text-black font-mulish-medium"
            style={{ fontSize: responsiveFontSize(3) }}>
            Orders cannot be fetched
          </Text>
          <TouchableOpacity
            disabled={isRefetching}
            onPress={refetch}
            className="p-3 border-2 rounded-xl border-gray-400">
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
          orders?.pages[0]?.docs?.length > 0
            ?
            <FlatList className="my-2"
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
                  No more
                  {orderStatus === "Pending" ? " pending " : " packed "}
                  orders
                </Text>

              }
            >
            </FlatList>

            :
            <View className=" flex-1 justify-center items-center">
              <Text className="text-black font-mulish-semibold"
                style={{
                  fontSize: responsiveFontSize(2.5)
                }}>

                No {orderStatus === "Pending" ? "Pending" : "Packed"} Orders
              </Text>

            </View>
      }





    </SafeAreaView >
  )
}

export default PendingOrderScreen