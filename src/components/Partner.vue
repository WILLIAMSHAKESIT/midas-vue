<template>
    <div class="root-partner">
        <div class="itemtab_partner">
            <ul>
                <li v-bind:class="{active: tabSelected == 'tab1'}" v-on:click="changeTab('tab1')"><font-awesome-icon icon="fa-solid fa-handshake" /> {{ langweb('fe.partner') }}</li>
                <li v-bind:class="{active: tabSelected == 'tab2'}" v-on:click="changeTab('tab2')"><font-awesome-icon icon="fa-solid fa-piggy-bank" /> {{ langweb('fe.cashin') }}</li>
                <li v-bind:class="{active: tabSelected == 'tab3'}" v-on:click="changeTab('tab3')"><font-awesome-icon icon="fa-solid fa-vault" /> {{ langweb('fe.cashout') }}</li>
                <li v-bind:class="{active: tabSelected == 'tab4'}" v-on:click="changeTab('tab4')"><font-awesome-icon icon="fa-solid fa-gift" /> {{ langweb('fe.gift') }}</li>
            </ul>
        </div>
        <div class="wp_tab_partner">
            <div class="tab1" v-if="tabSelected === 'tab1'">
                <div class="wrapper-partner">
                    <table>
                        <thead>
                            <tr>
                                <th>{{ langweb('fe.partnercode') }}</th>
                                <th>{{ langweb('fe.username') }}</th>
                                <th>{{ langweb('fe.names') }}</th>
                                <th>{{ langweb('fe.totalcredit') }}</th>
                                <th>{{ langweb('fe.totaldebit') }}</th>
                                <th>{{ langweb('fe.totalbet') }}</th>
                                <th>{{ langweb('fe.totalwin') }}</th>
                                <th>{{ langweb('fe.totalfee') }}</th>
                                <th>{{ langweb('fe.lastlogin') }}</th>
                                <th>{{ langweb('fe.addpartner') }}</th>
                            </tr>
                        </thead>
                        <tbody v-if="datas.length > 0">
                            <tr v-for="(item, index) in datas" v-bind:key="index">
                                <td align="left">{{ item.partner_code }} <input type="hidden" name="id_partner" v-model="item.id" class="id_partner"></td>
                                <td align="left"><span :class="'menucap' + item.level"></span>{{ item.username }}</td>
                                <td align="left">{{ item.name }}</td>
                                <td>{{ new Intl.NumberFormat().format(item.total_credit) }}</td>
                                <td>{{ new Intl.NumberFormat().format(item.total_debit) }}</td>
                                <td>{{ new Intl.NumberFormat().format(item.total_bet) }}</td>
                                <td>{{ new Intl.NumberFormat().format(item.total_win) }}</td>
                                <td>{{ new Intl.NumberFormat().format(item.total_fee) }}</td>
                                <td>{{ item.last_login }}</td>
                                <td><button type="button" class="btnadd_user" @click="showModalRegister" :data_id="item.id">+</button></td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="10">데이터가 없습니다</td>
                            </tr>
                        </tbody>
                    </table>
                    <paginate @update:modelValue="clickCallback" :totalCount="totalCount" :limit="perPage" v-model="page"></paginate>
                </div>
            </div>
            <div class="tab2" v-if="tabSelected === 'tab2'">
                <div class="wrapper-partner">
                    <table>
                        <thead>
                            <tr>
                                <th>{{ langweb('fe.username') }}</th>
                                <th>{{ langweb('fe.names') }}</th>
                                <th>{{ langweb('fe.namebank') }}</th>
                                <th>{{ langweb('fe.numberbank') }}</th>
                                <th>{{ langweb('fe.userbank') }}</th>
                                <th>{{ langweb('fe.date')}}</th>
                                <th>{{ langweb('fe.amountbeforedeposit')}}</th>
                                <th>{{ langweb('fe.applicationamount')}}</th>
                                <th>{{ langweb('fe.amountafterdeposit')}}</th>
                                <th>{{ langweb('fe.status')}}</th>
                            </tr>
                        </thead>
                        <tbody v-if="datass.length > 0">
                            <tr v-for="(itemlist, index) in datass" v-bind:key="index">
                                <td>{{ itemlist.username }}</td>
                                <td>{{ itemlist.fullname }}</td>
                                <td><span v-if="itemlist.name_bank!==''">{{ itemlist.name_bank }}</span><span class="1212" v-else>fsss</span></td>
                                <td>{{ itemlist.number_bank }}</td>
                                <td>{{ itemlist.user_bank }}</td>
                                <td>{{ itemlist.created_at }}</td>
                                <td>{{ new Intl.NumberFormat().format(itemlist.amount_now) }}</td>
                                <td>{{ new Intl.NumberFormat().format(itemlist.amount) }}</td>
                                <td>{{ new Intl.NumberFormat().format(itemlist.amount_player) }}</td>
                                <td v-if="itemlist.status==0">{{ langweb('fe.cancels')}}</td>
                                <td v-else-if="itemlist.status==1">{{ langweb('fe.approve')}}</td>
                                <td v-else>{{ langweb('fe.waiting')}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="10">데이터가 없습니다</td>
                            </tr>
                        </tbody>
                    </table>
                    <paginate @update:modelValue="clickCallbacks" :totalCount="totalCounts" :limit="perPages" v-model="pages"></paginate>
                </div>
            </div>
            <div class="tab3" v-if="tabSelected === 'tab3'">
                <div class="wrapper-partner">
                    <table>
                        <thead>
                            <tr>
                                <th>{{ langweb('fe.username') }}</th>
                                <th>{{ langweb('fe.names') }}</th>
                                <th>{{ langweb('fe.namebank') }}</th>
                                <th>{{ langweb('fe.numberbank') }}</th>
                                <th>{{ langweb('fe.userbank') }}</th>
                                <th>{{ langweb('fe.date')}}</th>
                                <th>{{ langweb('fe.amountbeforedeposit')}}</th>
                                <th>{{ langweb('fe.applicationamount')}}</th>
                                <th>{{ langweb('fe.amountafterdeposit')}}</th>
                                <th>{{ langweb('fe.status')}}</th>
                            </tr>
                        </thead>
                        <tbody v-if="datasss.length > 0">
                            <tr v-for="(itemlist, index) in datasss" v-bind:key="index">
                                <td>{{ itemlist.username }}</td>
                                <td>{{ itemlist.fullname }}</td>
                                <td>{{ itemlist.name_bank }}</td>
                                <td>{{ itemlist.number_bank }}</td>
                                <td>{{ itemlist.user_bank }}</td>
                                <td>{{ itemlist.created_at }}</td>
                                <td>{{ new Intl.NumberFormat().format(itemlist.amount_now) }}</td>
                                <td>{{ new Intl.NumberFormat().format(itemlist.amount) }}</td>
                                <td>{{ new Intl.NumberFormat().format(itemlist.amount_player) }}</td>
                                <td v-if="itemlist.status==0">{{ langweb('fe.cancels')}}</td>
                                <td v-else-if="itemlist.status==1">{{ langweb('fe.approve')}}</td>
                                <td v-else>{{ langweb('fe.waiting')}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="10">데이터가 없습니다</td>
                            </tr>
                        </tbody>
                    </table>
                    <paginate @update:modelValue="clickCallbackss" :totalCount="totalCountss" :limit="perPagess" v-model="pagess"></paginate>
                </div>
            </div>
            <div class="tab4" v-if="tabSelected === 'tab4'">
                <div class="wrapper-partner">
                    <table>
                        <thead>
                            <tr>
                                <th>{{ langweb('fe.partnercode') }}</th>
                                <th>{{ langweb('fe.username') }}</th>
                                <th>{{ langweb('fe.names') }}</th>
                                <th>{{ langweb('fe.applicationamount')}}</th>
                                <th>{{ langweb('fe.amountafterdeposit')}}</th>
                                <th>{{ langweb('fe.date')}}</th>
                            </tr>
                        </thead>
                        <tbody v-if="datassss.length > 0">
                            {{ datassss.length }}
                            <tr v-for="(itemlist, index) in datassss" v-bind:key="index">
                                <td>{{ itemlist.partner_code }}</td>
                                <td>{{ itemlist.username }}</td>
                                <td>{{ itemlist.fullname }}</td>
                                <td>{{ new Intl.NumberFormat().format(itemlist.amount) }}</td>
                                <td>{{ new Intl.NumberFormat().format(itemlist.amount_player) }}</td>
                                <td>{{ itemlist.created_at }}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="6">데이터가 없습니다</td>
                            </tr>
                        </tbody>
                    </table>
                    <paginate @update:modelValue="clickCallbacksss" :totalCount="totalCountsss" :limit="perPagesss" v-model="pagesss"></paginate>
                </div>
            </div>
        </div>
        <div id="modal-example" class="modal-game">
            <div class="overlay" v-if="showModalRg" @click="showModalRg = false"></div>
            <div class="modal" v-if="showModalRg">
                <div class="wp-modal-register">
                    <div class="left-right-login">
                        <div class="left-login">
                            <img src="../assets/images/left.png" alt="">
                        </div>
                        <div class="form-login">
                            <button class="close-modal-game" @click="showModalRg = false"><img src="../assets/images/close.svg" alt=""></button>
                            <form ref="form_register" @submit="register" method="POST" id="login-game">
                                <h2 class="tit-login">{{ langweb('fe.registers') }}</h2>
                                <p><span>*</span> {{ langweb('fe.request') }}</p>
                                <!-- <div class="form-group input-email">
                                    <input type="hidden" name="partner_id" v-model="partner_id" autocomplete="off" :placeholder="langweb('fe.referrial')">
                                </div> -->
                                <div class="form-group">
                                    <input type="text" name="name" autocomplete="off" v-model="name" :placeholder="langweb('fe.yournickname') + ' *'">
                                </div>
                                <div class="form-group">
                                    <input type="text" name="username" autocomplete="off" v-model="username" :placeholder="langweb('fe.yourid') + ' *'">
                                </div>
                                <div class="form-group">
                                    <input type="password" name="password" autocomplete="off" v-model="password" :placeholder="langweb('fe.passwords') + ' *'">
                                </div>
                                <div class="form-group">
                                    <input type="password" name="password_confirm" autocomplete="off" v-model="password_confirm" :placeholder="langweb('fe.confirmpassword') + ' *'">
                                </div>
                                <div class="form-group">
                                    <input type="text" name="number_cash" autocomplete="off" v-model="number_cash" :placeholder="langweb('fe.numbercash') + ' *'">
                                </div>
                                <div class="form-group">
                                    <input type="number" name="phone" autocomplete="off" v-model="phone" maxlength="11" class="phonerg" :placeholder="langweb('fe.phone')">
                                </div>
                                <div class="form-group">
                                    <input type="text" name="name_bank" autocomplete="off" v-model="name_bank" :placeholder="langweb('fe.namebank')">
                                </div>
                                <div class="form-group">
                                    <input type="text" name="number_bank" autocomplete="off" v-model="number_bank" :placeholder="langweb('fe.numberbank')">
                                </div>
                                <div class="form-group">
                                    <input type="text" name="user_bank" autocomplete="off" v-model="user_bank" :placeholder="langweb('fe.userbank')">
                                </div>
                                <div class="btn-register">
                                    <button class="btn-signin" type="submit">{{ langweb('fe.signup') }}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
// import $ from 'jquery'
export default {
    name: 'Partner_city',
    setup() {
        const store = useStore();
        const lang = computed(() => store.state.lang);
        const lang_en = computed(() => store.state.language);
        store.dispatch("changLang");
        return {
            langweb (variable) {
                lang.value.filter(function(e){
                    if(e.variable == variable) {
                        if(lang_en.value == 'en'){
                            variable = e.en
                        }else{
                            variable = e.kr
                        }
                    }
                });
                return variable;
            },
        }
    },
    data () {
        return {
            listUser: [],
            partner_id: '',
            name: '',
            username: '',
            password: '',
            password_confirm: '',
            number_cash: '',
            phone: '',
            name_bank: '',
            number_bank: '',
            user_bank: '',
            showModalRg: false,
            page: 1,
            perPage: 15,
            totalCount: 0,
            datas: [],
            tabSelected: 'tab1',

            listCashin: [],
            pages: 1,
            perPages: 15,
            totalCounts: 0,
            datass: [],

            listCashout: [],
            pagess: 1,
            perPagess: 15,
            totalCountss: 0,
            datasss: [],

            listGift: [],
            pagesss: 1,
            perPagesss: 15,
            totalCountsss: 0,
            datassss: [],
        }
    },
    created () {
        this.getListUser()
        setInterval(this.getListUser, 10000);
        this.getListCashinPN()
        this.getListCashoutPN()
        this.getListGift()
    },
    methods: {
        getListUser () {
            this.axios.get(this.api_listuser, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then((response) => {
                this.listUser = response.data.data.list_user
                this.totalCount = this.listUser.length
                this.paginatedData()
            })
        },
        register (e) {
            e.preventDefault()
            this.axios.post(this.api_registerUser, {
                partner_id: this.partner_id,
                name: this.name,
                username: this.username,
                password: this.password,
                password_confirm: this.password_confirm,
                number_cash: this.number_cash,
                phone: this.phone,
                name_bank: this.name_bank,
                number_bank: this.number_bank,
                user_bank: this.user_bank
            }, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                },
            }).then(res => {
                if (res.data.success === true) {
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 4000
                    })
                    this.showModalRg = false
                    this.partner_id = this.name = this.username = this.password = this.password_confirm = this.number_cash = this.phone = this.name_bank = this.number_bank = this.user_bank = ''
                    e.target.reset()
                } else {
                    this.$swal({
                        position: 'top-end',
                        icon: 'error',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            }).catch(e => {
                if (e.response.status === 404) {
                    this.$swal({
                        position: 'top-end',
                        icon: 'error',
                        title: e.response.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
        },
        showModalRegister (event) {
            this.showModalRg = true
            var id = event.target.getAttribute('data_id')
            this.partner_id = id
        },
        paginatedData () {
            this.datas = this.listUser.slice((this.page - 1) * this.perPage, this.page * this.perPage)
        },
        clickCallback (pageNum) {
            this.page = pageNum;
            this.paginatedData();
        },
        changeTab (tab) {
            this.tabSelected = tab
        },
        getListCashinPN () {
            this.axios.get(this.api_listcashin_partner, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then((response) => {
                this.listCashin = response.data.data
                this.listCashin = response.data.data.filter(d => d.type === 1)
                this.totalCounts = this.listCashin.length
                this.paginatedDatas()
            })
        },
        paginatedDatas () {
            this.datass = this.listCashin.slice((this.pages - 1) * this.perPages, this.pages * this.perPages)
        },
        clickCallbacks (pageNum) {
            this.pages = pageNum;
            this.paginatedDatas();
        },
        getListCashoutPN () {
            this.axios.get(this.api_listcashin_partner, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then((response) => {
                this.listCashout = response.data.data
                this.listCashout = response.data.data.filter(d => d.type === 2)
                this.totalCountss = this.listCashout.length
                this.paginatedDatass()
            })
        },
        paginatedDatass () {
            this.datasss = this.listCashout.slice((this.pagess - 1) * this.perPagess, this.pagess * this.perPagess)
        },
        clickCallbackss (pageNum) {
            this.pagess = pageNum;
            this.paginatedDatass();
        },
        getListGift () {
            this.axios.get(this.api_listGift, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then((response) => {
                this.listGift = response.data.data
                this.totalCountsss = this.listGift.length
                this.paginatedDatasss()
            })
        },
        paginatedDatasss () {
            this.datassss = this.listGift.slice((this.pagesss - 1) * this.perPagesss, this.pagesss * this.perPagesss)
        },
        clickCallbacksss (pageNum) {
            this.pagesss = pageNum;
            this.paginatedDatasss();
        },
    }
}
</script>
<style>
</style>
