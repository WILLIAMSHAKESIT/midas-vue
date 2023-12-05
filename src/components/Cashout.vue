<template>
    <form method="post"  @submit="cashout">
        <div class="modal-banner">
            <div class="banner-text">  최소 출금금액은 1,000입니다. 해당 금액보다 많아야 출금신청 가능합니다.</div>
            <!-- <img src="../assets/img/banner/banner.jpg" alt=""> -->
        </div>
        <div class="mb-2">
            <label for="">{{ langweb('fe.holdingamount')}}</label>
            <div class="flex gap-3">
                <input type="text" class="form-control" :value="amountinfo" readonly>
                <button class="btn btn-primary w-12 min-w-fit "  @click="loadMoneys"><i class="fa-solid fa-arrows-rotate"></i></button>
            </div>
        </div>
        <!-- <div class="mb-2">
            <label for="">{{ langweb('fe.accountnumber')}}</label>
            <div class="flex gap-3">
                <input type="text" :value="numberbank" class="form-control">
            </div>
        </div> -->
        <div class="mb-2">
            <label for="">{{ langweb('fe.nameuser')}}</label>
            <div class="flex gap-3">
                <input type="text" :value="nameuser" class="form-control">
            </div>
        </div>
        <div class="mb-2">
            <label for="">{{ langweb('fe.moneycashout')}} (*)</label>
            <input type="number" placeholder="0" name="amount" v-model="amount" class="form-control numbermoney">
        </div>
        <div class="flex items-center gap-3 mb-2 amount-btns">
            <button class="btn btn-secondary"  @click="clvue(10000)">{{ langweb('fe.10')}}</button>
            <button class="btn btn-secondary" @click="clvue(30000)">{{ langweb('fe.30')}}</button>
            <button class="btn btn-secondary" @click="clvue(50000)">{{ langweb('fe.50')}}</button>
            <button class="btn btn-secondary" @click="clvue(100000)">{{ langweb('fe.100')}}</button>
            <button class="btn btn-secondary" @click="clvue(500000)">{{ langweb('fe.500')}}</button>
            <button class="btn btn-secondary" @click="clvue(1000000)">{{ langweb('fe.1000')}}</button>
            <button class="btn btn-danger" @click="Resetfrm">{{ langweb('fe.resets')}}</button>
        </div>
        <div class="mb-2">
            <label for="">{{ langweb('fe.passCash')}}</label>
            <input type="password" autocomplete="off" v-model="password" class="form-control" style="pointer-events:inherit">
        </div>
        <div class="flex items-center gap-3 justify-center mb-2">
            <button type="submit" class="btn btn-primary" id="submit_btns">{{ langweb('fe.apply')}}</button>
        </div>
    </form>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
import { ref } from 'vue';
import $ from 'jquery'
$( document ).ready(function() {
});

export default {
    name: 'Cashout_city',
    setup() {
        const amount = ref('0');
        const clvue = (value) => {
            var amount_old = amount.value
            amount.value = Number(amount_old) + Number(value);
        };
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
            amount,
            clvue,
        }
    },
    data () {
        return {
            amountinfo: '',
            // numberbank: '',
            // amount: 0,
            password: '',
            nameuser: ''
        }
    },
    created () {
        this.getListInfo()
        // setInterval(this.getListInfo, 20000);
    },
    methods: {
        cashout (e) {
            e.preventDefault()
            var token_user = window.localStorage.getItem('token')
            this.amount = $('.numbermoney').val()
            $("#submit_btns").addClass('submit_btn');
            document.getElementById("submit_btns").disabled = true;
            this.axios.post(this.api_cashout, 
                {
                    amount: this.amount,
                    password: this.password
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
                    this.$emit('change_amount');
                    this.amount = this.password = ''
                    $("#submit_btns").removeClass('submit_btn');
                    document.getElementById("submit_btns").disabled = false;
                    this.axios.get(this.api_infouser, {
                        headers: {
                            Authorization: 'Bearer ' + token_user
                        }
                    }).then((response) => {
                        this.amountinfo = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(Number(response.data.data.user.amount) + Number(response.data.data.user.casino))
                        // this.numberbank = response.data.data.user.number_bank
                        this.nameuser = response.data.data.user.name
                    })
                } else {
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.$emit('change_amount');
                    this.amount = this.password = ''
                    $("#submit_btns").removeClass('submit_btn');
                    document.getElementById("submit_btns").disabled = false;
                    this.axios.get(this.api_infouser, {
                        headers: {
                            Authorization: 'Bearer ' + token_user
                        }
                    }).then((response) => {
                        this.amountinfo = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(Number(response.data.data.user.amount) + Number(response.data.data.user.casino))
                        // this.numberbank = response.data.data.user.number_bank
                        this.nameuser = response.data.data.user.name
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
                    $("#submit_btns").removeClass('submit_btn');
                    document.getElementById("submit_btns").disabled = false;
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
                this.nameuser = response.data.data.user.name
            })
        },
        Resetfrm () {
            $('.numbermoney').val('0')
        },
        loadMoneys () {
            $('.loading_moneys').show()
            let token_users = window.localStorage.getItem('token')
            this.axios.post(this.api_restInfo, 
                {
                    // code: '2' 
                },
                { 
                    headers: {
                        Authorization: 'Bearer ' + token_users
                    }
                }
            ).then((response) => {
                $('.loading_moneys').css('display', 'none')
                this.amountinfo = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(Number(response.data.data.user.amount) + Number(response.data.data.user.casino))
            })
        },
    }
}
</script>
<style>
</style>
