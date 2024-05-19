import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ActivityIndicator, Appbar, DataTable, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllProductApi } from '../../api/productAPI'
import { getAllProductsPricesByCategoryApi, updatePriceOfProductApi } from '../../api/adminAPIs/productUpdationAPI'
import { Dialog } from 'react-native-alert-notification'
import Feather from "react-native-vector-icons/Feather"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native'
// import useKeyboardHeight from 'react-native-use-keyboard-height'


const UpdateProductScreen = ({ navigation }) => {
    const { params } = useRoute()
    // State that will hold all the updated Products
    const [updatedProduct, setUpdatedProduct] = useState([])

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
            queryClient.invalidateQueries({
                queryKey: ["allProducts"]
            })
            setUpdatedProduct([])
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

    // Adding the product that the user is updating to the array 
    // const handleUpdationOfProduct = (_id, price) => {
    //     if (updatedProduct?.length > 0) {
    //         for (let i = 0; i < updatedProduct?.length; i++) {
    //             if (price == "") {
    //                 if (updatedProduct[i]._id === _id) {
    //                     const newUpdatedProduct = [...updatedProduct]
    //                     updatedProduct[i].price = price
    //                     setUpdatedProduct(newUpdatedProduct)
    //                 }
    //             }
    //             else {
    //                 setUpdatedProduct([...updatedProduct, { _id, price }])
    //             }
    //         }
    //     }
    //     else {
    //         setUpdatedProduct([...updatedProduct, { _id, price }])
    //     }

    // }

    const handleUpdationOfProduct = (_id, price) => {
        if (price === "") {
            // Remove the product from the array if the price is empty
            const newUpdatedProduct = updatedProduct.filter(product => product._id !== _id);
            setUpdatedProduct(newUpdatedProduct);
        } else {
            // Update or add the product based on its existence in the array
            const index = updatedProduct.findIndex(product => product._id === _id);
            if (index !== -1) {
                // If the product exists, update its price
                const newUpdatedProduct = [...updatedProduct];
                newUpdatedProduct[index].price = price;
                setUpdatedProduct(newUpdatedProduct);
            } else {
                // If the product doesn't exist, add it to the array
                setUpdatedProduct([...updatedProduct, { _id, price }]);
            }
        }
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
            {console.log(allProducts)}


            <DataTable
                className="bg-white border-2 border-gray-300 rounded-2xl my-2 h-3/4">

                <DataTable.Header>
                    <DataTable.Title
                        textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.75),
                            fontFamily: "Mulish-Bold",
                        }}>
                        Name
                    </DataTable.Title>

                    <DataTable.Title
                        textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.75),
                            fontFamily: "Mulish-Bold",
                        }}>
                        Quantity
                    </DataTable.Title>

                    <DataTable.Title
                        textStyle={{
                            color: "black",
                            fontSize: responsiveFontSize(1.75),
                            fontFamily: "Mulish-Bold",
                        }}>
                        Price
                    </DataTable.Title>

                </DataTable.Header>

                {isLoadingAllProducts || isRefetching ?
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size={"large"} color='#53B175' />
                    </View>
                    :

                        <ScrollView className={`${isKeyboardVisible? "mb-28 ":""}`} >
                            {allProducts?.map((product, index) => {
                                return (
                                    <DataTable.Row key={product?._id} className="flex-1 py-2">
                                        <DataTable.Cell>
                                            <Text className="" style={{
                                                color: "black",
                                                fontSize: responsiveFontSize(1.75),
                                                fontFamily: "Mulish-Medium",
                                                paddingEnd: responsiveWidth(1)
                                            }}>
                                                {index + 1}. {product?.title}

                                            </Text>
                                        </DataTable.Cell>

                                        <DataTable.Cell
                                            textStyle={{
                                                color: "black",
                                                fontSize: responsiveFontSize(1.75),
                                                fontFamily: "Mulish-Medium",
                                            }}>
                                            {product?.baseQuantity}
                                        </DataTable.Cell>


                                        <DataTable.Cell>
                                            <View
                                                className="flex-row border-2 rounded-xl w-5/6 border-gray-300 my-1 px-2 py-1 items-center">
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

                                        </DataTable.Cell>

                                    </DataTable.Row>
                                )

                            })}

                            {/* //         )
                    //     }}
                    //     keyExtractor={(item) => item?._id}
                    //     initialNumToRender={20}
                    //     // maxToRenderPerBatch={50}
                    //     // windowSize={5}
                    // /> */}
                    {/* </KeyboardAvoidingView> */}
                        </ScrollView>


                }
            </DataTable>



            <View className="items-center w-full">

                <TouchableOpacity
                    disabled={updatedProduct?.length === 0 || isUpdating}
                    onPress={() => updatePrice({ updatedProduct, priceCategory: params })}
                    className={`${(updatedProduct?.length === 0) && "opacity-50 "}
                    bg-[#53B175] w-[90%] p-5 rounded-3xl mx-5 items-center justify-center`}>

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

        </SafeAreaView >
    )
}

export default UpdateProductScreen

