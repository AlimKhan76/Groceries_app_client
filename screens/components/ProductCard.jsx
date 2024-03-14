import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
const image = require('../../assets/images/products/fruits/apple.png')

const ProductCard = () => {
    return (
        <>
                <View
            className='border-gray-300 border-2 px-5 py-4 rounded-xl'>
            <Image className="items-center bg-center self-center w-24 h-24"
                resizeMode='contain'
                source={image} />
            <Text
                className="font-bold py-2
                         text-black text-lg items-center">
                Organic Bananas
            </Text>
            <Text className="text-base">1kg</Text>
            <View className="flex-row justify-between pt-3 items-center">
                <Text className="text-black text-2xl font-bold">₹400</Text>
                <TouchableOpacity className="bg-green-300  rounded-2xl p-3">
                    <Text>Buy</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>

    )
}

export default ProductCard