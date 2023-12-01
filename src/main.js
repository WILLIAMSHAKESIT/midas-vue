import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue3-cookies'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import "vue3-paginate-z/dist/styles.css";
import Paginate from "vue3-paginate-z";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faPiggyBank, faVault, faBell, faCommentDots, faCaretDown, faUserTie, faUnlockAlt, faBarsStaggered, faCaretUp, faRightFromBracket, faWindowRestore, faCircleUser, faHandHoldingDollar, faMoneyBill, faMoneyBill1Wave, faReply, faHandshake, faGift, faPlay, faTrophy, faCrown, faTableList, faMoneyBillTransfer, faUserGear, faCircleInfo, faClover, faFireFlameCurved, faBomb, faTablet, faPuzzlePiece, faClockRotateLeft, faMagnifyingGlassPlus, faComments, faEye } from '@fortawesome/free-solid-svg-icons'
import VueMobileDetection from 'vue-mobile-detection'
library.add(faUserSecret, faPiggyBank, faVault, faBell, faCommentDots, faCaretDown, faUserTie, faUnlockAlt, faBarsStaggered, faCaretUp, faRightFromBracket, faWindowRestore, faCircleUser, faHandHoldingDollar, faMoneyBill, faMoneyBill1Wave, faReply, faHandshake, faGift, faPlay, faTrophy, faCrown, faTableList, faMoneyBillTransfer, faUserGear, faCircleInfo, faClover, faFireFlameCurved, faBomb, faTablet, faPuzzlePiece, faClockRotateLeft, faMagnifyingGlassPlus, faComments, faEye)

// createApp(App).mount('#app')
const app = createApp(App)
app.use(VueMobileDetection)
app.use(router)
app.use(VueAxios, axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueSweetalert2)
app.use(Paginate)
app.use(VueCookies);

var domain_web = 'https://api.chanel01.com/api/'

app.config.globalProperties.api_login = domain_web + 'login'
app.config.globalProperties.api_register = domain_web + 'register'
app.config.globalProperties.api_logout = domain_web + 'logout'
app.config.globalProperties.api_infouser = domain_web + 'info-user'
app.config.globalProperties.api_changeinfo = domain_web + 'update-user'
app.config.globalProperties.api_changepass = domain_web + 'change-password'
app.config.globalProperties.api_lang = domain_web + 'language'
app.config.globalProperties.api_cashin = domain_web + 'cash/credit'
app.config.globalProperties.api_listcashin = domain_web + 'cash/list-credit'
app.config.globalProperties.api_cashout = domain_web + 'cash/debit'
app.config.globalProperties.api_listcashout = domain_web + 'cash/list-debit'
app.config.globalProperties.api_listpopup = domain_web + 'list-popup'
app.config.globalProperties.api_listnotifi = domain_web + 'notifacation/list'
app.config.globalProperties.api_listnotifilist = domain_web + 'noticelist'
app.config.globalProperties.api_listchat = domain_web + 'chat/list'
app.config.globalProperties.api_sendchat = domain_web + 'chat/client-send'
// app.config.globalProperties.api_listtitle = domain_web + 'chat/list-title-chat'
app.config.globalProperties.api_listtitle = domain_web + 'auto-chat/list'

app.config.globalProperties.api_resettoken = domain_web + 'refresh'
app.config.globalProperties.api_reply = domain_web + 'chat/client-reply'
app.config.globalProperties.api_delete = domain_web + 'chat/delete-chat'
app.config.globalProperties.api_number = domain_web + 'number-notifi'
app.config.globalProperties.api_listuser = domain_web + 'list-user'
app.config.globalProperties.api_registerUser = domain_web + 'create-user'
app.config.globalProperties.api_listcashin_partner = domain_web + 'number-cash'
app.config.globalProperties.api_listGift = domain_web + 'number-gift'
app.config.globalProperties.api_listconvert = domain_web + 'list-point'
app.config.globalProperties.api_pointoamout = domain_web + 'cash/point-to-amount?point='
app.config.globalProperties.api_gamecasino = domain_web + 'list-game'
app.config.globalProperties.api_liveprocess = domain_web + 'livelunch'
app.config.globalProperties.api_listcashinout = domain_web + 'cash/list'
app.config.globalProperties.api_listbetting = domain_web + 'list-betting'
app.config.globalProperties.api_listgameSlot = domain_web + 'list-game-detail?code='
app.config.globalProperties.api_listSend = domain_web + 'send/list-send'
app.config.globalProperties.api_Setting = domain_web + 'setting'
app.config.globalProperties.api_restInfo = domain_web + 'info-casino'
app.config.globalProperties.api_deleteNotify = domain_web + 'notifacation/delete-notifacation'
app.config.globalProperties.api_listFaq = domain_web + 'faq/list-faq'
app.config.globalProperties.api_listFaq_login = domain_web + 'listfaqlogin'
app.config.globalProperties.api_viewnotify = domain_web + 'notifacation/view'
app.config.globalProperties.api_delSen = domain_web + 'send/delete-send'
app.config.globalProperties.api_viewSend = domain_web + 'send/view'
app.config.globalProperties.api_viewChat = domain_web + 'chat/view'
app.config.globalProperties.api_viewall = domain_web + 'send/view-all-send'
app.config.globalProperties.api_deleteall = domain_web + 'send/delete-all-send'

app.use(store)
app.mount('#app')
