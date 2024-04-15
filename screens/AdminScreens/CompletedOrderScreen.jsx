import { View, Text, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Cart from "../../assets/icons/tabs/cart.svg"
import Person from "../../assets/icons/tabs/person.svg"
import Phone from "../../assets/icons/admin/phone.svg"
import Time from "../../assets/icons/admin/time.svg"
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { getOrdersByStatus, getPendingProducts, getProcessedProducts } from '../../api/adminAPIs/orderAPI'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { moderateScale } from 'react-native-size-matters'
import AdminOrderCard from '../components/AdminOrderCard'


const CompletedOrderScreen = ({ navigation }) => {

  const [searchOrderTerm, setSearchOrderTerm] = useState("");
  

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
        <MaterialCommunityIcons name="archive-search-outline" size={moderateScale(20)} color="black" />
        <TextInput
          maxLength={20}
          value={searchOrderTerm}
          onChangeText={e => setSearchOrderTerm(e)}
          className='px-2.5 py-3.5 text-base font-mulish-semibold w-full text-black'
          placeholder='Search order'
          placeholderTextColor={'gray'}
        />
      </View>

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
        status === "pending" || isRefetching
          ?
          <View className='flex-1 items-center justify-center'>
            <ActivityIndicator size={'large'} color='#53B175' />
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
                  fontSize: moderateScale(25)
                }}>
                No Completed Orders
              </Text>

            </View>
      }


    </SafeAreaView>
  )
}

export default CompletedOrderScreen