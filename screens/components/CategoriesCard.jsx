import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'


const CategoriesCard = () => {

    const navigation = useNavigation()
    return (
        <View className="flex-row flex-wrap gap-2 justify-center pb-5">
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("CategoryProducts", {
                        category: "Indian Vegetables"
                    })
                }}
                className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}>
                <Image className="items-center bg-center self-center "
                    resizeMode='contain'
                    style={{
                        height: responsiveHeight(15),
                        width: responsiveWidth(40),
                    }}
                    source={require("../../assets/images/product_categories/everydayNeeds.png")} />
                <Text
                    className="pt-2 text-black text-center font-mulish-bold "
                    style={{ fontSize: responsiveFontSize(2.5) }}>
                    Indian Vegetables
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("CategoryProducts", {
                        category: "Leafy Vegetables"
                    })
                }}
                className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}
            >
                <Image className="items-center bg-center self-center  "
                    style={{
                        height: responsiveHeight(15),
                        width: responsiveWidth(55),
                    }}
                    resizeMode='contain'
                    source={require("../../assets/images/product_categories/leafyVegetables.png")} />
                <Text
                    className="pt-2 text-black text-lg text-center font-mulish-bold "
                    style={{ fontSize: responsiveFontSize(2.5) }}>
                    Leafy Vegetables
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => navigation.navigate("CategoryProducts", {
                    category: "Exotic Vegetables"
                })}
                className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}
            >
                <Image className="items-center bg-center self-center "
                    style={{
                        height: responsiveHeight(15),
                        width: responsiveWidth(35),
                    }}
                    resizeMode='cover'
                    source={require("../../assets/images/product_categories/exoticVegetables.png")} />
                <Text
                    className="pt-2 text-black text-lg text-center font-mulish-bold "
                    style={{ fontSize: responsiveFontSize(2.5) }}
                >
                    Exotic Vegetables
                </Text>

            </TouchableOpacity>



            <TouchableOpacity
                onPress={() => navigation.navigate("CategoryProducts", {
                    category: "Fruits"
                })
                }
                className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}
            >
                <Image className="items-center bg-center self-center "
                    style={{
                        height: responsiveHeight(15),
                        width: responsiveWidth(35),
                    }}
                    resizeMode='cover'
                    source={require("../../assets/images/product_categories/fruits.png")} />
                <Text
                    className="pt-2 text-black text-center font-mulish-bold "
                    style={{ fontSize: responsiveFontSize(2.5) }}>
                    Fruits
                </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
                onPress={() => navigation.navigate("CategoryProducts", {
                    category: "Herbs & Spices"
                })
                } className='border-gray-200 border-2 px-4 py-4 rounded-2xl justify-center bg-green-100 '
                style={{
                    width: responsiveWidth(45),
                    height: responsiveHeight(30)
                }}
            >
                <Image className="items-center bg-center self-center "
                    style={{
                        width: responsiveWidth(35),
                        height: responsiveHeight(18)
                    }}
                    resizeMode='cover'
                    source={require("../../assets/images/product_categories/fruits.png")} />
                <Text
                    className="pt-2 text-black text-center font-mulish-bold "
                    style={{ fontSize: responsiveFontSize(2.35) }}>
                    Exotic Fruits
                </Text>

            </TouchableOpacity> */}


        </View>
    )
}

export default CategoriesCard
