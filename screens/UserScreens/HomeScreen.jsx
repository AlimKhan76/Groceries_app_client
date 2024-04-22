import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { useQuery } from '@tanstack/react-query';
import { getBestSellingProducts } from '../../api/productAPI';
import { getUserData } from '../../api/userAPI';
import { IMAGE_URL } from '@env';
import { ActivityIndicator } from 'react-native-paper';
import Feather from "react-native-vector-icons/Feather"

const HomeScreen = ({ navigation }) => {

    const {
        data: bestSellingProducts,
        isLoading: loadingProducts,
        isError,
        refetch
    } = useQuery({
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

            <View className=" justify-center items-center "
                style={{ marginVertical: responsiveHeight(2.5) }}>
                <Image
                    resizeMode='contain'
                    style={{
                        width: responsiveWidth(10),
                        height: responsiveHeight(7),
                    }}
                    source={require("../../assets/images/logo-colour.png")} />
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("Explore")}
                activeOpacity={0.8}
                className='bg-gray-200 mx-6 my-3.5 rounded-2xl flex-row items-center px-2.5 py-3.5 '>

                <Feather name="search" color="black" size={responsiveHeight(2.5)} />
                <Text
                    className="font-mulish-semibold text-black px-2"
                    style={{
                        fontSize: responsiveFontSize(1.85)
                    }}>
                    Search Store
                </Text>
            </TouchableOpacity>

            <ScrollView
                horizontal={false}>

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

                    <View className='flex-row px-6 py-1 w-full justify-between'>
                        <Text className="text-black font-mulish-semibold"
                            style={{ fontSize: responsiveFontSize(2.10) }}>
                            Best Selling Products
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("CategoryProducts", {
                                category: "Best-Selling"
                            })}>
                            <Text
                                className='text-[#53B175] font-mulish-semibold '
                                style={{ fontSize: responsiveFontSize(2.10) }}>
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
                                        fontSize: responsiveFontSize(2)
                                    }}>
                                    Products cannot be fetched, {"\n"}
                                    Please try again later
                                </Text>
                                <TouchableOpacity
                                    disabled={loadingProducts}
                                    onPress={refetch}
                                    className="border-2 px-5 py-3 m-2 items-center border-gray-300 rounded-2xl">
                                    <Text className="text-black font-mulish-semibold"
                                        style={{
                                            fontSize: responsiveFontSize(2)
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
                                                style={{ fontSize: responsiveFontSize(2) }}>
                                                {product?.title}
                                            </Text>
                                            <Text
                                                className=" font-mulish-medium text-slate-500"
                                                style={{ fontSize: responsiveFontSize(1.5) }}>
                                                {product?.baseQuantity}
                                            </Text>

                                            <View
                                                className="flex-row justify-between pt-3 items-center">
                                                <Text
                                                    className="text-black font-mulish-bold"
                                                    style={{ fontSize: responsiveFontSize(1.85) }}>
                                                    ₹{product?.price}
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
                                }
                                else {
                                    return null;
                                }
                            })
                    }

                    {!isError && !loadingProducts &&
                        <TouchableOpacity
                            onPress={() => navigation.navigate("CategoryProducts", { category: "Best-Selling" })}
                            className='border-gray-100 border-2 px-4 py-4 rounded-2xl justify-center items-center'
                            style={{ width: responsiveWidth(45) }}>

                            <View
                                className="flex-row justify-between py-5 items-center">
                                <Text
                                    className="text-black font-mulish-semibold text-center"
                                    style={{ fontSize: responsiveFontSize(2.25) }}>
                                    View All Best Selling Products
                                </Text>
                            </View>
                            <View
                                className="bg-[#53B175] rounded-2xl p-4 text-center items-center">
                                <Feather
                                    name="chevron-right"
                                    color="white" size={responsiveHeight(3)} />
                            </View>
                        </TouchableOpacity>
                    }

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen