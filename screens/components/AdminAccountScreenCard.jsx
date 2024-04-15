import Orders from '../../assets/icons/account/orders.svg'
import PersonalDetails from '../../assets/icons/account/personal_card.svg'
import Payment from '../../assets/icons/account/payment.svg'
import Ticket from '../../assets/icons/account/ticket.svg'
import Bell from '../../assets/icons/account/bell.svg'
import Help from '../../assets/icons/account/help.svg'
import About from '../../assets/icons/account/about.svg'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { moderateScale } from 'react-native-size-matters'



const data = [
    {
        "icon": <Orders />,
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
        "icon": <Payment />,
        "title": "Payment Records",
        "navigation": "PaymentRecord"
    },
    {
        "icon": <Ticket />,
        "title": "Promo Card",
        "navigation": "CouponCodeScreen"
    },
    // {
    //     "icon": <Bell />,
    //     "title": "Notifications"
    // },
    {
        "icon": <Feather name="download" size={responsiveHeight(3)} color="black" />,
        "title": "Download Pending Orders"
    },
    {
        "icon": <Ionicons name="checkmark-done-sharp" size={moderateScale(20)} color="black" />,
        "title": "Mark all packed orders as delivered"
    },
    {
        'icon': <Help />,
        'title': "Help"
    },
    {
        'icon': <About />,
        'title': 'About'
    }
]

module.exports = data