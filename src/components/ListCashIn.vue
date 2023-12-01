<template>
    <div class="wrapper-listmoney">
        <div class="table-list">
            <table>
                <thead>
                    <tr>
                        <th>{{ langweb('fe.date')}}</th>
                        <th>{{ langweb('fe.amountbeforedeposit')}}</th>
                        <th>{{ langweb('fe.applicationamount')}}</th>
                        <th>{{ langweb('fe.amountafterdeposit')}}</th>
                        <th>{{ langweb('fe.status')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(itemlist, index) in datas" v-bind:key="index">
                        <td>{{ itemlist.created_at }}</td>
                        <td>{{ new Intl.NumberFormat().format(itemlist.amount_now) }}</td>
                        <td>{{ new Intl.NumberFormat().format(itemlist.amount) }}</td>
                        <td>{{ new Intl.NumberFormat().format(itemlist.amount_player) }}</td>
                        <td v-if="itemlist.status==0">{{ langweb('fe.cancels')}}</td>
                        <td v-else-if="itemlist.status==1">{{ langweb('fe.approve')}}</td>
                        <td v-else>{{ langweb('fe.waiting')}}</td>
                    </tr>
                </tbody>
            </table>
            <paginate @update:modelValue="clickCallback" :totalCount="totalCount" :limit="perPage" v-model="page"></paginate>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
import $ from 'jquery'
$( document ).ready(function() {
});

export default {
    name: 'ListCashin_city',
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
        this.getListcashin()
        setInterval(this.getListcashin, 20000);
    },
    components: {
    },
    methods: {
        getListcashin () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_listcashin, {
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
