import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { getBestSellingProducts } from '../../api/productAPI'
import { BASE_URL } from "@env"
import RightArrow from "../../assets/icons/account/right_arrow.svg"


const AllBestSellingProductScreen = () => {
    const navigation = useNavigation();
    const { data: bestSellingProducts, isLoading: loadingProducts } = useQuery({
        queryKey: ["bestSellingProduct"],
        queryFn: getBestSellingProducts,
        enabled: true,
        staleTime: Infinity
    })
    return (
        <SafeAreaView className="bg-white flex-1">

            <Appbar.Header mode='center-aligned' style={{
        backgroundColor: 'white'
      }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Best Selling Products" titleStyle={{
                    fontFamily: "Mulish-SemiBold",
                    color: "black",
                    // fontSize: 25,
                }} />
            </Appbar.Header>
            <Divider bold />



            <ScrollView
                className=" py-3 "
                horizontal={false}   >


                <View className="flex-row flex-wrap gap-2 justify-center pb-8 ">

                    {loadingProducts ?

                        <View className="flex-1 justify-center items-center pt-32">
                            <ActivityIndicator animating={true} size={'large'}
                                color={'#53B175'} />
                        </View>
                        :
                        bestSellingProducts?.map((product, index) => {
                            if (index < 5) {
                                return (
                                    <TouchableOpacity
                                        key={product?._id}
                                        onPress={() => navigation.navigate("ProductDetails", { product })}
                                        className='border-gray-200 border-2 px-4 py-4 rounded-2xl w-44'>

                                        <Image
                                            className="items-center bg-center self-center w-full h-24"
                                            resizeMode='contain'
                                            source={{ uri: `${BASE_URL}${product?.url}` }} />

                                        <Text
                                            className="pt-2 text-black text-lg items-center font-mulish-extrabold ">
                                            {product?.title}
                                        </Text>

                                        <Text
                                            className="text-base font-mulish-medium text-slate-500">
                                            {product?.baseQuantity}
                                        </Text>

                                        <View
                                            className="flex-row justify-between pt-3 items-center">
                                            <Text
                                                className="text-black text-lg font-mulish-extrabold">
                                                ₹{product?.price}
                                            </Text>

                                            <View
                                                className="bg-[#53B175] rounded-2xl p-4  text-center">
                                                <RightArrow style={{ color: "white" }} />
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                            else {
                                return null
                            }
                        })
                    }



                </View>
            </ScrollView>



        </SafeAreaView>
    )
}

export default AllBestSellingProductScreen