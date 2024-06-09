import { View, Text, TouchableOpacity, TextInput, FlatList, Keyboard, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllProductsPricesByCategoryApi, updatePriceOfProductApi } from '../../api/adminAPIs/adminProductAPI'
import { Dialog } from 'react-native-alert-notification'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
// import useKeyboardHeight from 'react-native-use-keyboard-height'


const UpdateProductScreen = ({ navigation }) => {
    const { params } = useRoute()
    // State that will hold all the updated Products
    const [updatedProduct, setUpdatedProduct] = useState(new Set())

    const queryClient = useQueryClient();

    const { data: allProducts, isLoading: isLoadingAllProducts, status, isRefetching } = useQuery({
        queryKey: ["allProducts", params],
        queryFn: ({ queryKey }) => getAllProductsPricesByCategoryApi(queryKey[1]),
        staleTime: Infinity,
    })

    // Mutate function for updating the price of the products
    const { mutate: updatePrice, isPending: isUpdating } = useMutation({
        mutationFn: updatePriceOfProductApi,
        onSuccess: () => {
            navigation.goBack()
            queryClient.invalidateQueries({ queryKey: ["allProducts"] })
            setUpdatedProduct(new Set())
            Dialog.show({
                type: "SUCCESS",
                autoClose: 1000,
                title: "Prices Updated Successfully"
            })
        },
        onError: () => {
            Dialog.show({
                type: "DANGER",
                autoClose: 1000,
                title: "Prices Cannot be Updated"
            })
        }
    })

    const handleUpdationOfProduct = (_id, price) => {
        // Create a copy of the Set
        const newUpdatedProduct = new Set(updatedProduct);

        if (price === "") {
            // Remove the product from the Set if the price is empty
            for (const product of updatedProduct) {
                if (product._id === _id) {
                    newUpdatedProduct.delete(product);
                    break;
                }
            }
        } else {
            // Update or add the product based on its existence in the Set
            let productExists = false;
            for (const product of updatedProduct) {
                if (product._id === _id) {
                    // If the product exists, update its price
                    productExists = true;
                    product.price = price;
                    break;
                }
            }

            if (!productExists) {
                // If the product doesn't exist, add it to the Set
                newUpdatedProduct.add({ _id, price });
            }
        }

        // Update the state with the modified Set
        setUpdatedProduct(newUpdatedProduct);
    };

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        // Cleanup event listeners on component unmount
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    // useFocusEffect(React.useCallback(() => {
    //     navigation.addListener('beforeRemove', (e) => {
    //         if (updatedProduct.size === 0) {
    //             // If we don't have unsaved changes, then we don't need to do anything
    //             return;
    //         }

    //         // Prevent default behavior of leaving the screen
    //         e.preventDefault();

    //         // Prompt the user before leaving the screen
    //         Alert.alert(
    //             'Discard changes?',
    //             'You have unsaved changes. Are you sure to discard them and leave the screen?',
    //             [
    //                 { text: "Don't leave", style: 'cancel', onPress: () => { } },
    //                 {
    //                     text: 'Discard',
    //                     style: 'destructive',
    //                     // If the user confirmed, then we dispatch the action we blocked earlier
    //                     // This will continue the action that had triggered the removal of the screen
    //                     onPress: () => {
    //                         queryClient.invalidateQueries({ queryKey: ["allProducts"] })
    //                         navigation.dispatch(e.data.action)
    //                     },

    //                 },
    //             ]
    //         );
    //     }

    //     )
    // }, [navigation]))



    return (
        <SafeAreaView className="flex-1 bg-white px-2 "
            edges={["right", "left", "top"]}>

            <Appbar.Header mode='center-aligned'
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
                    title={params + " Prices"}
                    titleStyle={{
                        flexWrap: 'wrap',
                        fontFamily: "Mulish-SemiBold",
                        color: "black",
                        fontSize: responsiveFontSize(3),
                    }} />
            </Appbar.Header>
            <Divider />


            {isLoadingAllProducts || isRefetching ?
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size={"large"} color='#53B175' />
                </View>
                :
                <KeyboardAwareFlatList
                    extraScrollHeight={responsiveHeight(12)}
                    // extraHeight={responsiveHeight(12)}
                    className={`m-4`}
                    scrollEnabled={true}
                    enableOnAndroid={true}
                    data={allProducts}
                    initialNumToRender={30}
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item: product, index }) => {
                        return (
                            <Fragment key={product?._id}>
                                <View className="flex flex-row items-center justify-between"
                                    key={product?._id}>
                                    <View className=" w-40">
                                        <Text className="text-justify "
                                            style={{
                                                color: "black",
                                                fontSize: responsiveFontSize(1.75),
                                                fontFamily: "Mulish-Medium",
                                                // paddingEnd: responsiveWidth(1)
                                            }}>
                                            {index + 1}. {product?.title[0]}

                                        </Text>
                                    </View>

                                    <Text
                                        className="text-black text-center"
                                        style={{
                                            fontSize: responsiveFontSize(1.75),
                                            fontFamily: "Mulish-Medium",
                                        }}>

                                        {1} {product?.unit}
                                    </Text>

                                    <View
                                        className="flex-row border-2 rounded-xl w-24 border-gray-300 my-1 px-2 py-1 items-center ">
                                        <Text className="text-black font-mulish-medium"
                                            style={{
                                                fontSize: responsiveFontSize(1.75),
                                            }}>
                                            ₹
                                        </Text>

                                        <TextInput
                                            onChangeText={(e) => handleUpdationOfProduct(product._id, e)}
                                            className="text-black px-2 w-full py-1 items-center font-mulish-medium"
                                            maxLength={5}
                                            keyboardType='numeric'
                                            style={{
                                                fontSize: responsiveFontSize(1.75),
                                            }}
                                            placeholder={product?.price?.toString()}
                                            placeholderTextColor={"rgb(156 163 175)"}>
                                        </TextInput>
                                    </View>

                                </View>
                            </Fragment>
                        )
                    }}
                />

            }


            {updatedProduct?.size > 0 &&
                <View className="relative bottom-0 right-0 left-0 p-2 bg-white">
                    <TouchableOpacity
                        disabled={updatedProduct.size === 0 || isUpdating}
                        onPress={() => {
                            updatePrice({ updatedProduct: Array.from(updatedProduct), priceCategory: params })
                        }}
                        className="bg-[#53B175]  py-4 rounded-xl items-center justify-center">

                        {isUpdating ?
                            <ActivityIndicator color='white' />
                            :
                            <Text
                                className=' text-white font-mulish-semibold'
                                style={{ fontSize: responsiveFontSize(2.25) }}>
                                Save
                            </Text>
                        }

                    </TouchableOpacity>
                </View>
            }

        </SafeAreaView >
    )
}

export default UpdateProductScreen

