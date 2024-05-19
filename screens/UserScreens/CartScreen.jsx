import { View, Text, TouchableOpacity, Image, FlatList, PixelRatio, Alert } from 'react-native'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
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

const CartScreen = ({ navigation }) => {

  const [checkOutAmount, setCheckOutAmount] = useState(0)
  const [isCheckoutDisabled, setIsCheckoutDisable] = useState(false)
  const [idOfUpdatingProduct, setIdOfUpdatingProduct] = useState([])
  const [isPastCutOff, setIsPastCutOff] = useState(false)
  const queryClient = useQueryClient()
  const { data: userData } = useUserDataQuery()

  const { data: cartItems, isLoading, isRefetching } = useQuery({
    queryKey: ['cartItems'],
    queryFn: ({ signal }) => getItemsFromCartAPI(signal),
    staleTime: Infinity,
  })

  useFocusEffect(React.useCallback(() => {
    if (cartItems?.cart?.length > 0) setIsCheckoutDisable(false)
    else setIsCheckoutDisable(true)

    let amount = 0;
    for (let i = 0; i < cartItems?.cart?.length; i++) {
      const sumPrice =
        cartItems?.cart[i]?.cartItem?.price?.[userData?.category] * cartItems?.cart[i]?.quantity
      amount = amount + Number(sumPrice);
    }

    setCheckOutAmount(amount);
    return (() => {
      setCheckOutAmount(0)
    })
  }, [cartItems]))



  useFocusEffect(React.useCallback(() => {
    isBetween2AMAnd11AM()
  }, []))


  const { mutate: removeItem, isPending: removingFromCart } = useMutation({
    mutationFn: removeFromCartAPI,
    onMutate: async (productId) => {
      const previousCartItems = queryClient.getQueryData(['cartItems'])

      const updatedCartItems = previousCartItems.cart?.filter(item => item?.cartItem?._id !== productId);

      await queryClient.setQueryData(['cartItems'], { cart: updatedCartItems })

    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    }
  })

  const { mutate: modifyQuantity, isPending } = useMutation({
    mutationFn: updateCartAPI,
    onSuccess: async (data) => {
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

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null; // Reset the timeoutId after function call
      }, delay);
    }
  }

  const handleQuantityChange = async (productId, quantity) => {
    queryClient.cancelQueries({ queryKey: ["cartItems"], type: "all", fetchStatus: "fetching" })

    const itemIndex = idOfUpdatingProduct.findIndex(item => item?.productId === productId);
    if (itemIndex !== -1) {
      // ProductId exists, update the quantity
      const updatedItems = [...idOfUpdatingProduct];
      updatedItems[itemIndex] = { productId, quantity };
      setIdOfUpdatingProduct(updatedItems);
    } else {
      // ProductId does not exist, add new item
      setIdOfUpdatingProduct([...idOfUpdatingProduct, { productId, quantity }]);
    }

    const previousCartItems = queryClient.getQueryData(['cartItems'])

    const updatedCartItems = previousCartItems.cart?.map(item =>
      item?.cartItem?._id === productId ? { ...item, quantity: quantity } : item
    );

    await queryClient.setQueryData(['cartItems'], { cart: updatedCartItems })

  }

  useEffect(() => {
    if (idOfUpdatingProduct?.length > 0) {
      debouncedModifyQuantity(idOfUpdatingProduct);
    }
  }, [idOfUpdatingProduct])

  const debouncedModifyQuantity = useCallback(debounce(modifyQuantity, 500), []);

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

      {isLoading ?
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
                      className='px-2 py-3 flex-row'>

                      <Image
                        className="self-center"
                        style={{
                          width: responsiveWidth(30),
                          height: responsiveHeight(12.5)
                        }}
                        resizeMode='contain'
                        source={{ uri: `${product?.cartItem?.url}` }}
                      />

                      <View className=" px-3 flex-shrink w-full">
                        <Text
                          className=" text-black text-xl font-mulish-semibold w-[85%] "
                          style={{ fontSize: responsiveFontSize(2.35) }}>
                          {product?.cartItem?.title}
                        </Text>

                        <Text
                          className=" font-mulish-regular text-slate-500"
                          style={{ fontSize: responsiveFontSize(1.45) }}>
                          ₹{product?.cartItem?.price?.[userData?.category]} / {product?.cartItem?.unit}
                        </Text>


                        <View className='flex-row py-4 justify-between items-center'>
                          <View className="flex-row items-center justify-around w-3/5">

                            <TouchableOpacity
                              onPress={() => {
                                handleQuantityChange(product?.cartItem?._id, product?.quantity - 1)
                              }}
                              className={`
                                       border-gray-200  border-2 rounded-2xl p-3`}>
                              <Feather name="minus" size={responsiveHeight(2.5)}
                                color="black" />

                            </TouchableOpacity>

                            <Text
                              className="text-black font-mulish-medium"
                              style={{
                                fontSize: responsiveFontSize(1.85)
                              }}>
                              {product?.quantity}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                handleQuantityChange(product?.cartItem?._id, product?.quantity + 1)
                              }}
                              className={`
                                       border-gray-200 border-2 rounded-2xl p-3 `}>
                              <Feather name="plus" size={responsiveHeight(2.5)}
                                color="#53B175" />
                            </TouchableOpacity>
                          </View>

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
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={50}
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
                isPastCutOff ? "Cannot Order between 2AM and 11AM" :
                  `Checkout (₹${(checkOutAmount).toLocaleString()})`}
            </Text>
          </TouchableOpacity>
        </View>
      }

    </SafeAreaView >
  )
}

