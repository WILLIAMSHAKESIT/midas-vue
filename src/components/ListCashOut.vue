<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">{{ langweb('fe.date')}}</th>
                <th scope="col">{{ langweb('fe.cashout2')}}</th>
                <th scope="col">{{ langweb('fe.applicationamount')}}</th>
                <th scope="col">{{ langweb('fe.cashout3')}}</th>
                <th scope="col">{{ langweb('fe.type')}}</th>
                <th scope="col">{{ langweb('fe.status')}}</th>
            </tr>
        </thead>
        <tbody v-if="datas.length > 0">
            <tr v-for="(itemlist, index) in datas" v-bind:key="index">
                <td>{{ itemlist.created_at }}</td>
                <td>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(itemlist.amount_now) }}</td>
                <td>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(itemlist.amount) }}</td>
                <td>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(itemlist.amount_player) }}</td>
                <td v-if="itemlist.type==1" class="btn_cs_in"><span>{{ langweb('fe.cashintxt')}}</span></td>
                <td v-else class="btn_cs_out"><span>{{ langweb('fe.cashouttxt')}}</span></td>
                <td v-if="itemlist.status==0" style="color: red;">{{ langweb('fe.cancels')}}</td>
                <td v-else-if="itemlist.status==1" style="color: #5c7f34;">{{ langweb('fe.approve')}}</td>
                <td v-else style="color: yellow;">{{ langweb('fe.waiting')}}</td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td colspan="100" class="text-center">{{ langweb('fe.empty')}}</td>
            </tr>
        </tbody>
    </table>
    <nav class="custom-pagination">
        <paginate @update:modelValue="clickCallback" :totalCount="totalCount" :limit="perPage" v-model="page"></paginate>
    </nav>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
import $ from 'jquery'
$( document ).ready(function() {
});

export default {
    name: 'ListCashout_city',
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
            listcashin: [],
            page: 1,
            perPage: 15,
            totalCount: 0,
            datas: []
        }
    },
    created () {
        this.getListcashout()
        setInterval(this.getListcashout, 20000);
    },
    methods: {
        getListcashout () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_listcashinout, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                this.listcashin = response.data.data
                this.totalCount = this.listcashin.length
                this.paginatedData()
            })
        },
        paginatedData () {
            this.datas = this.listcashin.slice((this.page - 1) * this.perPage, this.page * this.perPage)
        },
        clickCallback (pageNum) {
            this.page = pageNum;
            this.paginatedData();
        },
    }
}
</script>
<style>
</style>
