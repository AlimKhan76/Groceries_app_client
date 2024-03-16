import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Search from "../../assets/icons/commons/search.svg"
import { useFocusEffect } from '@react-navigation/native'
import { searchApi } from '../../api/searchAPI'
import { useQuery } from '@tanstack/react-query';
import { IMAGE_URL } from '@env';
import RightArrow from "../../assets/icons/account/right_arrow.svg"
import CategoriesCard from '../components/CategoriesCard'
import { ActivityIndicator, Divider } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import categoriesCard from '../components/CategoriesCard'
import { assets } from '../../react-native.config'

const ExploreScreen = ({ navigation, route }) => {
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("")
  // const { data: categorizedProducts } = route?.params
  useFocusEffect(React.useCallback(() => {
    inputRef.current.focus();
    return () => {
      setSearchQuery("")
    }
  }, []))

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['searchItem', searchQuery],
    queryFn: () => searchApi(searchQuery),
    enabled: false,
    staleTime: Infinity
  })

  useEffect(() => {
    if (searchQuery !== "") {
      setTimeout(() => {
        refetch(searchQuery)
      }, 500);
    }
  }, [searchQuery])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-white px-2 "
        edges={['right', 'top', 'left']}
      >

        <Text
          className=" font-mulish-bold text-black text-center my-6"
          style={{ fontSize: responsiveFontSize(3) }}>
          Find Products
        </Text>

        {/* <Divider bold /> */}
        {/* {console.log(categorizedProducts) */}

        <View
          className='bg-gray-200 mx-6 my-2 rounded-2xl px-3 flex-row items-center'>
          <Search />
          <TextInput
            ref={inputRef}
            maxLength={20}
            value={searchQuery}
            onChangeText={e => setSearchQuery(e)}
            className='px-2.5 py-3.5 text-base font-mulish-semibold w-full text-black'
            placeholder='Search store'
            placeholderTextColor={'gray'}
          />
        </View>


        {isLoading ?
          <View
            className="flex-1 items-center mt-20 ">
            <ActivityIndicator animating={true} size={'large'}
              color={'#53B175'} />
          </View>
          :
          data !== undefined && data?.length === 0 && searchQuery !== "" ?
            <View
              className="flex-1 items-center mt-20 ">
              <Text
                className="text-black text-2xl font-mulish-semibold">
                No Products ! ! !
              </Text>
            </View>

            :
            <ScrollView
              className='py-2'
              horizontal={false} >

              <View className="flex-row flex-wrap gap-2 justify-center  "
                style={{ paddingVertical: responsiveHeight(1) }}
              >

                {data?.length > 0 && data !== undefined &&
                  data?.map((product) => {
                    return (
                      <TouchableOpacity
                        key={product?._id}
                        onPress={() => navigation.navigate("ProductDetails", { product })}
                        className='border-gray-100 border-2 px-4 py-4 rounded-2xl '
                        style={{ width: responsiveWidth(45) }}>

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
                            // onPress={() => setModalVisible(true)}
                            className="bg-[#53B175] rounded-2xl p-4 text-center">
                            <RightArrow style={{ color: "white" }} />
                          </View>

                        </View>
                      </TouchableOpacity>
                    )
                  })
                }




                {searchQuery === "" &&
                <CategoriesCard/>
              }
              </View>

            </ScrollView>
        }





      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ExploreScreen