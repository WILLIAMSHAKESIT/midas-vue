<template>
    <table class="table table-bordered">
        <thead>
            <tr>
            <th scope="col">{{ langweb('fe.nameBet')}}</th>
            <th scope="col">{{ langweb('fe.game')}}</th>
            <th scope="col">{{ langweb('fe.typebet')}}</th>
            <th scope="col">{{ langweb('fe.textbet')}}</th>
            <th scope="col">{{ langweb('fe.date')}}</th>
            </tr>
        </thead>
        <tbody v-if="dataListConvert.length > 0">
            <tr v-for="(itemlist, index) in dataListConvert" v-bind:key="index">
                <td>{{ itemlist.name }}</td>
                <td>{{ itemlist.game }}</td>
                <td v-if="itemlist.type == 'WIN'" style="font-weight: 400;">
                    <span v-if="itemlist.amount == 0" style="color: orange;">LOSE</span>
                    <span v-else style="color: #00FF00;">WIN</span>
                </td>
                <td v-else-if="itemlist.type == 'BET'" style="color: yellow;font-weight: 400;">{{ itemlist.type }}</td>
                <td v-else style="color: orange;font-weight: 400;">{{ itemlist.type }}</td>
                <td>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(itemlist.amount) }}</td>
                <td>{{ itemlist.date }}</td>
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
    name: 'Betting_city',
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
            listconvert: [],
            page: 1,
            perPage: 15,
            totalCount: 0,
            dataListConvert: []
        }
    },
    created () {
        this.getListBetting()
        // setInterval(this.getListBetting, 30000);
    },
    methods: {
        getListBetting () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_listbetting, {
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
    }
}
</script>
<style>
</style>
