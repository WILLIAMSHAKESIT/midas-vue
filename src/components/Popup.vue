<template>
    <div class="root-notifi">
        <div class="wrapper-popup">
            <div class="item-popup" v-for="(item, index) in datas" v-bind:key="index">
                <div class="titltpopup">{{ langweb('fe.sendall') }}</div>
                <div class="content-popup">
                    <p class="date-popup">{{ item.created_at }}</p>
                    <p class="title-popup">{{ item.title }}</p>
                    <div class="text-popup" v-html="item.content"></div>
                </div>
            </div>
            <paginate @update:modelValue="clickCallback" :totalCount="totalCount" :limit="perPage" v-model="page"></paginate>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
export default {
    name: 'Popup_city',
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
            listpopup: [],
            page: 1,
            perPage: 10,
            totalCount: 0,
            datas: []
        }
    },
    created () {
        this.getListPopup()
    },
    components: {
    },
    methods: {
        getListPopup () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_listpopup, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                this.listpopup = response.data.data.list_data
                this.totalCount = this.listpopup.length
                this.paginatedData()
            })
        },
        paginatedData () {
            this.datas = this.listpopup.slice((this.page - 1) * this.perPage, this.page * this.perPage)
        },
        clickCallback (pageNum) {
            this.page = pageNum;
            this.paginatedData();
        }
    }
}
</script>
<style>
</style>
