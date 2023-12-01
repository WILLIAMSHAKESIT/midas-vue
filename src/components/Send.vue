<template>
    <div class="flex mb-4 gap-3 w-full justify-end">
        <button class="btn btn-secondary w-32" @click="getViewall">{{ langweb('fe.viewall') }}</button>
        <button class="btn btn-danger w-32" @click="getDeleteall">{{ langweb('fe.deleteall') }}</button>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                <th scope="col">{{ langweb('fe.ttquestion') }}</th>
                <th scope="col">{{ langweb('fe.content_send') }}</th>
                <th scope="col">{{ langweb('fe.date') }}</th>
                <th scope="col">{{ langweb('fe.status') }}</th>
                <th scope="col">{{ langweb('fe.del') }}</th>
                </tr>
            </thead>
            <tbody v-if="dataSend.length > 0">
                <tr v-for="(itemSend, indexSend) in dataSend" v-bind:key="indexSend">
                    <td>{{ itemSend.title }}</td>
                    <td>
                        <div class="title-notify" @click="getView(itemSend.id, id_us)">
                            <div style="cursor: pointer;" v-html="itemSend.content.substring(0, 200)" class="content_chatadmin"></div>
                        </div>
                        <div class="substring_content_tb hidepp">
                            <div class="flex_popup">
                                <div class="showtb">
                                    <div class="height_scroll">
                                        <p class="titlenoti">{{ itemSend.title }}</p>
                                        <div v-html="itemSend.content" class="content_tb"></div>
                                    </div>
                                    <button class="close_noti"><img src="../assets/images/closes.svg" alt=""></button>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>{{ itemSend.created_at }}</td>
                    <td v-if="Object.values(itemSend.user_view.split(',').map((e) => parseInt(e))).includes(id_us) == false">{{ langweb('fe.notseen')}}</td>
                    <td v-else>{{ langweb('fe.watch')}}</td>
                    <td><button class="btn btn-danger" @click="deleteSend(itemSend.id)">삭제</button></td>
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
        <paginate @update:modelValue="clickCallbackSend" :totalCount="totalCountSend" :limit="perPageSend" v-model="pageSend"></paginate>
    </nav>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
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
    name: 'Send_city',
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
            listchatSend: [],
            pageSend: 1,
            perPageSend: 10,
            totalCountSend: 0,
            dataSend: [],
            readMoreSend: [false],
            iddelSend: '',
            id_us: '',
            user_login: ''
        }
    },
    created () {
        this.getListChatSend()
        setInterval(this.getListChatSend, 30000);
        this.getIdUser()
    },
    methods: {
        getListChatSend () {
            this.axios.get(this.api_listSend, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then((response) => {
                this.listchatSend = response.data.data.list_data
                this.user_login = response.data.data.user_id
                // console.log(response.data.data.list_data);
                this.totalCountSend = this.listchatSend.length
                this.paginatedDataSend()
            })
        },
        paginatedDataSend () {
            this.dataSend = this.listchatSend.slice((this.pageSend - 1) * this.perPageSend, this.pageSend * this.perPageSend)
        },
        clickCallbackSend (pageNum) {
            this.pageSend = pageNum;
            this.paginatedDataSend();
        },
        showMoreSend(index) {
            this.readMoreSend[index] = true;
        },
        showLessSend(index) {
            this.readMoreSend[index] = false;
        },
        deleteSend (id) {
            this.axios.post(this.api_delSen, 
                {
                    id,
                },
                { 
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('token')
                    }
                },
            ).then(res => {
                this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 4000
                })
                const indexParent = this.listchatSend.findIndex(value => value.id === id);
                if (indexParent >= 0) {
                    this.listchatSend.splice(indexParent, 1);
                }
                this.dataSend = this.listchatSend
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
            this.axios.post(this.api_viewSend, 
                {
                    id
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('token')
                    }
                }
            ).then((response) => {
                var audio_1 = document.getElementById("audio_send");
                audio_1.pause();
                this.varlog = response
                this.listchatSend.filter(
                    item => item.id === id
                )
                .map(function (obj) {
                    obj.user_view = ids + '';
                    return obj;
                });
            })
        },
        getViewall () {
            let id_user_login = this.user_login
            let token_users = window.localStorage.getItem('token')
            this.axios.post(this.api_viewall, 
                {
                    // code: '2' 
                },
                { 
                    headers: {
                        Authorization: 'Bearer ' + token_users
                    }
                }
            ).then(res => {
                this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 4000
                })
                this.listchatSend.map(function (obj) {
                    obj.user_view = obj.user_view + ',' + id_user_login + '';
                    return obj;
                });
            }).catch(e => {
                if (e.response?.status === 404) {
                    this.$swal({
                        position: 'top-end',
                        icon: 'error',
                        title: e.response?.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
        },
        getDeleteall () {
            this.$swal({
                title: '삭제하시겠습니까?',
                // text: "되돌릴 수 없습니다!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '취소',
                confirmButtonText: '확인',
                customClass: {
                    container: 'wrapper_swal_alert',
                    confirmButton: 'btn_confign',
                    cancelButton: 'btn_cancel'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    let token_users = window.localStorage.getItem('token')
                    this.axios.post(this.api_deleteall, 
                        {
                            // code: '2' 
                        },
                        { 
                            headers: {
                                Authorization: 'Bearer ' + token_users
                            }
                        }
                    ).then(res => {
                        let dataArray = [];
                        this.$swal({
                            position: 'top-end',
                            icon: 'success',
                            title: res.data.message,
                            showConfirmButton: false,
                            timer: 4000
                        })
                        this.listchatSend = dataArray
                        this.totalCountSend = this.listchatSend.length
                        this.paginatedDataSend()
                    }).catch(e => {
                        if (e.response?.status === 404) {
                            this.$swal({
                                position: 'top-end',
                                icon: 'error',
                                title: e.response?.data.message,
                                showConfirmButton: false,
                                timer: 3000
                            })
                        }
                    })
                }
            })
        },
    }
}
</script>
<style>
</style>
