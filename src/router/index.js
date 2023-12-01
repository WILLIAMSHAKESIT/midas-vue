import { createRouter, createWebHistory } from 'vue-router'

import Home_city from '@/components/Home.vue'
import ChangeInfo_city from '@/components/ChangeInfo.vue'
import ChangePass_city from '@/components/ChangePass.vue'
import Cashin_city from '@/components/Cashin.vue'
import Cashout_city from '@/components/Cashout.vue'
import Notification_city from '@/components/Notification.vue'
import NotificationDetail_city from '@/components/NotificationDetail.vue'
import Popup_city from '@/components/Popup.vue'
import Chat_city from '@/components/ChatList.vue'
import Contact_city from '@/components/SendChat.vue'
import Partner_city from '@/components/Partner.vue'
import PointToAmount_city from '@/components/PointToAmount.vue'

const routes = [
    {
        path: '/',
        name: 'Home_city',
        component: Home_city
    },
    {
        path: '/change-infomation',
        name: 'ChangeInfo_city',
        component: ChangeInfo_city
    },
    {
        path: '/change-password',
        name: 'ChangePass_city',
        component: ChangePass_city
    },
    {
        path: '/cash-in',
        name: 'Cashin_city',
        component: Cashin_city
    },
    {
        path: '/cash-out',
        name: 'Cashout_city',
        component: Cashout_city
    },
    {
        path: '/notification',
        name: 'Notification_city',
        component: Notification_city
    },
    {
        path: '/notification-detail:id',
        name: 'NotificationDetail_city',
        component: NotificationDetail_city
    },
    {
        path: '/popup',
        name: 'Popup_city',
        component: Popup_city
    },
    {
        path: '/chat',
        name: 'Chat_city',
        component: Chat_city
    },
    {
        path: '/contact-us',
        name: 'Contact_city',
        component: Contact_city
    },
    {
        path: '/partner',
        name: 'Partner_city',
        component: Partner_city
    },
    {
        path: '/point-to-amount',
        name: 'PointToAmount_city',
        component: PointToAmount_city
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkActiveClass: "active"
})

export default router