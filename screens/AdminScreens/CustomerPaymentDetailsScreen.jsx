import { View, Text, ScrollView, StatusBar, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, FlatList, Platform } from 'react-native'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { ActivityIndicator, Appbar, Divider, SegmentedButtons } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTransactionToCustomer, addTransactionToCustomerAPI, downloadTransactionsAPI, getCustomerLatestBalanceAPI, getTransactionsByTypeAPI } from '../../api/adminAPIs/transactionsAPI'
import moment from 'moment-timezone'
import Modal from "react-native-modal";
import NumberPad from '../components/NumberPad'
import { Dialog } from 'react-native-alert-notification'
import DatePicker from 'react-native-modern-datepicker';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import * as SecureStore from "expo-secure-store";


const CustomerPaymentDetailsScreen = () => {
  const navigation = useNavigation()
  const { params } = useRoute()
  const [transactionType, setTransactionType] = useState("All")
  const [bottomModalVisible, setBottomModalVisible] = useState(false)
  const [downloadModalVisible, setDownlaodModalVisible] = useState(false);
  const [startDateModalVisible, setStartDateModalVisible] = useState(false);
  const [endDateModalVisible, setEndDateModalVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  console.log(params)

  const [newTransactionData, setNewTransactionData] = useState({
    type: "",
    amount: "",
    ref: "",
    customerName: params?.customerName,
    customerId: params?.customerId,
    customerContact: params?.customerContact,
  })

  const queryClient = useQueryClient()
  const amountInputRef = useRef(null)


  const downloadTransactionPdf = async () => {
    const token = await SecureStore.getItemAsync("token")
    RNFetchBlob.config(Platform.select({
      ios: {
        fileCache: true,
        notification: true,
        title: `transactions-${new Date().toDateString()}`,
        path: RNFS.DocumentDirectoryPath + `/orders-${new Date().toDateString()}.pdf`,

      },
      android: {
        addAndroidDownloads: {
          title: `customerTransactions-${new Date().toDateString()}`,
          fileCache: true,
          useDownloadManager: true,
          // setting it to true will use the device's native download manager and will be shown in the notification bar.
          notification: true,
          path: RNFS.DownloadDirectoryPath + `/transactions-${new Date().toDateString()}.pdf`,  // this is the path where your downloaded file will live in
          description: 'Downloading Transactions files.'
        }
      }
    })

    )
      .fetch("GET",
        `https://groceries-app-server.vercel.app/transaction/downloadTransactionDetails/${params?.customerId}/${startDate}/${endDate}`,
        {
          Authorization: token
        })
      .then((res) => {
        setDownlaodModalVisible(false)
        setStartDateModalVisible(false)
        setEndDateModalVisible(false)
        // the temp file path
        console.log("The file saved to ", res.path());
        if (Platform.OS === "ios") {
          RNFetchBlob.ios.openDocument(res.data);
        }
        Dialog.show({
          type: "SUCCESS",
          title: "Transactions downloaded successfully",
          autoClose: 1000
        })
      }).catch((err) => {

        setDownlaodModalVisible(false)
        setStartDateModalVisible(false)
        setEndDateModalVisible(false)
        console.log(err)
        Dialog.show({
          type: "DANGER",
          title: "Transactions cannot be downloaded",
          autoClose: 1000
        })
      })

  }


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
    queryKey: ["customerTransactions", params?.customerId, transactionType],
    queryFn: ({ queryKey, pageParam }) => getTransactionsByTypeAPI(queryKey[1], queryKey[2], pageParam),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
  })

  const { data: customerBalance,
    isLoading: isLoadingBalance,
    isRefetching: isRefetchingBalance } = useQuery({
      queryKey: ["customerBalance", params?.customerId],
      queryFn: ({ queryKey }) => getCustomerLatestBalanceAPI(queryKey[1]),
      staleTime: Infinity,
    })



  const { mutate: addTransaction, isPending: isPendingAddTransaction } = useMutation({
    mutationFn: addTransactionToCustomerAPI,
    onSuccess: () => {
      setNewTransactionData({
        ...newTransactionData,
        type: "",
        amount: "",
        ref: "",
      })
      queryClient.invalidateQueries({ queryKey: ["customerBalance"] })
      queryClient.invalidateQueries({ queryKey: ["allCustomerBalance"] })
      queryClient.invalidateQueries({ queryKey: ["customerTransactions"] })
      queryClient.invalidateQueries({ queryKey: ["totalBalance"] })
      setBottomModalVisible(false)
      Dialog.show({
        type: "SUCCESS",
        title: "Transaction added",
        autoClose: 1000,
      })
    },
    onError: (error) => {
      Dialog.show({
        type: "DANGER",
        title: "Error in adding transaction",
        textBody: "Please try again later",
        autoClose: 1000
      })
    }
  })


  return (
    <SafeAreaView className="flex-1 bg-white "
      edges={['right', 'top', 'left']}>

      <StatusBar backgroundColor={"#419a79"} />

      <View className="bg-[#419a79] rounded-b-2xl py-2 mb-5"
        style={{ height: responsiveHeight(40) }}>

        <View className="flex-row items-center py-2 gap-y-2 justify-evenly ">
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
            {params?.customerName}
          </Text>

          <TouchableOpacity
            onPress={() => setDownlaodModalVisible(true)}
            style={{
              padding: responsiveHeight(2)
            }}>


            <AntDesign name="download" size={responsiveHeight(2.5)} color="white" />
          </TouchableOpacity>

        </View>

        <View className=" items-center flex-1 gap-y-8 ">

          <View className="bg-[#eeedf3] rounded-2xl items-center justify-center px-10 py-5 my-2">
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
                  fontSize: responsiveFontSize(3)
                }}>
                ₹ {customerBalance?.balance}
              </Text>
            }
          </View>


          <View className="flex-row justify-around w-full ">

            <TouchableOpacity
              onPress={() => {
                setBottomModalVisible(!bottomModalVisible)
                setNewTransactionData({ ...newTransactionData, type: "Purchase" })
              }}

              className="border-white border-2 rounded-2xl items-center px-3.5  gap-y-1 py-2">
              <AntDesign name="pluscircleo" size={responsiveHeight(2.5)} color="white" />
              <Text className="text-white font-mulish-semibold"
                style={{
                  fontSize: responsiveFontSize(1.75)
                }}>
                PURCHASED
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setBottomModalVisible(!bottomModalVisible)
                setNewTransactionData({ ...newTransactionData, type: "Payment" })
              }}
              className="border-white border-2 rounded-2xl items-center px-3.5  gap-y-1 py-2">
              <AntDesign name="minuscircleo" size={responsiveHeight(2.5)} color="white" />
              <Text className="text-white font-mulish-semibold"
                style={{
                  fontSize: responsiveFontSize(1.75)
                }}>
                RECEIVED
              </Text>
            </TouchableOpacity>

          </View>


        </View>

      </View>



      <View className="px-4 gap-y-2">
        <Text className="text-black font-mulish-bold"
          style={{
            fontSize: responsiveFontSize(2.5)
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
                    className="py-3 px-3 my-1 flex-row items-center rounded-2xl justify-between">
                    <View className="flex-row items-center gap-x-4 flex-1">
                      <MaterialCommunityIcons
                        name={order?.type === "Purchase" ? "arrow-up" : "arrow-down"}
                        size={responsiveHeight(3.5)} color="black" />
                      <View style={{ width: responsiveWidth(50) }} >

                        <Text className="text-black font-mulish-semibold flex-wrap mb-1"
                          style={{
                            fontSize: responsiveFontSize(2.15)
                          }}>
                          {order?.type}
                        </Text>
                        <Text className="text-black font-mulish-semibold" style={{
                          fontSize: responsiveFontSize(1.75)
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
              <ActivityIndicator style={{
                marginVertical: responsiveHeight(1.5)
              }}
                size={"small"} color='rgb(87,117,177)' /> :
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
            <Text className="text-black font-mulish-semibold" style={{
              fontSize: responsiveFontSize(2.5)
            }}>
              No transactions
            </Text>
          </View>
      }



      {/* Bottom Modal Start */}
      <Modal
        testID={'modal'}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationOutTiming={1000}
        animationInTiming={700}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        onBackButtonPress={() => {
          Keyboard.dismiss()
          setBottomModalVisible(false)
          setNewTransactionData({ ...newTransactionData, type: "", amount: "", ref: "" })
        }}
        isVisible={bottomModalVisible}
        onSwipeComplete={() => {
          Keyboard.dismiss()
          setBottomModalVisible(false)
          setNewTransactionData({ ...newTransactionData, type: "", amount: "", ref: "" })
        }}
        swipeDirection={['down']}
        style={{ justifyContent: "flex-end", margin: 0 }}>


        <KeyboardAvoidingView behavior="padding" className="bg-white px-2">

          <View className="bg-gray-300 w-1/6 h-2 self-center rounded-3xl m-1">
          </View>

          <View className="py-5 items-center gap-y-3">
            <Text className="text-black font-mulish-bold text-center "
              style={{
                fontSize: responsiveFontSize(2.5)
              }}>
              Enter Amount
            </Text>

            <View
              // onPress={() => amountInputRef.current.focus()}
              className="border-2 border-gray-300 w-3/4 rounded-2xl justify-center items-center flex-row text-black text-center">
              <Text className="text-black font-mulish-semibold  "
                style={{
                  fontSize: responsiveFontSize(2.25)
                }}>
                ₹
              </Text>
              <TextInput
                ref={amountInputRef}
                value={newTransactionData?.amount
                  // ?.replace((\d{1, 3}|\G\d{3})(?=(?:\d{3})+(?!\d))
                  // , ",")
                }
                onChangeText={(e) => setNewTransactionData({ ...newTransactionData, amount: e })}
                keyboardType='numeric'
                placeholder=''
                className=" text-black text-center w-3/4"
                style={{
                  fontSize: responsiveFontSize(2.25)
                }} />
            </View>

            <Text className="text-black font-mulish-bold text-center "
              style={{
                fontSize: responsiveFontSize(2.5)
              }}>
              Enter Bill/Ref No
            </Text>
            <TextInput
              value={newTransactionData?.ref}
              onChangeText={(e) => setNewTransactionData({ ...newTransactionData, ref: e })}
              // placeholder=''
              className="border-2 border-gray-300 w-3/4 rounded-2xl justify-between items-center flex-row text-black text-center"
              style={{
                fontSize: responsiveFontSize(2.25)
              }} />
          </View>


          <View className="my-5">
            <TouchableOpacity
              disabled={
                (newTransactionData?.amount === "" || newTransactionData?.ref === "" && true)
                ||
                isPendingAddTransaction}
              onPress={() => {
                addTransaction({
                  ...newTransactionData,
                  amount: parseInt(newTransactionData?.amount),
                  dateOfTransaction: moment.tz("Asia/Kolkata").format('YYYY-MM-DDTHH:mm:ss.SSSZ')
                })
              }}
              className="bg-black p-5 items-center rounded-2xl">
              {isPendingAddTransaction ?
                <ActivityIndicator color='white' />
                :
                <Text className="text-white text-center font-mulish-semibold"
                  style={{
                    fontSize: responsiveFontSize(2.25)
                  }}>
                  Done
                </Text>
              }
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {/* </KeyboardAwareScrollView> */}

      </Modal>
      {/* Bottom Modal End */}




      {/* Modal for downloading Start  */}
      <Modal testID={'modalForStartDate'}
        animationIn={"slideInLeft"}
        animationOut={"slideOutLeft"}
        animationOutTiming={500}
        animationInTiming={700}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        isVisible={startDateModalVisible}
        onBackButtonPress={() => setStartDateModalVisible(false)}>

        <View className="flex-1 justify-center flex-col ">
          <View className="bg-white rounded-3xl p-5 items-center justify-center">
            <Text className="text-black font-mulish-semibold text-center" style={{
              fontSize: responsiveFontSize(2.25)
            }}>
              Select the Start date
            </Text>
            <DatePicker
              className=""
              onSelectedChange={date => {
                const dateArray = date.split("/");
                const newDateString = `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;
                // Convert the new date string to a date object
                const newDateObject = new Date(newDateString);
                // Log the new date object
                setStartDate(newDateString)
              }}
              options={{
                mainColor: "#419a79",
                selectedTextColor: "white",
                defaultFont: "Mulish-SemiBold",
                headerFont: "Mulish-SemiBold",
              }}
              mode={"calendar"} />

            <TouchableOpacity onPress={() => setStartDateModalVisible(false)}
              className="bg-[#419a79] p-4 rounded-xl">
              <Text className="text-white font-mulish-semibold" style={{
                fontSize: responsiveFontSize(1.75)
              }}>
                Confirm Date
              </Text>
            </TouchableOpacity>

          </View>

        </View>


      </Modal>

      <Modal testID={'modalForEndDate'}
        animationIn={"slideInRight"}
        animationOut={"slideOutRight"}
        animationOutTiming={500}
        animationInTiming={700}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        isVisible={endDateModalVisible}
        onBackButtonPress={() => setEndDateModalVisible(false)}>

        <View className="flex-1 justify-center flex-col ">
          <View className="bg-white rounded-3xl p-5 items-center justify-center">
            <Text className="text-black font-mulish-semibold text-center"
              style={{
                fontSize: responsiveFontSize(2.25)
              }}>
              Select the End date
            </Text>
            <DatePicker
              className=""
              onSelectedChange={date => {
                const dateArray = date.split("/");
                const newDateString = `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;
                setEndDate(newDateString)
              }}
              options={{
                mainColor: "#419a79",
                selectedTextColor: "white",
                defaultFont: "Mulish-SemiBold",
                headerFont: "Mulish-SemiBold",
              }}
              mode={"calendar"} />

            <TouchableOpacity onPress={() => setEndDateModalVisible(false)}
              className="bg-[#419a79] p-4 rounded-xl">
              <Text className="text-white font-mulish-semibold"
                style={{
                  fontSize: responsiveFontSize(1.75)
                }}>
                Confirm End Date
              </Text>
            </TouchableOpacity>

          </View>

        </View>


      </Modal>

      <Modal testID={'modalForDownloading'}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationOutTiming={1000}
        animationInTiming={700}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        isVisible={downloadModalVisible}
        onBackButtonPress={() => {
          Keyboard.dismiss()
          setDownlaodModalVisible(false)
          setStartDate("")
          setEndDate("")
        }}
        onBackdropPress={() => {
          Keyboard.dismiss()
          setDownlaodModalVisible(false)
          setStartDate("")
          setEndDate("")
        }}
      >

        <View className=" flex-1 justify-center flex-col ">

          <View className=" bg-white rounded-3xl p-5 items-center justify-center ">
            <Text className="text-black font-mulish-semibold text-center" style={{
              fontSize: responsiveFontSize(2.5)
            }}>
              Select the dates for the PDF
            </Text>

            <View className="flex-row justify-around w-full my-4">
              <TouchableOpacity onPress={() => setStartDateModalVisible(true)}
                className=" flex-row items-center gap-x-3 border-2 p-3 border-[#eeedf3] rounded-2xl">
                <Text className=" text-black font-mulish-semibold" style={{
                  fontSize: responsiveFontSize(1.75)
                }}>
                  {startDate?.length > 0 ? startDate : "Start Date"}
                </Text>
                <AntDesign name="calendar" size={responsiveHeight(2.25)} color="black" />

              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setEndDateModalVisible(true) }}
                className=" flex-row items-center gap-x-3 border-2 p-3 border-[#eeedf3] rounded-2xl">
                <Text className="text-black font-mulish-semibold" style={{
                  fontSize: responsiveFontSize(1.75)
                }}>
                  {endDate?.length > 0 ? endDate : "End Date"}
                </Text>
                <AntDesign name="calendar" size={responsiveHeight(2.25)} color="black" />

              </TouchableOpacity>
            </View>

            <TouchableOpacity
              disabled={(startDate === "" || endDate === "" && true)}
              onPress={() => downloadTransactionPdf(params?.custoemrId, startDate, endDate)}
              className="bg-[#419a79] p-4  rounded-xl">
              <Text className="text-white font-mulish-semibold" style={{
                fontSize: responsiveFontSize(2)
              }}>
                Download PDF
              </Text>
            </TouchableOpacity>

          </View>

        </View>


      </Modal>

      {/* Modal for downloading End  */}


    </SafeAreaView>

  )
}

export default CustomerPaymentDetailsScreen