export default CartScreen



// import { View, Text, TouchableOpacity, Image, FlatList, PixelRatio, Alert } from 'react-native'
// import React, { Fragment, useEffect, useState, useCallback } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { useFocusEffect } from '@react-navigation/native'
// import { addToCartAPI, getItemsFromCartAPI, removeFromCartAPI } from '../../api/cartAPI'
// import { ActivityIndicator, Divider } from 'react-native-paper'
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
// import Feather from "react-native-vector-icons/Feather"
// import Ionicons from "react-native-vector-icons/Ionicons"
// import useUserDataQuery from '../../hooks/useUserData';
// import moment from 'moment-timezone';

// const CartScreen = ({ navigation }) => {
//   const [checkOutAmount, setCheckOutAmount] = useState(0)
//   const [isCheckoutDisabled, setIsCheckoutDisable] = useState(false)
//   const [cartItems, setCartItems] = useState([])
//   const [isPastCutOff, setIsPastCutOff] = useState(false)
//   const queryClient = useQueryClient()
//   const { data: userData } = useUserDataQuery()

//   const { data: cartData, isLoading, isRefetching } = useQuery({
//     queryKey: ['cartItems'],
//     queryFn: ({ signal }) => getItemsFromCartAPI(signal),
//     staleTime: Infinity,
//   })

//   // Debounce function
//   const debounce = (func, delay) => {
//     let timeoutId;
//     return (...args) => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         func(...args);
//       }, delay);
//     }
//   }

//   const updateCheckoutAmount = useCallback(() => {
//     let amount = 0;
//     for (let i = 0; i < cartItems.length; i++) {
//       const sumPrice = cartItems[i]?.cartItem?.price?.[userData?.category] * cartItems[i]?.quantity;
//       amount += Number(sumPrice);
//     }
//     setCheckOutAmount(amount);
//   }, [cartItems, userData?.category]);

//   useFocusEffect(useCallback(() => {
//     setCartItems(cartData)
//     if (cartItems.length > 0) {
//       setIsCheckoutDisable(false);
//     } else {
//       setIsCheckoutDisable(true);
//     }
//     updateCheckoutAmount();
//     return () => {
//       setCheckOutAmount(0);
//     }
//   }, [cartItems, updateCheckoutAmount]));

//   useFocusEffect(useCallback(() => {
//     isBetween2AMAnd11AM();
//   }, []));

//   const { mutate: removeItem, isPending: removingFromCart } = useMutation({
//     mutationFn: removeFromCartAPI,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['cartItems'] });
//     }
//   });

//   const { mutate: modifyQuantity, isPending } = useMutation({
//     mutationFn: addToCartAPI,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['cartItems'] });
//     }
//   });

//   const debouncedModifyQuantity = useCallback(debounce(modifyQuantity, 500), []);

//   const handleQuantityChange = (product, quantity) => {
//     setCartItems((prevItems) =>
//       prevItems?.cart.map((item) =>
//         item.cartItem._id === product.cartItem._id ? { ...item, quantity } : item
//       )
//     );
//     debouncedModifyQuantity({ ...product.cartItem, quantity });
//   }

//   const isBetween2AMAnd11AM = () => {
//     const currentTime = moment.tz("Asia/Kolkata");
//     const start = moment.tz("02:00:00", "HH:mm:ss", "Asia/Kolkata");
//     const end = moment.tz("11:00:00", "HH:mm:ss", "Asia/Kolkata");
//     setIsPastCutOff(currentTime.isBetween(start, end));
//     return currentTime.isBetween(start, end);
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white"
//       edges={['right', 'top', 'left']}>

//       <View
//         className="items-center flex-row justify-center"
//         style={{ height: responsiveHeight(10) }}>

//         <Text
//           className="text-black font-mulish-bold"
//           style={{ fontSize: responsiveFontSize(3) }}>
//           My Cart
//         </Text>
//         <View
//           className='flex-row absolute right-5 items-center rounded-2xl border-gray-200 border-2 p-2.5 '>
//           <Feather name="shopping-cart" size={responsiveHeight(3)} color="black" />
//           <Text
//             className="text-xl text-black font-mulish-medium px-1 "
//             style={{ fontSize: responsiveFontSize(2) }}>
//             {cartItems.length}
//           </Text>
//         </View>
//       </View>
//       <Divider style={{
//         marginVertical: responsiveHeight(0.5)
//       }} />

