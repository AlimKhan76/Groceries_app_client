import { View, Text, TouchableOpacity, Image, FlatList, PixelRatio } from 'react-native'
import React, { Fragment, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFocusEffect } from '@react-navigation/native'
import { addToCartAPI, getItemsFromCartAPI, removeFromCartAPI } from '../../api/cartAPI'
import { ActivityIndicator, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import useUserDataQuery from '../../hooks/useUserData';
import moment from 'moment-timezone';

const CartScreen = ({ navigation }) => {



  // const CartCard = React.memo(({ item: product, userData, isRefetching, isPending, idOfUpdatingProduct, modifyQuantity, removeItem }) => {
  //   return (
  //     <Fragment key={product?.cartItem?._id}>
  //       <TouchableOpacity
  //         disabled={isRefetching || isPending}
  //         onPress={() => navigation.navigate("ProductDetails",
  //           {
  //             product: {
  //               ...product?.cartItem,
  //               price: product?.cartItem?.price?.[userData?.category]
  //             },
  //           }
  //         )}

  //         key={product?.cartItem?._id}
  //         className=' px-2 py-2.5 flex-row  '>
  //         <Image className="self-center"
  //           style={{
  //             width: responsiveWidth(30),
  //             height: responsiveHeight(15)
  //           }}
  //           resizeMode='contain'
  //           source={{ uri: `${IMAGE_URL}${product?.cartItem?.url}` }}
  //         />

  //         <View className=" px-3  flex-shrink w-full">

  //           <Text
  //             className=" text-black text-xl font-mulish-semibold"
  //             style={{ fontSize: responsiveFontSize(2.25) }}>
  //             {product?.cartItem?.title}
  //           </Text>

  //           <Text
  //             className=" font-mulish-regular text-slate-500"
  //             style={{ fontSize: responsiveFontSize(1.35) }}>
  //             ₹{product?.cartItem?.price?.[userData?.category]} / {product?.cartItem?.unit}
  //           </Text>


  //           <View className='flex-row py-4 justify-between items-center'>
  //             <View className="flex-row items-center justify-around w-3/5">

  //               <TouchableOpacity
  //                 disabled={product?.quantity === 1 || idOfUpdatingProduct.includes(product?.cartItem?._id) && true}
  //                 onPress={() => {
  //                   setIdOfUpdatingProduct([...idOfUpdatingProduct, product?.cartItem?._id])
  //                   modifyQuantity({
  //                     ...product?.cartItem,
  //                     quantity: product?.quantity - 1,
  //                   })
  //                 }}
  //                 className={`
  //                            border-gray-200  border-2 rounded-2xl p-2.5`}>
  //                 <Feather name="minus" size={responsiveHeight(2.5)}
  //                   color="black" />

  //               </TouchableOpacity>

  //               {idOfUpdatingProduct.includes(product?.cartItem?._id) ?
  //                 <ActivityIndicator size={"small"} color='black'
  //                   style={{ marginHorizontal: responsiveWidth(2) }} />
  //                 :
  //                 <Text
  //                   className=" text-black font-mulish-semibold mx-4"
  //                   style={{
  //                     fontSize: responsiveFontSize(1.85)
  //                   }}>
  //                   {product?.quantity}
  //                 </Text>
  //               }
  //               <TouchableOpacity
  //                 disabled={idOfUpdatingProduct.includes(product?.cartItem?._id) && true}
  //                 onPress={() => {
  //                   setIdOfUpdatingProduct([...idOfUpdatingProduct, product?.cartItem?._id])
  //                   modifyQuantity({
  //                     ...product.cartItem,
  //                     quantity: product?.quantity + 1,
  //                   })
  //                 }}
  //                 className={`
  //                            border-gray-200 border-2 rounded-2xl p-2.5 `}>
  //                 <Feather name="plus" size={responsiveHeight(2.5)}
  //                   color="#53B175" />
  //               </TouchableOpacity>
  //             </View>

  //             <Text
  //               className="text-black font-mulish-semibold"
  //               style={{
  //                 fontSize: responsiveFontSize(1.85)
  //               }}>
  //               ₹ {(product?.quantity) * (product?.cartItem?.price?.[userData?.category])}
  //             </Text>

  //           </View>

  //         </View>

  //         <View className="absolute right-3.5 top-2.5 ">
  //           <TouchableOpacity
  //             className="p-2 "
  //             disabled={removingFromCart}
  //             onPress={() => {
  //               removeItem(product?.cartItem?._id)
  //             }}>

  //             <Ionicons name="close-outline" color="black" size={responsiveHeight(3.5)} />
  //           </TouchableOpacity>
  //         </View>

  //       </TouchableOpacity>
  //       <Divider style={{
  //         marginHorizontal: responsiveWidth(5)
  //       }} />
  //     </Fragment>
  //   );
  // });
  // const navigation = useNavigation();

  const [checkOutAmount, setCheckOutAmount] = useState(0)
  const [isCheckoutDisabled, setIsCheckoutDisable] = useState(false)
  const [idOfUpdatingProduct, setIdOfUpdatingProduct] = useState([])
  const [isPastCutOff, setIsPastCutOff] = useState(false)
  const queryClient = useQueryClient()
  const { data: userData } = useUserDataQuery()

  const { data: cartItems, isLoading, isRefetching } = useQuery({
    queryKey: ['cartItems'],
    queryFn: getItemsFromCartAPI,
    staleTime: Infinity,
  })

  // For calculating Total Checkout Amount 
  useFocusEffect(React.useCallback(() => {
    if (cartItems?.cart?.length > 0) {
      setIsCheckoutDisable(false)
    }
    else {
      setIsCheckoutDisable(true)
    }

    let amount = 0;
    for (let i = 0; i < cartItems?.cart?.length; i++) {
      const sumPrice = cartItems?.cart[i]?.cartItem?.price?.[userData?.category] * cartItems?.cart[i]?.quantity
      amount = amount + Number(sumPrice);
    }
    setCheckOutAmount(amount);
    return (() => {
      setIdOfUpdatingProduct([])
      setCheckOutAmount(0)
    })
  }, [cartItems]))



  useFocusEffect(React.useCallback(() => {
    isBetween2AMAnd11AM()
  }, []))



  const { mutate: removeItem, isPending: removingFromCart } = useMutation({
    mutationFn: removeFromCartAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    }
  })

  const { mutate: modifyQuantity, isPending } = useMutation({
    mutationFn: addToCartAPI,
    onMutate: async (data) => {
      setIdOfUpdatingProduct(prevIds => [...prevIds, data._id]);

      await queryClient.cancelQueries({ queryKey: ['cartItems'], exact: true })

      // Snapshot the previous value
      const previousCartItems = queryClient.getQueryData(['cartItems'])

      const updatedCartItems = previousCartItems.cart?.map(item =>
        item?.cartItem?._id === data._id ? { ...item, quantity: data?.quantity } : item
      );

      await queryClient.setQueryData(['cartItems'], { cart: updatedCartItems })

      return { previousCartItems }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, context) => {
      queryClient.setQueryData(['cartItems'], context.previousCartItems)
    },
    // Always refetch after error or success:
    onSuccess: async (data) => {
      setIdOfUpdatingProduct(prevIds => prevIds.filter(id => id !== data));
      await queryClient.cancelQueries({ queryKey: ['cartItems'], type: "all" })

      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    },
  })


  const isBetween2AMAnd11AM = () => {
    const currentTime = moment.tz("Asia/Kolkata");
    const start = moment.tz("02:00:00", "HH:mm:ss", "Asia/Kolkata");
    const end = moment.tz("11:00:00", "HH:mm:ss", "Asia/Kolkata");
    setIsPastCutOff(currentTime.isBetween(start, end))
    return currentTime.isBetween(start, end);
  };

  return (
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

      {isLoading || removingFromCart || isRefetching ?
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator animating={true} size={'large'} color={'#53B175'} />
        </View>
        :
        cartItems?.cart?.length > 0 ?
          (
            <FlatList
              data={cartItems?.cart}
              renderItem={({ item: product }) => {
                return (
                  <Fragment key={product?.cartItem?._id}>
                    <TouchableOpacity
                      disabled={isRefetching || isPending}
                      onPress={() => navigation.navigate("ProductDetails",
                        {
                          product: {
                            ...product?.cartItem,
                            price: product?.cartItem?.price?.[userData?.category]
                          },
                        }
                      )}

                      key={product?.cartItem?._id}
                      className=' px-2 py-2.5 flex-row'>
                      <Image className="self-center"
                        style={{
                          width: responsiveWidth(30),
                          height: responsiveHeight(12.5)
                        }}
                        resizeMode='contain'
                        source={{ uri: `${product?.cartItem?.url}` }}
                      />

                      <View className=" px-3 flex-shrink w-full">

                        <Text
                          className=" text-black text-xl font-mulish-semibold"
                          style={{ fontSize: responsiveFontSize(2.25) }}>
                          {product?.cartItem?.title}
                        </Text>

                        <Text
                          className=" font-mulish-regular text-slate-500"
                          style={{ fontSize: responsiveFontSize(1.35) }}>
                          ₹{product?.cartItem?.price?.[userData?.category]} / {product?.cartItem?.unit}
                        </Text>


                        <View className='flex-row py-4 justify-between items-center'>
                          {/* <View className="flex-row items-center justify-around w-3/5"> */}

                          {/* <TouchableOpacity
                              disabled={product?.quantity === 1 || idOfUpdatingProduct.includes(product?.cartItem?._id) && true}
                              onPress={() => {
                                // setIdOfUpdatingProduct([...idOfUpdatingProduct, product?.cartItem?._id])
                                modifyQuantity({
                                  ...product?.cartItem,
                                  quantity: product?.quantity - 1,
                                })
                              }}
                              className={`
                                       border-gray-200  border-2 rounded-2xl p-2.5`}>
                              <Feather name="minus" size={responsiveHeight(2.5)}
                                color="black" />

                            </TouchableOpacity>

                             {idOfUpdatingProduct.includes(product?.cartItem?._id) ? 
                            {false ?
                              <ActivityIndicator size={"small"} color='black'
                                style={{ marginHorizontal: responsiveWidth(2) }} />
                              : */}
                          <Text
                            className="text-black font-mulish-medium"
                            style={{
                              fontSize: responsiveFontSize(1.85)
                            }}>
                            Qty : {product?.quantity} {product?.cartItem?.unit}
                          </Text>
                          {/* } */}
                          {/* <TouchableOpacity
                              disabled={idOfUpdatingProduct.includes(product?.cartItem?._id)}
                              onPress={() => {
                                // setIdOfUpdatingProduct([...idOfUpdatingProduct, product?.cartItem?._id])
                                modifyQuantity({
                                  ...product.cartItem,
                                  quantity: product?.quantity + 1,
                                })
                              }}
                              className={`
                                       border-gray-200 border-2 rounded-2xl p-2.5 `}>
                              <Feather name="plus" size={responsiveHeight(2.5)}
                                color="#53B175" />
                            </TouchableOpacity> */}
                          {/* </View> */}

                          <Text
                            className="text-black font-mulish-semibold"
                            style={{
                              fontSize: responsiveFontSize(1.85)
                            }}>
                            ₹ {(product?.quantity) * (product?.cartItem?.price?.[userData?.category])}
                          </Text>

                        </View>

                      </View>

                      <View className="absolute right-3.5 top-2.5 ">
                        <TouchableOpacity
                          className="p-2 "
                          disabled={removingFromCart}
                          onPress={() => {
                            removeItem(product?.cartItem?._id)
                          }}>

                          <Ionicons name="close-outline" color="black" size={responsiveHeight(3.5)} />
                        </TouchableOpacity>
                      </View>

                    </TouchableOpacity>
                    <Divider style={{
                      marginHorizontal: responsiveWidth(5)
                    }} />
                  </Fragment>
                )
              }}
              keyExtractor={(item) => item.cartItem._id}
            />

          )
          :
          <View className="items-center justify-center flex-1 mx-3">
            <Text
              className="text-center text-black font-mulish-semibold"
              style={{ fontSize: responsiveFontSize(2.5) }}>
              You have no items in Cart, Start adding them Now
            </Text>
          </View>
      }

      {!isCheckoutDisabled &&
        <View className="bottom-2.5 relative self-center w-full overflow-hidden  ">
          <TouchableOpacity
            disabled={isCheckoutDisabled || isPastCutOff || idOfUpdatingProduct.length !== 0}
            onPress={() => navigation.navigate("Checkout")}
            className={`
          ${isCheckoutDisabled && "opacity-60"} bg-[#53B175]
          p-5 rounded-3xl flex-row mx-5 items-center justify-center`}>

            <Text
              className=' text-white text-xl font-mulish-semibold flex-wrap text-center'
              style={{
                fontSize: isPastCutOff ? responsiveFontSize(2) : responsiveFontSize(2.25)
              }}>
              {isPastCutOff ? "No Orders allowed between 2am and 11am" : "Go to checkout"
              }
            </Text>
            {!isPastCutOff &&
              <View className={`${isCheckoutDisabled && "opacity-50"} right-5 absolute bg-[#489E67] p-1.5 rounded-xl `}>

                <Text className='text-white font-mulish-semibold px-1'
                  style={{ fontSize: responsiveFontSize(1.35) }}>
                  ₹ {checkOutAmount}
                </Text>
              </View>
            }

          </TouchableOpacity>
        </View>
      }

    </SafeAreaView >
  )
}

export default CartScreen