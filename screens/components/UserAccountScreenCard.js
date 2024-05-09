import { responsiveHeight } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const data = [
    {
        "icon": <Feather name="shopping-bag" color="black" size={responsiveHeight(3)} />,
        "title": "Orders",
        "navigation": "AllOrderScreen"
    },
    {
        "icon": <Feather name="map-pin" color="black" size={responsiveHeight(3)} />,
        "title": "Delivery Address",
        "navigation": "UserAddresses"
    },
    {
        "icon": <MaterialIcons name='payment' size={responsiveHeight(3)} color='black' />,
        "title": "Transaction Details",
        "navigation": "UserPaymentDetails"
    },
    // {
    //     "icon": <Payment />,
    //     "title": "Payment Methods",
    // },
    // {
    //     "icon": <Ticket />,
    //     "title": "Promo Card"
    // },
    // {
    //     "icon": <Bell />,
    //     "title": "Notifications"
    // },
    {
        'icon': <AntDesign name="questioncircleo" color="black" size={responsiveHeight(3)} />,
        'title': "Help",
        "navigation": "HelpScreen"

    },
    {

        'icon': <Feather name="info" color="black" size={responsiveHeight(3)} />,
        'title': 'About',
        "navigation": "AboutScreen"

    }
]

module.exports = data