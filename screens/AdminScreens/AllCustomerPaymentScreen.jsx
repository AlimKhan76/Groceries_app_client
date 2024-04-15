import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, DataTable, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import AntDesign from "react-native-vector-icons/AntDesign"

const AllCustomerPaymentScreen = () => {
  const navigation = useNavigation()
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


      {/* <View> */}

      {/* </View>
      <View style={{ marginHorizontal: moderateScale(20) }
      }>
        <View className="bg-gray-200 items-center justify-center rounded-2xl "
          style={{ padding: moderateScale(15) }}>
          <Text className="text-black font-mulish-semibold "
            style={{
              fontSize: scale(20)
            }}>
            Alim Khan
          </Text>

          <View className="bg-[#53B175] rounded-3xl items-center justify-center"
            style={{
              padding: moderateScale(15),
              paddingHorizontal: moderateScale(80)
            }}>
            <Text className="text-white font-mulish-bold"
              style={{
                fontSize: scale(20)
              }}>
              Balance
            </Text>
            <Text className="text-white font-mulish-bold"
              style={{
                fontSize: scale(20)
              }}>
              40000
            </Text>
          </View>
        </View>


        <ScrollView style={{
          marginVertical: moderateScale(10)
        }}>

        </ScrollView>



      </View> */}

      <View className="items-center mx-2.5 ">

        <DataTable>


          <DataTable.Header>
            <DataTable.Title
              textStyle={{
                color: "black",
                // fontSize: responsiveFontSize(1.8),
                fontSize: moderateScale(12.5),
                fontFamily: "Mulish-Bold",
              }}>
              Name
            </DataTable.Title>

            <DataTable.Title numeric
              textStyle={{
                color: "black",
                // fontSize: responsiveFontSize(1.8),
                fontSize: moderateScale(12.5),

                fontFamily: "Mulish-Bold",
              }}>
              Balance
            </DataTable.Title>

            <DataTable.Title
              textStyle={{
                color: "black",
                fontSize: moderateScale(12.5),
                fontFamily: "Mulish-Bold",
              }}>
            </DataTable.Title>
          </DataTable.Header>

          <ScrollView className=" pb-4 ">

            <DataTable.Row 
            // className="px-2 py-4"
              onPress={() => navigation.navigate("CustomerPaymentDetailsScreen")}
            >
              <DataTable.Cell
                textStyle={{
                  color: "black",
                  fontSize: moderateScale(12.5),
                  fontFamily: "Mulish-Regular",
                }}>
                1.  Alim Khan
                {/* {product?.title} */}
              </DataTable.Cell>

              <DataTable.Cell numeric
                textStyle={{
                  color: "black",
                  fontSize: moderateScale(12.5),
                  fontFamily: "Mulish-Regular",
                }}  >
                5000
                {/* {product?.quantity} {product?.unit} */}
              </DataTable.Cell>

              <DataTable.Cell numeric>
                <AntDesign name="right" size={moderateVerticalScale(15)} color="black" />
              </DataTable.Cell>

            </DataTable.Row>
          </ScrollView>
        </DataTable>
      </View>

    </SafeAreaView>
  )
}

export default AllCustomerPaymentScreen