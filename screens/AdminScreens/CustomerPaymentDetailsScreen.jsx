import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Appbar, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useQuery } from '@tanstack/react-query'
import { getCustomerPayment } from '../../api/adminAPIs/paymentAPI'
const CustomerPaymentDetailsScreen = () => {
  const navigation = useNavigation()
  const { params } = useRoute()
  console.log(params)

  const { data: paymentDetails } = useQuery({
    queryKey: ["customerPaymentDetails", params?.customer?.customerId],
    queryFn: ({ queryKey }) => getCustomerPayment(queryKey[1])

  })


  return (
    // <SafeAreaView>
    //     <StatusBar backgroundColor={"#c2c2c2"} />
    //     <View className="bg-gray-300 rounded-b-full  w-full "
    //         style={{ height: verticalScale(200) }}
    //     >

    //         <View className="flex-row items-center ">
    //             <TouchableOpacity
    //                 hitSlop={4}
    //                 style={{
    //                     padding: scale(15)
    //                 }}
    //                 onPress={() => navigation.goBack()}
    //             >
    //                 <Ionicons name="arrow-back" color="black" size={moderateVerticalScale(20)} />
    //             </TouchableOpacity>
    //             {/* <View className="self-center  flex-1 bg-red-200 items-center">
    //             <Text className="text-black ">Alim Khan</Text>

    //             </View> */}
    //         </View>
    //         <View className="bg-gray-500 items-center justify-center rounded-2xl flex-1 "

    //             style={{ padding: moderateScale(15) }}>
    //             <Text className="text-black font-mulish-semibold "
    //                 style={{
    //                     fontSize: moderateScale(20)
    //                 }}>
    //                 Alim Khan
    //             </Text>

    //             <View className="bg-[#84daa3] rounded-3xl items-center justify-center"
    //                 style={{
    //                     padding: moderateScale(15),
    //                     paddingHorizontal: moderateScale(80)
    //                 }}>
    //                 <Text className="text-black font-mulish-bold"
    //                     style={{
    //                         fontSize: moderateScale(20)
    //                     }}>
    //                     Balance
    //                 </Text>
    //                 <Text className="text-black font-mulish-bold"
    //                     style={{
    //                         fontSize: moderateScale(20)
    //                     }}>
    //                     40000
    //                 </Text>
    //             </View>



    //             <View className="flex-row justify-evenly gap-x-5">
    //                 <TouchableOpacity className="p-6 bg-red-100">
    //                     <Text className="text-teal-100"> addd</Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity className="p-6 bg-green-100">
    //                     <Text className="text-black"> addd</Text>
    //                 </TouchableOpacity><TouchableOpacity className="p-6 bg-red-100">
    //                     <Text className="text-teal-100"> addd</Text>
    //                 </TouchableOpacity><TouchableOpacity className="p-6 bg-red-100">
    //                     <Text className="text-teal-100"> addd</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>

    //     </View>

    //     {/* </View> */}
    // </SafeAreaView>

    <SafeAreaView className="flex-1 bg-white"
      edges={['right', 'top', 'left']}>

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
          onPress={() => navigation.goBack()}
        />
        {console.log(params?.customer)}
        <Appbar.Content
          title={params?.customer?.customerName}
          titleStyle={{
            fontFamily: "Mulish-SemiBold",
            color: "black",
            fontSize: responsiveFontSize(3),

          }} />
      </Appbar.Header>
      <Divider />

      <View className="flex-row items-center justify-around my-2.5 bg-[#53B175] mx-2 rounded-2xl">

        <TouchableOpacity className="p-5 rounded-2xl items-center gap-y-2">
          <View className="p-2.5 border-2 border-white rounded-2xl items-center">
            <AntDesign name="pluscircleo" size={responsiveHeight(2)} color="white" />

          </View>

          <Text className="text-white text-base font-mulish-semibold">Add</Text>
        </TouchableOpacity>


        <View className="items-center justify-center">
          <Text className="text-white text-center text-xl font-mulish-semibold">
            Balance :
          </Text>
          <Text className="text-white text-center text-xl font-mulish-semibold">
            ₹{params?.customer?.balance}

          </Text>


        </View>

        <TouchableOpacity className="p-5  rounded-2xl items-center gap-y-2 ">
          <View className="p-2.5 border-2 border-white rounded-2xl items-center">
            <AntDesign name="minuscircleo" size={responsiveHeight(2.25)} color="white" />

          </View>

          <Text className="text-white font-mulish-semibold">
            Less
          </Text>
        </TouchableOpacity>



      </View>


      <View className=" mx-2 my-2.5 border-2 border-gray-300 rounded-2xl p-2">
        <Text className="text-black text-xl font-mulish-semibold">
          Transactions
        </Text>
      </View>
      <ScrollView>

        {paymentDetails?.map((transaction) => {
          return (
            <View key={transaction?._id}
              className="flex-row gap-x-3 mx-2 py-4 my-2 justify-between items-center border-2 border-gray-300 rounded-2xl">


              <View className="flex-row items-center gap-x-2 ">

                <View className="border-2 border-gray-300 rounded-xl p-2 items-center">
                  <MaterialCommunityIcons
                    name={`${transaction?.type === "Purchase" ? "call-made" : "call-received"}`}
                    size={responsiveHeight(2)} color="black" />
                </View>

                <View>
                  <Text className="text-black text-xl">
                    {/* 25/05/2024 */}
                    {transaction?.dateOfTransaction.split(" ")[0]}
                  </Text>
                </View>

              </View>


              <View className="items-center mx-2">
                <Text className="text-[#53B175] font-mulish-semibold text-xl">
                  {transaction?.type === "Purchase" ? "+ " : "-"} ₹ {transaction.amount}
                </Text>
              </View>


            </View>

          )
        })}

      </ScrollView>


      {/* <View
        className="flex-row gap-x-3 mx-2 py-4 my-2 justify-between items-center border-2 border-gray-300 rounded-2xl">

        <View className="flex-row items-center gap-x-2 ">

          <View className="border-2 border-gray-300 rounded-xl p-2 items-center">
            <MaterialCommunityIcons name="call-received" size={moderateScale(20)} color="black" />
          </View>

          <View>
            <Text className="text-black text-xl">
              25/05/2024
            </Text>
          </View>

        </View>


        <View className="items-center mx-2">
          <Text className="text-red-300 font-mulish-semibold text-xl">
            - 200
          </Text>
        </View>


      </View> */}



    </SafeAreaView>
  )
}

export default CustomerPaymentDetailsScreen