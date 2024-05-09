import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import useUserDataQuery from '../../hooks/useUserData'
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteAddressAPI, getUserAddressAPI } from '../../api/addressAPI'
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu'
import Entypo from "react-native-vector-icons/Entypo"
import AntDesign from "react-native-vector-icons/AntDesign"
import ReactNativeModal from 'react-native-modal'
import { Dialog } from 'react-native-alert-notification'

const UserAddressesScreen = () => {
    const navigation = useNavigation()
    const [visible, setVisible] = useState("")
    const { data: userData } = useUserDataQuery()
    const queryClient = useQueryClient()

    const { data: userAddress,
        isLoading: isLoadingAllAddresses,
        isRefetching: isRefetchingAllAddresses
    } = useQuery({
        queryKey: ['userAddresses'],
        queryFn: getUserAddressAPI,
        staleTime: Infinity
    })

    const { mutate: deleteAddress } = useMutation({
        mutationFn: deleteAddressAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userAddresses"] })
            Dialog.show({
                type: "SUCCESS",
                title: "Address Deleted",
                autoClose: 1000
            })
        },
        onError: (error) => {
            Dialog.show({
                type: "DANGER",
                title: "Address Cannot Deleted",
                autoClose: 1000

            })
        }
    })


    return (
        <SafeAreaView className="flex-1 bg-white"
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
                    title="Addresses"
                    titleStyle={{
                        flexWrap: 'wrap',
                        fontFamily: "Mulish-SemiBold",
                        color: "black",
                        fontSize: responsiveFontSize(3),
                    }} />
            </Appbar.Header>
            <Divider />
            {console.log(userAddress)}
            {isLoadingAllAddresses || isRefetchingAllAddresses ?
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size={"large"} color='#419a79' />
                </View>
                :
                <ScrollView className="m-5">
                    {userAddress?.address?.map((address, index) => {
                        return (
                            <View
                                key={index}
                                className="flex-row justify-between items-center py-2 ">
                                <Text className="text-black font-mulish-semibold"
                                    style={{
                                        fontSize: responsiveFontSize(2)
                                    }}>
                                    {index + 1}.
                                </Text>

                                <View
                                    className="border-2 border-gray-200 rounded-2xl justify-center items-center w-3/4 py-3.5 px-2">
                                    <Text className="text-black font-mulish-medium text-center"
                                        style={{
                                            fontSize: responsiveFontSize(1.75)
                                        }}>
                                        {address?.line1 + "\n"}
                                        {address?.line2 + "\n"}
                                        {"Pincode : " + address?.pincode + (address?.landmark?.length ? "\n" : "")}
                                        {address?.landmark.length > 0 &&
                                            "Landmark : " + address?.landmark}
                                    </Text>
                                </View>

                                <Menu
                                    visible={visible === index ? true : false}
                                    anchor={
                                        <TouchableOpacity
                                            onPress={() => setVisible(index)}
                                            className=""
                                            hitSlop={20}>
                                            <Entypo name="dots-three-vertical" size={responsiveHeight(2)} color="black" />
                                        </TouchableOpacity>
                                    }
                                    onRequestClose={() => setVisible(null)}>

                                    <MenuItem className="items-center"
                                        onPress={() => {
                                            setVisible(null)
                                            // setEditModalVisible(true)
                                            navigation.navigate("AddAddress", address)
                                            // setEditableCategoryData({
                                            //     ...editableCategoryData,
                                            //     oldCategoryName: category
                                            // })
                                        }}>
                                        <Text className="text-black font-mulish-medium">
                                            Edit
                                        </Text>
                                    </MenuItem>

                                    <MenuDivider />
                                    <MenuItem className="items-center"
                                        onPress={() => {
                                            deleteAddress(address)
                                            // setDeleteModalVisible(true)
                                            setVisible(null)
                                            // setToBeDeletedCategory(category)
                                        }}>
                                        <Text
                                            className="text-black font-mulish-medium ">
                                            Delete
                                        </Text>
                                    </MenuItem>
                                </Menu>


                            </View>
                        )
                    })}



                    <View className="flex-row justify-center items-center py-2">
                        <Text className="text-black"
                            style={{
                                fontSize: responsiveFontSize(2)
                            }}>

                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("AddAddress")}
                            className="border-2 border-gray-200 rounded-2xl justify-center items-center w-3/4 py-3.5">
                            <AntDesign name="pluscircleo" size={responsiveHeight(2.5)} color="black" />
                        </TouchableOpacity>
                    </View>



                </ScrollView>
            }



            {/* Modal for delete confirmation */}
            {/* <ReactNativeModal testID={'modelForDeleting'}
                animationIn={"slideInUp"}
                animationOut={"slideOutDown"}
                animationOutTiming={1000}
                animationInTiming={700}
                hideModalContentWhileAnimating
                backdropTransitionOutTiming={0}
                isVisible={deleteModalVisible}>

                <View className=" flex-1 justify-center flex-col ">

                    <View className=" bg-white rounded-3xl p-5 items-center justify-center ">
                        <Text className="text-black font-mulish-semibold text-center"
                         style={{
                            fontSize: responsiveFontSize(2.25)
                        }}>
                            Delete 
                            {toBeDeletedCategory} ?
                        </Text>

                        <View className="flex-row justify-between w-3/4 mt-4">


                            <TouchableOpacity
                                disabled={isPendingForDeletingCategory}
                                onPress={() => {
                                    deleteCategory(toBeDeletedCategory)
                                }}
                                className="bg-[#419a79] p-4  rounded-xl">
                                {isPendingForDeletingCategory ?
                                    <ActivityIndicator color='white' className="px-2" />
                                    :
                                    <Text className="text-white font-mulish-semibold"
                                        style={{
                                            fontSize: responsiveFontSize(2)
                                        }}>
                                        Delete
                                    </Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setToBeDeletedCategory("")
                                    setDeleteModalVisible(false)
                                }}
                                className="bg-red-400 p-4 rounded-xl">
                                <Text className="text-white font-mulish-semibold" style={{
                                    fontSize: responsiveFontSize(2)
                                }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>


            </ReactNativeModal> */}
        </SafeAreaView >
    )
}

export default UserAddressesScreen