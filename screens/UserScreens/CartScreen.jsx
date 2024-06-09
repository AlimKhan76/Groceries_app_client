import { View, Text, TouchableOpacity, Image, FlatList, PixelRatio, Alert, Pressable, ScrollView } from 'react-native'
import React, { Fragment, Profiler, memo, useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFocusEffect } from '@react-navigation/native'
import { addToCartAPI, getItemsFromCartAPI, removeFromCartAPI, updateCartAPI } from '../../api/cartAPI'
import { ActivityIndicator, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import useUserDataQuery from '../../hooks/useUserData';
import moment from 'moment-timezone';
import CartItemCard from '../components/CartItemCard'
import { Dialog } from 'react-native-alert-notification'

const CartScreen = ({ navigation }) => {
  const [checkOutAmount, setCheckOutAmount] = useState(0);
  const [isCheckoutDisabled, setIsCheckoutDisable] = useState(false);
  const idOfUpdatingProductRef = useRef([]); // Using ref for tracking updating products

  const [isPastCutOff, setIsPastCutOff] = useState(false);
  const queryClient = useQueryClient();
  const { data: userData } = useUserDataQuery();
  const { data: cartItems, isLoading, isRefetching } = useQuery({
    queryKey: ['cartItems'],
    queryFn: ({ signal }) => getItemsFromCartAPI(signal),
    staleTime: Infinity,
  });

  // Fetch cart items and update checkout amount
  useFocusEffect(useCallback(() => {
    if (cartItems?.cart?.length > 0) setIsCheckoutDisable(false);
    else setIsCheckoutDisable(true);

    let amount = 0;
    for (let i = 0; i < cartItems?.cart?.length; i++) {
      const sumPrice = cartItems?.cart[i]?.cartItem?.price?.[userData?.category] * cartItems?.cart[i]?.quantity;
      amount += Number(sumPrice);
    }

    setCheckOutAmount(amount);
  }, [cartItems])
  );

  // Check if current time is between 2 AM and 11 AM
  useFocusEffect(useCallback(() => {
    const currentTime = moment.tz('Asia/Kolkata');
    const start = moment.tz('02:30:00', 'HH:mm:ss', 'Asia/Kolkata');
    const end = moment.tz('11:00:00', 'HH:mm:ss', 'Asia/Kolkata');
    setIsPastCutOff(currentTime.isBetween(start, end));
  }, [])
  );

  // Update item quantity in cart
  const { mutate: modifyQuantity, isPending } = useMutation({
    mutationFn: updateCartAPI,
    onSuccess: () => {
      console.log("success")
      // queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    },
    onError: (error) => {
      console.log(error)
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })

      Dialog.show({
        type: "ERROR",
        title: "Error in updating cart",
        autoClose: 1500
      })
    }
  });

  // Debounce function for quantity change
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, delay);
    };
  };

  console.log(moment.tz("2024-06-06T12:59:05.346+00:00", "Asia/Kolkata").format("DD-MM-YYYY hh:mm A"))
  // Debounce quantity change
  useEffect(() => {
    if (idOfUpdatingProductRef.current?.length > 0) {
      debouncedModifyQuantity(idOfUpdatingProductRef.current);
    }
  }, [cartItems])

  const debouncedModifyQuantity = useCallback(debounce(modifyQuantity, 1500), []);

  return (
    <Profiler id="cart" onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime) => {
      // console.log(actualDuration)
    }}>
      <SafeAreaView className="flex-1 bg-white"
        edges={['right', 'top', 'left']}>

        <View
          className="items-center flex-row justify-center"
          style={{ height: responsiveHeight(10) }}>
          <Text
            className="text-black font-mulish-bold"
            style={{ fontSize: responsiveFontSize(3) }}>
            My Cart
          </Text>

          <View
            className='flex-row absolute right-5 items-center rounded-2xl border-gray-200 border-2 p-2.5 '>
            <Feather name="shopping-cart" size={responsiveHeight(3)} color="black" />
            <Text
              className="text-xl text-black font-mulish-medium px-1 "
              style={{ fontSize: responsiveFontSize(2) }}>
              {cartItems?.cart?.length}
            </Text>
          </View>
        </View>

        <Divider style={{
          marginVertical: responsiveHeight(0.5)
        }} />
        {isLoading ?
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size={'large'} color={'#53B175'} />
          </View>
          :

          cartItems?.cart?.length > 0 ?
            (
              <FlatList
                data={cartItems?.cart}
                renderItem={({ item: product }) => {
                  return (
                    <CartItemCard
                      key={product?.cartitem?._id}
                      product={product}
                      idOfUpdatingProduct={idOfUpdatingProductRef} />)
                }}
              />
            )
            :
            <View className="flex-1 justify-center items-center">
              <Feather name='shopping-cart' size={responsiveHeight(8)} color="gray" />
              <Text className='text-center text-lg text-gray-500 font-mulish-semibold'>
                Your cart is empty.
              </Text>
            </View>
        }

        {!isCheckoutDisabled &&
          <View className="relative bottom-0 left-0 right-0 bg-white p-3 shadow-lg">
            <TouchableOpacity
              onPress={() => {
                if (isPastCutOff) {
                  Alert.alert("Order cut off time is between 2 AM and 11 AM.")
                }
                else {
                  navigation.navigate("Checkout")
                }
              }}
              disabled={isCheckoutDisabled || isPastCutOff}
              className={`py-4 rounded-lg ${isCheckoutDisabled || isPastCutOff ? 'bg-gray-300' : 'bg-[#53B175]'}`}>
              <Text className="text-white text-center font-mulish-bold text-lg">
                {isCheckoutDisabled ? 'Cart is empty' :
                  isPastCutOff ? "Cannot Order between 2:30AM and 11AM" :
                    `Checkout (₹${(checkOutAmount).toLocaleString()})`}
              </Text>
            </TouchableOpacity>
          </View>
        }

      </SafeAreaView >

    </Profiler>
  )
}

export default CartScreen