import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/UserScreens/ExploreScreen';
import CartScreen from '../screens/UserScreens/CartScreen';
import AccountScreen from '../screens/UserScreens/AccountScreen';
import HomeScreen from '../screens/UserScreens/HomeScreen';
import FavouriteProductScreen from '../screens/UserScreens/FavouriteProductScreen';
import UserRegisterationPage from '../screens/UserRegisterationPage';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

export const UserBottomTabs = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='Shop'
            screenOptions={{
                tabBarStyle: {
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderTopWidth: responsiveWidth(0.5),
                    borderTopColor: "#e2e2e2"
                },
                tabBarIconStyle: {
                    marginTop: responsiveHeight(0.5),
                },
                tabBarLabelStyle: { fontSize: responsiveFontSize(1.25), fontFamily: 'Mulish-Medium' },
                headerShown: false,
                tabBarActiveTintColor: "#53B175",
                tabBarInactiveTintColor: "black",
            }}>

            <Tab.Screen
                name="Shop"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialIcons name="storefront" color="#53B175" size={responsiveHeight(3)} />
                        )
                            :
                            (
                                <MaterialIcons name="storefront" color="black" size={responsiveHeight(3)} />
                            )
                }}
            />

            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons
                                name="store-search-outline" color="#53B175" size={responsiveHeight(3)} />)
                            :
                            (
                                <MaterialCommunityIcons
                                    name="store-search-outline" color="black" size={responsiveHeight(3)} />
                            )
                }} />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialIcons
                                name="shopping-cart-checkout" color="#53B175" size={responsiveHeight(3)} />
                        )
                            :
                            (
                                <MaterialIcons
                                    name="shopping-cart-checkout" color="black" size={responsiveHeight(3)} />
                            )
                }} />

            <Tab.Screen
                name="Favourite"
                component={FavouriteProductScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialCommunityIcons name="cards-heart-outline" color="#53B175" size={responsiveHeight(3)} />
                        )
                            :
                            (
                                <MaterialCommunityIcons name="cards-heart-outline" color="black" size={responsiveHeight(3)} />
                            )
                }} />

            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="person-outline" color="#53B175" size={responsiveHeight(3)} />
                        )
                            :
                            (
                                <Ionicons name="person-outline" color="black" size={responsiveHeight(3)} />
                            )
                }} />
        </Tab.Navigator>
    )
}