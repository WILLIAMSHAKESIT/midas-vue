<template>
    <form @submit="cashIn">
        <div class="modal-banner">
            <div class="banner-text">
                <p><i class="fa-solid fa-circle-info text-yellow-400 mr-1"></i>입금계좌요청 후 쪽지를 확인해주세요.</p>
                <p>최소 입금신청 금액은 10,000부터입니다. 꼭 확인하고 신청 하시기 바랍니다.</p>
            </div>
            <img src="../assets/img/banner/slide1.jpg" alt="">
        </div>
        <div class="mb-4">
            <label for="">{{ langweb('fe.holdingamount')}}</label>
            <div class="flex gap-3">
                <input type="text" :value="amountinfo"  class="form-control" readonly>
                <button class="btn btn-primary w-12 min-w-fit"  @click="loadMoney"><i class="fa-solid fa-arrows-rotate"></i></button>
            </div>
        </div>
        <div class="mb-3">
            <label for="">{{ langweb('fe.depositamount')}} (*)</label>
            <input type="number" class="form-control numbermoney" placeholder="0" name="amount" v-model="amount" >
        </div>
        <div class="flex items-center gap-3 mb-3 amount-btns">
            <button class="btn btn-secondary"  id="money_1" @click="clvue" data_money="10000">{{ langweb('fe.10')}}</button>
            <button class="btn btn-secondary"  id="money_2" @click="clvue" data_money="30000">{{ langweb('fe.30')}}</button>
            <button class="btn btn-secondary"  id="money_3" @click="clvue" data_money="50000">{{ langweb('fe.50')}}</button>
            <button class="btn btn-secondary"  id="money_4" @click="clvue" data_money="100000">{{ langweb('fe.100')}}</button>
            <button class="btn btn-secondary" id="money_5" @click="clvue" data_money="500000">{{ langweb('fe.500')}}</button>
            <button class="btn btn-secondary"  id="money_6" @click="clvue" data_money="1000000">{{ langweb('fe.1000')}}</button>
            <button class="btn btn-danger"  id="money_7" @click="Resetfrm">{{ langweb('fe.resets')}}</button>
        </div>
        <div class="flex items-center gap-3 justify-center mt-8 mb-2">
            <button class="btn btn-primary" type="submit" id="submit_btn">{{ langweb('fe.apply')}}</button>
            <!-- <button class="btn btn-primary">신청입금계좌요청</button> -->
            <form method="post" @submit="senChatCoin" class="form-replychat_cashin">
                    <select v-model="title" class="select-title_coin">
                        <option v-for="(titlelt, index) in listtitle.slice(0, 1)" v-bind:key="index" :value="titlelt.id">{{ titlelt.question }}</option>
                    </select>
                    <textarea v-for="(titlelts, indexs) in listtitle.slice(0, 1)" v-model="titlelts.question" v-bind:key="indexs" name="question_content" class="answer_content content-send-chat" cols="30" rows="6"></textarea>
                    <button type="submit" class="btn btn-secondary" id="submit_btn_chatv">{{ langweb('fe.coin')}}</button>
                    <!--  @click="clicksendCoin" -->
            </form>
        </div>
        <div class="w-full text-center">
            <span class="w-full">{{ langweb('fe.textbottombutton')}}</span>
        </div>
    </form>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
import $ from 'jquery'
$( document ).ready(function() {
});
export default {
    name: 'Cashin_city',
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
            amountinfo: '',
            // numberbank: '',
            amount: 0,
            modalSend: false,
            id_user: '1',
            title: '',
            question_content: '',
            listtitle: []
        }
    },
    created () {
        this.getListInfo()
        // setInterval(this.getListInfo, 20000);
        this.listTitle()
    },
    components: {
    },
    methods: {
        cashIn (e) {
            e.preventDefault()
            var token_user = window.localStorage.getItem('token')
            this.amount = $('.numbermoney').val()
            $("#submit_btn").addClass('submit_btn');
            document.getElementById("submit_btn").disabled = true;
            this.axios.post(this.api_cashin, 
                {
                    amount: this.amount
                },
                { headers: {
                    Authorization: 'Bearer ' + token_user
                }},
            ).then(res => {
                if (res.data.success === "Success") {
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 4000
                    })
                    this.amount = ''
                    $("#submit_btn").removeClass('submit_btn');
                    document.getElementById("submit_btn").disabled = false;
                } else {
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.amount = ''
                    $("#submit_btn").removeClass('submit_btn');
                    document.getElementById("submit_btn").disabled = false;
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
                    $("#submit_btn").removeClass('submit_btn');
                    document.getElementById("submit_btn").disabled = false;
                }
            })
        },
        getListInfo () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_infouser, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                this.amountinfo = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(Number(response.data.data.user.amount) + Number(response.data.data.user.casino))
                // this.numberbank = response.data.data.user.number_bank
            })
        },
        clvue (event) {
            var datamn = Number(event.target.getAttribute('data_money'))
            var moneys = $('.numbermoney').val()
            var money = ''
            var money_total = ''
            if(moneys==''){
                money = 0
            }else{
                money = moneys
            }
            money_total = Number(datamn) + Number(money)
            $('.numbermoney').val(money_total)
        },
        clicksendCoin () {
            this.modalSend = true
        },
        listTitle () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_listtitle, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                this.listtitle = response.data.data.filter(d => d.type == 1)
                this.title = this.listtitle[0]?.id
            })
        },
        senChatCoin (e) {
            e.preventDefault()
            var token_user = window.localStorage.getItem('token')
            this.title = $('.select-title_coin').val()
            this.question_content = $('.content-send-chat').val()
            $("#submit_btn_chatv").addClass('submit_btn');
            document.getElementById("submit_btn_chatv").disabled = true;
            this.axios.post(this.api_sendchat, 
                {
                    title: this.title,
                    question_content: this.question_content,
                    user_receive: this.id_user
                },
                { headers: {
                    Authorization: 'Bearer ' + token_user
                }},
            ).then(res => {
                if (res.data.success === "true") {
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 4000
                    })
                    this.title = this.question_content = ''
                    this.modalSend = false
                    $("#submit_btn_chatv").removeClass('submit_btn');
                    document.getElementById("submit_btn_chatv").disabled = false;
                } else {
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.title = this.question_content = ''
                    this.modalSend = false
                    $("#submit_btn_chatv").removeClass('submit_btn');
                    document.getElementById("submit_btn_chatv").disabled = false;
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
                    $("#submit_btn_chatv").removeClass('submit_btn');
                    document.getElementById("submit_btn_chatv").disabled = false;
                }
            })
        },
        Resetfrm () {
            $('.numbermoney').val('0')
        },
        loadMoney () {
            $('.loading_money').show()
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_infouser, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                $('.loading_money').css('display', 'none')
                this.amountinfo = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(Number(response.data.data.user.amount) + Number(response.data.data.user.casino))
            })
        }
    }
}
</script>
<style>
</style>
