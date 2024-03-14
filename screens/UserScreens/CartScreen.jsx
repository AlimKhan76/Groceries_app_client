import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Plus from "../../assets/icons/commons/plus.svg"
import Minus from "../../assets/icons/commons/minus.svg"
import Close from "../../assets/icons/commons/cross.svg"
import Cart from "../../assets/icons/tabs/cart.svg"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getcartItems } from '../../api/userAPI'
import { BASE_URL } from "@env";
import { useFocusEffect } from '@react-navigation/native'
import { addToCartApi, getItemsFromCartApi, removeFromCart } from '../../api/cartAPI'
import { ActivityIndicator } from 'react-native-paper'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'


const CartScreen = ({ navigation }) => {

  const [checkOutAmount, setCheckOutAmount] = useState(0)
  const [isCheckoutDisabled, setIsCheckoutDisable] = useState(false)
  const queryClient = useQueryClient()


  // const lowerQuantity = () => {
  //   if (quantity === 0) {
  //     setQuantity(0)
  //   }
  //   else {
  //     setQuantity(quantity - +1)
  //   }
  // }

  // const increaseQuantity = () => {
  //   setQuantity(quantity => quantity + 1)
  // }

  // useEffect(() => {
  //   setTotalPrice(quantity * product?.price)
  // }, [quantity])

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cartItems'],
    queryFn: getItemsFromCartApi,
    staleTime: Infinity,
  })

  // For caclculating Total Checkout Amount 
  useFocusEffect(React.useCallback(() => {
    let amount = 0;
    for (let i = 0; i < cartItems?.cart?.length; i++) {
      amount = amount + Number(cartItems.cart[i].totalPrice);
    }
    setCheckOutAmount(amount);
    return (() => {
      setCheckOutAmount(0)
    })

  }, [cartItems]))

  useFocusEffect(React.useCallback(() => {
    if (cartItems?.cart?.length > 0) {
      setIsCheckoutDisable(false)
    }
    else {
      setIsCheckoutDisable(true)
    }

  }, [cartItems]))


  const { mutate: removeItem } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cartItems'],
      })
    }
  })

  const { mutate: modifyQuantity, isPending } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cartItems']
      })
    }
  })

  const insets = useSafeAreaInsets();


  return (
    <SafeAreaView className="flex-1 bg-white"
      edges={['right', 'top', 'left']}
    >
      <View className="border-b-2 border-gray-200 items-center flex-row justify-center">

        <Text
          className=" py-6 text-black font-mulish-extrabold"
          style={{ fontSize: responsiveFontSize(3.5) }}>
          My Cart
        </Text>
        <View
          className='flex-row absolute right-5 items-center rounded-2xl border-gray-200 border-2 p-2.5'>
          <Cart color="black" />
          <Text
            className="text-xl text-black font-mulish-medium px-1"
            style={{ fontSize: responsiveFontSize(2.5) }}>
            {cartItems?.cart?.length}
          </Text>
        </View>
      </View>
      {isLoading ?
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator animating={true} size={'large'}
            color={'#53B175'} />
        </View>
        :

        cartItems?.cart?.length > 0 ?
          (
            <ScrollView horizontal={false}
              className="overflow-hidden">
              {cartItems?.cart?.map((product) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ProductDetails", { product })}

                    key={product._id}
                    className='border-gray-200 border-b-2 px-4 py-3 flex-row  '>
                    <Image className="self-center h-24 "
                      style={{
                        width: responsiveWidth(30)

                      }} resizeMode='contain'
                      source={{ uri: `${BASE_URL}${product?.url}` }}
                    />

                    <View className=" pl-4  flex-shrink w-full">

                      <Text
                        className=" text-black text-xl font-mulish-bold"
                        style={{ fontSize: responsiveFontSize(3) }}>
                        {product?.title}
                      </Text>

                      <Text
                        className=" font-mulish-medium text-slate-500"
                        style={{ fontSize: responsiveFontSize(2) }}>
                        ₹{product?.price} / {product?.unit}
                      </Text>



                      <View className='flex-row py-4 justify-between items-center'>
                        <View className="flex-row items-center justify-around w-3/5">

                          <TouchableOpacity
                            disabled={isLoading}
                            onPress={() => {
                              let quantity = product?.quantity + 1
                              modifyQuantity({
                                ...product,
                                quantity: product?.quantity - 1,
                                totalPrice: quantity * product?.price,
                              })
                            }}
                            className={`
                            ${isPending ? "bg-gray-100" : "bg-white"}
                             border-gray-200  border-2 rounded-2xl p-3 `}
                          >
                            <Minus style={{ color: "black" }} />
                          </TouchableOpacity>
                          <Text className="text-xl text-black font-mulish-semibold mx-6">
                            {/* {isPending ? "" : product?.quantity} */}
                            {product?.quantity}
                          </Text>
                          <TouchableOpacity
                            // disabled={isPending}
                            onPress={() => {
                              let quantity = product?.quantity + 1
                              modifyQuantity({
                                ...product,
                                quantity: product?.quantity + 1,
                                totalPrice: quantity * product?.price
                              })
                            }}
                            className={`
                            ${isPending ? "bg-gray-100" : "bg-white"}
                             border-gray-200  border-2 rounded-2xl p-3 `}
                          >
                            <Plus style={{ color: "#53B175" }} />
                          </TouchableOpacity>
                        </View>

                        <Text
                          className="text-black text-lg font-mulish-semibold">
                          {/* ₹{isPending ? "" : product?.totalPrice} */}
                          ₹ {product?.totalPrice}

                        </Text>

                      </View>

                    </View>

                    <View className="absolute right-5 top-5 ">
                      <TouchableOpacity
                        onPress={() => { removeItem(product?._id) }}
                      >
                        <Close />
                      </TouchableOpacity>
                    </View>

                  </TouchableOpacity>
                )
              })}
            </ScrollView>

          ) :
          <View className="items-center justify-center flex-1 mx-3">
            <Text
              className="text-xl text-center text-black font-mulish-semibold">
              You have no items in Cart, Start adding them Now
            </Text>
          </View>
      }


      <View className="bottom-5 relative self-center w-full  overflow-hidden  ">
        <TouchableOpacity
          disabled={isCheckoutDisabled}
          onPress={() => navigation.navigate("Checkout")}
          // bg-[#216239]
          className={`
          ${isCheckoutDisabled ? "bg-[#216239]" : "bg-[#53B175]"}
          p-5 rounded-3xl flex-row mx-5 items-center justify-center`}

        >
          <Text className=' text-white text-xl font-mulish-semibold'
            style={{ fontSize: responsiveFontSize(3) }}>

            Go to Checkout
          </Text>
          <View className="right-5 absolute bg-[#489E67] p-1.5 rounded-xl ">

            <Text className='text-white text-xs font-mulish-semibold'
              style={{ fontSize: responsiveFontSize(1.5) }}>

              &nbsp;₹ {checkOutAmount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView >
  )
}

export default CartScreen