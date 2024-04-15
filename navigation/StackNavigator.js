import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartUpScreen from '../screens/StartUpScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { UserBottomTabs } from './UserBottomTabs';
import OrderDetailsScreen from '../screens/AdminScreens/OrderDetailsScreen';
import UpdateProductScreen from '../screens/AdminScreens/UpdateProductScreen';
import AddedToCartPopUp from '../screens/components/AddedToCartPopUp';
import OrderAcceptedScreen from '../screens/UserScreens/OrderAcceptedScreen';
import ProductDetailsScreen from '../screens/UserScreens/ProductDetailsScreen';
import LandingScreen from '../screens/LandingScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen';
import * as SecureStore from 'expo-secure-store';
import CheckoutPage from '../screens/UserScreens/CheckoutPage';
import AddAddressScreen from '../screens/UserScreens/AddAddressScreen';
import OrderConfirmationScreen from '../screens/UserScreens/OrderConfirmationScreen';
import AllCategorizedProductScreen from '../screens/UserScreens/AllCategorizedProductScreen';
import { AdminBottomTabs } from './AdminBottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import UserRegisterationPage from '../screens/UserRegisterationPage';
import AllOrdersScreen from '../screens/UserScreens/AllOrdersScreen';
import AllCustomerPaymentScreen from '../screens/AdminScreens/AllCustomerPaymentScreen';
import UserOrderDetails from '../screens/UserScreens/UserOrderDetails';
import CustomerPaymentDetailsScreen from '../screens/AdminScreens/CustomerPaymentDetailsScreen';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (

        <NavigationContainer>
            <Stack.Navigator
                //  initialRouteName={ async() => {
                // let token = SecureStore.getItem("token")
                // let role = SecureStore.getItem("role")
                // if (!token) {
                //     return "GetStartedScreen"
                // }
                // else {
                //     if (role.includes("admin")) {
                //         return "Main"
                //     }
                //     else if (role.includes('customer')) {
                // return "Main"
                //     }
                // }
                // }}

                initialRouteName='StartUpLoading'

                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                    animationDuration: 100
                }}

            >

                <Stack.Screen
                    name='GetStartedScreen'
                    component={GetStartedScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
                <Stack.Screen
                    name='StartUpLoading'
                    component={StartUpScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
                <Stack.Screen
                    name='Login'
                    component={LandingScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
                <Stack.Screen
                    name='SignUp'
                    component={SignUpScreen}
                />
                <Stack.Screen
                    name='Main'
                    component={UserBottomTabs}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
                <Stack.Screen
                    name='Admin'
                    component={AdminBottomTabs}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
                <Stack.Screen
                    name="OrderDetails"
                    component={OrderDetailsScreen}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }}
                />
                <Stack.Screen
                    name='UpdateProduct'
                    component={UpdateProductScreen}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }}
                />
                <Stack.Screen
                    name='AddedToCart'
                    component={AddedToCartPopUp}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }}
                />
                <Stack.Screen
                    name="OrderAccepted"
                    component={OrderAcceptedScreen}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }}
                />
                <Stack.Screen
                    name='ProductDetails'
                    component={ProductDetailsScreen}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }}
                />
                <Stack.Screen
                    name='Landing'
                    component={LandingScreen}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }}
                />
                <Stack.Screen
                    name='ForgotPassword'
                    component={ForgotPasswordScreen}
                />
                <Stack.Screen
                    name='OTPScreen'
                    component={OTPScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
                <Stack.Screen
                    name='Checkout'
                    component={CheckoutPage}
                />
                <Stack.Screen
                    name='AddAddress'
                    component={AddAddressScreen}
                />
                <Stack.Screen
                    name='OrderConfirmation'
                    component={OrderConfirmationScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />
                <Stack.Screen
                    name='CategoryProducts'
                    component={AllCategorizedProductScreen}
                />
                <Stack.Screen
                    name="UserRegsiterationPage"
                    component={UserRegisterationPage}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
                <Stack.Screen
                    name="AllOrderScreen"
                    component={AllOrdersScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
                <Stack.Screen
                    name="PaymentRecord"
                    component={AllCustomerPaymentScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
                <Stack.Screen
                    name="UserOrderDetails"
                    component={UserOrderDetails}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
                <Stack.Screen
                    name="CustomerPaymentDetailsScreen"
                    component={CustomerPaymentDetailsScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator