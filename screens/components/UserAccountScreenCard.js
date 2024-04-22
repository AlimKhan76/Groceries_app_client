import { responsiveHeight } from 'react-native-responsive-dimensions'
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"

const data = [
    {
        "icon": <Feather name="shopping-bag" color="black" size={responsiveHeight(3)} />,
        "title": "Orders",
        "navigation": "AllOrderScreen"

    },
    // {
    //     "icon": <PersonalDetails />,
    //     "title": "My Details"
    // },
    {
        "icon": <Feather name="map-pin" color="black" size={responsiveHeight(3)} />,
        "title": "Delivery Address",
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
        'title': "Help"
    },
    {

        'icon': <Feather name="info" color="black" size={responsiveHeight(3)} />,
        'title': 'About'
    }
]

module.exports = data