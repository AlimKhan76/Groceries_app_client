import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native"
import { Appbar, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
const CustomerPaymentDetailsScreen = () => {
  const navigation = useNavigation()
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
        // onPress={() => navigation.goBack()} 
        />

        <Appbar.Content
          title="Alim Khan "
          titleStyle={{
            fontFamily: "Mulish-SemiBold",
            color: "black",
            fontSize: responsiveFontSize(3),

          }} />
      </Appbar.Header>
      <Divider />
      
      <View className="flex-row items-center justify-evenly my-2.5">

        <TouchableOpacity className="p-5  rounded-2xl items-center">
          <View className="p-2.5 bg-gray-200 rounded-2xl items-center">
            <AntDesign name="pluscircleo" size={moderateVerticalScale(20)} color="black" />

          </View>

          <Text className="text-black font-mulish-semibold">Add</Text>
        </TouchableOpacity>


        <TouchableOpacity className="p-5  rounded-2xl items-center">
          <View className="p-2.5 bg-gray-200 rounded-2xl items-center">
            <AntDesign name="minuscircleo" size={moderateVerticalScale(20)} color="black" />

          </View>

          <Text className="text-black font-mulish-semibold">Less</Text>
        </TouchableOpacity>



      </View>
    </SafeAreaView>
  )
}

export default CustomerPaymentDetailsScreen