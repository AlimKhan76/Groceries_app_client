import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { getProductByCategoryAPI } from '../../api/productAPI'
import { IMAGE_URL } from "@env"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import useUserDataQuery from '../../hooks/useUserData'

const AllCategorizedProductScreen = ({ route }) => {
    const navigation = useNavigation();

    const { category } = route.params
    const { data: categorizedProducts, isLoading: loadingProducts } = useQuery({
        queryKey: ["getProductByCategoryAPI", category],
        queryFn: () => getProductByCategoryAPI(category),
        staleTime: Infinity
    })

    const { data: userData } = useUserDataQuery()


    return (
        <SafeAreaView className="bg-white flex-1">
            <Appbar.Header mode='center-aligned' style={{
                backgroundColor: 'white',
                height: responsiveHeight(10),
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
                statusBarHeight={0}>
                <Appbar.BackAction
                    iconColor="black"
                    onPress={() => navigation.goBack()} />
                <Appbar.Content
                    title={category}
                    titleStyle={{
                        fontFamily: "Mulish-Bold",
                        color: "black",
                        fontSize: responsiveFontSize(3),
                    }} />
            </Appbar.Header>
            <Divider />



            <ScrollView
                className=" py-3 my-2.5"
                horizontal={false}   >


                <View className="flex-row flex-wrap gap-2 justify-center pb-8  ">

                    {loadingProducts ?

                        <View className="flex-1 justify-center items-center pt-[50%]">
                            <ActivityIndicator animating={true} size={'large'}
                                color={'#53B175'} />
                        </View>
                        :
                        categorizedProducts?.map((product, index) => {
                            // if (index < 5) {
                                return (
                                    <TouchableOpacity
                                        key={product?._id}
                                        onPress={() => navigation.navigate("ProductDetails", { product: { ...product, price: product?.price?.[userData?.category] } })}
                                        className='border-gray-100 border-2 px-4 py-4 rounded-2xl '
                                        style={{ width: responsiveWidth(45) }}>

                                        <Image
                                            className="items-center bg-center self-center w-full h-24"
                                            resizeMode='contain'
                                            source={{ uri: `${IMAGE_URL}${product?.url}` }} />

                                        <Text
                                            className="pt-2 text-black items-center font-mulish-semibold"
                                            style={{
                                                fontSize: responsiveFontSize(2)
                                            }}>
                                            {product?.title}
                                        </Text>

                                        <Text
                                            className="text-base font-mulish-regular text-slate-500"
                                            style={{
                                                fontSize: responsiveFontSize(1.5)
                                            }}>
                                            {product?.baseQuantity}
                                        </Text>

                                        <View
                                            className="flex-row justify-between pt-3 items-center">
                                            <Text
                                                className="text-black font-mulish-semibold"
                                                style={{
                                                    fontSize: responsiveFontSize(2)
                                                }}>
                                                ₹{product?.price?.[userData?.category]}
                                            </Text>

                                            <View
                                                className="bg-[#53B175] rounded-2xl p-3 text-center">
                                                <Feather
                                                    name="chevron-right"
                                                    color="white" size={responsiveHeight(2.5)} />
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                )
                            // }
                            // else {
                            //     return null
                            // }
                        })
                    }



                </View>
            </ScrollView>



        </SafeAreaView>
    )
}

export default AllCategorizedProductScreen