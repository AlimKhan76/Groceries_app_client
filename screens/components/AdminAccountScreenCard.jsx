import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveHeight } from 'react-native-responsive-dimensions'



const data = [
    {
        "icon": <Feather name="shopping-bag" color="black" size={responsiveHeight(3)} />,
        "navigation": "UpdateProduct",
        "title": "Update Products",
    },
    // {
    //     "icon": <PersonalDetails />,
    //     "title": "Add admin account"
    // },
    // {
    //     "icon": <Pin />,
    //     "title": "Delivery Address",
    // },
    {
        "icon": <MaterialIcons name='payment' size={responsiveHeight(3)} color='black' />,
        "title": "Payment Records",
        "navigation": "PaymentRecord"
    },
    // {
    //     "icon": <Ticket />,
    //     "title": "Promo Card",
    //     "navigation": "CouponCodeScreen"
    // },
    // {
    //     "icon": <Bell />,
    //     "title": "Notifications"
    // },
    {
        "icon": <Feather name="download" size={responsiveHeight(3)} color="black" />,
        "title": "Download Pending Orders"
    },
    {
        "icon": <Ionicons name="checkmark-done-sharp" size={responsiveHeight(3)} color="black" />,
        "title": "Mark all packed orders as delivered"
    },
    {
        'icon': <AntDesign name="questioncircleo" color="black" size={responsiveHeight(3)} />,
        'title': "Help"
    },
    {
        'icon': <Feather name="info" color="black" size={responsiveHeight(3)} />,
        'title': 'About'
    }
]

module.exports = data