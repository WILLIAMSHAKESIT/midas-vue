<template>
    <div id="header_city8888">
        <Carousel
            class="banner-section w-ba"
            :autoplay="2000"
            :wrap-around="true"
        >
            <Slide v-for="slide in banners" :key="slide">
                <img class="banner-bg" :src="slide.imgURL" />
            </Slide>
        </Carousel>
        <header class="header-section w-ba header-city88">
            <div class="center logo-city8888">
                <router-link class="logo" v-bind:to="{ name: 'Home_city' }">
                    <div class="logo88">
                        <img class="a" src="../assets/images/logo-footer.png?v14" />
                    </div>
                </router-link>
            </div>
            <div class="container dflex-ac-jc h-100 max-width-gib header-mb">
                <div
                    :class="
                        toggleMobileMenu || rightPaneActive
                            ? 'overlay d-block'
                            : 'overlay'
                    "
                    @click="
                        (toggleMobileMenu = false), (rightPaneActive = false)
                    "
                ></div>
                <div
                    class="flex-mobile align-items-center justify-content-between p-3 w-100 centered"
                >
                    <button
                        class="mobile-toggle menu"
                        @click="toggleMobileMenu = true"
                    >
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <button
                        class="mobile-toggle user"
                        @click="rightPaneActive = true"
                    >
                        <i class="fa-solid fa-user"></i>
                    </button>
                </div>
                <ul
                    :class="
                        toggleMobileMenu
                            ? 'bs-ul main-menu sidebar-left d-flex'
                            : 'bs-ul main-menu sidebar-left'
                    "
                >
                    <li>
                        <a
                            class="dflex-ac-jc w-ba"
                            @click="showLevel"
                            v-if="level == 1 && offline == 1"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-piggy-bank"
                            />&nbsp; {{ langweb("fe.cashin") }}
                        </a>
                        <a
                            class="dflex-ac-jc w-ba"
                            data_id="1"
                            @click="showMain"
                            v-else-if="checktoken === true"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-piggy-bank"
                            />&nbsp; {{ langweb("fe.cashin") }}
                        </a>
                        <a
                            class="dflex-ac-jc w-ba"
                            v-else
                            @click="showModal = true"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-piggy-bank"
                            />&nbsp; {{ langweb("fe.cashin") }}
                        </a>
                    </li>
                    <li>
                        <a
                            class="dflex-ac-jc w-ba"
                            @click="showLevel"
                            v-if="level == 1 && offline == 1"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-piggy-bank"
                            />&nbsp; {{ langweb("fe.cashout") }}
                        </a>
                        <a
                            class="dflex-ac-jc w-ba"
                            data_id="2"
                            @click="showMain"
                            v-else-if="checktoken === true"
                        >
                            <font-awesome-icon icon="fa-solid fa-vault" />&nbsp;
                            {{ langweb("fe.cashout") }}
                        </a>
                        <a
                            class="dflex-ac-jc w-ba"
                            v-else
                            @click="showModal = true"
                        >
                            <font-awesome-icon icon="fa-solid fa-vault" />&nbsp;
                            {{ langweb("fe.cashout") }}
                        </a>
                    </li>
                    <li>
                        <a
                            class="dflex-ac-jc w-ba"
                            data_id="3"
                            @click="showMain"
                            v-if="checktoken === true"
                        >
                            <font-awesome-icon icon="fa-solid fa-bell" />&nbsp;
                            {{ langweb("fe.notification") }}
                            <sup class="number_info" v-if="notifi > 0">{{
                                notifi
                            }}</sup>
                        </a>
                        <a
                            class="dflex-ac-jc w-ba"
                            v-else
                            @click="showModal = true"
                        >
                            <font-awesome-icon icon="fa-solid fa-bell" />&nbsp;
                            {{ langweb("fe.notification") }}
                        </a>
                    </li>
                    <li>
                        <a
                            class="dflex-ac-jc w-ba"
                            data_id="4"
                            @click="showMain"
                            v-if="checktoken === true"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-comment-dots"
                            />&nbsp; {{ langweb("fe.chat") }}
                            <sup class="number_info" v-if="chat > 0">{{
                                chat
                            }}</sup>
                        </a>
                        <a
                            class="dflex-ac-jc w-ba"
                            v-else
                            @click="showModal = true"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-comment-dots"
                            />&nbsp; {{ langweb("fe.chat") }}
                        </a>
                        
                    </li>
                    <li>
                        <a
                            class="dflex-ac-jc w-ba"
                            data_id="11"
                            @click="showMain"
                            v-if="checktoken === true"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-comments"
                            />&nbsp; {{ langweb("fe.sends") }}
                            <sup class="number_info" v-if="send > 0">{{
                                send
                            }}</sup>
                        </a>
                        <a
                            class="dflex-ac-jc w-ba"
                            v-else
                            @click="showModal = true"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-comments"
                            />&nbsp; {{ langweb("fe.sends") }}
                        </a>
                    </li>
                </ul>
                <div
                    class="bal-container ml-auto"
                    :class="{ active: rightPaneActive }"
                >
                    <div class="top-form" v-if="checktoken">
                        <div class="user-money">
                            <div class="money">
                                <i class="fa-solid fa-hand-holding-dollar"></i>
                                <span>{{
                                    new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 0
                                    }).format(total_mn)
                                }}</span>
                            </div>
                            <div class="money">
                                <i class="fa-solid fa-money-bill"></i>
                                <span>{{
                                    new Intl.NumberFormat("en-US", {
                                        minimumFractionDigits: 0
                                    }).format(point)
                                }}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            data_id="5"
                            @click="showMain"
                            class="openMypage text-amber-400 bg-purple-950 hover:bg-purple-900 font-medium text-sm px-5 py-2.5 text-center leading-none whitespace-nowrap"
                        >
                            <i
                                class="fa-solid fa-circle-user text-lg text-amber-400"
                            ></i
                            >{{ nameuser }}
                        </button>
                        <button
                            type="button"
                            @click="logout"
                            class="whitespace-nowrap bg-amber-500 text-white hover:text-white hover:bg-amber-400 font-medium text-sm px-5 py-2.5 text-center leading-none"
                        >
                            <i class="fa-solid fa-right-from-bracket"></i
                            >로그아웃
                        </button>
                    </div>
                    <form
                        @submit="login"
                        method="post"
                        v-if="checkform === true"
                    >
                        <div class="before-login active">
                            <div class="desktop">
                                <div class="dflex-ac-jc gap-sm">
                                    <div class="input-panel dflex-ac-jc">
                                        <div class="icon-panel dflex-ac-jc">
                                            <font-awesome-icon
                                                icon="fa-solid fa-user-tie"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            name="username_lg"
                                            v-model="username_lg"
                                            :placeholder="
                                                langweb('fe.username')
                                            "
                                            id="username_lg"
                                            autocomplete="off"
                                        />
                                    </div>
                                    <div class="input-panel dflex-ac-jc">
                                        <div class="icon-panel dflex-ac-jc">
                                            <font-awesome-icon
                                                icon="fa-solid fa-unlock-alt"
                                            />
                                        </div>
                                        <input
                                            type="password"
                                            name="password_lg"
                                            v-model="password_lg"
                                            :placeholder="
                                                langweb('fe.passwords')
                                            "
                                            id="password_lg"
                                            autocomplete="off"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        class="register_mobile btn-red join-link"
                                        @click="showModals = true"
                                    >
                                        {{ langweb("fe.registers") }}
                                    </button>
                                    <button
                                        type="submit"
                                        class="btn-yellow login-btn"
                                    >
                                        {{ langweb("fe.login") }}
                                    </button>
                                    <button
                                        type="button"
                                        class="register_desktop btn-red join-link"
                                        @click="showModals = true"
                                    >
                                        {{ langweb("fe.registers") }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </header>
        <div id="modal-example" class="modal-vue">
            <div
                class="overlay"
                v-if="showModal"
                @click="showModal = false"
            ></div>
            <div class="modal" v-if="showModal">
                <div class="wp-modal">
                    <div class="header-modal">
                        <div class="title-header">
                            {{ langweb("fe.notification") }}
                        </div>
                        <button class="close-modal" @click="showModal = false">
                            x
                        </button>
                    </div>
                    <div class="content-modal">
                        <div
                            class="text-content"
                            v-if="level == 1 && offline == 1"
                        >
                            {{ langweb("fe.leveloffline") }}
                        </div>
                        <div class="text-content" v-else>
                            {{ langweb("fe.texts") }}
                        </div>
                    </div>
                    <div class="footer-modal">
                        <button class="config-modal" @click="showModal = false">
                            {{ langweb("fe.ok") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="subpage-wrapper show" v-if="showModals">
            <div class="subpage-container register-modal">
                <button class="close-subpage" @click="showModals = false">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <form
                    class="subpage-inner sign-up"
                    @submit="register"
                    method="POST"
                >
                    <div class="mt-4">
                        <h1 class="">{{ langweb("fe.registers") }}</h1>
                        <span>{{ langweb("fe.request") }}</span>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 p-8 gap-2">
                        <div>
                            <div class="mb-4">
                                <label for="">{{
                                    langweb("fe.referrial")
                                }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="partner_code"
                                    v-model="partner_code"
                                    autocomplete="off"
                                    :placeholder="langweb('fe.referrial')"
                                    onkeyup="this.value = this.value.replace(/[^a-zA-Z0-9가-힣]/g, '')"
                                />
                            </div>
                            <div class="mb-4">
                                <label for="">{{
                                    langweb("fe.yournickname")
                                }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="name"
                                    autocomplete="off"
                                    v-model="name"
                                    :placeholder="
                                        langweb('fe.yournickname') + ' *'
                                    "
                                    onkeyup="this.value = this.value.replace(/[^a-zA-Z0-9가-힣]/g, '')"
                                />
                            </div>
                            <div class="mb-4">
                                <label for="">{{ langweb("fe.yourid") }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="username"
                                    autocomplete="off"
                                    v-model="username"
                                    :placeholder="langweb('fe.yourid') + ' *'"
                                    onkeyup="this.value = this.value.replace(/[^a-zA-Z0-9가-힣]/g, '')"
                                />
                            </div>
                            <div class="mb-4">
                                <label for="">{{
                                    langweb("fe.passwords")
                                }}</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name="password"
                                    autocomplete="off"
                                    v-model="password"
                                    :placeholder="
                                        langweb('fe.passwords') + ' *'
                                    "
                                    onkeyup="this.value = this.value.replace(/[^a-zA-Z0-9!@#]/g, '')"
                                />
                            </div>
                            <div class="mb-4">
                                <label for="">{{
                                    langweb("fe.confirmpassword")
                                }}</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name="password_confirm"
                                    autocomplete="off"
                                    v-model="password_confirm"
                                    :placeholder="
                                        langweb('fe.confirmpassword') + ' *'
                                    "
                                    onkeyup="this.value = this.value.replace(/[^a-zA-Z0-9!@#]/g, '')"
                                />
                            </div>
                        </div>
                        <div>
                            <div class="mb-4">
                                <label for="">{{
                                    langweb("fe.numbercash")
                                }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="number_cash"
                                    autocomplete="off"
                                    v-model="number_cash"
                                    :placeholder="
                                        langweb('fe.numbercash') + ' *'
                                    "
                                    onkeyup="this.value = this.value.replace(/[^a-zA-Z0-9가-힣]/g, '')"
                                />
                            </div>
                            <div class="mb-4">
                                <label for="">{{ langweb("fe.phone") }}</label>
                                <input
                                    type="number"
                                    name="phone"
                                    autocomplete="off"
                                    v-model="phone"
                                    maxlength="11"
                                    class="phonerg form-control"
                                    :placeholder="langweb('fe.phone')"
                                    onkeyup="this.value = this.value.replace(/[^a-zA-Z0-9가-힣]/g, '')"
                                />
                            </div>
                            <div class="mb-4">
                                <label for="">{{
                                    langweb("fe.namebank")
                                }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="name_bank"
                                    autocomplete="off"
                                    v-model="name_bank"
                                    :placeholder="langweb('fe.namebank')"
                                    onkeyup="this.value = this.value.replace(/[^a-zA-Z0-9가-힣]/g, '')"
                                />
                            </div>
                            <div class="mb-4">
                                <label for="">{{
                                    langweb("fe.numberbank")
                                }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="number_bank"
                                    autocomplete="off"
                                    v-model="number_bank"
                                    :placeholder="langweb('fe.numberbank')"
                                    onkeyup="this.value = this.value.replace(/[^a-zA-Z0-9가-힣]/g, '')"
                                />
                            </div>
                            <div class="mb-4">
                                <label for="">{{
                                    langweb("fe.userbank")
                                }}</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="user_bank"
                                    autocomplete="off"
                                    v-model="user_bank"
                                    :placeholder="langweb('fe.userbank')"
                                    onkeyup="this.value = this.value.replace(/[^a-zA-Z0-9가-힣]/g, '')"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex items-center justify-center">
                        <button class="btn btn-primary mx-auto">
                            {{ langweb("fe.signup") }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <!-- <button id="pagetop" v-show="scY > 300" @click="toTop" class="scroll-top w-ba"><font-awesome-icon icon="fa-solid fa-caret-up" /></button> -->
        <div class="lang-web" style="display: none">
            <a @click="clickEn"><img src="../assets/images/en.svg" alt="" /></a>
            <a @click="clickKr"><img src="../assets/images/kr.svg" alt="" /></a>
        </div>
        <div
            :class="'root-popupshow ' + showpp + ' ' + cssnone"
            v-if="checkTk != null"
        >
            <div class="container">
                <div class="row" style="justify-content: center">
                    <div
                        :class="'item_popup_show itemremove' + item.id"
                        v-for="(item, index) in listpopup"
                        v-bind:key="index"
                        :style="
                            'width:' +
                            item.width +
                            'px;height:' +
                            item.height +
                            'px'
                        "
                    >
                        <div class="itempopup_child">
                            <p class="st_popup">
                                {{ langweb("fe.notification") }}
                            </p>
                            <div class="contentpp_edit">
                                <p class="titlepopup">{{ item.title }}</p>
                                <div
                                    class="csstext-popup"
                                    v-if="!readMore[index]"
                                    v-html="item.content.substring(0, 150)"
                                ></div>
                                <div
                                    class="csstext-popup"
                                    v-if="readMore[index]"
                                    v-html="item.content"
                                ></div>
                                <p
                                    @click="showMore(index)"
                                    v-if="
                                        !readMore[index] &&
                                        item.content.length > 150
                                    "
                                    class="showmore"
                                >
                                    {{ langweb("fe.seemore") }}
                                </p>
                                <p
                                    @click="showLess(index)"
                                    v-if="readMore[index]"
                                    class="lessmore"
                                >
                                    {{ langweb("fe.showless") }}
                                </p>
                            </div>
                        </div>
                        <div class="btn_close_pp">
                            <button
                                class="hidden_popup"
                                @click="hidden_pp"
                                :data_id="item.id"
                            >
                                {{ langweb("fe.missing") }}
                            </button>
                            <button class="delete_popup">
                                {{ langweb("fe.close") }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- cash in, list cash in, cash out, list cash out, notification, chat -->
        <div class="subpage-wrapper popupMain">
            <div class="subpage-container">
                <button class="close-subpage" @click="closePopup">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="subpage-inner">
                    <img
                        src="../assets/img/bg/modal-brick.jpg"
                        class="modal-brick"
                    />
                    <div class="modal-contents">
                        <div class="side-menu">
                            <div class="sidemenu-header">선택 목록</div>
                            <div class="menu">
                                <a
                                    href="#"
                                    class="menu-item"
                                    data_tab="tab1"
                                    @click="changeTab('tab1')"
                                    ><i class="fa-solid fa-piggy-bank"></i
                                    >{{ langweb("fe.cashin") }}</a
                                >
                                <a
                                    href="#"
                                    class="menu-item"
                                    data_tab="tab3"
                                    @click="changeTab('tab3')"
                                    ><i class="fa-solid fa-vault"></i
                                    >{{ langweb("fe.cashout") }}</a
                                >
                                <a
                                    href="#"
                                    class="menu-item"
                                    data_tab="tab4"
                                    @click="changeTab('tab4')"
                                    ><i class="fa-solid fa-list"></i
                                    >{{ langweb("fe.history") }}</a
                                >
                                <a
                                    href="#"
                                    class="menu-item"
                                    data_tab="tab8"
                                    @click="changeTab('tab8')"
                                    ><i
                                        class="fa-solid fa-money-bill-transfer"
                                    ></i
                                    >{{ langweb("fe.pointtoamount") }}</a
                                >
                                <a
                                    href="#"
                                    class="menu-item"
                                    data_tab="tab5"
                                    @click="changeTab('tab5')"
                                    ><i class="fa-solid fa-bell"></i
                                    >{{ langweb("fe.notification") }}</a
                                >
                                <a
                                    href="#"
                                    class="menu-item"
                                    data_tab="tab6"
                                    @click="changeTab('tab6')"
                                    ><i class="fa-solid fa-comment-dots"></i
                                    >{{ langweb("fe.chat") }}</a
                                >
                                <a
                                    href="#"
                                    class="menu-item"
                                    data_tab="tab11"
                                    @click="changeTab('tab11')"
                                    ><i class="fa-solid fa-comments"></i
                                    >{{ langweb("fe.sends") }}</a
                                >
                                <a
                                    href="#"
                                    class="menu-item"
                                    data_tab="tab7"
                                    @click="changeTab('tab7')"
                                    ><i class="fa-solid fa-circle-info"></i
                                    >{{ langweb("fe.info") }}</a
                                >
                                <a
                                    href="#"
                                    class="menu-item"
                                    data_tab="tab9"
                                    @click="changeTab('tab9')"
                                    ><i
                                        class="fa-solid fa-clock-rotate-left"
                                    ></i
                                    >{{ langweb("fe.betting") }}</a
                                >
                                <a
                                    href="#"
                                    class="menu-item"
                                    data_tab="tab10"
                                    @click="changeTab('tab10')"
                                    ><i class="fa-solid fa-gift"></i
                                    >{{ langweb("fe.gift") }}</a
                                >
                            </div>
                        </div>
                        <div class="subpage-content">
                            <div class="subpagecontent-header">
                                {{ tabTitle }}
                            </div>
                            <div class="content">
                                <div
                                    id="deposit"
                                    class="active tab1"
                                    v-if="tabSelected === 'tab1'"
                                >
                                    <Cashin_city />
                                </div>
                                <div
                                    id="withdraw"
                                    class="active tab3"
                                    v-if="tabSelected === 'tab3'"
                                >
                                    <Cashout_city />
                                </div>
                                <div
                                    id="announcement"
                                    class="table-responsive active tab5"
                                    v-if="tabSelected === 'tab5'"
                                >
                                    <Notification_city />
                                </div>
                                <div
                                    id="conversion"
                                    class="active tab8"
                                    v-if="tabSelected === 'tab8'"
                                >
                                    <PointToAmount_city />
                                </div>
                                <div
                                    id="inquiry"
                                    class="table-responsive active tab6"
                                    v-if="tabSelected === 'tab6'"
                                >
                                    <Chat_city />
                                    <Contact_city />
                                </div>
                                <div
                                    id="note"
                                    class="active tab11"
                                    v-if="tabSelected === 'tab11'"
                                >
                                    <Send_city />
                                </div>
                                <div
                                    id="transaction-details"
                                    class="table-responsive active tab4"
                                    v-if="tabSelected === 'tab4'"
                                >
                                    <ListCashout_city />
                                </div>
                                <div
                                    id="mypage"
                                    class="active tab7"
                                    v-if="tabSelected === 'tab7'"
                                >
                                    <ChangeInfo_city />
                                </div>
                                <div
                                    id="betting-details"
                                    class="table-responsive active tab9"
                                    v-if="tabSelected === 'tab9'"
                                >
                                    <Betting_city />
                                </div>
                                <div
                                    id="coupon"
                                    class="table-responsive active tab10"
                                    v-if="tabSelected === 'tab10'"
                                >
                                    <Gift_city />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end cash in, list cash in, cash out, list cash out, notification, chat -->
        <audio id="audio_send" v-if="audioSend == 1" autoplay loop>
            <source src="../assets/images/sms_cash_in.wav" type="audio/mpeg" />
        </audio>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

import Cashin_city from "@/components/Cashin";
// import ListCashin_city from "@/components/ListCashIn";
import Cashout_city from "@/components/Cashout";
import ListCashout_city from "@/components/ListCashOut";
import Notification_city from "@/components/Notification";
import Chat_city from "@/components/ChatList";
import Contact_city from "@/components/SendChat";
import ChangeInfo_city from "@/components/ChangeInfo";
import PointToAmount_city from "@/components/PointToAmount";
import Betting_city from "@/components/Betting";
import Gift_city from "@/components/Gift";
import Send_city from "@/components/Send";

import { useStore } from "vuex";
import { computed } from "vue";
import $ from "jquery";
$(document).ready(function () {
    $(document).on("click", ".delete_popup", function () {
        $(this).parent().parent().remove();
        let length = $(".root-popupshow .item_popup_show").length;
        if (length < 1) {
            $(".root-popupshow").hide();
            $(".root-popupshow").removeClass("active");
        }
    });
});
export default {
    name: "Header_city",
    setup() {
        const store = useStore();
        const lang = computed(() => store.state.lang);
        const lang_en = computed(() => store.state.language);
        store.dispatch("changLang");
        return {
            langweb(variable) {
                lang.value.filter(function (e) {
                    if (e.variable == variable) {
                        if (lang_en.value == "en") {
                            variable = e.en;
                        } else {
                            variable = e.kr;
                        }
                    }
                });
                return variable;
            },
            clickEn() {
                store.commit("clickEn");
            },
            clickKr() {
                store.commit("clickKr");
            }
        };
    },
    data() {
        return {
            toggleMobileMenu: false,
            tabTitle: "",
            showModal: false,
            showModals: false,
            showpopup: false,
            scTimer: 0,
            scY: 0,
            partner_code: "",
            name: "",
            username: "",
            password: "",
            password_confirm: "",
            number_cash: "",
            phone: "",
            name_bank: "",
            number_bank: "",
            user_bank: "",
            error: false,
            username_lg: "",
            password_lg: "",
            token: "",
            checktoken: false,
            checkform: true,
            amount: "",
            point: "",
            casino: "",
            result: "",
            nameuser: "",
            notifi: "",
            popup: "",
            chat: "",
            send: "",
            listpopup: [],
            readMore: [false],
            checkTk: window.localStorage.getItem("token"),
            showpp: "",
            cssnone: "displaynone",
            tabSelected: "tab1",
            set: 0,
            listSendPopup: [],
            id_lg: "",
            level: window.localStorage.getItem("level"),
            offline: window.localStorage.getItem("offline"),
            total_mn: "",
            listSend_header: [],
            audioSend: 0,
            banners: [
                {
                    imgURL: require("@/assets/img/banner/slide1.jpg")
                },
                {
                    imgURL: require("@/assets/img/banner/slide2.jpg")
                },
                {
                    imgURL: require("@/assets/img/banner/slide3.jpg")
                }
            ],
            rightPaneActive: false
        };
    },
    mounted() {
        // window.addEventListener('scroll', this.handleScroll)
        this.token = window.localStorage.getItem("token");
        if (this.token !== null) {
            this.checktoken = true;
            this.checkform = false;
        }
    },
    created() {
        this.token = window.localStorage.getItem("token");
        if (this.token !== null) {
            this.getListInfo();
            this.getNumberinfo();
            this.getListPopup();
            this.resettoken();
            setInterval(this.getListInfo, 30000);
            setInterval(this.getNumberinfo, 30000);
            this.getListSendpp();
            this.getListSend();
        }
    },
    components: {
        Cashin_city,
        // ListCashin_city,
        Cashout_city,
        ListCashout_city,
        Notification_city,
        Chat_city,
        Contact_city,
        ChangeInfo_city,
        PointToAmount_city,
        Betting_city,
        Gift_city,
        Send_city,
        Carousel,
        Slide
    },
    methods: {
        // handleScroll () {
        //     if (this.scTimer) return
        //     this.scTimer = setTimeout(() => {
        //     this.scY = window.scrollY
        //     clearTimeout(this.scTimer)
        //     this.scTimer = 0
        //     }, 100)
        // },
        // toTop () {
        //     window.scrollTo({
        //         top: 0,
        //         behavior: "smooth"
        //     })
        // },
        test() {
            console.log("test");
        },
        register(e) {
            e.preventDefault();
            this.axios
                .post(this.api_register, {
                    partner_code: this.partner_code,
                    name: this.name,
                    username: this.username,
                    password: this.password,
                    password_confirm: this.password_confirm,
                    number_cash: this.number_cash,
                    phone: this.phone,
                    name_bank: this.name_bank,
                    number_bank: this.number_bank,
                    user_bank: this.user_bank
                })
                .then((res) => {
                    if (res.data.success === true) {
                        this.$swal({
                            position: "top-end",
                            icon: "success",
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        this.showModals = false;
                        this.partner_code =
                            this.name =
                            this.username =
                            this.password =
                            this.password_confirm =
                            this.number_cash =
                            this.phone =
                            this.name_bank =
                            this.number_bank =
                            this.user_bank =
                                "";
                        e.target.reset();
                    } else {
                        this.$swal({
                            position: "top-end",
                            icon: "error",
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                })
                .catch((e) => {
                    if (e.response.status === 404) {
                        this.$swal({
                            position: "top-end",
                            icon: "error",
                            title: e.response.data.message,
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                });
        },
        login(e) {
            e.preventDefault();
            this.axios
                .post(this.api_login, {
                    username: this.username_lg,
                    password: this.password_lg
                })
                .then((res) => {
                    if (res.data.success === true) {
                        window.localStorage.setItem(
                            "token",
                            res.data.data.token
                        );
                        window.localStorage.setItem(
                            "level",
                            res.data.data.user.level
                        );
                        window.localStorage.setItem(
                            "offline",
                            res.data.data.user.offline
                        );
                        let today = new Date();
                        let date =
                            today.getFullYear() +
                            "-" +
                            (today.getMonth() + 1) +
                            "-" +
                            today.getDate();
                        let time =
                            today.getHours() +
                            ":" +
                            today.getMinutes() +
                            ":" +
                            today.getSeconds();
                        let timestamp = date + " " + time;
                        window.localStorage.setItem("time_token", timestamp);
                        this.checkform = false;
                        this.checktoken = true;
                        this.$swal({
                            position: "top-end",
                            icon: "success",
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        this.username_lg = this.password_lg = "";
                        window.location.href = "/";
                    } else {
                        this.$swal({
                            position: "top-end",
                            icon: "error",
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                })
                .catch((e) => {
                    if (e.response.status === 404) {
                        this.$swal({
                            position: "top-end",
                            icon: "error",
                            title: e.response.data.message,
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                });
        },
        logout(e) {
            e.preventDefault();
            this.axios
                .post(
                    this.api_logout,
                    {},
                    {
                        headers: {
                            Authorization:
                                "Bearer " + window.localStorage.getItem("token")
                        }
                    }
                )
                .then((res) => {
                    if (res.data.success === true) {
                        this.checktoken = false;
                        this.checkform = true;
                        localStorage.clear();
                        this.$swal({
                            position: "top-end",
                            icon: "success",
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 4000
                        });
                        window.location.href = "/";
                    }
                });
        },
        getListInfo() {
            this.axios
                .get(this.api_infouser, {
                    headers: {
                        Authorization:
                            "Bearer " + window.localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    this.amount = response.data.data.user.amount;
                    this.point = response.data.data.user.point;
                    this.casino = response.data.data.user.casino;
                    this.nameuser = response.data.data.user.name;
                    this.total_mn = Number(this.amount) + Number(this.casino);
                })
                .catch((e) => {
                    if (e.response.status === 401) {
                        this.$swal({
                            position: "top-end",
                            icon: "error",
                            title: e.response.data.message,
                            showConfirmButton: false,
                            timer: 11000
                        });
                        setTimeout(
                            function () {
                                this.axios
                                    .post(this.api_logout, {})
                                    .then((res) => {
                                        if (res.data.success === true) {
                                            this.checktoken = false;
                                            this.checkform = true;
                                            localStorage.clear();
                                        }
                                    });
                            }.bind(this),
                            10000
                        );
                        setTimeout(function () {
                            window.location.href = "/";
                        }, 13000);
                    }
                });
        },
        click_login() {
            this.$swal({
                position: "top-end",
                icon: "error",
                title: "먼저 로그인해야 합니다",
                showConfirmButton: false,
                timer: 3000
            });
        },
        resettoken() {
            if (window.localStorage.getItem("token") !== null) {
                let timetk = window.localStorage.getItem("time_token");
                let today = new Date();
                let date =
                    today.getFullYear() +
                    "-" +
                    (today.getMonth() + 1) +
                    "-" +
                    today.getDate();
                let time =
                    today.getHours() +
                    ":" +
                    today.getMinutes() +
                    ":" +
                    today.getSeconds();
                let timestamp = date + " " + time;
                let timereset =
                    Math.round(+new Date(timestamp) / 1000) -
                    Math.round(+new Date(timetk) / 1000);
                let result = timereset / 60;
                if (result > 60) {
                    this.axios.post(this.api_logout).then((res) => {
                        if (res.data.success === true) {
                            this.checktoken = false;
                            this.checkform = true;
                            localStorage.clear();
                            window.location.href = "/";
                        }
                    });
                    // this.axios.get(this.api_resettoken, {
                    //     headers: {
                    //         Authorization: 'Bearer ' + window.localStorage.getItem('token')
                    //     }
                    // }).then((response) => {
                    //     window.localStorage.setItem('token', response.data.data)
                    //     let today = new Date();
                    //     let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
                    //     let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    //     let timestamp = date + ' ' + time;
                    //     window.localStorage.setItem('time_token', timestamp)
                    // }).catch(e => {
                    //     if (e?.response?.status === 500) {
                    //         alert('세션이 종료되었습니다. 계속하려면 로그인하세요.')
                    //         localStorage.clear();
                    //         window.location.href = '/'
                    //     }
                    // })
                }
            }
        },
        getNumberinfo() {
            this.axios
                .get(this.api_number, {
                    headers: {
                        Authorization:
                            "Bearer " + window.localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    this.notifi = response.data.data.notifi;
                    this.popup = response.data.data.popup;
                    this.chat = response.data.data.chat;
                    this.send = response.data.data.send;
                });
        },
        setNumbernotifi() {
            this.notifi = "0";
        },
        setNumberpopup() {
            this.popup = "0";
            this.showpopup = true;
            this.showpp = "active";
        },
        setNumberchat() {
            this.chat = "0";
        },
        getListPopup() {
            var token_user = window.localStorage.getItem("token");
            this.axios
                .get(this.api_listpopup, {
                    headers: {
                        Authorization: "Bearer " + token_user
                    }
                })
                .then((response) => {
                    response.data.data.list_data.forEach((item) => {
                        if (this.$cookies.get(item.id) !== "close") {
                            this.listpopup.push(item);
                        }
                        if (this.listpopup.length > 0) {
                            this.cssnone = "";
                        }
                    });
                });
        },
        showMore(index) {
            this.readMore[index] = true;
        },
        showLess(index) {
            this.readMore[index] = false;
        },
        changeTab(tab) {
            this.tabSelected = tab;
            this.tabTitle = event.target.textContent;
            var datatab = $("." + tab).attr("data_tab");
            if (datatab == "tab1") {
                this.set = 1;
            } else if (datatab == "tab2") {
                this.set = 2;
            } else if (datatab == "tab3") {
                this.set = 3;
            } else if (datatab == "tab4") {
                this.set = 4;
            } else if (datatab == "tab5") {
                this.set = 5;
            } else if (datatab == "tab6") {
                this.set = 6;
            } else if (datatab == "tab7") {
                this.set = 7;
            } else if (datatab == "tab8") {
                this.set = 8;
            } else if (datatab == "tab9") {
                this.set = 9;
            } else if (datatab == "tab10") {
                this.set = 10;
            } else {
                this.set = 11;
            }
        },
        hidden_pp(event) {
            let idpp = event.target.getAttribute("data_id");
            this.$cookies.set(idpp, "close", "1d");
            $(".itemremove" + idpp).remove();
            let length = $(".root-popupshow .item_popup_show").length;
            if (length < 1) {
                $(".root-popupshow").hide();
                $(".root-popupshow").removeClass("active");
            }
        },
        showMain(event) {
            var id = Number(event.target.getAttribute("data_id"));
            const title = event.target.textContent;
            this.tabTitle = title;
            if (id === 1) {
                this.tabSelected = "tab1";
            } else if (id === 2) {
                this.tabSelected = "tab3";
            } else if (id === 3) {
                this.notifi = "0";
                this.tabSelected = "tab5";
            } else if (id === 4) {
                this.chat = "0";
                this.tabSelected = "tab6";
            } else if (id === 5) {
                this.tabSelected = "tab7";
            } else if (id === 6) {
                this.tabSelected = "tab8";
            } else {
                this.tabSelected = "tab11";
            }
            $(".popupMain").show();
            $("body").css("overflow", "hidden");
            this.toggleMobileMenu = false;
        },
        closePopup() {
            $(".popupMain").hide();
            $("body").css("overflow", "initial");
        },
        getListSendpp() {
            this.axios
                .get(this.api_listSend, {
                    headers: {
                        Authorization:
                            "Bearer " + window.localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    this.listSendPopup = response.data.data.list_data;
                    this.id_lg = response.data.data.user_id;
                    // this.listSendPopup.forEach((value) => {
                    //     let checkSend = Object.values(value.user_view.split(',').map((e) => parseInt(e))).includes(this.id_lg)
                    //     if(!checkSend){
                    //         this.tabSelected = 'tab11'
                    //         $('.popupMain').show();
                    //         $('body').css('overflow', 'hidden')
                    //         return;
                    //     }
                    // });
                    const array = this.listSendPopup;
                    let shouldExit = false;

                    array.forEach((value) => {
                        if (shouldExit) {
                            return; // Exit the loop
                        }
                        let checkSend = Object.values(
                            value.user_view.split(",").map((e) => parseInt(e))
                        ).includes(this.id_lg);
                        if (!checkSend) {
                            $(".popupMain").show();
                            $("body").css("overflow", "hidden");
                            this.tabSelected = "tab11";
                            shouldExit = true; // Set the flag to exit
                            return;
                        }
                    });
                });
        },
        showLevel() {
            this.showModal = true;
        },
        getListSend() {
            this.axios
                .get(this.api_listSend, {
                    headers: {
                        Authorization:
                            "Bearer " + window.localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    this.listSend_header = response.data.data.list_data;
                    this.id_lg = response.data.data.user_id;
                    const array = this.listSend_header;
                    let shouldExit = false;

                    array.forEach((value) => {
                        if (shouldExit) {
                            return; // Exit the loop
                        }
                        let checkSend = Object.values(
                            value.user_view.split(",").map((e) => parseInt(e))
                        ).includes(this.id_lg);
                        // console.log(checkSend);
                        if (!checkSend) {
                            this.audioSend = 1;
                            shouldExit = true; // Set the flag to exit
                            return;
                        } else {
                            this.audioSend = 0;
                        }
                    });
                });
        },
        change_amount_header() {
            this.axios
                .get(this.api_infouser, {
                    headers: {
                        Authorization:
                            "Bearer " + window.localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    this.amount = response.data.data.user.amount;
                    this.point = response.data.data.user.point;
                    this.casino = response.data.data.user.casino;
                    this.nameuser = response.data.data.user.name;
                    this.total_mn = Number(this.amount) + Number(this.casino);
                });
        }
    }
};
</script>
<style></style>
