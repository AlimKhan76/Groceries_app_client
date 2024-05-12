import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar, PixelRatio, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Heart from "../../assets/icons/tabs/heart.svg"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeFavouriteProductAPI } from '../../api/productAPI'
import { useFocusEffect } from '@react-navigation/native'
import { addToCartAPI, getItemsFromCartAPI } from '../../api/cartAPI';
import { Toast } from 'react-native-alert-notification'
import { ActivityIndicator, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import useUserDataQuery from '../../hooks/useUserData'

const ProductDetailsScreen = ({ route, navigation }) => {

    const { product } = route?.params
    const queryClient = useQueryClient()
    const [isFavourite, setIsFavourite] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(product?.price)
    const [isInCart, setIsInCart] = useState(false)
    const [constantQuantity, setConstantQuantity] = useState(0)

    const lowerQuantity = () => {
        if (quantity <= 2) {
            setQuantity(1)
        }
        else {
            setQuantity(quantity - +1)
        }
    }

    const increaseQuantity = () => {
        setQuantity(quantity => quantity + 1)
    }

    // Rendering  the price with cange in quantity
    useEffect(() => {
        setTotalPrice(quantity * product?.price)
    }, [quantity])

    // Checking if the product is in favourties
    const checkFavourite = () => {
        if (userData?.favourite?.length > 0) {
            for (let i = 0; i < userData?.favourite?.length; i++) {
                if (userData?.favourite[i]?._id === product?._id) {
                    setIsFavourite(true);
                    break;
                }
                else {
                    setIsFavourite(false)
                }
            }
        }
        else {
            setIsFavourite(false)
        }
    }

    const { data: userData } = useUserDataQuery()

    const { mutate, isPending: addingToFavourites, status } = useMutation({
        mutationFn: changeFavouriteProductAPI,
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['userData'],
            })
        }
    })


    const { mutate: addToCartMutate, isSuccess, isPending: addingToBasket } = useMutation({
        // mutationKey: ["addToCart", product],
        mutationFn: addToCartAPI,
        onSuccess: () => {
            Toast.show({
                title: "Added to Cart",
                type: "SUCCESS",
                textBody: "Add other products to cart too",
                autoClose: 500,
                onPress: () => { navigation.navigate("Cart") }
            })
            queryClient.invalidateQueries({
                queryKey: ['cartItems']
            })
        }
    })

    const { data: cartItems, isFetching } = useQuery({
        queryKey: ['cartItems'],
        queryFn: getItemsFromCartAPI,
        staleTime: Infinity,
    })


    const checkProductInCart = () => {
        const userCart = cartItems?.cart
        const productInCart = userCart?.filter((item) => item?.cartItem?._id == product?._id)
        if (productInCart?.length > 0) {
            setConstantQuantity(productInCart[0]?.quantity)
            setQuantity(productInCart[0]?.quantity)
            setIsInCart(true)
        }
        else {
            setIsInCart(false)
        }
    }


    useFocusEffect(React.useCallback(() => {
        checkProductInCart();
        return (() => {
            setIsInCart(false)
        })
    }, [userData, cartItems]))

    useFocusEffect(React.useCallback(() => {
        checkFavourite()
    }, [userData]))

    return (
        <SafeAreaView className="flex-1 bg-white "
            edges={['right', 'top', 'left']}>
            <StatusBar backgroundColor={"rgb(243 244 246)"} />

            <ScrollView className="mb-3">
                <>
                    <View className="bg-gray-100 rounded-b-3xl  "
                        style={{ height: responsiveHeight(45) }}>

                        <View className="flex-row">
                            <TouchableOpacity
                                style={{
                                    padding: responsiveWidth(5)
                                }}
                                onPress={() => navigation.goBack()}>
                                <Feather name="chevron-left" color="black" size={responsiveHeight(3.5)} />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1 justify-center ">
                            <Image
                                style={{
                                    width: responsiveWidth(100),
                                    height: responsiveHeight(40)
                                }}
                                className="self-center "
                                resizeMode='contain'
                                source={{ uri: `${product?.url}` }}
                            />
                        </View>

                    </View>

                    <View className="m-5 ">
                        <View
                            className="flex-row justify-between items-center ">

                            <View className="gap-y-1">
                                <Text
                                    className="text-black font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(3) }}>
                                    {product?.title}
                                </Text>
                                <Text className="text-[#7C7C7C] font-mulish-semibold"
                                    style={{ fontSize: responsiveFontSize(1.85) }}>
                                    ₹{product?.price} / {product?.unit}
                                </Text>
                            </View>


                            <TouchableOpacity
                                disabled={addingToFavourites || status === "pending"}

                                onPress={() => {
                                    setIsFavourite(!isFavourite)
                                    mutate({ productId: product?._id })
                                }}>
                                <Heart color={isFavourite ? "red" : "white"} />
                            </TouchableOpacity>

                        </View>







                        {/* {checkProductInCart()?.length > 0 ?
                            checkProductInCart()?.map((item) => {
                                return (
                                    <View
                                        key={item?._id}
                                        className="flex-row items-center justify-between pt-5 ">
                                        <View
                                            className="flex-row items-center">
                                            <TouchableOpacity
                                                disabled={item?.quantity === 1}
                                                onPress={() => lowerQuantity()}
                                                className="border-gray-200 border-2 rounded-2xl p-3  ">
                                                <Minus style={{ color: "black" }} />
                                            </TouchableOpacity>



                                            <Text
                                                className="text-black font-mulish-semibold text-lg items-center px-2.5">
                                                {addingToBasket ?
                                                    <ActivityIndicator size={'small'} color='gray' /> :
                                                    quantity
                                                }

                                            </Text>

                                            <TouchableOpacity
                                                onPress={increaseQuantity}
                                                className="border-gray-200 border-2 rounded-2xl p-3 ">
                                                <Plus style={{ color: "#53B175" }} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text className="text-black font-mulish-bold"
                                            style={{ fontSize: responsiveFontSize(3.5) }}>
                                            ₹
                                            {isFetching ?
                                                <ActivityIndicator style={{
                                                    paddingHorizontal: responsiveWidth(3)
                                                }} size={'small'} /> :
                                                // item?.totalPrice
                                                totalPrice
                                            }
                                        </Text>
                                    </View>

                                )
                            })
                            : */}
                        <View
                            className="flex-row items-center justify-between pt-5 ">

                            <View
                                className="flex-row items-center">

                                <TouchableOpacity
                                    disabled={quantity === 1}
                                    onPress={lowerQuantity}
                                    className="border-gray-200 border-2 rounded-2xl p-3 ">
                                    <Feather name="minus" size={responsiveHeight(2.5)}
                                        color="black" />
                                </TouchableOpacity>



                                {/* <Text
                                        className="text-black font-mulish-semibold items-center"
                                        style={{ fontSize: responsiveFontSize(2.25) }}>
                                        {isFetching ? <ActivityIndicator /> :
                                            cartItems?.cart.cart_item_?.map(item => {
                                                if (item?._id === product?._id)
                                                    return item?.quantity;
                                                else
                                                    return null;
                                            })
                                        }

                                    </Text> */}

                                <Text className=" text-black items-center px-3"
                                    style={{ fontSize: responsiveFontSize(2.25) }}>
                                    {isFetching ? <ActivityIndicator color='#53B175' /> :
                                        quantity
                                    }
                                </Text>

                                <TouchableOpacity
                                    onPress={increaseQuantity}
                                    className="border-gray-200 border-2 rounded-2xl p-3 ">
                                    <Feather name="plus" color="#53B175" size={responsiveHeight(2.5)} />
                                </TouchableOpacity>
                            </View>
                            <Text
                                className="text-black font-mulish-bold"
                                style={{ fontSize: responsiveFontSize(2.75) }}>
                                {isFetching ? <ActivityIndicator color='#53B175' /> :
                                    "₹" + totalPrice
                                }
                            </Text>
                        </View>
                        {/* } */}



                        <Divider style={{
                            marginVertical: responsiveHeight(2.5)
                        }} />

                        <View className="">
                            <Text className="text-black font-mulish-bold"
                                style={{ fontSize: responsiveFontSize(2.25) }}>
                                Product Description
                            </Text>

                            <Text className=" text-[#7C7C7C] py-1 font-mulish-medium"
                                style={{ fontSize: responsiveFontSize(1.85) }}>
                                {product?.description}
                            </Text>
                        </View>

                        {/* <Divider bold />

                        <View className="flex-row justify-between py-1 items-center">
                            <Text className="text-black font-mulish-semibold text-lg">
                                Quantity in Cart
                            </Text>

                            <Text className="text-black font-mulish-semibold text-lg items-center">
                                {isLoading ? <ActivityIndicator /> :
                                    cartItems?.cart?.map(item => {
                                        if (item?._id === product?._id)
                                            return item?.quantity;
                                        else
                                            return null;
                                    })
                                }
                                &nbsp;{product?.unit}

                            </Text>
                        </View> */}



                    </View>

                </>
            </ScrollView >

            <View className="bottom-3 relative self-center w-full overflow-hidden ">
                <TouchableOpacity
                    disabled={addingToBasket || isFetching || constantQuantity === quantity && true
                    }
                    onPress={
                        () => addToCartMutate({ ...product, quantity })
                    }
                    className="bg-[#53B175] p-5 rounded-3xl mx-5 items-center justify-center ">

                    {addingToBasket || isFetching ?
                        <ActivityIndicator color='white' />
                        :
                        <Text
                            className=' text-white font-mulish-semibold'
                            style={{
                                fontSize: responsiveFontSize(2.25)
                            }}>
                            {/* {isFetching ? <ActivityIndicator color='white' /> : */}
                            {isInCart ? "Update Cart" :
                                isSuccess ? 'Added to Cart' : 'Add To Cart'
                            }
                        </Text>
                    }

                </TouchableOpacity>
            </View>

        </SafeAreaView >
    )
}

export default ProductDetailsScreen;