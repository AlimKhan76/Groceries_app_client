import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
// import Plus from "../../assets/icons/commons/plus.svg"
import RightArrow from "../../assets/icons/account/right_arrow.svg"
import Search from "../../assets/icons/commons/search.svg"
import AddedToCartPopUp from '../components/AddedToCartPopUp';
import { useQuery } from '@tanstack/react-query';
import { getBestSellingProducts } from '../../api/productAPI';
import { getUserData } from '../../api/userAPI';
import { IMAGE_URL } from '@env';
import { ActivityIndicator } from 'react-native-paper';
import { useNetInfoInstance } from "@react-native-community/netinfo";
import { moderateScale } from 'react-native-size-matters';
// import fs from 'fs';


const HomeScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)


    const { data: bestSellingProducts,
        isLoading: loadingProducts,
        isError,
        error,
        refetch } = useQuery({
            queryKey: ["bestSellingProduct"],
            queryFn: getBestSellingProducts,
            enabled: true,
            staleTime: Infinity
        })

    const { data: userData } = useQuery({
        queryKey: ['userData'],
        queryFn: getUserData,
        staleTime: Infinity,
    })


    return (
        <SafeAreaView className=' bg-white flex-1 '
            edges={['right', 'top', 'left']}>

            {/* { true ?
                <AddedToCartPopUp visible={true} />
                :
                <></>
            } */}
            <View className=" justify-center items-center "
                style={{ marginVertical: responsiveHeight(2.5) }}>
                <Image
                    resizeMode='contain'
                    style={{
                        width: responsiveWidth(10),
                        height: responsiveHeight(7),
                    }}
                    source={require("../../assets/images/logo-colour.png")} />
                {/* <View className="py-2 flex-row items-center ">
                    <Location />
                    <Text className="text-xl px-2 text-black font-mulishsb">
                        Parel, Mumbai
                    </Text>
                </View> */}
            </View>
            <View
                className='bg-gray-200 mx-6 my-3 rounded-2xl px-3 flex-row items-center'
                style={{

                }}>
                <Search />
                <TouchableOpacity
                    onPress={() => navigation.navigate("Explore", { fromHome: true })}
                    className='px-2.5 py-3.5 w-full '>
                    <Text
                        className=" text-base font-mulish-semibold  text-black">
                        Search Store
                    </Text>

                </TouchableOpacity>

            </View>

            <ScrollView
                className="  "
                horizontal={false}   >


                <View className="flex-row flex-wrap gap-2 justify-center  "
                    style={{ paddingBottom: responsiveHeight(2.5) }}>
                    <View className="items-center pb-2 ">
                        <Image source={require("../../assets/images/home_screen/banner.png")}
                            resizeMode='contain'
                            style={{
                                width: responsiveWidth(95),
                                borderColor: "#53B175",
                                borderWidth: 1.5,
                                borderRadius: 20,

                            }}
                        />
                    </View>

                    <View className='flex-row  px-6 py-1 w-full justify-between'>
                        <Text className="text-black font-mulish-semibold"
                            style={{ fontSize: responsiveFontSize(2.2) }}>
                            Best Selling Products
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("CategoryProducts", {
                                category: "Best-Selling"
                            })}>
                            <Text
                                className='text-[#53B175] '
                                style={{ fontSize: responsiveFontSize(2.2) }}>
                                View All
                            </Text>

                        </TouchableOpacity>
                    </View>

                    {loadingProducts ?


                        <View className="flex-1 justify-center items-center pt-32">
                            <ActivityIndicator animating={true} size={'large'}
                                color={'#53B175'} />
                        </View>
                        :
                        isError ?
                            <View className="flex-1 justify-center items-center pt-32  ">
                                <Text className="text-black font-mulish-semibold text-center"
                                    style={{
                                        fontSize: moderateScale(15)
                                    }}>
                                    Products cannot be fetched, {"\n"}
                                    Please try again later
                                </Text>
                                <TouchableOpacity
                                    onPress={refetch}
                                    className="border-2 p-2.5 m-2 border-gray-300 rounded-2xl"
                                >
                                    <Text className="text-black font-mulish-semibold"
                                        style={{
                                            fontSize: moderateScale(15)
                                        }}>
                                        Retry
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            bestSellingProducts?.map((product, index) => {
                                if (index < 5) {
                                    return (
                                        <TouchableOpacity
                                            key={product?._id}
                                            onPress={() => navigation.navigate("ProductDetails", { product })}
                                            className='border-gray-100 border-2 px-4 py-4 rounded-2xl'
                                            style={{ width: responsiveWidth(45) }}>

                                            <Image
                                                className="items-center bg-center self-center w-full "
                                                resizeMode='contain'
                                                source={{ uri: `${IMAGE_URL}${product?.url}` }}
                                                style={{ height: responsiveHeight(15) }} />

                                            <Text
                                                className="pt-2 text-black items-center font-mulish-bold "
                                                style={{ fontSize: responsiveFontSize(2) }}
                                            >
                                                {product?.title}
                                            </Text>
                                            <Text
                                                className=" font-mulish-medium text-slate-500"
                                                style={{ fontSize: responsiveFontSize(1.5) }}
                                            >
                                                {product?.baseQuantity}
                                            </Text>

                                            <View
                                                className="flex-row justify-between pt-3 items-center">
                                                <Text
                                                    className="text-black font-mulish-bold"
                                                    style={{ fontSize: responsiveFontSize(2) }}
                                                >
                                                    ₹{product?.price}
                                                </Text>

                                                <View
                                                    // onPress={() => setModalVisible(true)}
                                                    className="bg-[#53B175] rounded-2xl p-4 text-center">
                                                    <RightArrow style={{ color: "white" }} />
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                                else {
                                    return null;
                                }
                            })



                    }

                    {!loadingProducts || isError &&
                        <TouchableOpacity
                            onPress={() => navigation.navigate("CategoryProducts", { category: "Best-Selling" })}
                            className='border-gray-100 border-2 px-4 py-4 rounded-2xl justify-center items-center'
                            style={{ width: responsiveWidth(45) }}>


                            <View
                                className="flex-row justify-between py-5 items-center">
                                <Text
                                    className="text-black font-mulish-bold text-center"
                                    style={{ fontSize: responsiveFontSize(2.5) }}>
                                    View All Best Selling Products
                                </Text>
                            </View>
                            <View
                                className="bg-[#53B175] rounded-2xl p-5 text-center items-center">
                                <RightArrow style={{ color: "white" }} />
                            </View>
                        </TouchableOpacity>
                    }

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen