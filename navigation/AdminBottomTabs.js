import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminSettingScreen from "../screens/AdminScreens/AdminSettingScreen"
import CompletedOrderScreen from "../screens/AdminScreens/CompletedOrderScreen"
import PendingOrderScreen from "../screens/AdminScreens/PendingOrderScreen"
import Order from "../assets/icons/tabs/order.svg"
import History from "../assets/icons/tabs/history.svg"
import Setting from "../assets/icons/tabs/setting.svg"
import { responsiveHeight } from "react-native-responsive-dimensions";


export const AdminBottomTabs = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='PendingOrders'
            screenOptions={{
                tabBarIconStyle: {
                    marginTop: 5,
                },
                tabBarLabelStyle: { fontSize: 15, fontFamily: 'Mulish-SemiBold' },
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
                            <Order color="#53B175" className="pt-1" />
                        )
                            :
                            (
                                <Order color="black" />
                            )
                }}
            />

            <Tab.Screen
                name="History"
                component={CompletedOrderScreen}
                options={{
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <History color="#53B175" />
                        )
                            :
                            (
                                <History color="black" />
                            )
                }}
            />
            <Tab.Screen
                name="AdminSetting"
                component={AdminSettingScreen}
                options={{

                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Setting color="#53B175" />
                        )
                            :
                            (
                                <Setting color="black" />
                            )
                }}
            />
        </Tab.Navigator>
    )
}
