import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { Fragment, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAllPriceCategoryAPI, fetchAllUserCategoryDetails, updateUserCategoryAPI } from '../../api/adminAPIs/userCategoryAPI'
import { Dropdown } from 'react-native-element-dropdown'
import { Dialog } from 'react-native-alert-notification'


const UserCategoryUpdationScreen = () => {
    const navigation = useNavigation()
    const [updatedCategoryCustomer, setUpdatedCategoryCustomer] = useState([]);
    const queryClient = useQueryClient()


    const { data: userCategoryDetails,
        isLoading: isLoadingUserCategoryDetails,
        isRefetching: isRefetchingUserCategoryDetails
    } = useQuery({
        queryKey: ["userCategoryDetails"],
        queryFn: fetchAllUserCategoryDetails,
        staleTime: Infinity,
    })

    const { data: categories,
        isLoading: isLoadingAllCategories,
        isRefetching: isRefetchingAllCategories } = useQuery({
            queryKey: ["priceCategory"],
            queryFn: fetchAllPriceCategoryAPI,
            staleTime: Infinity
        })

    const {
        mutate: updatingCategory,
        isPending: isPendingUpdation,
    }
        = useMutation({
            mutationFn: updateUserCategoryAPI,
            onSuccess: () => {
                setUpdatedCategoryCustomer([])
                queryClient.invalidateQueries(["userCategoryDetails"])
                Dialog.show({
                    type: "SUCCESS",
                    title: "Categories updated",
                    autoClose: 1000,
                })
            },
            onError: () => {
                Dialog.show({
                    type: "DANGER",
                    title: "Categories Cannot be updated",
                    autoClose: 1000,
                })
            }
        })



    const updateCustomerState = (newCustomer) => {
        // Check if the new object's ID is already present in the array
        const index = updatedCategoryCustomer.findIndex(item => item?.customerId === newCustomer.customerId);

        // If the ID is not present, add the new object to the array
        if (index === -1) {
            setUpdatedCategoryCustomer(prevState => [...prevState, newCustomer]);
        } else {
            // If the ID is present, update the object in the array
            setUpdatedCategoryCustomer(prevState => {
                const newArray = [...prevState];
                newArray[index] = newCustomer;
                return newArray;
            });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">

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
                    title="Categories "
                    titleStyle={{
                        fontFamily: "Mulish-SemiBold",
                        color: "black",
                        fontSize: responsiveFontSize(3),
                    }} />
            </Appbar.Header>
            <Divider />


            {isLoadingUserCategoryDetails || isRefetchingUserCategoryDetails ||
                isLoadingAllCategories || isRefetchingAllCategories ?
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator color='#419a79' size={"large"} />
                </View>
                :
                userCategoryDetails?.length > 0
                    ?
                    <ScrollView className="px-2 my-2 flex-1">

                        {userCategoryDetails?.map((customer) => {
                            return (
                                <Fragment key={customer?._id}>
                                    <View
                                        className="py-3 px-3 my-1 flex-row items-center rounded-2xl justify-between   ">

                                        <View className="flex-row items-center gap-x-4 flex-1">

                                            <View
                                                style={{ width: responsiveWidth(50) }} >
                                                <Text
                                                    className="text-black font-mulish-semibold flex-wrap"
                                                    style={{
                                                        fontSize: responsiveFontSize(2.15)
                                                    }}>
                                                    {customer?.name}
                                                </Text>

                                                <Text
                                                    className="text-black font-mulish-semibold"
                                                    style={{
                                                        fontSize: responsiveFontSize(1.5)
                                                    }}>
                                                    Contact No: {customer?.contactNo}
                                                </Text>
                                            </View>

                                        </View>


                                        <Dropdown
                                            style={{
                                                width: responsiveWidth(40)
                                            }}
                                            className="p-2 ml-2 items-center justify-center
                                             text-black border-2 border-gray-300 rounded-xl"
                                            selectedTextStyle={{
                                                color: "black",
                                                textAlign: "center",
                                                fontFamily: "Mulish-Medium"
                                            }}
                                            placeholderStyle={{
                                                color: "gray",
                                                verticalAlign: "middle",
                                                height: responsiveHeight(5),
                                                textAlign: "center",
                                                fontFamily: "Mulish-Medium"

                                            }}
                                            itemTextStyle={{
                                                color: "black",
                                                textAlign: "center",
                                                fontFamily: "Mulish-Medium"
                                            }}
                                            data={
                                                Object.keys(categories?.price).map((category, index) =>
                                                ({
                                                    label: category,
                                                    value: category
                                                }))
                                            }
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={customer?.category}
                                            value={updatedCategoryCustomer?.filter(cus => cus.customerId === customer?._id)[0]?.category}
                                            onChange={item => {
                                                updateCustomerState({
                                                    customerId: customer?._id,
                                                    category: item.value
                                                })
                                            }}
                                        />

                                    </View>
                                    <Divider />


                                </Fragment>
                            )
                        })}
                    </ScrollView>

                    :
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-black font-mulish-semibold"
                            style={{
                                fontSize: responsiveFontSize(3)
                            }}>
                            No customers
                        </Text>
                    </View>
            }





            {updatedCategoryCustomer?.length > 0 &&
                <View className="bottom-2.5 relative self-center w-full overflow-hidden  ">
                    <TouchableOpacity
                        disabled={isPendingUpdation}
                        onPress={() => updatingCategory(updatedCategoryCustomer)}
                        className="bg-[#53B175] p-5 rounded-3xl flex-row mx-5 items-center justify-center">

                        <Text
                            className=' text-white text-xl font-mulish-semibold flex-wrap text-center'
                            style={{
                                fontSize: responsiveFontSize(2.25)
                            }}>
                            Save
                        </Text>

                        {updatedCategoryCustomer?.length > 0 &&
                            <View className={`right-5 absolute bg-[#489E67] p-1.5 rounded-xl `}>

                                <Text className='text-white font-mulish-semibold px-1'
                                    style={{ fontSize: responsiveFontSize(1.5) }}>
                                    {updatedCategoryCustomer?.length}
                                </Text>
                            </View>
                        }

                    </TouchableOpacity>
                </View>
            }


        </SafeAreaView >
    )
}

export default UserCategoryUpdationScreen