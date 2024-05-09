import { View, Text, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import Entypo from "react-native-vector-icons/Entypo"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPriceCategoryAPI, deletePriceCategoryAPI, renamePriceCategoryAPI, fetchAllPriceCategoryAPI } from '../../api/adminAPIs/userCategoryAPI'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Modal from 'react-native-modal';
import { Dialog } from 'react-native-alert-notification'

const AllCategoryOfCustomersScreen = () => {
    const navigation = useNavigation()

    const queryClient = useQueryClient()
    const [visible, setVisible] = useState(null);

    const [editableCategoryData, setEditableCategoryData] = useState({
        oldCategoryName: "",
        newCategoryName: ""
    })
    const [editModalVisible, setEditModalVisible] = useState(false)

    const [newCategoryName, setNewCategoryName] = useState("")
    const [addModalVisible, setAddModalVisible] = useState(false)

    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [toBeDeletedCategory, setToBeDeletedCategory] = useState("")



    const { data: categories,
        isLoading: isLoadingAllCategories,
        isRefetching: isRefetchingAllCategories } = useQuery({
            queryKey: ["priceCategory"],
            queryFn: fetchAllPriceCategoryAPI,
            staleTime: Infinity
        })

    const { mutate: deleteCategory, isPending: isPendingForDeletingCategory } = useMutation({
        mutationFn: deletePriceCategoryAPI,
        onSuccess: () => {
            setDeleteModalVisible(false)
            setToBeDeletedCategory("")
            queryClient.invalidateQueries({ queryKey: ["priceCategory"] })
        },
        onError: () => {
            Dialog.show({
                type: "DANGER",
                title: "Error in Deleting Category",
                textBody: "Please try again later",
                autoClose: 1000
            })
        }

    })


    const { mutate: addCategory,
        isPending: isPendingForAddingCategory,
        error } = useMutation({
            mutationFn: addPriceCategoryAPI,
            onSuccess: () => {
                setAddModalVisible(false)
                setNewCategoryName("")
                queryClient.invalidateQueries({ queryKey: ["priceCategory"] })
            },
            onError: (error) => {
                Dialog.show({
                    type: "DANGER",
                    title: "Error in Adding Category",
                    textBody: error + " Please try again later",
                    autoClose: 1000
                })
            }

        })

    const { mutate: editCategory,
        isPending: isPendingForEditingCategory } = useMutation({
            mutationFn: renamePriceCategoryAPI,
            onSuccess: () => {
                setEditModalVisible(false)
                setNewCategoryName("")
                queryClient.invalidateQueries({ queryKey: ["priceCategory"] })
            },
            onError: (error) => {
                console.log(error)
                Dialog.show({
                    type: "DANGER",
                    title: "Error in Editing Category",
                    textBody: error?.message + " Please try again later",
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
                    title="Category"
                    titleStyle={{
                        flexWrap: 'wrap',
                        fontFamily: "Mulish-SemiBold",
                        color: "black",
                        fontSize: responsiveFontSize(3),
                    }} />
            </Appbar.Header>
            <Divider />

            {isLoadingAllCategories || isRefetchingAllCategories ?
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size={"large"} color='#419a79' />
                </View>
                :
                <ScrollView className="m-5">
                    {Object.keys(categories?.price).map((category, index) => {
                        return (
                            <View
                                key={index}
                                className="flex-row justify-between items-center py-2 ">
                                <Text className="text-black font-mulish-semibold" style={{
                                    fontSize: responsiveFontSize(2)
                                }}>
                                    {index + 1}.
                                </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("UpdateProduct", category)}

                                    className="border-2 border-gray-200 rounded-2xl justify-center items-center w-3/4 py-3.5">
                                    <Text className="text-black font-mulish-semibold text-center"
                                        style={{
                                            fontSize: responsiveFontSize(2)
                                        }}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>

                                <Menu
                                    visible={visible === category ? true : false}
                                    anchor={
                                        <TouchableOpacity
                                            onPress={() => setVisible(category)}
                                            className=""
                                            hitSlop={20}>
                                            <Entypo name="dots-three-vertical" size={responsiveHeight(2)} color="black" />
                                        </TouchableOpacity>
                                    }
                                    onRequestClose={() => setVisible(null)}>

                                    <MenuItem onPress={() => {
                                        setVisible(null)
                                        setEditModalVisible(true)
                                        setEditableCategoryData({
                                            ...editableCategoryData,
                                            oldCategoryName: category
                                        })
                                    }}>
                                        <Text className="text-black">Edit</Text>
                                    </MenuItem>

                                    <MenuDivider />
                                    <MenuItem onPress={() => {
                                        setDeleteModalVisible(true)
                                        setVisible(null)
                                        setToBeDeletedCategory(category)
                                    }}>
                                        <Text className="text-black">Delete</Text>
                                    </MenuItem>
                                </Menu>




                            </View>
                        )
                    })}



                    <View className="flex-row justify-center items-center py-2">
                        <Text className="text-black" style={{
                            fontSize: responsiveFontSize(2)
                        }}>

                        </Text>
                        <TouchableOpacity
                            onPress={() => setAddModalVisible(true)}
                            className="border-2 border-gray-200 rounded-2xl justify-center items-center w-3/4 py-3.5">
                            <AntDesign name="pluscircleo" size={responsiveHeight(2.5)} color="black" />
                        </TouchableOpacity>
                    </View>



                </ScrollView>
            }


            <Modal
                testID={'modalForAddingCategory'}
                animationIn={"slideInUp"}
                animationOut={"slideOutDown"}
                animationOutTiming={1000}
                animationInTiming={700}
                hideModalContentWhileAnimating
                backdropTransitionOutTiming={0}
                onBackButtonPress={() => {
                    Keyboard.dismiss()
                    setAddModalVisible(false)
                    setNewCategoryName("")
                }}
                isVisible={addModalVisible}
                onSwipeComplete={() => {
                    Keyboard.dismiss()
                    setAddModalVisible(false)
                    setNewCategoryName("")
                }}
                swipeDirection={['down']}
                style={{ justifyContent: "flex-end", margin: 0 }}>


                <KeyboardAvoidingView behavior="padding" className="bg-white px-2">

                    <View className="bg-gray-300 w-1/6 h-2 self-center rounded-3xl m-1">
                    </View>

                    <View className="py-5 items-center gap-y-3">
                        <Text className="text-black font-mulish-bold text-center "
                            style={{
                                fontSize: responsiveFontSize(2.5)
                            }}>
                            Enter New Category Name
                        </Text>


                        <TextInput
                            value={newCategoryName}
                            onChangeText={(e) => setNewCategoryName(e)}
                            placeholder=''
                            className="border-2 border-gray-300 w-3/4 rounded-2xl justify-center items-center flex-row text-black text-center"
                            style={{
                                fontSize: responsiveFontSize(2.25)
                            }} />
                    </View>



                    <TouchableOpacity
                        disabled={isPendingForAddingCategory || newCategoryName === "" && true}
                        onPress={() => {
                            Keyboard.dismiss()
                            addCategory(newCategoryName)
                        }}
                        className="bg-black p-5 items-center rounded-2xl m-5 ">
                        {isPendingForAddingCategory ?
                            <ActivityIndicator color='white' />
                            :
                            <Text className="text-white text-center font-mulish-semibold"
                                style={{
                                    fontSize: responsiveFontSize(2.25)
                                }}>
                                ADD
                            </Text>
                        }
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>


            <Modal testID={'modelForEditing'}
                animationIn={"slideInUp"}
                animationOut={"slideOutDown"}
                animationOutTiming={1000}
                animationInTiming={700}
                hideModalContentWhileAnimating
                backdropTransitionOutTiming={0}
                isVisible={editModalVisible}>

                <View className=" flex-1 justify-center flex-col ">

                    <View className=" bg-white rounded-3xl p-5 items-center justify-center  ">
                        <Text className="text-black font-mulish-semibold text-center w-3/4 mb-3"
                            style={{
                                fontSize: responsiveFontSize(2.25)
                            }}>
                            Enter New Name for {editableCategoryData?.oldCategoryName}
                        </Text>

                        <TextInput
                            value={editableCategoryData?.newCategoryName}
                            onChangeText={(e) => setEditableCategoryData({
                                ...editableCategoryData, newCategoryName: e
                            })}

                            className="border-2 border-gray-300 w-3/4 rounded-2xl justify-center items-center flex-row text-black text-center"
                            style={{
                                fontSize: responsiveFontSize(2)
                            }} />

                        <View className="flex-row justify-between w-3/4 mt-4">


                            <TouchableOpacity
                                disabled={isPendingForEditingCategory || editableCategoryData?.newCategoryName === "" && true}
                                onPress={() => {
                                    Keyboard.dismiss()
                                    editCategory(editableCategoryData)
                                }}
                                className={`${isPendingForEditingCategory || editableCategoryData?.newCategoryName === "" ? "opacity-60" : "opacity-100"} 
                                bg-[#419a79] items-center px-5 py-4 rounded-xl`}>
                                {isPendingForEditingCategory ?
                                    <ActivityIndicator color='white' className="px-1" />
                                    :
                                    <Text className="text-white font-mulish-semibold"
                                        style={{
                                            fontSize: responsiveFontSize(2)
                                        }}>
                                        Edit
                                    </Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    Keyboard.dismiss()
                                    setEditableCategoryData({ oldCategoryName: "", newCategoryName: "" })
                                    setEditModalVisible(false)
                                }}
                                className="bg-red-400 py-4 px-4 rounded-xl">
                                <Text className="text-white font-mulish-semibold" style={{
                                    fontSize: responsiveFontSize(2)
                                }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>


            </Modal>

            {/* Modal for delete confirmation */}
            <Modal testID={'modelForDeleting'}
                animationIn={"slideInUp"}
                animationOut={"slideOutDown"}
                animationOutTiming={1000}
                animationInTiming={700}
                hideModalContentWhileAnimating
                backdropTransitionOutTiming={0}
                isVisible={deleteModalVisible}>

                <View className=" flex-1 justify-center flex-col ">

                    <View className=" bg-white rounded-3xl p-5 items-center justify-center ">
                        <Text className="text-black font-mulish-semibold text-center" style={{
                            fontSize: responsiveFontSize(2.25)
                        }}>
                            Delete {toBeDeletedCategory} ?
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


            </Modal>
        </SafeAreaView >
    )
}

export default AllCategoryOfCustomersScreen