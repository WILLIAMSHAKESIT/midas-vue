<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">{{ langweb('fe.username') }}</th>
                <th scope="col">{{ langweb('fe.names') }}</th>
                <th scope="col">{{ langweb('fe.applicationamount')}}</th>
                <th scope="col">{{ langweb('fe.amountafterdeposit')}}</th>
                <th scope="col">{{ langweb('fe.date')}}</th>
            </tr>
        </thead>
        <tbody v-if="datassss.length > 0">
            <tr v-for="(itemlist, index) in datassss" v-bind:key="index">
                <!-- <td>{{ itemlist.partner_code }}</td> -->
                <td>{{ itemlist.username }}</td>
                <td>{{ itemlist.fullname }}</td>
                <td>{{ new Intl.NumberFormat().format(itemlist.amount) }}</td>
                <td>{{ new Intl.NumberFormat().format(itemlist.amount_player) }}</td>
                <td>{{ itemlist.created_at }}</td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td colspan="100" class="text-center">{{ langweb('fe.empty')}}</td>
            </tr>
        </tbody>
    </table>
    <nav class="custom-pagination">
        <paginate @update:modelValue="clickCallbacksss" :totalCount="totalCountsss" :limit="perPagesss" v-model="pagesss"></paginate>
    </nav>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
export default {
    name: 'Gift_city',
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
            listGift: [],
            pagesss: 1,
            perPagesss: 15,
            totalCountsss: 0,
            datassss: [],
        }
    },
    created () {
        this.getListGift()
    },
    methods: {
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
