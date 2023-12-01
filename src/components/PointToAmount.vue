<template>
    <form method="post" @submit="pointtoamount">
        <div class="mb-4">
            <label for="">{{ langweb('fe.titleconver')}}</label>
            <div class="flex gap-3">
                <input type="text" class="form-control" :value="amountinfo" readonly>
                <button  @click="loadMoneyss" class="btn btn-primary w-12 min-w-fit"><i class="fa-solid fa-arrows-rotate"></i></button>
            </div>
        </div>
        <div class="mb-3">
            <label for="">{{ langweb('fe.moneyconvert')}}</label>
            <input type="number" class="form-control numbermoney" placeholder="0" name="amount" v-model="amount">
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
            <button class="btn btn-primary">{{ langweb('fe.apply')}}</button>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered mt-8">
                <thead>
                    <tr>
                        <th>{{ langweb('fe.date')}}</th>
                        <th>{{ langweb('fe.convert2')}}</th>
                        <th>{{ langweb('fe.convert3')}}</th>
                        <th>{{ langweb('fe.convert4')}}</th>
                    </tr>
                </thead>
                <tbody v-if="dataListConvert.length > 0">
                    <tr v-for="(itemlist, index) in dataListConvert" v-bind:key="index">
                        <td>{{ itemlist.created_at }}</td>
                        <td>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(itemlist.point_now) }}</td>
                        <td>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(itemlist.point) }}</td>
                        <td>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(itemlist.point_player) }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="100" class="text-center">{{ langweb('fe.empty')}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nav class="custom-pagination">
            <paginate @update:modelValue="clickCallback" :totalCount="totalCount" :limit="perPage" v-model="page"></paginate>
        </nav>
    </form>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
import $ from 'jquery'
$( document ).ready(function() {
});

export default {
    name: 'PointToAmount_city',
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
            amount: '',
            listconvert: [],
            page: 1,
            perPage: 15,
            totalCount: 0,
            dataListConvert: []
        }
    },
    created () {
        this.getListInfo()
        // setInterval(this.getListInfo, 30000);
        this.getListconvert()
        setInterval(this.getListconvert, 30000);
    },
    methods: {
        pointtoamount (e) {
            e.preventDefault()
            var token_user = window.localStorage.getItem('token')
            this.amount = $('.numbermoney').val()
            this.axios.post(this.api_pointoamout + this.amount, 
                {
                    amount: this.amount
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
                    this.$emit('change_point_amount');
                    this.amount = ''
                    this.axios.get(this.api_infouser, {
                        headers: {
                            Authorization: 'Bearer ' + token_user
                        }
                    }).then((response) => {
                        this.amountinfo = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(response.data.data.user.point)
                        this.numberbank = response.data.data.user.number_bank
                    })
                } else {
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.$emit('change_point_amount');
                    this.amount = ''
                    this.axios.get(this.api_infouser, {
                        headers: {
                            Authorization: 'Bearer ' + token_user
                        }
                    }).then((response) => {
                        this.amountinfo = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(response.data.data.user.point)
                        this.numberbank = response.data.data.user.number_bank
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
        getListInfo () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_infouser, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                this.amountinfo = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(response.data.data.user.point)
                this.numberbank = response.data.data.user.number_bank
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
        getListconvert () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_listconvert, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                this.listconvert = response.data.data
                this.totalCount = this.listconvert.length
                this.paginatedData()
            })
        },
        paginatedData () {
            this.dataListConvert = this.listconvert.slice((this.page - 1) * this.perPage, this.page * this.perPage)
        },
        clickCallback (pageNum) {
            this.page = pageNum;
            this.paginatedData();
        },
        Resetfrm () {
            $('.numbermoney').val('0')
        },
        loadMoneyss () {
            $('.loading_moneyss').show()
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_infouser, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                $('.loading_moneyss').css('display', 'none')
                this.amountinfo = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(response.data.data.user.point)
            })
        }
    }
}
</script>
<style>
</style>
