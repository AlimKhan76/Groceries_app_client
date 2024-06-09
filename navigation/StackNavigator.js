import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartUpScreen from '../screens/StartUpScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import { UserBottomTabs } from './UserBottomTabs';
import OrderDetailsScreen from '../screens/AdminScreens/OrderDetailsScreen';
import UpdateProductScreen from '../screens/AdminScreens/UpdateProductScreen';
import AddedToCartPopUp from '../screens/components/AddedToCartPopUp';
import OrderAcceptedScreen from '../screens/UserScreens/OrderAcceptedScreen';
import ProductDetailsScreen from '../screens/UserScreens/ProductDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
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
import AllCategoryOfCustomersScreen from '../screens/AdminScreens/AllCategoryOfCustomersScreen';
import PaymentDetailsScreen from '../screens/UserScreens/PaymentDetailsScreen';
import UserAddressesScreen from '../screens/UserScreens/UserAddressesScreen';
import UserCategoryUpdationScreen from '../screens/AdminScreens/UserCategoryUpdationScreen';
import HelpScreen from '../screens/UserScreens/HelpScreen';
import AboutScreen from '../screens/UserScreens/AboutScreen';
import LoginWithOtpScreen from '../screens/LoginWithOtpScreen';
import ProductAvailablityPage from '../screens/AdminScreens/ProductAvailablityPage';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName='StartUpLoading'
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                    animationDuration: 100
                }}>

                {/* Bottom Tabs Start */}
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
                {/* Bottom tabs end */}


                {/* Common Screens */}
                {/* Loading Screen */}
                <Stack.Screen
                    name='StartUpLoading'
                    component={StartUpScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />

                <Stack.Screen
                    name='GetStartedScreen'
                    component={GetStartedScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />

                <Stack.Screen
                    name='Login'
                    component={LoginWithOtpScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />


                <Stack.Screen
                    name='OTPScreen'
                    component={OTPScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />

                <Stack.Screen
                    name="UserRegisterationPage"
                    component={UserRegisterationPage}
                    screenOptions={{
                        animation: "slide_from_right"
                    }}
                />


                {/* Common Screens end */}



                {/* User Screens start */}

                <Stack.Screen
                    name='ProductDetails'
                    component={ProductDetailsScreen}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }} />

                <Stack.Screen
                    name="OrderDetails"
                    component={OrderDetailsScreen}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }} />

                <Stack.Screen
                    name='AddedToCart'
                    component={AddedToCartPopUp}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }} />

                <Stack.Screen
                    name="OrderAccepted"
                    component={OrderAcceptedScreen}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }} />

                <Stack.Screen
                    name='Checkout'
                    component={CheckoutPage}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name='AddAddress'
                    component={AddAddressScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name='OrderConfirmation'
                    component={OrderConfirmationScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name='CategoryProducts'
                    component={AllCategorizedProductScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name="AllOrderScreen"
                    component={AllOrdersScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name="UserOrderDetails"
                    component={UserOrderDetails}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name="UserPaymentDetails"
                    component={PaymentDetailsScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name="UserAddresses"
                    component={UserAddressesScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name="HelpScreen"
                    component={HelpScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name="AboutScreen"
                    component={AboutScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                {/* Admin Screens Start */}

                <Stack.Screen
                    name='UpdateProduct'
                    component={UpdateProductScreen}
                    screenOptions={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationDuration: 100
                    }} />

                <Stack.Screen
                    name="UserCategoryUpdation"
                    component={UserCategoryUpdationScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name="AllCategoryOfCustomersScreen"
                    component={AllCategoryOfCustomersScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name="PaymentRecord"
                    component={AllCustomerPaymentScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />

                <Stack.Screen
                    name="CustomerPaymentDetailsScreen"
                    component={CustomerPaymentDetailsScreen}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />
                <Stack.Screen
                    name="ProductAvailabilityScreen"
                    component={ProductAvailablityPage}
                    screenOptions={{
                        animation: "slide_from_right"
                    }} />



            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator