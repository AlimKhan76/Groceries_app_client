import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
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

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName={async () => {
                let token = SecureStore.getItem("token")
                let role = SecureStore.getItem("role")
                if (!token) {
                    return "GetStartedScreen"
                }
                else {
                    if (role === "admin") {
                        return "Admin"
                    }
                    else if (role === 'customer') {
                        return "Main"
                    }
                }
            }}
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                    animationDuration: 100
                }}

            >

                <Stack.Screen
                    name='StartUpLoading'
                    component={StartUpScreen}
                />
                <Stack.Screen
                    name='GetStartedScreen'
                    component={GetStartedScreen}
                />
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
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
                />
                <Stack.Screen
                    name='UpdateProduct'
                    component={UpdateProductScreen}
                />
                <Stack.Screen
                    name='AddedToCart'
                    component={AddedToCartPopUp}
                />
                <Stack.Screen
                    name="OrderAccepted"
                    component={OrderAcceptedScreen}
                />
                <Stack.Screen
                    name='ProductDetails'
                    component={ProductDetailsScreen}
                />
                <Stack.Screen
                    name='Landing'
                    component={LandingScreen}
                />
                <Stack.Screen
                    name='ForgotPassword'
                    component={ForgotPasswordScreen}
                />
                <Stack.Screen
                    name='OTPScreen'
                    component={OTPScreen}
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
                />
                <Stack.Screen
                    name='CategoryProducts'
                    component={AllCategorizedProductScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator