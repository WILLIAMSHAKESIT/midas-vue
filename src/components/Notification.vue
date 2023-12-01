<template>
    <table class="table table-bordered">
        <thead>
            <tr>
            <th scope="col">{{ langweb('fe.stt')}}</th>
            <th scope="col">{{ langweb('fe.title')}}</th>
            <th scope="col">{{ langweb('fe.date')}}</th>
            <th scope="col">{{ langweb('fe.status')}}</th>
            </tr>
        </thead>
        <tbody v-if="datas.length > 0">
            <tr  v-for="(item,index) in datas" v-bind:key="index">
                <td>{{ index+1 }}</td>
                <td>
                    <div class="title-notify" @click="getView(item.id, id_us)">
                        <p>{{ item.title }}</p>
                    </div>
                    <div class="substring_content_tb hidepp">
                        <div class="flex_popup">
                            <div class="showtb">
                                <div class="height_scroll">
                                    <p class="titlenoti">{{ item.title }}</p>
                                    <div v-html="item.content" class="content_tb"></div>
                                </div>
                                <button class="close_noti"><img src="../assets/images/closes.svg" alt=""></button>
                            </div>
                        </div>
                    </div>
                </td>
                <td>{{ item.created_at }}</td>
                <td v-if="Object.values(item.user_view.split(',').map((e) => parseInt(e))).includes(id_us) == false">{{ langweb('fe.notseen')}}</td>
                <td v-else>{{ langweb('fe.watch')}}</td>
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
    <div></div>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
import $ from 'jquery'
$( document ).ready(function() {
    $(document).on('click', '.title-notify', function() {
        $(this).parent().find('.substring_content_tb').show();
        $('body').css('overflow', 'hidden')
    });
    $(document).on('click', '.close_noti', function() {
        $(this).parents('.substring_content_tb').hide();
        $('body').css('overflow', 'initial')
    });
});
export default {
    name: 'Notification_city',
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
            listnotifi: [],
            page: 1,
            perPage: 10,
            totalCount: 0,
            datas: [],
            readMore: [false],
            iddeleteNotify: '',
            id_us: '',
            id: '',
            varlog: ''
        }
    },
    created () {
        this.getIdUser()
        this.getListnotifi()
    },
    methods: {
        getListnotifi () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_listnotifi, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                this.listnotifi = response.data.data
                this.totalCount = this.listnotifi.length
                console.log(this.listnotifi)
                this.paginatedData()
            })
        },
        paginatedData () {
            this.datas = this.listnotifi.slice((this.page - 1) * this.perPage, this.page * this.perPage)
        },
        clickCallback (pageNum) {
            this.page = pageNum;
            this.paginatedData();
        },
        showMore(index) {
            this.readMore[index] = true;
        },
        showLess(index) {
            this.readMore[index] = false;
        },
        deleteNotify (e) {
            e.preventDefault()
            this.iddeleteNotify = e.target.getAttribute('data_id')
            console.log(this.iddeleteNotify);
            this.axios.post(this.api_deleteNotify, 
                {
                    id: this.iddeleteNotify,
                },
                { 
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('token')
                    }
                },
            ).then(res => {
                console.log('222', res);
                this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 4000
                })
                var token_usser = window.localStorage.getItem('token')
                this.axios.get(this.api_listnotifi, {
                    headers: {
                        Authorization: 'Bearer ' + token_usser
                    }
                }).then((response) => {
                    this.listnotifi = response.data.data
                    this.totalCount = this.listnotifi.length
                    this.paginatedData()
                })
            }).catch(e => {
                console.log('222', e);
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
        getIdUser () {
            this.axios.get(this.api_infouser, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then((response) => {
                this.id_us = response.data.data.user.id
            })
        },
        getView (id, ids) {
            this.axios.post(this.api_viewnotify, 
                {
                    id
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('token')
                    }
                }
            ).then((response) => {
                this.varlog = response
                this.listnotifi.filter(
                    item => item.id === id
                )
                .map(function (obj) {
                    obj.user_view = ids + '';
                    return obj;
                });
            })
        },
    }
}
</script>
<style>
</style>
