import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import Feather from "react-native-vector-icons/Feather"
import Accordion from 'react-native-collapsible/Accordion';

const HelpScreen = () => {
  const navigation = useNavigation()

  const [activeSections, setActiveSections] = useState([]);

  const sections = [
    {
      title: 'How to order in the app ?',
      content: "Simply search for the vegetables you need and add your preferred quantity to the basket. Once you've added all your items, head to the cart screen to review your selections.\n\nWhen you're ready, proceed to checkout. Select your address, review your order details on the final confirmation screen, and if everything looks good, hit \"Place Order\" to finalize your purchase. "
    },
    {
      title: 'How can I access my transaction history ?',
      content:
        "Access your transaction history effortlessly by navigating to the \"Account\" tab and selecting \"Transaction Details.\" \n\nHere, you'll find a comprehensive list of all your transactions, organized by date and accompanied by their unique reference numbers. "
    },
    {
      title: 'How can I view my order history ?',
      content: "To view your order history, navigate to the \"Accounts\" tab and select \"Order\" Here, you'll find a comprehensive list of all the orders you've placed with us."
    },
    {
      title: 'How can I reorder a previous order ?',
      content:
        "If your orders are typically the same, you can reorder them by navigating to the order details screen, selecting the desired order, and then tapping the \"Order Again\" button at the bottom of the screen. \n\nOnce added to your basket, you can review and proceed to place the order."
    },
    {
      title: 'How can I view my addresses ?',
      content:
        "You can view, edit, and delete all your addresses in the address screen located within the Account tab."
    },
    {
      title: 'How can I view vegetables according to category ?',
      content:
        "You can browse vegetables categorized by their types. On the explore screen, all categories are displayed, allowing you to choose accordingly."
    },
  ];

  function renderHeader(section, _, isActive) {
    return (
      <View
        className={`${isActive ? "rounded-t-xl" : "rounded-xl"} flex-row justify-between border-2 border-gray-300  items-center px-2.5 py-3`}>
        <Text className="text-black font-mulish-semibold w-[90%] "
          style={{ fontSize: responsiveFontSize(2) }} >
          {section.title}
        </Text>
        <Feather name={isActive ? 'chevron-up' : 'chevron-down'}
          size={responsiveHeight(3)} color="black" />
      </View>
    );
  };

  function renderContent(section, _, isActive) {
    return (
      <View className="border-b-2 border-r-2 border-l-2 border-gray-300 rounded-b-xl p-2.5 h-fit">
        <Text className="text-black font-mulish-regular "
          style={{
            // lineHeight: responsiveHeight(2),
            letterSpacing: 0.5,
            fontSize: responsiveFontSize(1.85)
          }}>
          {section.content}

        </Text>
      </View>
    );
  }

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
          title="" />
      </Appbar.Header>


      <View className="items-center justify-center h-1/5 rounded-2xl gap-y-2 mb-2">
        <Text className="text-black font-mulish-semibold text-center"
          style={{
            fontSize: responsiveFontSize(5)
          }}>
          FAQs
        </Text>
        <Text className="text-black font-mulish-medium text-center"
          style={{
            fontSize: responsiveFontSize(2)
          }}>
          Frequently Asked Questions
        </Text>
      </View>


      <ScrollView className="mb-6"
        contentInsetAdjustmentBehavior="automatic">

        <Accordion
          underlayColor={"rgb(242, 243, 245)"}
          containerStyle={{
            rowGap: responsiveHeight(1.5)
          }}
          align="bottom"
          sections={sections}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={(sections) => setActiveSections(sections)}
          duration={500}
        />

        <View
          className=" items-center p-7 justify-center border-2 gap-y-1 border-gray-300  rounded-xl my-2">
          <Text className="text-black text-center "
            style={{
              fontSize: responsiveFontSize(2.25)
            }}>
            FOR ANY OTHER QUERIES
          </Text>
          <Text className="text-black text-center" style={{
            fontSize: responsiveFontSize(2)
          }}>
            Contact No : 9867412880
          </Text>
        </View>

      </ScrollView>

    </SafeAreaView >
  )
}

export default HelpScreen