import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { Fragment, Profiler, memo, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { removeFromCartAPI } from '../../api/cartAPI';
import { Divider } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useUserDataQuery from '../../hooks/useUserData';
import { Dialog } from 'react-native-alert-notification';

const CartItemCard = ({ product, idOfUpdatingProduct }) => {
    const { data: userData } = useUserDataQuery();
    const navigation = useNavigation();
    const intervalRef = useRef(null);
    const initialRender = useRef(true); // Ref to track initial render
    console.log(idOfUpdatingProduct)

    const [quantity, setQuantity] = useState(product.quantity);

    const queryClient = useQueryClient();

    const { mutate: removeItem, isPending: removingFromCart } = useMutation({
        mutationFn: removeFromCartAPI,
        onMutate: async (productId) => {
            idOfUpdatingProduct.current = idOfUpdatingProduct.current.filter(item => item.productId !== productId);
            // setQuantity(idOfUpdatingProduct.current[0].quantity)
            // const updatedCartItems = previousCartItems.cart?.filter((item) => item?.cartItem?._id !== productId);
            queryClient.setQueryData(['cartItems'], (previousCartItems) => {
                const updatedCartItems = previousCartItems.cart?.filter((item) => item?.cartItem?._id !== productId);
                return { cart: updatedCartItems }
            })
        },
        onSuccess: () => {
            // setQuantity(product?.quantity)
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });

            Dialog.show({
                type: "DANGER",
                title: "Error",
                autoClose: 1500,

            })
        }
    });

    const handleQuantityChange = async (productId) => {
        // console.log(quantity)
        const itemIndex = idOfUpdatingProduct.current.findIndex((item) => item?.productId === productId);
        if (itemIndex !== -1) {
            const updatedItems = [...idOfUpdatingProduct.current];
            updatedItems[itemIndex] = { productId, quantity };
            idOfUpdatingProduct.current = updatedItems;
        } else {
            idOfUpdatingProduct.current = [...idOfUpdatingProduct.current, { productId, quantity }];
        }

        queryClient.setQueryData(["cartItems"], (previousCartItems) => {

            const updatedCartItems = previousCartItems.cart?.map((item) =>
                item?.cartItem?._id === productId ? { ...item, quantity: quantity } : item
            );

            return { cart: updatedCartItems }


        })
    };

    const handlePressOut = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        handleQuantityChange(product?.cartItem?._id)
    };

    const handleLongPress = (type) => {
        // queryClient.cancelQueries({ queryKey: ['cartItems'], type: 'all', fetchStatus: 'fetching' });

        if (type === 'increasing') {
            intervalRef.current = setInterval(() => {
                setQuantity((prevQuantity) => Number((Number(prevQuantity) + Number(product?.cartItem?.baseQuantity)).toFixed(2)));
                // handleQuantityChange(product?.cartItem?._id, quantity)

            }, 150);
        }
        else {
            if (quantity !== product?.cartItem.baseQuantity) {
                intervalRef.current = setInterval(() => {
                    setQuantity((prevQuantity) => {
                        const newQuantity = Number((Number(prevQuantity) - Number(product?.cartItem?.baseQuantity)).toFixed(2));
                        if (newQuantity <= product?.cartItem.baseQuantity) {
                            // handleQuantityChange(product?.cartItem?._id, product?.cartItem.baseQuantity)

                            clearInterval(intervalRef.current);
                            return product?.cartItem.baseQuantity;
                        }
                        // handleQuantityChange(product?.cartItem?._id, newQuantity)

                        return newQuantity;
                    });
                    // handleQuantityChange(product?.cartItem?._id, quantity)

                }, 150);
            }
        }

        // handleQuantityChange(product?.cartItem?._id, quantity)
    };

    useEffect(() => {
        setQuantity(product?.quantity)
    }, [product])

    // Only run handleQuantityChange when quantity changes after the initial render
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false; // Set to false after the first render
        } else {
            handleQuantityChange(product?.cartItem?._id);
        }
    }, [quantity]);

    return (
        <Fragment key={product?.cartItem?._id}>
            {/* {console.log(product?.cartItem?.title[0])} */}
            <TouchableOpacity
                // disabled={isRefetching || isPending}
                onPress={() => navigation.navigate('ProductDetails', {
                    product: {
                        ...product?.cartItem,
                        price: product?.cartItem?.price?.[userData?.category],
                    },
                })}
                key={product?.cartItem?._id}
                className='px-2 py-3 flex-row'>
                <Image
                    className='self-center'
                    style={{
                        width: responsiveWidth(30),
                        height: responsiveHeight(12.5),
                    }}
                    resizeMode='contain'
                    source={{ uri: `${product?.cartItem?.url}` }}
                />

                <View className='px-3 flex-shrink w-full'>
                    <Text
                        className='text-black text-xl font-mulish-semibold w-[85%]'
                        style={{ fontSize: responsiveFontSize(2.35) }}
                    >
                        {product?.cartItem?.title[0]}
                    </Text>

                    <Text
                        className='font-mulish-regular text-slate-500'
                        style={{ fontSize: responsiveFontSize(1.45) }}
                    >
                        ₹{product?.cartItem?.price?.[userData?.category]} / {product?.cartItem?.unit}
                    </Text>

                    <View className='flex-row py-4 justify-between items-center'>
                        <View className='flex-row items-center justify-around w-3/5'>
                            <TouchableOpacity
                                onPressOut={handlePressOut}
                                onLongPress={() => handleLongPress('decreasing')}
                                onPress={() => {
                                    if (quantity !== product?.cartItem?.baseQuantity) {
                                        setQuantity((prevQuantity) => {
                                            const newQuantity =
                                                Number((Number(prevQuantity) - Number(product?.cartItem?.baseQuantity)).toFixed(2))
                                            // handleQuantityChange(product?.cartItem?._id, newQuantity)
                                            return newQuantity;

                                        });

                                    }
                                }}
                                className={`border-gray-200 border-2 rounded-2xl p-3`}
                            >
                                <Feather name='minus' size={responsiveHeight(2.5)} color='black' />
                            </TouchableOpacity>

                            <Text
                                className='text-black font-mulish-medium w-10 text-center'
                                style={{
                                    fontSize: responsiveFontSize(1.85),
                                }}
                            >
                                {quantity}
                            </Text>
                            <TouchableOpacity
                                onPressOut={handlePressOut}
                                onLongPress={() => handleLongPress('increasing')}
                                onPress={() => {
                                    const newQuantity = Number((Number(quantity) + Number(product?.cartItem?.baseQuantity)).toFixed(2))
                                    setQuantity(newQuantity);
                                    // handleQuantityChange(product?.cartItem?._id, newQuantity)
                                }}
                                className={`border-gray-200 border-2 rounded-2xl p-3`}
                            >
                                <Feather name='plus' size={responsiveHeight(2.5)} color='#53B175' />
                            </TouchableOpacity>
                        </View>

                        <Text
                            className='text-black font-mulish-semibold'
                            style={{
                                fontSize: responsiveFontSize(1.85),
                            }}
                        >
                            ₹ {Number((Number(quantity) * Number(product?.cartItem?.price?.[userData?.category])).toFixed(2))}
                        </Text>
                    </View>
                </View>

                <View className='absolute right-3.5 top-2.5'>
                    <TouchableOpacity
                        className='p-2'
                        disabled={removingFromCart}
                        onPress={() => {
                            removeItem(product?.cartItem?._id);
                        }}
                    >
                        <Ionicons name='close-outline' color='black' size={responsiveHeight(3.5)} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <Divider style={{ marginHorizontal: responsiveWidth(5) }} />
        </Fragment>

    );
};

export default CartItemCard;