import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, Appbar, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getProductByCategoryAPI } from '../../api/productAPI'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import useUserDataQuery from '../../hooks/useUserData'
import ProductCard from '../components/ProductCard'

const AllCategorizedProductScreen = ({ route }) => {
    const navigation = useNavigation();

    const { category } = route.params
    const { data: categorizedProducts,
        isLoading: loadingProducts,
        fetchNextPage,
        isLoading,
        isRefetching,
        isFetching,
        refetch,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchPreviousPage,

    } = useInfiniteQuery({
        queryKey: ["getProductByCategoryAPI", category],
        queryFn: ({ pageParam }) => getProductByCategoryAPI(category, pageParam),
        staleTime: Infinity,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
    })

    const { data: userData } = useUserDataQuery()

    return (
        <SafeAreaView className="bg-white flex-1">
            <Appbar.Header mode='center-aligned' style={{
                backgroundColor: 'white',
                height: responsiveHeight(10),
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
                statusBarHeight={0}>
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


            {loadingProducts ?
                <View className="flex-1 justify-center items-center pt-[50%]">
                    <ActivityIndicator animating={true} size={'large'}
                        color={'#53B175'} />
                </View>
                :
                <FlatList
                    columnWrapperStyle={{
                        justifyContent: "center",
                        gap: responsiveHeight(1)
                    }}
                    contentContainerStyle={{
                        justifyContent: "center",
                        gap: responsiveHeight(1)
                    }}
                    className="my-3 "
                    numColumns={2}
                    onEndReached={() => isFetchingNextPage || !hasNextPage ? null : fetchNextPage()}
                    data={categorizedProducts?.pages?.map(pages => pages?.docs).flat()}
                    initialNumToRender={14}
                    keyExtractor={(item) => item?._id}
                    renderItem={({ item: product }) => {
                        return (
                            <ProductCard product={product} key={product?._id} />
                        )
                    }}
                    ListFooterComponent={isFetching ?
                        <View className="w-screen  items-center  ">
                            <ActivityIndicator style={{
                                marginVertical: responsiveHeight(1.5)
                            }}
                                size={"small"} color='#419a79' />
                        </View>
                        : ""
                    }
                >
                </FlatList>

            }
        </SafeAreaView >
    )
}

export default AllCategorizedProductScreen