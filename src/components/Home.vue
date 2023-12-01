<template>
    <div class="wraper-root">
        <Carousel class="banner-section w-ba" :autoplay="2000" :wrap-around="true">
            <Slide v-for="slide in banners" :key="slide">
                <img class="banner-bg" :src="slide.imgURL" />
            </Slide>
        </Carousel>
        <main class="page-content w-ba" id="games-section">
            <section class="toggle-section">
                <div class="container">
                    <div class="main-tab">
                        <a href="javascript:void(0)"  @click="$store.commit('changeTab', 'casino')">
                            <img src="../assets/img/elements/casino-img.png" alt="">
                            <div class="box-bg">
                                <div class="box-text left">
                                    <div>라이브카지노<i class="fa-solid fa-arrow-right-long"></i></div>
                                    <span>세계 최고의 카지노 게임들을 만나보세요.</span>
                                </div>
                                <img src="../assets/img/elements/casino-button-bg.png" alt="">
                            </div>
                        </a>
                        <a href="javascript:void(0)"  @click="$store.commit('changeTab', 'slot')">
                            <img src="../assets/img/elements/slot-img.png" alt="">
                            <div class="box-bg">
                                <div class="box-text right">
                                    <div><i class="fa-solid fa-arrow-left-long"></i>슬롯 게임</div>
                                    <span>최고의 슬롯 게임에서 잭팟을 도전하세요.</span>
                                </div>
                                <img src="../assets/img/elements/slot-button-bg.png" alt="">
                            </div>
                        </a>
                    </div> 
                </div>
                <div class="tab-content-toogle game-list">
                    <section class="game-provider">
                        <div class="container max-width-gib">
                            <div class="tab1" v-if="gameTab === 'casino'">
                                <div class="casino-section sc-section">
                                    <div class="w-100 game-card-parent casino">
                                        <a href="javascript:void(0)" v-for="(item, index) in listGameCasino" :key="index" class="game-card animate__animated animate__fadeIn">
                                            <div class="game-card-body">
                                                <img :src="item.image3" alt="">
                                            </div>  
                                            <div class="game-card-overlay">
                                                <div class="game-title">
                                                    <img :src="item.image2" alt="">
                                                    <h6>레드골드</h6>
                                                </div>
                                                <button type="button" class=""  v-if="token === null" @click="showModal = true">
                                                    <i class="fa-solid fa-play"></i>
                                                </button>
                                                <button type="button" class="" v-else-if="item.maintenance == 1" @click="getMaintenance()">
                                                    <i class="fa-solid fa-play"></i>
                                                </button>
                                                <button type="button" class="" v-else @click=" getGameProcess(item.vender,item.code,1)">
                                                    <i class="fa-solid fa-play"></i>
                                                </button>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="tab2" v-if="gameTab === 'slot'">
                                <div class="slot-section sc-section active">
                                    <div class="game-card-parent slot w-100">
                                        <a href="javascript:void(0)" v-for="(item, index) in listGameSlot" :key="index" class="game-card animate__animated animate__fadeIn">
                                            <div class="game-card-body">
                                                <img :src="item.image3" alt="">
                                            </div>  
                                            <div class="game-card-overlay">
                                                <div class="game-title">
                                                    <img :src="item.image2" alt="">
                                                    <h6>레드골드</h6>
                                                </div>
                                                <button type="button" class=""  v-if="token === null" @click="showModal = true">
                                                    <i class="fa-solid fa-play"></i>
                                                </button>
                                                <button type="button" class="" v-else-if="item.maintenance == 1" @click="getMaintenance()">
                                                    <i class="fa-solid fa-play"></i>
                                                </button>
                                                <button type="button" class="" :data_name="item.title" :data_id="item.code" v-else @click="showItemGame">
                                                    <i class="fa-solid fa-play"></i>
                                                </button>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <input type="hidden" name="datacode" class="datacode" value="0" />
            <div
                id="loading_show"
                class="loading_show"
                style="
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    top: 0%;
                    right: 0%;
                    text-align: center;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 999999999;
                "
            >
                <div class="windows8">
                    <img src="../assets/img/icons/loader.svg" alt="" />
                </div>
            </div>
            <section class="board-section w-ba">
                <div class="container max-width-gib dflex-ac-jc">
                    <div class="board-panel event">
                        <div class="header dflex-ac-jc w-b">
                            <div class="title-panel dflex-ac-jc mr-auto">
                                <div class="icon-panel dflex-ac-jc">
                                    <img
                                        src="../assets/img/icons/faq-icon.png"
                                    />
                                </div>
                                <span>{{ langweb("fe.faq") }}</span>
                            </div>
                            <button class="more-btn event-link dflex-ac-jc">전체보기</button>
                        </div>
                        <div class="content w-b btm-event-section">
                            <table class="w-100">
                                <tbody>
                                    <tr>
                                        <td>
                                            <a
                                                href="javascript:void(0);"
                                                class="notifyhome_clicks"
                                                >Title</a
                                            >
                                            <div
                                                class="substring_content_tbss hideppss"
                                                style="color: #fff"
                                            >
                                                <div class="flex_popup">
                                                    <div class="showtb">
                                                        <div
                                                            class="height_scroll"
                                                        >
                                                            <p
                                                                class="titlenoti"
                                                            >
                                                                Title
                                                            </p>
                                                            <div
                                                                class="content_tb"
                                                            >
                                                                Some contents
                                                            </div>
                                                        </div>
                                                        <button
                                                            class="close_notiss"
                                                            type="button"
                                                        >
                                                            <img
                                                                src="../assets/images/closes.svg"
                                                                alt=""
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="date-td text-right">
                                            2023-11-28
                                        </td>
                                    </tr>
                                    <tr
                                        v-for="(item, index) in listFaq.slice(
                                            0,
                                            5
                                        )"
                                        v-bind:key="index"
                                    >
                                        <td class="text-left">
                                            <a
                                                href="javascript:void(0);"
                                                v-if="token !== null"
                                                class="notifyhome_clicks"
                                                >{{
                                                    item.title.substring(0, 25)
                                                }}</a
                                            >
                                            <a
                                                href="javascript:void(0);"
                                                v-else
                                                @click="showModal = true"
                                                >{{
                                                    item.title.substring(0, 25)
                                                }}</a
                                            >
                                            <div
                                                class="substring_content_tbss hideppss"
                                                style="color: #fff"
                                            >
                                                <div class="flex_popup">
                                                    <div class="showtb">
                                                        <div
                                                            class="height_scroll"
                                                        >
                                                            <p
                                                                class="titlenoti"
                                                            >
                                                                {{ item.title }}
                                                            </p>
                                                            <div
                                                                v-html="
                                                                    item.content
                                                                "
                                                                class="content_tb"
                                                            ></div>
                                                        </div>
                                                        <button
                                                            class="close_notiss"
                                                            type="button"
                                                        >
                                                            <img
                                                                src="../assets/images/closes.svg"
                                                                alt=""
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <!-- <td class="date-td text-right">{{ item.created_at.substring(0, 10)}}</td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="realtime-board w-ba btm-finance-section">
                        <div class="realtime-nav dflex-ac-jc">
                            <button type="button" v-bind:class="{ active: tabSelecteds == 'tab3' }" v-on:click="changeTabs('tab3')">
                                {{ langweb("fe.tabco") }}
                            </button>
                            <button type="button" v-bind:class="{ active: tabSelecteds == 'tab4' }" v-on:click="changeTabs('tab4')">
                                {{ langweb("fe.tabci") }}
                            </button>
                        </div>
                        <div class="content w-ba">
                            <div
                                class="rolling-realtime withdraw-realtime active"
                                v-if="tabSelecteds === 'tab3'"
                            >
                                <marquee
                                    direction="up"
                                    scrolldelay="200"
                                    height="236px"
                                >
                                    <ul>
                                        <li
                                            class="tr item_center"
                                            v-for="(
                                                item, index
                                            ) in listCashouthome"
                                            v-bind:key="index"
                                        >
                                            <div class="user">
                                                <span>
                                                    {{ item.fullname }}
                                                </span>
                                            </div>
                                            <div class="amount">
                                                <span
                                                    >{{
                                                        new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 0
                                                            }
                                                        ).format(item.amount)
                                                    }}
                                                    원</span
                                                >
                                            </div>
                                            <!--<div class="date">
                                                <span>{{ item.created_at }}</span>
                                            </div> -->
                                        </li>
                                    </ul>
                                </marquee>
                            </div>
                            <div
                                class="rolling-realtime deposit-realtime"
                                v-if="tabSelecteds === 'tab4'"
                            >
                                <marquee
                                    direction="up"
                                    duration="6000"
                                    height="236px"
                                >
                                    <ul>
                                        <li
                                            class="tr item_center"
                                            v-for="(
                                                items, indexs
                                            ) in listcashinhome"
                                            v-bind:key="indexs"
                                        >
                                            <div class="user">
                                                <span>
                                                    {{ items.fullname }}
                                                </span>
                                            </div>
                                            <div class="amount">
                                                <span
                                                    >{{
                                                        new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                minimumFractionDigits: 0
                                                            }
                                                        ).format(items.amount)
                                                    }}
                                                    원</span
                                                >
                                            </div>
                                            <!-- <div class="date">
                                                <span>{{ items.created_at }}</span>
                                            </div> -->
                                        </li>
                                    </ul>
                                </marquee>
                            </div>
                        </div>
                    </div>

                    <div class="board-panel notice">
                        <div class="header dflex-ac-jc w-b">
                            <div class="title-panel dflex-ac-jc mr-auto">
                                <div class="icon-panel">
                                    <img
                                        src="../assets/img/icons/announcement-icon.png"
                                        class="img_loahome"
                                    />
                                </div>
                                <span>{{ langweb("fe.notification") }}</span>
                            </div>
                            <button class="more-btn notice-link dflex-ac-jc">전체보기</button>
                        </div>
                        <div class="content w-b btm-notice-section">
                            <table class="w-100">
                                <tbody>
                                    <tr>
                                        <td class="text-left">
                                            <a
                                                href="javascript:void(0);"
                                                class="notifyhome_click"
                                                @click="showModal = true"
                                                >Title</a
                                            >
                                            <div
                                                class="substring_content_tbs hidepps"
                                                style="color: #fff"
                                            >
                                                <div class="flex_popup">
                                                    <div class="showtb">
                                                        <div
                                                            class="height_scroll"
                                                        >
                                                            <p
                                                                class="titlenoti"
                                                            >
                                                                Title
                                                            </p>
                                                            <div
                                                                class="content_tb"
                                                            >
                                                                Some Content
                                                            </div>
                                                        </div>
                                                        <button
                                                            class="close_notis"
                                                            type="button"
                                                        >
                                                            <img
                                                                src="../assets/images/closes.svg"
                                                                alt=""
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="date-td">2023-11-28</td>
                                    </tr>
                                    <tr
                                        v-for="(
                                            item, index
                                        ) in listnotifihome.slice(0, 5)"
                                        v-bind:key="index"
                                    >
                                        <td class="text-left">
                                            <a
                                                href="javascript:void(0);"
                                                v-if="token !== null"
                                                class="notifyhome_click"
                                                >{{
                                                    item.title.substring(0, 25)
                                                }}</a
                                            >
                                            <a
                                                href="javascript:void(0);"
                                                v-else
                                                @click="showModal = true"
                                                >{{
                                                    item.title.substring(0, 25)
                                                }}</a
                                            >
                                            <div
                                                class="substring_content_tbs hidepps"
                                                style="color: #fff"
                                            >
                                                <div class="flex_popup">
                                                    <div class="showtb">
                                                        <div
                                                            class="height_scroll"
                                                        >
                                                            <p
                                                                class="titlenoti"
                                                            >
                                                                {{ item.title }}
                                                            </p>
                                                            <div
                                                                v-html="
                                                                    item.content
                                                                "
                                                                class="content_tb"
                                                            ></div>
                                                        </div>
                                                        <button
                                                            class="close_notis"
                                                            type="button"
                                                        >
                                                            <img
                                                                src="../assets/images/closes.svg"
                                                                alt=""
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <!--  <td class="date-td">
                                            {{ item.created_at.substring(0, 10)}}
                                        </td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <!-- item game click slot -->
            <div class="root-cash popupItemGame" v-if="token !== null">
                <div class="wraper-cash">
                    <div class="cash-tab">
                        <div class="tabcash">
                            <div class="titmenu_popup">
                                {{ langweb("fe.text1") }}
                                <img src="../assets/images/right.svg" alt="" />
                            </div>
                            <ul>
                                <li>
                                    <form
                                        action=""
                                        method=""
                                        name="frm_search"
                                        id="_frm_search"
                                    >
                                        <div class="input_search">
                                            <input
                                                type="text"
                                                v-model="search"
                                                class="key_search"
                                                placeholder="Search"
                                                @keyup="searchGame"
                                            />
                                        </div>
                                    </form>
                                </li>
                                <li
                                    v-bind:class="{
                                        active: tabItemGame == 'taba'
                                    }"
                                    v-on:click="changeTabItemGame('taba')"
                                >
                                    <a>
                                        <font-awesome-icon
                                            icon="fa-solid fa-clover"
                                        />&nbsp; {{ langweb("fe.text3") }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="root-content-cash-tab">
                            <div class="content-tab-cashin">
                                <div class="taba" v-if="tabItemGame === 'taba'">
                                    <div class="text_category">
                                        <div>
                                            <font-awesome-icon
                                                icon="fa-solid fa-clover"
                                            />&nbsp;
                                            <span class="namegaming"></span>
                                        </div>
                                    </div>
                                    <div
                                        class="root_main_cash dflex-ac-jc w-100 wrapper_tab_game"
                                    >
                                        <a
                                            href="javascript:void(0);"
                                            @click="
                                                getGameProcess(
                                                    item.vender,
                                                    item.code,
                                                    2
                                                )
                                            "
                                            class="itemgamePP"
                                            v-for="(item, index) in datalt"
                                            v-bind:key="index"
                                        >
                                            <div class="wp-itemgpp">
                                                <img
                                                    class="g-img"
                                                    :src="item.image"
                                                />
                                                <div class="nameitem_game">
                                                    <span>{{
                                                        item.title
                                                    }}</span>
                                                </div>
                                            </div>
                                        </a>
                                        <paginate
                                            class="container_paginater"
                                            @update:modelValue="clickCallbacklt"
                                            :totalCount="totalCountlt"
                                            :limit="perPagelt"
                                            v-model="pagelt"
                                        ></paginate>
                                    </div>
                                </div>
                                <div class="tabb" v-if="tabItemGame === 'tabb'">
                                    <div class="text_category">
                                        <div>
                                            <font-awesome-icon
                                                icon="fa-solid fa-bomb"
                                            />&nbsp; {{ langweb("fe.text4") }}
                                        </div>
                                    </div>
                                    <div
                                        class="root_main_cash dflex-ac-jc w-100 wrapper_tab_game"
                                    >
                                        {{ listGamingsearch }}
                                        <div
                                            class="card"
                                            v-for="(
                                                post, index
                                            ) in listGamingsearch"
                                            :key="index"
                                        >
                                            <a>
                                                {{ post.title }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img
                            src="../assets/images/closes.svg"
                            alt=""
                            @click="closePopupItemGame"
                            class="closetab"
                        />
                    </div>
                </div>
            </div>
            <!-- end item game click slot -->
        </main>
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
                        <div class="text-content">
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
        <!-- Modal maintenance game -->
        <div id="modal-example" class="modal-vue">
            <div
                class="overlay"
                v-if="showModal_bt"
                @click="showModal_bt = false"
            ></div>
            <div class="modal" v-if="showModal_bt">
                <div class="wp-modal">
                    <div class="header-modal">
                        <div class="title-header">
                            {{ langweb("fe.notification") }}
                        </div>
                        <button
                            class="close-modal"
                            @click="showModal_bt = false"
                        >
                            x
                        </button>
                    </div>
                    <div class="content-modal">
                        <div class="text-content">
                            {{ langweb("fe.maintenance") }}
                        </div>
                    </div>
                    <div class="footer-modal">
                        <button
                            class="config-modal"
                            @click="showModal_bt = false"
                        >
                            {{ langweb("fe.ok") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End modal maintenance game -->
    </div>

    <div
        v-if="$isMobile()"
        id="popupID1736"
        class="popup_window"
        style="width: 350px; height: 350px; top: 0px; left: 0px; display: none"
    >
        <table
            width="100%"
            height="100%"
            style="border: 1px solid #eaeaea; background-color: white"
        >
            <tbody style="vertical-align: middle">
                <tr>
                    <td>
                        <img
                            src="../assets/images/pop1.png"
                            alt="popup"
                            style="
                                vertical-align: middle;
                                width: 350px;
                                height: 350px;
                                max-width: 100%;
                                max-height: 100%;
                            "
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        height="22"
                        align="right"
                        valign="middle"
                        bgcolor="#D5D5D5"
                    >
                        <div align="right" style="width: 100%">
                            <input
                                type="checkbox"
                                name="chkbox"
                                v-on:click="hidePopup('popupID1736')"
                            />
                            <font size="1" color="#000000"
                                >오늘 하루 이창을 열지않음</font
                            >
                            <a
                                href="javascript:void(0);"
                                @click="popupClose('popupID1736')"
                                ><b
                                    ><font size="2" color="#000000"
                                        >[닫기]</font
                                    ></b
                                ></a
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div
        v-else
        id="popupID1736"
        class="popup_window"
        style="
            width: 450px;
            height: 600px;
            top: 300px;
            left: 50px;
            display: none;
        "
    >
        <table
            width="100%"
            height="100%"
            style="border: 1px solid #eaeaea; background-color: white"
        >
            <tbody style="vertical-align: middle">
                <tr>
                    <td>
                        <img
                            src="../assets/images/pop1.png"
                            alt="popup"
                            style="
                                vertical-align: middle;
                                width: 450px;
                                height: 600px;
                                max-width: 100%;
                                max-height: 100%;
                            "
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        height="22"
                        align="right"
                        valign="middle"
                        bgcolor="#D5D5D5"
                    >
                        <div align="right" style="width: 100%">
                            <input
                                type="checkbox"
                                name="chkbox"
                                v-on:click="hidePopup('popupID1736')"
                            />
                            <font size="1" color="#000000"
                                >오늘 하루 이창을 열지않음</font
                            >
                            <a
                                href="javascript:void(0);"
                                @click="popupClose('popupID1736')"
                                ><b
                                    ><font size="2" color="#000000"
                                        >[닫기]</font
                                    ></b
                                ></a
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div
        v-if="$isMobile()"
        id="popupID1737"
        class="popup_window"
        style="width: 350px; height: 350px; top: 0px; left: 0px; display: none"
    >
        <table
            width="100%"
            height="100%"
            style="border: 1px solid #eaeaea; background-color: white"
        >
            <tbody style="vertical-align: middle">
                <tr>
                    <td>
                        <img
                            src="../assets/images/pop2.png"
                            alt="popup"
                            style="
                                vertical-align: middle;
                                width: 350px;
                                height: 350px;
                                max-width: 100%;
                                max-height: 100%;
                            "
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        height="22"
                        align="right"
                        valign="middle"
                        bgcolor="#D5D5D5"
                    >
                        <div align="right" style="width: 100%">
                            <input
                                type="checkbox"
                                name="chkbox"
                                v-on:click="hidePopup('popupID1737')"
                            />
                            <font size="1" color="#000000"
                                >오늘 하루 이창을 열지않음</font
                            >
                            <a
                                href="javascript:void(0);"
                                @click="popupClose('popupID1737')"
                                ><b
                                    ><font size="2" color="#000000"
                                        >[닫기]</font
                                    ></b
                                ></a
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div
        v-else
        id="popupID1737"
        class="popup_window"
        style="
            width: 450px;
            height: 600px;
            top: 300px;
            left: 500px;
            display: none;
        "
    >
        <table
            width="100%"
            height="100%"
            style="border: 1px solid #eaeaea; background-color: white"
        >
            <tbody style="vertical-align: middle">
                <tr>
                    <td>
                        <img
                            src="../assets/images/pop2.png"
                            alt="popup"
                            style="
                                vertical-align: middle;
                                width: 450px;
                                height: 600px;
                                max-width: 100%;
                                max-height: 100%;
                            "
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        height="22"
                        align="right"
                        valign="middle"
                        bgcolor="#D5D5D5"
                    >
                        <div align="right" style="width: 100%">
                            <input
                                type="checkbox"
                                name="chkbox"
                                v-on:click="hidePopup('popupID1737')"
                            />
                            <font size="1" color="#000000"
                                >오늘 하루 이창을 열지않음</font
                            >
                            <a
                                href="javascript:void(0);"
                                @click="popupClose('popupID1737')"
                                ><b
                                    ><font size="2" color="#000000"
                                        >[닫기]</font
                                    ></b
                                ></a
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div
        v-if="$isMobile()"
        id="popupID1738"
        class="popup_window"
        style="width: 350px; height: 350px; top: 0px; left: 0px; display: none"
    >
        <table
            width="100%"
            height="100%"
            style="border: 1px solid #eaeaea; background-color: white"
        >
            <tbody style="vertical-align: middle">
                <tr>
                    <td>
                        <img
                            src="../assets/images/pop3.png"
                            alt="popup"
                            style="
                                vertical-align: middle;
                                width: 350px;
                                height: 350px;
                                max-width: 100%;
                                max-height: 100%;
                            "
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        height="22"
                        align="right"
                        valign="middle"
                        bgcolor="#D5D5D5"
                    >
                        <div align="right" style="width: 100%">
                            <input
                                type="checkbox"
                                name="chkbox"
                                v-on:click="hidePopup('popupID1738')"
                            />
                            <font size="1" color="#000000"
                                >오늘 하루 이창을 열지않음</font
                            >
                            <a
                                href="javascript:void(0);"
                                @click="popupClose('popupID1738')"
                                ><b
                                    ><font size="2" color="#000000"
                                        >[닫기]</font
                                    ></b
                                ></a
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div
        v-else
        id="popupID1738"
        class="popup_window"
        style="
            width: 450px;
            height: 600px;
            top: 300px;
            left: 950px;
            display: none;
        "
    >
        <table
            width="100%"
            height="100%"
            style="border: 1px solid #eaeaea; background-color: white"
        >
            <tbody style="vertical-align: middle">
                <tr>
                    <td>
                        <img
                            src="../assets/images/pop3.png"
                            alt="popup"
                            style="
                                vertical-align: middle;
                                width: 450px;
                                height: 600px;
                                max-width: 100%;
                                max-height: 100%;
                            "
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        height="22"
                        align="right"
                        valign="middle"
                        bgcolor="#D5D5D5"
                    >
                        <div align="right" style="width: 100%">
                            <input
                                type="checkbox"
                                name="chkbox"
                                v-on:click="hidePopup('popupID1738')"
                            />
                            <font size="1" color="#000000"
                                >오늘 하루 이창을 열지않음</font
                            >
                            <a
                                href="javascript:void(0);"
                                @click="popupClose('popupID1738')"
                                ><b
                                    ><font size="2" color="#000000"
                                        >[닫기]</font
                                    ></b
                                ></a
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div
        v-if="$isMobile()"
        id="popupID1739"
        class="popup_window"
        style="width: 350px; height: 350px; top: 0px; left: 0px; display: none"
    >
        <table
            width="100%"
            height="100%"
            style="border: 1px solid #eaeaea; background-color: white"
        >
            <tbody style="vertical-align: middle">
                <tr>
                    <td>
                        <img
                            src="../assets/images/pop4.png"
                            alt="popup"
                            style="
                                vertical-align: middle;
                                width: 350px;
                                height: 350px;
                                max-width: 100%;
                                max-height: 100%;
                            "
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        height="22"
                        align="right"
                        valign="middle"
                        bgcolor="#D5D5D5"
                    >
                        <div align="right" style="width: 100%">
                            <input
                                type="checkbox"
                                name="chkbox"
                                v-on:click="hidePopup('popupID1739')"
                            />
                            <font size="1" color="#000000"
                                >오늘 하루 이창을 열지않음</font
                            >
                            <a
                                href="javascript:void(0);"
                                @click="popupClose('popupID1739')"
                                ><b
                                    ><font size="2" color="#000000"
                                        >[닫기]</font
                                    ></b
                                ></a
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div
        v-else
        id="popupID1739"
        class="popup_window"
        style="
            width: 450px;
            height: 600px;
            top: 300px;
            left: 1400px;
            display: none;
        "
    >
        <table
            width="100%"
            height="100%"
            style="border: 1px solid #eaeaea; background-color: white"
        >
            <tbody style="vertical-align: middle">
                <tr>
                    <td>
                        <img
                            src="../assets/images/pop4.png"
                            alt="popup"
                            style="
                                vertical-align: middle;
                                width: 450px;
                                height: 600px;
                                max-width: 100%;
                                max-height: 100%;
                            "
                        />
                    </td>
                </tr>
                <tr>
                    <td
                        height="22"
                        align="right"
                        valign="middle"
                        bgcolor="#D5D5D5"
                    >
                        <div align="right" style="width: 100%">
                            <input
                                type="checkbox"
                                name="chkbox"
                                v-on:click="hidePopup('popupID1739')"
                            />
                            <font size="1" color="#000000"
                                >오늘 하루 이창을 열지않음</font
                            >
                            <a
                                href="javascript:void(0);"
                                @click="popupClose('popupID1739')"
                                ><b
                                    ><font size="2" color="#000000"
                                        >[닫기]</font
                                    ></b
                                ></a
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import $ from "jquery";
import { mapState } from 'vuex';
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

$(document).ready(function () {
    $(document).on("click", ".notifyhome_click", function () {
        $(this).parent().find(".substring_content_tbs").show();
        $(".toggle-section").css("z-index", "-1");
        $(".footer-section").css("z-index", "-1");
        $("body").css("overflow", "hidden");
    });
    $(document).on("click", ".close_notis", function () {
        $(this).parents(".substring_content_tbs").hide();
        $(".toggle-section").css("z-index", "0");
        $(".footer-section").css("z-index", "0");
        $("body").css("overflow", "initial");
    });
    $(document).on("click", ".notifyhome_clicks", function () {
        $(this).parent().find(".substring_content_tbss").show();
        $(".toggle-section").css("z-index", "-1");
        $(".footer-section").css("z-index", "-1");
        $("body").css("overflow", "hidden");
    });
    $(document).on("click", ".close_notiss", function () {
        $(this).parents(".substring_content_tbss").hide();
        $(".toggle-section").css("z-index", "0");
        $(".footer-section").css("z-index", "0");
        $("body").css("overflow", "initial");
    });
});

export default {
    name: "Home_city",
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
            }
        };
    },
    computed: {
        ...mapState(['gameTab']),
    },
    data() {
        return {
            tabSelected: "tab1",
            tabSelecteds: "tab3",
            showModal: false,
            showModal_bt: false,
            hoveredIndex: null,
            listchat: [],
            token: window.localStorage.getItem("token"),
            listCashouthome: [],
            listcashinhome: [],
            listnotifihome: [],
            listGameCasino: [],
            listGameSlot: [],
            modalcoin: false,
            id_user: "1",
            title: "",
            question_content: "",
            listtitlehome: [],
            tabItemGame: "taba",
            itemgamepp: [],
            pagelt: 1,
            perPagelt: 35,
            totalCountlt: 0,
            datalt: [],
            listSearch: [],
            search: "",
            listGaming: [],
            listGamingsearch: [],
            timeout_icon: null,
            listFaq: [],
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
        };
    },
    components: {
        Carousel,
        Slide
    },
    created() {
        if (this.token !== null) {
            this.getListnotifiHome();
            this.getListFaq();
        } else {
            this.getListFaqLogin();
            this.getListnotifiHomelist();
        }

        this.getListcashoutHome();
        this.getListcashinHome();
        this.getListGameCasino();
        this.getListGameSlot();

        // console.log(this.$cookies.get('aabb'));
    },
    methods: {
        showPopup(name) {
            if (this.$cookies.get(name) == "popup") {
                document.getElementById(name).style.display = "none";
            } else {
                document.getElementById(name).style.display = "block";
            }
        },
        hidePopup(name) {
            this.$cookies.set(name, "popup", "1d");
            document.getElementById(name).style.display = "none";
        },
        popupClose(e) {
            document.getElementById(e).style.display = "none";
        },
        dragElement(t) {
            var a = 0,
                n = 0,
                i = 0,
                o = 0;
            function e(e) {
                (e = e || window.event),
                    (i = e.clientX),
                    (o = e.clientY),
                    (document.onmouseup = l),
                    (document.onmousemove = s);
            }
            function s(e) {
                (e = e || window.event),
                    (a = i - e.clientX),
                    (n = o - e.clientY),
                    (i = e.clientX),
                    (o = e.clientY),
                    (t.style.top = t.offsetTop - n + "px"),
                    (t.style.left = t.offsetLeft - a + "px");
            }
            function l() {
                (document.onmouseup = null), (document.onmousemove = null);
            }
            document.getElementById(t.id + "header")
                ? (document.getElementById(t.id + "header").onmousedown = e)
                : (t.onmousedown = e);
        },
        changeTab(tab) {
            this.tabSelected = tab;
        },
        changeTabs(tab) {
            this.tabSelecteds = tab;
        },
        changeTabItemGame(tab) {
            this.tabItemGame = tab;
        },
        getListcashoutHome() {
            // var token_user = window.localStorage.getItem('token')
            // this.axios.get(this.api_listCo, {
            //     headers: {
            //         Authorization: 'Bearer ' + token_user
            //     }
            // }).then((response) => {
            //     this.listCashouthome = response.data.data
            // })
            let today = new Date();
            let date =
                today.getDate() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getFullYear();
            this.listCashouthome = [
                { fullname: "aa***", amount: "1000000", created_at: date },
                { fullname: "db***", amount: "2000000", created_at: date },
                { fullname: "hg***", amount: "3500000", created_at: date },
                { fullname: "tg***", amount: "800000", created_at: date },
                { fullname: "wj***", amount: "1000000", created_at: date },
                { fullname: "qb***", amount: "3000000", created_at: date },
                { fullname: "mk***", amount: "500000", created_at: date },
                { fullname: "sx***", amount: "1000000", created_at: date },
                { fullname: "zj***", amount: "4000000", created_at: date },
                { fullname: "zj***", amount: "2000000", created_at: date }
            ];
        },
        getListcashinHome() {
            // var token_user = window.localStorage.getItem('token')
            // this.axios.get(this.api_listCi, {
            //     headers: {
            //         Authorization: 'Bearer ' + token_user
            //     }
            // }).then((response) => {
            //     this.listcashinhome = response.data.data
            // })
            let today = new Date();
            let date =
                today.getDate() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getFullYear();
            this.listcashinhome = [
                { fullname: "nm***", amount: "500000", created_at: date },
                { fullname: "vc***", amount: "300000", created_at: date },
                { fullname: "bf***", amount: "1000000", created_at: date },
                { fullname: "pl***", amount: "800000", created_at: date },
                { fullname: "qy***", amount: "500000", created_at: date },
                { fullname: "io***", amount: "3000000", created_at: date },
                { fullname: "ka***", amount: "5000000", created_at: date },
                { fullname: "ok***", amount: "1000000", created_at: date },
                { fullname: "xc***", amount: "800000", created_at: date },
                { fullname: "dh***", amount: "1500000", created_at: date }
            ];
        },
        getListnotifiHome() {
            var token_user = window.localStorage.getItem("token");
            this.axios
                .get(this.api_listnotifi, {
                    headers: {
                        Authorization: "Bearer " + token_user
                    }
                })
                .then((response) => {
                    this.listnotifihome = response.data.data;
                });
        },
        getListnotifiHomelist() {
            this.axios.get(this.api_listnotifilist, {}).then((response) => {
                this.listnotifihome = response.data.data;
            });
        },
        getListFaq() {
            var token_user = window.localStorage.getItem("token");
            this.axios
                .get(this.api_listFaq, {
                    headers: {
                        Authorization: "Bearer " + token_user
                    }
                })
                .then((response) => {
                    this.listFaq = response.data.data.list_data;
                });
        },
        getListFaqLogin() {
            this.axios.get(this.api_listFaq_login, {}).then((response) => {
                this.listFaq = response.data.data.list_data;
            });
        },
        getListGameCasino() {
            // this.axios.get(this.api_gamecasino).then((response) => {
            //     this.listGameCasino = response.data.data.filter(
            //         (d) => d.type === "casino"
            //     );
            //     console.log(this.listGameCasino);

            //     //this.showPopup('popupID1736');
            //     //this.showPopup('popupID1737');
            //     // this.showPopup('popupID1738');
            //     //this.showPopup('popupID1739');
            // });
            this.listGameCasino = [
                {
                    id: 86,
                    code: "12028",
                    vender: "redgold",
                    title: "레드골드",
                    name_image: null,
                    image: null,
                    type: "casino",
                    image1: null,
                    image2: require("@/assets/img/providers/logo/redgold.png"),
                    image3: require("@/assets/img/providers/casino/redgold.png"),
                    image4: null,
                    image5: null,
                    image6: null,
                    date: "2023-11-07 16:38:33",
                    maintenance: 0
                },
                {
                    id: 88,
                    code: "407001",
                    vender: "redgold",
                    title: "에볼루션",
                    name_image: null,
                    image: null,
                    type: "casino",
                    image1: null,
                    image2: require("@/assets/img/providers/logo/evolution.png"),
                    image3: require("@/assets/img/providers/casino/evolution.png"),
                    image4: null,
                    image5: null,
                    image6: null,
                    date: "2023-11-09 13:45:17",
                    maintenance: 0
                },
                {
                    id: 90,
                    code: "28001",
                    vender: "redgold",
                    title: "드림게이밍",
                    name_image: null,
                    image: null,
                    type: "casino",
                    image1: null,
                    image2: require("@/assets/img/providers/logo/dreamgaming.png"),
                    image3: require("@/assets/img/providers/casino/dreamgaming.png"),
                    image4: null,
                    image5: null,
                    image6: null,
                    date: "2023-11-09 13:49:42",
                    maintenance: 0
                },
                {
                    id: 93,
                    code: "78002",
                    vender: "redgold",
                    title: "프라그마스틱",
                    name_image: null,
                    image: null,
                    type: "casino",
                    image1: null,
                    image2: require("@/assets/img/providers/logo/pragmatic.png"),
                    image3: require("@/assets/img/providers/casino/pragmatic.png"),
                    image4: null,
                    image5: null,
                    image6: null,
                    date: "2023-11-09 13:52:18",
                    maintenance: 0
                },
                {
                    id: 91,
                    code: "30001",
                    vender: "redgold",
                    title: "아시안게임",
                    name_image: null,
                    image: null,
                    type: "casino",
                    image1: null,
                    image2: require("@/assets/img/providers/logo/asiagaming.png"),
                    image3: require("@/assets/img/providers/casino/asiagaming.png"),
                    image4: null,
                    image5: null,
                    image6: null,
                    date: "2023-11-09 13:50:36",
                    maintenance: 0
                },
                {
                    id: 92,
                    code: "86002",
                    vender: "redgold",
                    title: "섹시게이밍",
                    name_image: null,
                    image: null,
                    type: "casino",
                    image1: null,
                    image2: require("@/assets/img/providers/logo/sexygaming.png"),
                    image3: require("@/assets/img/providers/casino/sexygaming.png"),
                    image4: null,
                    image5: null,
                    image6: null,
                    date: "2023-11-09 13:51:42",
                    maintenance: 0
                }
            ];
        },
        getListGameSlot() {
            // this.axios.get(this.api_gamecasino).then((response) => {
            //     // console.log(response.data.data);
            //     this.listGameSlot = response.data.data.filter(
            //         (d) => d.type === "slot"
            //     );
            //     console.log(this.listGameSlot);
            // });
            this.listGameSlot = [
                {
                    id: 10,
                    code: "300",
                    vender: "slotgates",
                    title: "프라그마틱",
                    name_image: "game300.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot03.png",
                    type: "slot",
                    image1: "images/2023/05/152056-ag2.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/pragmatic.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-pragmatic.png"),
                    image4: "images/2023/05/154734-ag2.png",
                    image5: "images/2023/05/122316-ASIA_S.png",
                    image6: "images/2023/06/131719-Pragmatic.png",
                    date: "2023-04-25 16:26:10",
                    maintenance: 0
                },
                {
                    id: 13,
                    code: "20",
                    vender: "slotgates",
                    title: "CQ9",
                    name_image: "game20.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot44.png",
                    type: "slot",
                    image1: "images/2023/05/152107-bgaming.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/cq9.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-cq9.png"),
                    image4: "images/2023/05/154746-aristocrat.png",
                    image5: "images/2023/05/122323-ASPECT_S.png",
                    image6: "images/2023/06/131746-CQ9.png",
                    date: "2023-04-25 21:08:55",
                    maintenance: 0
                },
                {
                    id: 11,
                    code: "39",
                    vender: "slotgates",
                    title: "부운고",
                    name_image: "game22.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot29.png",
                    type: "slot",
                    image1: "images/2023/05/152132-bbtech.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/boongo.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-boongo.png"),
                    image4: "images/2023/05/154810-bbtech.png",
                    image5: "images/2023/05/122346-BBTECH.png",
                    image6: "images/2023/06/131817-Boongo.png",
                    date: "2023-04-25 21:08:18",
                    maintenance: 0
                },
                {
                    id: 30,
                    code: "66",
                    vender: "slotgates",
                    title: "스피어헤드",
                    name_image: "game66.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot51.png",
                    type: "slot",
                    image1: "images/2023/05/152150-cq9.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/spearhead.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-spearhead.png"),
                    image4: "images/2023/05/154821-bco.png",
                    image5: "images/2023/05/122358-BGAMING.png",
                    image6: "images/2023/06/131833-spear-head.png",
                    date: "2023-04-25 21:13:35",
                    maintenance: 0
                },
                {
                    id: 29,
                    code: "51",
                    vender: "slotgates",
                    title: "칼람바",
                    name_image: "game51.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot38.png",
                    type: "slot",
                    image1: "images/2023/05/152210-dreamtech.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/kalamba.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-kalamba.png"),
                    image4: "images/2023/05/154836-betsoft.png",
                    image5: "images/2023/05/122409-BOOONGO.png",
                    image6: "images/2023/06/131855-Calamba.png",
                    date: "2023-04-25 21:13:19",
                    maintenance: 0
                },
                {
                    id: 28,
                    code: "59",
                    vender: "slotgates",
                    title: "플레이슨",
                    name_image: "game59.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot12.png",
                    type: "slot",
                    image1: "images/2023/05/152244-game30000.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/playson.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-playson.png"),
                    image4: "images/2023/05/154846-bgaming.png",
                    image5: "images/2023/05/122422-CQ9.png",
                    image6: "images/2023/06/131909-playson.png",
                    date: "2023-04-25 21:13:06",
                    maintenance: 0
                },
                {
                    id: 27,
                    code: "63",
                    vender: "slotgates",
                    title: "리얼타이밍",
                    name_image: "game63.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot41.png",
                    type: "slot",
                    image1: "images/2023/05/152307-game407000.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/realtimegaming.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-realtimegaming.png"),
                    image4: "images/2023/05/154855-cq9.png",
                    image5: "images/2023/05/122438-DREAMTECH.png",
                    image6: "images/2023/06/131923-real-timing.png",
                    date: "2023-04-25 21:12:52",
                    maintenance: 0
                },
                {
                    id: 26,
                    code: "45",
                    vender: "slotgates",
                    title: "게임피시글로벌",
                    name_image: "game45.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot19.png",
                    type: "slot",
                    image1: "images/2023/05/152342-gameart.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/gamefish.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-gamefish.png"),
                    image4: "images/2023/05/154906-dream2.png",
                    image5: "images/2023/05/122448-EVOPLAY.png",
                    image6: "images/2023/06/131937-Gamefish-Global.png",
                    date: "2023-04-25 21:12:37",
                    maintenance: 0
                },
                {
                    id: 25,
                    code: "43",
                    vender: "slotgates",
                    title: "에보플레이",
                    name_image: "game43.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot18.png",
                    type: "slot",
                    image1: "images/2023/05/152353-habanero.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/evoplay.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-evoplay.png"),
                    image4: "images/2023/05/154920-evoplay.png",
                    image5: "images/2023/05/122457-GAMEART.png",
                    image6: "images/2023/06/132031-Evo-play.png",
                    date: "2023-04-25 21:12:23",
                    maintenance: 1
                },
                {
                    id: 24,
                    code: "33",
                    vender: "slotgates",
                    title: "어거스트",
                    name_image: "game33.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot16.png",
                    type: "slot",
                    image1: "images/2023/05/152410-genesis.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/august.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-august.png"),
                    image4: "images/2023/05/154933-gameart.png",
                    image5: "images/2023/05/122505-GENESIS.png",
                    image6: "images/2023/06/132046-August.png",
                    date: "2023-04-25 21:12:05",
                    maintenance: 1
                },
                {
                    id: 23,
                    code: "31",
                    vender: "slotgates",
                    title: "1X2게임",
                    name_image: "game31.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot15.png",
                    type: "slot",
                    image1: "images/2023/05/152429-pgsoft.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/1x2.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-1x2.png"),
                    image4: "images/2023/05/154945-genesis.png",
                    image5: "images/2023/05/122519-HABANERO.png",
                    image6: "images/2023/06/132100-1X2-game.png",
                    date: "2023-04-25 21:11:50",
                    maintenance: 0
                },
                {
                    id: 22,
                    code: "63",
                    vender: "slotgates",
                    title: "리볼버",
                    name_image: "game63.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot14.png",
                    type: "slot",
                    image1: "images/2023/05/152444-nolimit.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/revolver.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-revolver.png"),
                    image4: "images/2023/05/154957-habanero.png",
                    image5: "images/2023/05/122532-MANNA.png",
                    image6: "images/2023/06/132119-revolver.png",
                    date: "2023-04-25 21:11:35",
                    maintenance: 0
                },
                {
                    id: 21,
                    code: "61",
                    vender: "slotgates",
                    title: "퀵스픽",
                    name_image: "game61.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot13.png",
                    type: "slot",
                    image1: "images/2023/05/152458-playngo.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/quickspin.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-quickspin.png"),
                    image4: "images/2023/05/155012-isoftbet.png",
                    image5: "images/2023/05/122545-MICRO_S.png",
                    image6: "images/2023/06/132135-quick-speak.png",
                    date: "2023-04-25 21:11:18",
                    maintenance: 0
                },
                {
                    id: 20,
                    code: "53",
                    vender: "slotgates",
                    title: "노리밋시티",
                    name_image: "game53.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot10.png",
                    type: "slot",
                    image1: "images/2023/05/152511-playson.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/nolimitcity.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-nolimitcity.png"),
                    image4: "images/2023/05/155025-micro2.png",
                    image5: "images/2023/05/122604-PG.png",
                    image6: "images/2023/06/132152-No-Limit-City.png",
                    date: "2023-04-25 21:11:03",
                    maintenance: 0
                },
                {
                    id: 19,
                    code: "41",
                    vender: "slotgates",
                    title: "이엘케이",
                    name_image: "game41.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot08.png",
                    type: "slot",
                    image1: "images/2023/05/152537-playstar.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/elk.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-elk.png"),
                    image4: "images/2023/05/155037-nolimit.png",
                    image5: "images/2023/05/122616-PLAYNGO.png",
                    image6: "images/2023/06/132215-elk.png",
                    date: "2023-04-25 21:10:33",
                    maintenance: 0
                },
                {
                    id: 16,
                    code: "17",
                    vender: "slotgates",
                    title: "플레이앤고",
                    name_image: "game72.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot02.png",
                    type: "slot",
                    image1: "images/2023/05/152628-redtiger.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/playngo.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-playngo.png"),
                    image4: "images/2023/05/155123-playstar.png",
                    image5: "images/2023/05/122655-REALTIME.png",
                    image6: "images/2023/06/132259-play-and-go.png",
                    date: "2023-04-25 21:09:43",
                    maintenance: 0
                },
                {
                    id: 15,
                    code: "76",
                    vender: "slotgates",
                    title: "레드타이거",
                    name_image: "game76.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot49.png",
                    type: "slot",
                    image1: "images/2023/05/152643-relax.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/redtiger.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-redtiger.png"),
                    image4: "images/2023/05/155136-png.png",
                    image5: "images/2023/05/122712-SKYWIND_S.png",
                    image6: "images/2023/06/132316-red-tiger.png",
                    date: "2023-04-25 21:09:30",
                    maintenance: 0
                },
                {
                    id: 14,
                    code: "75",
                    vender: "slotgates",
                    title: "넷엔트",
                    name_image: "game75.png",
                    image: "https://alche3.com/assets/images/buttons/game_slot43.png",
                    type: "slot",
                    image1: "images/2023/05/152655-skywind2.png",
                    image2: require("@/assets/img/providers/slot/provider-logo/netent.png"),
                    image3: require("@/assets/img/providers/slot/slot-img-netent.png"),
                    image4: "images/2023/05/155153-ttg.png",
                    image5: "images/2023/05/122727-STARGAME.png",
                    image6: "images/2023/06/132335-netent.png",
                    date: "2023-04-25 21:09:12",
                    maintenance: 0
                }
            ];
        },
        // listTitle () {
        //     var token_user = window.localStorage.getItem('token')
        //     this.axios.get(this.api_listtitle, {
        //         headers: {
        //             Authorization: 'Bearer ' + token_user
        //         }
        //     }).then((response) => {
        //         this.listtitlehome = response.data.data.filter(d => d.type == 1)
        //         this.title = this.listtitlehome[0]?.id
        //     })
        // },
        getGameProcess(api, code, type) {
            $(".loading_show").show().fadeIn(10);
            var token_user = window.localStorage.getItem("token");
            this.axios
                .post(
                    this.api_liveprocess,
                    {
                        gamecode: code,
                        gametype: type,
                        gameapi: api
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + token_user
                        }
                    }
                )
                .then((response) => {
                    if (response.data.data.result == 1) {
                        var size = {
                            width:
                                window.innerWidth || document.body.clientWidth,
                            height:
                                window.innerHeight || document.body.clientHeight
                        };
                        //창 크기 지정
                        var width = size.width;
                        var height = size.height;
                        //pc화면기준 가운데 정렬
                        var left = window.screen.width / 2 - width / 2;
                        var top = window.screen.height / 4;
                        //윈도우 속성 지정
                        var windowStatus =
                            "width=" +
                            width +
                            ", height=" +
                            height +
                            ", left=" +
                            left +
                            ", top=" +
                            top +
                            ", scrollbars=yes, status=yes, resizable=yes, titlebar=yes";
                        //연결하고싶은url
                        const url = response.data.data.url;
                        //등록된 url 및 window 속성 기준으로 팝업창을 연다.
                        window.open(url, "gamepopup", windowStatus);
                        $("#loading_show").css("display", "none");
                    } else {
                        this.$swal({
                            position: "top-end",
                            icon: "error",
                            title: response.data.data.url,
                            showConfirmButton: false,
                            timer: 3000
                        });
                        $("#loading_show").css("display", "none");
                    }
                });
        },
        showItemGame(event) {
            $(".loading_show").show().fadeIn(10);
            var dataid = event.target.getAttribute("data_id");
            var dataname = event.target.getAttribute("data_name");
            $(".datacode").val(dataid);
            $(".namegaming").text(dataname);
            let codeid = $(".datacode").val();
            $(".popupItemGame").show();
            $(".wraper-root").addClass("z_index_in");
            $("body").css("overflow", "hidden");

            var token_user = window.localStorage.getItem("token");
            this.axios
                .get(this.api_listgameSlot + codeid, {
                    headers: {
                        Authorization: "Bearer " + token_user
                    }
                })
                .then((response) => {
                    this.listGaming = response.data.data;
                    this.itemgamepp = response.data.data;
                    this.totalCountlt = this.itemgamepp.length;
                    this.paginatedDatalt();
                    $("#loading_show").css("display", "none");
                });
        },
        paginatedDatalt() {
            // console.log('this.itemgamepp',this.itemgamepp);
            this.datalt = this.itemgamepp.slice(
                (this.pagelt - 1) * this.perPagelt,
                this.pagelt * this.perPagelt
            );
        },
        clickCallbacklt(pageNum) {
            this.pagelt = pageNum;
            this.paginatedDatalt();
        },
        closePopupItemGame() {
            $(".popupItemGame").hide();
            $(".wraper-root").removeClass("z_index_in");
            $("body").css("overflow", "initial");
            this.datalt = [];
        },
        gameHover(index) {
            this.hoveredIndex = index;
            $(".sc-btn").addClass("inactive");
        },
        gameHoverRemove() {
            this.hoveredIndex = null;
            $(".sc-btn").removeClass("inactive");
        },
        searchGame(e) {
            e.preventDefault();
            let keyname = $(".key_search").val();
            let act_length = this.listGaming.length;
            let dataArray = [];
            let set = 0;
            $.each(this.listGaming, function (i) {
                if (i + 1 == act_length) {
                    set = 1;
                }
                if (
                    this.title.indexOf(keyname) != -1 ||
                    this.code.indexOf(keyname) != -1
                ) {
                    return dataArray.push(this);
                }
                if (set == 1) {
                    // console.log('action: ', dataArray);
                    // return dataArray
                    // this.listGamingsearch = dataArray
                    // this.totalCountlt = this.itemgamepp.length
                    // this.paginatedDatalt()
                    // this.datalt = dataArray
                    // console.log('action: ', this.listGamingsearch);
                }
            });
            this.itemgamepp = dataArray;
            this.totalCountlt = this.itemgamepp.length;
            this.paginatedDatalt();
            // this.listGamingsearch = dataArray
            // console.log('dataArray',dataArray);
        },
        getMaintenance() {
            this.showModal_bt = true;
        }
    }
};
</script>
<style>
</style>
