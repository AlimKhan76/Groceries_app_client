import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const CategoriesCard = () => {
    const navigation = useNavigation()
    return (
        <View className="flex-row flex-wrap gap-2 justify-center">
            <TouchableOpacity
                onPress={() => navigation.navigate("ProductDetails")}
                className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}
            >
                <Image className="items-center bg-center self-center "
                    resizeMode='contain'
                    style={{
                        width: responsiveWidth(30),
                    }}
                    source={require("../../assets/images/product_categories/beverages.png")} />
                <Text
                    className="pt-2 text-black text-lg text-center font-mulish-extrabold "
                    style={{ fontSize: responsiveFontSize(2.5) }}
                >
                    Beverages and drinks
                </Text>

            </TouchableOpacity>


            <TouchableOpacity
                // onPress={() => navigation.navigate("ProductDetails")}
                className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}
            >
                <Image className="items-center bg-center self-center "
                    style={{
                        width: responsiveWidth(30),
                    }}
                    resizeMode='contain'
                    source={require("../../assets/images/product_categories/fruits.png")} />
                <Text
                    className="pt-2 text-black text-lg text-center font-mulish-extrabold "
                    style={{ fontSize: responsiveFontSize(2.5) }}
                >
                    Fresh fruits and vegetables
                </Text>

            </TouchableOpacity>


            <TouchableOpacity
                // onPress={() => navigation.navigate("ProductDetails")}
                className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}
            >
                <Image className="items-center bg-center self-center "
                    style={{
                        width: responsiveWidth(30),
                    }}
                    resizeMode='contain'
                    source={require("../../assets/images/product_categories/meat.png")} />
                <Text
                    className="pt-2 text-black text-lg text-center font-mulish-extrabold "
                    style={{ fontSize: responsiveFontSize(2.5) }}
                >
                    Meat
                </Text>

            </TouchableOpacity>



            <TouchableOpacity
                // onPress={() => navigation.navigate("ProductDetails")}
                className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}
            >
                <Image className="items-center bg-center self-center "
                    style={{
                        width: responsiveWidth(30),
                    }}
                    resizeMode='contain'
                    source={require("../../assets/images/product_categories/dairy.png")} />
                <Text
                    className="pt-2 text-black text-center font-mulish-extrabold "
                    style={{ fontSize: responsiveFontSize(2.5) }}>
                    Dairy & Eggs
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                // onPress={() => navigation.navigate("ProductDetails")}
                className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}
            >
                <Image className="items-center bg-center self-center "
                    style={{ width: responsiveWidth(30) }}
                    resizeMode='contain'
                    source={require("../../assets/images/product_categories/oil.png")} />
                <Text
                    className="pt-2 text-black text-center font-mulish-extrabold "
                    style={{ fontSize: responsiveFontSize(2.5) }}>
                    Cooking Oil & Ghee
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                // onPress={() => navigation.navigate("ProductDetails")}
                className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}
            >
                <Image className="items-center bg-center self-center "
                    style={{
                        width: responsiveWidth(30)
                    }}
                    resizeMode='contain'
                    source={require("../../assets/images/product_categories/bakery.png")} />
                <Text
                    className="pt-2 text-black text-center font-mulish-extrabold "
                    style={{ fontSize: responsiveFontSize(2.5) }}>

                    Bakery
                </Text>

            </TouchableOpacity>

        </View>
    )
}

export default CategoriesCard