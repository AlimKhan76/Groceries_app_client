import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { Fragment, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider, Switch } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllProductAvailabilityAPI, updateProductAvailabilityAPI } from '../../api/adminAPIs/adminProductAPI'
import { Dialog } from 'react-native-alert-notification'

const ProductAvailablityPage = () => {
    const navigation = useNavigation()
    const queryClient = useQueryClient()
    const [modifiedProducts, setModifiedProducts] = useState(new Set());

    const { data: allProducts, isFetching } = useQuery({
        queryKey: ["allProductsAvailability"],
        queryFn: getAllProductAvailabilityAPI,
        staleTime: Infinity,
    })

    const { mutate: updateProductsAvailability, isPending } = useMutation({
        mutationFn: updateProductAvailabilityAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allProductsAvailability"] })
            Dialog.show({
                type: "SUCCESS",
                autoClose: 1000,
                title: "Products Updated"
            })
            setModifiedProducts(new Set());


        },
        onError: (error) => {
            Dialog.show({
                title: error,
                autoClose: 1000,
                type: "DANGER"
            })
        }
    })

    const switchAvailability = (productId) => {
        queryClient.setQueryData(['allProductsAvailability'], (previousItems) => {
            if (!previousItems) return previousItems;

            // Use findIndex to locate the product quickly
            const index = previousItems.findIndex(item => item._id === productId);
            if (index === -1) return previousItems;

            // Copy the previous items array
            const updatedItems = [...previousItems];
            const newAvailability = !updatedItems[index].available;

            // Update the specific item's availability
            updatedItems[index] = {
                ...updatedItems[index],
                available: !updatedItems[index].available
            };

            setModifiedProducts((prev) => {
                const newSet = new Set(prev);
                newSet.add({ productId, available: newAvailability });
                return newSet;
            });


            return updatedItems;
        });
    };


    // useFocusEffect(React.useCallback(() => {
    //     navigation.addListener('beforeRemove', (e) => {
    //         if (modifiedProducts.size === 0) {
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
    //                         queryClient.invalidateQueries({ queryKey: ["allProductsAvailability"] })
    //                         navigation.dispatch(e.data.action)
    //                     },

    //                 },
    //             ]
    //         );
    //     }

    //     )
    //     return () => {
    //         navigation.removeListener('beforeRemove', () => {
    //             return
    //         });
    //     };
    // }, [navigation]))

    return (
        <SafeAreaView className=" flex-1 bg-white "
            edges={["right", "left", "top"]} >

            <Appbar.Header
                mode='center-aligned'
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
                    title="Availability "
                    titleStyle={{
                        fontFamily: "Mulish-Bold",
                        color: "black",
                        fontSize: responsiveFontSize(3),
                    }} />
            </Appbar.Header>
            <Divider />

            {isFetching ?
                <ActivityIndicator color='#53B175' className="flex-1 " size={"large"} />
                :
                <ScrollView className="m-3">

                    {allProducts?.map((product, index) => {
                        return (
                            <Fragment key={product?._id}>
                                <View className="flex flex-row items-center justify-between p-3" >
                                    <Text className="text-black font-mulish-medium" style={{
                                        fontSize: responsiveFontSize(2)
                                    }}>
                                        {index + 1}.  {product?.title[0]}
                                    </Text>
                                    <Switch
                                        color='#53B175'
                                        value={product?.available}
                                        onChange={() =>
                                            switchAvailability(product?._id)
                                        } />
                                </View>
                                <Divider />
                            </Fragment>
                        )
                    })}
                </ScrollView>
            }


            {modifiedProducts.size > 0 &&
                <View className="relative left-0 right-0 bottom-0 bg-white p-2 shadow-lg">
                    <TouchableOpacity
                        disabled={isPending || modifiedProducts.size === 0}
                        className="bg-[#53B175] py-4 rounded-xl"
                        onPress={() => {
                            const productsToUpdate = Array.from(modifiedProducts);
                            updateProductsAvailability(productsToUpdate)
                        }}>
                        {isPending ?
                            <ActivityIndicator color='white' size={"small"} />
                            :
                            <Text className="text-center font-mulish-semibold text-white" style={{
                                fontSize: responsiveFontSize(2.25)
                            }}>
                                Save
                            </Text>
                        }
                    </TouchableOpacity>

                </View>
            }


        </SafeAreaView >
    )
}

export default ProductAvailablityPage