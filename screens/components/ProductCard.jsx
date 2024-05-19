import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import useUserDataQuery from '../../hooks/useUserData';


const ProductCard = ({ product }) => {
    const navigation = useNavigation()

    const { data: userData } = useUserDataQuery()
    return (
        
        <TouchableOpacity
            key={product?._id}
            onPress={() => navigation.navigate("ProductDetails", { product: { ...product, price: product?.price?.[userData?.category] } })}
            className='border-gray-100 border-2 px-4 py-4 rounded-2xl'
            style={{ width: responsiveWidth(45) }}>

            <Image
                className="items-center bg-center self-center w-full "
                resizeMode='contain'
                source={{ uri: `${product?.url}` }}
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
                    ₹{product?.price[userData?.category]}
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

export default ProductCard