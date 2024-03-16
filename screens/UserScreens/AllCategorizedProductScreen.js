import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { getcategorizedProducts, getProductByCategory } from '../../api/productAPI'
import { BASE_URL } from "@env"
import { IMAGE_URL } from "@env"
import RightArrow from "../../assets/icons/account/right_arrow.svg"
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'


const AllCategorizedProductScreen = ({ route }) => {
    const navigation = useNavigation();
    // const { data: categorizedProducts, isLoading: loadingProducts } = useQuery({
    //     queryKey: ["bestSellingProduct"],
    //     queryFn: getcategorizedProducts,
    //     enabled: true,
    //     staleTime: Infinity
    // })

    const { category } = route.params
    const { data: categorizedProducts, isLoading: loadingProducts } = useQuery({
        queryKey: ["getProductByCategory", category],
        queryFn: () => getProductByCategory(category),
        staleTime: Infinity
    })



    return (
        <SafeAreaView className="bg-white flex-1">
            <Appbar.Header mode='center-aligned' style={{
                backgroundColor: 'white',
                height: responsiveHeight(10),
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}>
                {/* {console.log(products)} */}
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
                className=" py-3 "
                horizontal={false}   >


                <View className="flex-row flex-wrap gap-2 justify-center pb-8 ">

                    {loadingProducts ?

                        <View className="flex-1 justify-center items-center pt-32">
                            <ActivityIndicator animating={true} size={'large'}
                                color={'#53B175'} />
                        </View>
                        :
                        categorizedProducts?.map((product, index) => {
                            if (index < 5) {
                                return (
                                    <TouchableOpacity
                                        key={product?._id}
                                        onPress={() => navigation.navigate("ProductDetails", { product })}
                                        className='border-gray-100 border-2 px-4 py-4 rounded-2xl w-44'>

                                        <Image
                                            className="items-center bg-center self-center w-full h-24"
                                            resizeMode='contain'
                                            source={{ uri: `${IMAGE_URL}${product?.url}` }} />

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

export default AllCategorizedProductScreen