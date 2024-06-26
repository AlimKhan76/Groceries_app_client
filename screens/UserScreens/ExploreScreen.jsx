import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query';
import CategoriesCard from '../components/CategoriesCard'
import { ActivityIndicator } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import useUserDataQuery from '../../hooks/useUserData'
import { searchProductAPI } from '../../api/productAPI';
import ProductCard from '../components/ProductCard';

const ExploreScreen = ({ navigation, route }) => {
  const inputRef = useRef();
  // const [fromHome, setFromHome] = useState(route?.params?.fromHome !== undefined ? true : false)
  const [searchQuery, setSearchQuery] = useState("")
  const { data: userData } = useUserDataQuery()
  useFocusEffect(React.useCallback(() => {
    //   console.log(route?.params)
    //   console.log(fromHome)
    //   if (route?.params?.fromHome === true) {
    //     inputRef.current.focus();
    //   }
    //   return () => {
    //     navigation.setParams({ fromHome: false });
    //     setFromHome(false)
    //     setSearchQuery("")
    //   }

    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();
      setSearchQuery("")

      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]))

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e) => {
  //     // Prevent default behavior
  //     e.preventDefault();
  //     setSearchQuery("")

  //     // Do something manually
  //     // ...
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['searchItem', searchQuery],
    queryFn: () => searchProductAPI(searchQuery),
    enabled: false,
    staleTime: Infinity
  })

  useEffect(() => {
    if (searchQuery !== "") {
      setTimeout(() => {
        refetch(searchQuery)
      }, 1000);
    }
  }, [searchQuery])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-white px-2 "
        edges={['right', 'top', 'left']}>

        <View className="items-center flex-row justify-center"
          style={{ height: responsiveHeight(10) }}>

          <Text
            className="py-6 text-black font-mulish-bold"
            style={{
              fontSize: responsiveFontSize(3)
            }}>
            Find Products
          </Text>

        </View>


        <View
          className='bg-gray-200 mx-4 my-2 rounded-2xl px-3 flex-row items-center'>
          <Feather name="search" color="black" size={responsiveHeight(2.5)} />
          <TextInput
            ref={inputRef}
            maxLength={20}
            value={searchQuery}
            onChangeText={e => setSearchQuery(e)}
            className='px-2.5 py-3.5 font-mulish-semibold w-full text-black'
            style={{
              fontSize: responsiveFontSize(1.85)
            }}
            placeholder='Search store'
            placeholderTextColor={'black'}
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
              className="flex-1 items-center mt-24 ">
              <Text
                className="text-black text-2xl font-mulish-semibold"
                style={{ fontSize: responsiveFontSize(3) }}>
                No Product Found
              </Text>
            </View>

            :
            <ScrollView
              className='my-3'
              horizontal={false} >

              <View className="flex-row flex-wrap justify-center  "
                style={{ gap: responsiveHeight(1) }}>

                {data?.length > 0 && data !== undefined &&
                  data?.map((product) => {
                    return (
                      <ProductCard key={product?._id} product={product} />
                    )

                  })
                }

                {searchQuery === "" &&
                  <CategoriesCard />
                }
              </View>

            </ScrollView>
        }





      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ExploreScreen