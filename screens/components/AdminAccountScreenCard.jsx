import Orders from '../../assets/icons/account/orders.svg'
import PersonalDetails from '../../assets/icons/account/personal_card.svg'
import Payment from '../../assets/icons/account/payment.svg'
import Ticket from '../../assets/icons/account/ticket.svg'
import Bell from '../../assets/icons/account/bell.svg'
import Help from '../../assets/icons/account/help.svg'
import About from '../../assets/icons/account/about.svg'


const data = [
    {
        "icon": <Orders />,
        "navigation": "UpdateProduct",
        "title": "Update Products",
    },
    {
        "icon": <PersonalDetails />,
        "title": "Add admin account"
    },
    // {
    //     "icon": <Pin />,
    //     "title": "Delivery Address",
    // },
    {
        "icon": <Payment />,
        "title": "Payment Records",
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
        "icon": <Help />,
        "title": "Download Pending Orders"
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