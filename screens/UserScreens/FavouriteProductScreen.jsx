import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Right from "../../assets/icons/account/right_arrow.svg"
import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../../api/userAPI'
import { useNavigation } from '@react-navigation/native'
import { BASE_URL } from "@env"

const FavouriteProductScreen = () => {
  const navigation = useNavigation()



  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    staleTime: Infinity
  })


  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="border-b-2 border-gray-200 items-center flex-row justify-center">

        <Text
          className="text-xl py-6 text-black font-mulish-extrabold">
          Favourite
        </Text>

      </View>


      {userData?.favourite?.length > 0 ?
        <ScrollView horizontal={false} >

          {userData?.favourite?.map((product) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("ProductDetails", { product })}
                key={product._id}
                className='border-gray-200 border-b-2 px-4 py-4 flex-row  '>
                <Image
                  className="self-center w-24 h-24 "
                  resizeMode='contain'
                  source={{ uri: `${BASE_URL}${product?.url}` }}
                />

                <View className="pl-4 flex-shrink w-full justify-center">

                  <Text
                    className="text-black text-xl font-mulish-bold">
                    {product?.title}
                  </Text>

                  <Text
                    className="text-base font-mulish-medium text-slate-500">
                    {product?.baseQuantity}
                  </Text>

                </View>

                <View
                  className="justify-center items-center flex-row gap-2">
                  <Text
                    className="text-xl text-black font-mulish-semibold">
                    ₹{product?.price}
                  </Text>
                  <Right color="black" />
                </View>

              </TouchableOpacity>)
          }
          )
          }
        </ScrollView>
        :
        <View className="items-center justify-center flex-1">
          <Text
            className="text-xl text-center text-black font-mulish-semibold">
            You have no favourites, start adding them by clicking the heart icon
          </Text>
        </View>
      }

    </SafeAreaView>
  )
}

export default FavouriteProductScreen