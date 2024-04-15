import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminSettingScreen from "../screens/AdminScreens/AdminSettingScreen"
import CompletedOrderScreen from "../screens/AdminScreens/CompletedOrderScreen"
import PendingOrderScreen from "../screens/AdminScreens/PendingOrderScreen"
import Order from "../assets/icons/tabs/order.svg"
import History from "../assets/icons/tabs/history.svg"
import Setting from "../assets/icons/tabs/setting.svg"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const AdminBottomTabs = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='PendingOrders'
            screenOptions={{
                tabBarIconStyle: {
                    marginTop: 5,
                },
                tabBarLabelStyle: { fontSize: responsiveFontSize(1.5), fontFamily: 'Mulish-SemiBold' },
                headerShown: false,
                tabBarActiveTintColor: "#53B175",
                tabBarInactiveTintColor: "black",
            }}>

            <Tab.Screen
                name="PendingOrders"
                component={PendingOrderScreen}

                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialIcons name="pending-actions"
                                size={responsiveHeight(3)} color="#53B175" s />)
                            :
                            (
                                <MaterialIcons name="pending-actions" size={responsiveHeight(3)} color="black" />)
                }}
            />

            <Tab.Screen
                name="History"
                component={CompletedOrderScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialIcons name="history" size={responsiveHeight(3)} color="#53B175" />)
                            :
                            (
                                <MaterialIcons name="history"
                                    size={responsiveHeight(3)} color="black" />)
                }}
            />
            <Tab.Screen
                name="AdminSetting"
                component={AdminSettingScreen}
                options={{

                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="settings-outline"
                                size={responsiveHeight(3)}
                                color="#53B175" />
                        )
                            :
                            (
                                <Ionicons
                                    name="settings-outline"
                                    size={responsiveHeight(3)}
                                    color="black" />)
                }}
            />
        </Tab.Navigator>
    )
}
