import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Appbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const AboutScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1 bg-white px-2"
      edges={["right", "left", "top"]}>

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
        <Appbar.BackAction
          iconColor="black"
          onPress={() => navigation.goBack()} />

        <Appbar.Content
          title="About Us"
          titleStyle={{
            fontFamily: "Mulish-Bold",
            color: "black",
            fontSize: responsiveFontSize(3),
          }} />
      </Appbar.Header>



      <ScrollView className="m-3">
        <View className="items-center justify-center rounded-2xl my-5">


          <Image
            source={require("../../assets/images/logo-colour.png")}
            resizeMode='contain'
            style={{
              width: responsiveWidth(30),
              height: responsiveHeight(10)
            }}
          />

          <Text className="text-black font-mulish-semibold text-center mt-3"
            style={{
              fontSize: responsiveFontSize(2.5)
            }}>
            Shri Biroba Vegetable Suppliers
          </Text>
        </View>
        <View className="justify-center gap-y-2">

          {/* <Text className="text-black font-mulish-semibold"
            style={{
              fontSize: responsiveFontSize(2.5)
            }}>
            Our Services
          </Text> */}
          <Text
            className="text-black font-mulish-medium flex-wrap"
            style={{
              fontSize: responsiveFontSize(1.75)
            }}>

            Introducing the Shri Biroba App – your new kitchen companion for fresh, locally sourced vegetables, now just a tap away!
            {"\n \n"}

            With our user-friendly app, shopping for your favorite groceries has never been easier. Here’s what you can do:
            {"\n \n"}

            1. Browse our fresh selection : Explore a wide range of high-quality vegetables sourced directly from local farmers. From vibrant bell peppers to crisp lettuce, we have everything you need to create delicious meals.
            {"\n \n"}

            2. Effortless ordering : No more making phone calls. With our app, you can place orders with just a few taps, anytime and from anywhere.
            {"\n \n"}

            3. Customize your order : Need a specific quantity ? Our app allows you to customize your order to suit your preferences.
            {"\n \n"}

            {/* 4. Stay updated : Receive instant notifications about order confirmations, delivery status, and exclusive deals, keeping you informed every step of the way. */}
            {/* {"\n \n"} */}

            4. Transparency : Experience peace of mind through our transparent transaction system. Gain full visibility into every transaction you make with us, whether it's a payment or an order.

            {/* Enjoy peace of mind with our secure payment options, ensuring a hassle-free and safe shopping experience. */}
            {"\n \n"}

            5. Order History : Our app provides you with easy access to your order history, allowing you to refer back to past purchases whenever you need.
            {"\n \n"}

            Experience the convenience of shopping for fresh vegetables from the comfort of your hotel. Download the app today and elevate your culinary journey with the freshest produce in town!
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default AboutScreen