//       {isLoading || removingFromCart ?
//         <View className="flex-1 items-center justify-center">
//           <ActivityIndicator animating={true} size={'large'} color={'#53B175'} />
//         </View>
//         :
//         cartItems?.cart?.length > 0 ?
//           (
//             <FlatList
//               data={cartItems?.cart}
//               renderItem={({ item: product }) => {
//                 return (
//                   <Fragment key={product?.cartItem?._id}>
//                     <TouchableOpacity
//                       disabled={isRefetching || isPending}
//                       onPress={() => navigation.navigate("ProductDetails",
//                         {
//                           product: {
//                             ...product?.cartItem,
//                             price: product?.cartItem?.price?.[userData?.category]
//                           },
//                         }
//                       )}

//                       key={product?.cartItem?._id}
//                       className=' px-2 py-2.5 flex-row'>
//                       <Image className="self-center"
//                         style={{
//                           width: responsiveWidth(30),
//                           height: responsiveHeight(12.5)
//                         }}
//                         resizeMode='contain'
//                         source={{ uri: `${product?.cartItem?.url}` }}
//                       />

//                       <View className=" px-3 flex-shrink w-full">

//                         <Text
//                           className=" text-black text-xl font-mulish-semibold"
//                           style={{ fontSize: responsiveFontSize(2.25) }}>
//                           {product?.cartItem?.title}
//                         </Text>

//                         <Text
//                           className=" font-mulish-regular text-slate-500"
//                           style={{ fontSize: responsiveFontSize(1.35) }}>
//                           ₹{product?.cartItem?.price?.[userData?.category]} / {product?.cartItem?.unit}
//                         </Text>


//                         <View className='flex-row py-4 justify-between items-center'>
//                           <View className="flex-row items-center justify-around w-3/5">

//                             <TouchableOpacity
//                               onPress={() => {
//                                 if (product.quantity > 1) {
//                                   handleQuantityChange(product, product.quantity - 1);
//                                 }
//                               }}
//                               className={`
//                                        border-gray-200  border-2 rounded-2xl p-2.5`}>
//                               <Feather name="minus" size={responsiveHeight(2.5)}
//                                 color="black" />

//                             </TouchableOpacity>

//                             {isPending ?
//                               <ActivityIndicator size={"small"} color='black'
//                                 style={{ marginHorizontal: responsiveWidth(2) }
//                                 } />
//                               :
//                               <Text
//                                 className="text-black font-mulish-medium"
//                                 style={{
//                                   fontSize: responsiveFontSize(1.85)
//                                 }}>
//                                 {product?.quantity}
//                               </Text>
//                             }
//                             <TouchableOpacity
//                               onPress={() => {
//                                 handleQuantityChange(product, product.quantity + 1);
//                               }}
//                               className={`
//                                        border-gray-200 border-2 rounded-2xl p-2.5 `}>
//                               <Feather name="plus" size={responsiveHeight(2.5)}
//                                 color="#53B175" />
//                             </TouchableOpacity>
//                           </View>

//                           <Text
//                             className="text-black font-mulish-semibold"
//                             style={{
//                               fontSize: responsiveFontSize(1.85)
//                             }}>
//                             ₹ {(product?.quantity) * (product?.cartItem?.price?.[userData?.category])}
//                           </Text>

//                         </View>

//                       </View>

//                       <View className="absolute right-3.5 top-2.5 ">
//                         <TouchableOpacity
//                           className="p-2 "
//                           disabled={removingFromCart}
//                           onPress={() => {
//                             removeItem(product?.cartItem?._id)
//                           }}>

//                           <Ionicons name="close-outline" color="black" size={responsiveHeight(3.5)} />
//                         </TouchableOpacity>
//                       </View>

//                     </TouchableOpacity>
//                     <Divider style={{
//                       marginHorizontal: responsiveWidth(5)
//                     }} />
//                   </Fragment>
//                 )
//               }}
//               keyExtractor={(item) => item.cartItem._id}
//               initialNumToRender={10}
//               maxToRenderPerBatch={10}
//               updateCellsBatchingPeriod={50}
//             />

//           )
//           :
//           <View className="flex-1 justify-center items-center">
//             <Feather name='shopping-cart' size={responsiveHeight(8)} color="gray" />
//             <Text className='text-center text-lg text-gray-500 font-mulish-semibold'>
//               Your cart is empty.
//             </Text>
//           </View>
//       }

//       {!isCheckoutDisabled &&
//         <View className="relative bottom-0 left-0 right-0 bg-white p-3 shadow-lg">
//           <TouchableOpacity
//             onPress={() => {
//               if (isPastCutOff) {
//                 Alert.alert("Order cut off time is between 2 AM and 11 AM.")
//               }
//               else {
//                 navigation.navigate("CheckOut")
//               }
//             }}
//             disabled={isCheckoutDisabled}
//             className={`py-4 rounded-lg ${isCheckoutDisabled ? 'bg-gray-300' : 'bg-green-500'}`}>
//             <Text className="text-white text-center font-mulish-bold text-lg">
//               {isCheckoutDisabled ? 'Cart is empty' : `Checkout (₹${checkOutAmount})`}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       }

//     </SafeAreaView >
//   )
// }

// export default CartScreen
