import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/UserScreens/ExploreScreen';
import CartScreen from '../screens/UserScreens/CartScreen';
import AccountScreen from '../screens/UserScreens/AccountScreen';
import Shop from "../assets/icons/tabs/shop.svg"
import Explore from "../assets/icons/tabs/explore-search.svg"
import Cart from "../assets/icons/tabs/cart.svg"
import Favourite from "../assets/icons/tabs/favourite.svg"
import Person from "../assets/icons/tabs/person.svg"
import HomeScreen from '../screens/UserScreens/HomeScreen';
import FavouriteProductScreen from '../screens/UserScreens/FavouriteProductScreen';
import { Badge } from 'react-native-paper';

export const UserBottomTabs = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='Shop'
            screenOptions={{
                tabBarIconStyle: {
                    marginTop: 5,
                },
                tabBarLabelStyle: { fontSize: 13, fontFamily: 'Mulish-SemiBold' },
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
                            <Shop color="#53B175" className="pt-1" />
                        )
                            :
                            (
                                <Shop color="black" />
                            )
                }}
            />

            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Explore color="#53B175" />
                        )
                            :
                            (
                                <Explore color="black" />
                            )
                }} />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{

                    tabBarIcon: ({ focused }) =>
                        focused ? (

                            <Cart color="#53B175" />


                        )
                            :
                            (
                                <Cart color="black" />
                            )
                }} />

            <Tab.Screen
                name="Favourite"
                component={FavouriteProductScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Favourite color="#53B175" />
                        )
                            :
                            (
                                <Favourite color="black" />
                            )
                }} />

            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Person color="#53B175" />
                        )
                            :
                            (
                                <Person color="black" />
                            )
                }} />
        </Tab.Navigator>
    )
}