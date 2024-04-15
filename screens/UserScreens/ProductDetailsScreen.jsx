import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LeftArrow from "../../assets/icons/account/left_arrow.svg"
import Heart from "../../assets/icons/tabs/heart.svg"
import Minus from "../../assets/icons/commons/minus.svg"
import Plus from "../../assets/icons/commons/plus.svg"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeFavouriteProduct } from '../../api/productAPI'
import { getUserData } from '../../api/userAPI'
import { useFocusEffect } from '@react-navigation/native'
import { addToCartApi, getItemsFromCartApi } from '../../api/cartAPI';
import { IMAGE_URL } from "@env";
import { Toast } from 'react-native-alert-notification'
import { ActivityIndicator, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const ProductDetailsScreen = ({ route, navigation }) => {
    const { product } = route.params

    const queryClient = useQueryClient()

    const [isFavourite, setIsFavourite] = useState(false)

    const [quantity, setQuantity] = useState(1)

    const [totalPrice, setTotalPrice] = useState(product?.price)



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

    useEffect(() => {
        setTotalPrice(quantity * product?.price)
    }, [quantity])


    const checkFavourite = () => {

        if (userData?.favourite?.length > 0) {
            for (let i = 0; i < userData?.favourite?.length; i++) {
                if (userData?.favourite[i]._id === product?._id) {
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


{console.log(route.params)}
    const { data: userData } = useQuery({
        queryKey: ["userData"],
        queryFn: getUserData,
        staleTime: Infinity,
    })

    useFocusEffect(React.useCallback(() => {
        checkFavourite();
    }, [userData]))


    const { mutate, isPending } = useMutation({
        mutationFn: changeFavouriteProduct,
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['userData'],
            })
        }
    })


    const { mutate: addToCartMutate, isSuccess, isPending: addingToBasket } = useMutation({
        mutationKey: ["addToCart", product],
        mutationFn: addToCartApi,
        onSuccess: (data) => {
            Toast.show({
                title: "Added to Cart",
                type: "SUCCESS",
                textBody: "Add other products to cart too",
                autoClose: 500,
                onPress: () => { navigation.navigate("Cart") }
            })
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['cartItems'],
            })
        }
    })

    const { data: cartItems, isFetching } = useQuery({
        queryKey: ['cartItems'],
        queryFn: getItemsFromCartApi,
        staleTime: Infinity,
    })


    const { mutate: modifyQuantity, isPending: modifyingCart } = useMutation({
        mutationFn: addToCartApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cartItems']
            })
        }
    })

    useEffect(() => {
        if (!isFetching) {
            checkProductInCart().map(item => {
                setQuantity(item?.quantity)
            })
        }

    }, [cartItems])

    const checkProductInCart = () => {
        console.log(cartItems.cart)
        const cart = cartItems?.cart
        const cartProduct = cart?.filter((item) => item?.cart_item?._id == product?._id)
        return cartProduct;
    }

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
                                // hitSlop={4}
                                style={{
                                    padding: responsiveWidth(6)
                                }}
                                onPress={() => navigation.goBack()}>
                                <LeftArrow color="black" />
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
                                source={{ uri: `${IMAGE_URL}${product?.url}` }}
                            // source={{ uri: `http://192.168.0.106:3000/${product?.url}` }}
                            />
                        </View>

                    </View>

                    <View className="m-5 p">
                        <View
                            className="flex-row justify-between items-center ">

                            <View className="gap-y-1">
                                <Text
                                    className="text-black font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(3.5) }}>
                                    {product?.title}
                                </Text>
                                <Text className="text-[#7C7C7C] font-mulish-semibold"
                                    style={{ fontSize: responsiveFontSize(2) }}>
                                    ₹{product?.price} / {product?.unit}
                                </Text>
                            </View>

                            <TouchableOpacity
                                disabled={isPending}
                                onPress={() => { mutate({ productId: product?._id }) }}>
                                <Heart color={isFavourite ? "red" : "white"} />
                            </TouchableOpacity>
                        </View>







                        {checkProductInCart()?.length > 0 ?
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
                                            {/* {item?.totalPrice} */}
                                        </Text>
                                    </View>

                                )
                            })
                            :
                            <View
                                className="flex-row items-center justify-between pt-5 ">

                                <View
                                    className="flex-row items-center">

                                    <TouchableOpacity
                                        onPress={lowerQuantity}
                                        className="border-gray-200 border-2 rounded-2xl p-3  ">
                                        <Minus style={{ color: "black" }} />
                                    </TouchableOpacity>



                                    <Text
                                        className="text-black font-mulish-semibold text-lg items-center">
                                        {isFetching ? <ActivityIndicator /> :
                                            cartItems?.cart?.map(item => {
                                                if (item?._id === product?._id)
                                                    return item?.quantity;
                                                else
                                                    return null;
                                            })
                                        }

                                    </Text>

                                    <Text className=" text-black text-xl items-center px-3"
                                    >
                                        {quantity}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={increaseQuantity}
                                        className="border-gray-200 border-2 rounded-2xl p-3 ">
                                        <Plus style={{ color: "#53B175" }} />
                                    </TouchableOpacity>
                                </View>
                                <Text
                                    className="text-black font-mulish-bold"
                                    style={{ fontSize: responsiveFontSize(3.5) }}>
                                    ₹{totalPrice}
                                </Text>
                            </View>
                        }



                        <Divider style={{
                            marginVertical: responsiveHeight(2)
                        }} />

                        <View className="pt-2">
                            <Text className="text-black font-mulish-bold"
                                style={{ fontSize: responsiveFontSize(2.5) }}>
                                Product Detail
                            </Text>

                            <Text className=" text-[#7C7C7C] py-1 font-mulish-medium"
                                style={{ fontSize: responsiveFontSize(2) }}>
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
                    onPress={
                        () => addToCartMutate({ ...product, quantity })
                    }
                    className="bg-[#53B175] p-5 rounded-3xl mx-5 items-center justify-center ">

                    {addingToBasket ?
                        <ActivityIndicator color='white' /> :

                        <Text
                            className=' text-white text-xl font-mulish-semibold'>
                            {isSuccess ? 'Added to Basket' : 'Add To Basket'}
                        </Text>
                    }

                </TouchableOpacity>
            </View>

        </SafeAreaView >
    )
}

export default ProductDetailsScreen;