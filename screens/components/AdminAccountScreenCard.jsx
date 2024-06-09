import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveHeight } from 'react-native-responsive-dimensions'

const data = [
    {
        "icon": <Feather name="shopping-bag" color="black" size={responsiveHeight(3)} />,
        "navigation": "AllCategoryOfCustomersScreen",
        "title": "Update Product Prices",
    },
    {
        "icon": <Ionicons name="person-outline" color="black" size={responsiveHeight(3)} />,
        "navigation": "UserCategoryUpdation",
        "title": "Update User Category",
    },
    {
        "icon": <MaterialIcons name='payment' size={responsiveHeight(3)} color='black' />,
        "title": "Transaction Records",
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
        "icon": <MaterialCommunityIcons name="file-download-outline" size={responsiveHeight(3)} color="black" />,
        "title": "Download Pending Invoices"
    },
    {
        "icon": <MaterialIcons name="event-available" size={responsiveHeight(3)} color="black" />,
        "navigation": "ProductAvailabilityScreen",
        "title": "Update Product Availability"
    },
    {
        "icon": <Ionicons name="checkmark-done-sharp" size={responsiveHeight(3)} color="black" />,
        "title": "Mark all pending orders as delivered"
    },
]

module.exports = data