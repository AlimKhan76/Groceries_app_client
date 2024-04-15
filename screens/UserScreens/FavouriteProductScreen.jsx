import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { Fragment } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Right from "../../assets/icons/account/right_arrow.svg"
import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../../api/userAPI'
import { useNavigation } from '@react-navigation/native'
import { IMAGE_URL } from "@env"
import { Appbar, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const FavouriteProductScreen = () => {
  const navigation = useNavigation()



  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    staleTime: Infinity
  })


  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="items-center flex-row justify-center">

        <Text
          className="py-6 text-black font-mulish-bold"
          style={{
            fontSize: responsiveFontSize(3)
          }}>
          Favourite
        </Text>

      </View>

      <Divider />


      {userData?.favourite?.length > 0 ?
        <ScrollView horizontal={false} >

          {userData?.favourite?.map((product) => {
            return (
              <Fragment key={product._id}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProductDetails", { product })}
                  key={product._id}
                  className=' px-4 py-2 flex-row  '>
                  <Image
                    className="self-center "
                    style={{
                      width: responsiveWidth(30),
                      height: responsiveHeight(15)
                    }}
                    resizeMode='contain'
                    source={{ uri: `${IMAGE_URL}${product?.url}` }}
                  />

                  <View className="pl-4 flex-shrink w-full justify-center gap-y-2 ">

                    <Text
                      className="text-black font-mulish-bold"
                      style={{
                        fontSize:responsiveFontSize(2)
                      }}
                      >
                      {product?.title}
                    </Text>

                    <Text
                      className="font-mulish-regular text-slate-500"
                      style={{
                        fontSize:responsiveFontSize(1.5)
                      }}>
                      {product?.baseQuantity}
                    </Text>

                  </View>

                  <View
                    className="justify-center items-center flex-row gap-x-3"
                    style={{paddingHorizontal:responsiveWidth(5)}}
                    >
                    <Text
                      className=" text-black font-mulish-semibold"
                      style={{
                        fontSize:responsiveFontSize(2)
                      }}>
                      ₹{product?.price}
                    </Text>
                    <Right color="black"/>
                  </View>

                </TouchableOpacity>
                <Divider style={{
                  marginHorizontal: responsiveWidth(5)
                }} />
              </Fragment>
            )
          }
          )
          }
        </ScrollView>
        :
        <View className="items-center justify-center flex-1">
          <Text
            className="text-center text-black font-mulish-semibold"
            style={{
              fontSize:responsiveFontSize(2.5)
            }}>
            You have no favourites, start adding them by clicking the heart icon
          </Text>
        </View>
      }

    </SafeAreaView>
  )
}

export default FavouriteProductScreen