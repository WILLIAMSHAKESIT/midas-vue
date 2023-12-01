<template>
    <div class="chatlist_tata">
        <table class="table table-bordered">
            <thead>
                <tr>
                <th scope="col">{{ langweb('fe.question') }}</th>
                <th scope="col">{{ langweb('fe.answer') }}</th>
                <th scope="col">{{ langweb('fe.status') }}</th>
                </tr>
            </thead>
            <tbody v-if="datas.length > 0">
                <!-- <tr>
                    <td>sample question</td>
                    <td>sample answer</td>
                    <td class="text-green-600">active</td>
                </tr> -->
                <tr v-for="(itemlist, index) in datas" v-bind:key="index">
                    <td style="width:35%;">
                        <p style="margin-bottom: 0;color:#9F9F9F;">{{ itemlist.created_at }}</p>
                        <p style="margin: 7px 0;font-weight:700;">{{ itemlist.title }}</p>
                        <div class="title_chat">
                            <div v-if="!readMore[index]" v-html="itemlist.question_content.substring(0, 200)"></div>
                            <div v-if="readMore[index]" v-html="itemlist.question_content"></div>
                            <p style="margin-top: 7px;" @click="showMore(index)" v-if="!readMore[index] && itemlist.question_content.length > 200" class="showmore">{{ langweb('fe.seemore')}}</p>
                            <p style="margin-top: 7px;" @click="showLess(index)" v-if="readMore[index]" class="lessmore">{{ langweb('fe.showless')}}</p>
                        </div>
                        <!-- <p v-html="itemlist.question_content" style="margin-bottom: 0;"></p> -->
                    </td>
                    <td v-if="itemlist.user_send==1 && itemlist.answer_content == ''" style="width:50%;text-align: center;">
                        <!-- <font-awesome-icon icon="fa-solid fa-reply replychat" @click="clickreply" :data_id="itemlist.id" /> -->
                        <img src="../assets/images/rep.png" class="replychat" @click="clickreply" :data_id="itemlist.id" alt="">
                    </td>
                    <td v-else-if="itemlist.user_send==1 && itemlist.answer_content != ''"  style="width:50%;">
                        <div v-if="!readMore[index]" v-html="itemlist.answer_content.substring(0, 300)" class="content_chatadmin"></div>
                        <div v-if="readMore[index]" v-html="itemlist.answer_content" class="content_chatadmin"></div>
                        <p @click="showMore(index)" v-if="!readMore[index] && itemlist.answer_content.length > 300" class="showmore">{{ langweb('fe.seemore')}}</p>
                        <p @click="showLess(index)" v-if="readMore[index]" class="lessmore">{{ langweb('fe.showless')}}</p>
                    </td>
                    <td v-else-if="itemlist.user_send!=1 && itemlist.answer_content == ''" style="width:50%;">
                        <div class="content-chatlts">
                            {{ langweb('fe.note') }}
                        </div>
                        <div class="imgxoa"><img src="../assets/images/delete.png" @click="deleteChat" class="img_delete" :data_id="itemlist.id" alt=""></div>
                    </td>
                    <td v-else style="width:50%;">
                        <div class="flexcss-div">
                            <div class="wp-divchat">
                                <!-- <div class="content-chatlt" v-if="!readMore[index]" v-html="itemlist.answer_content.substring(0, 300)"></div>
                                <div class="content-chatlt" v-if="readMore[index]" v-html="itemlist.answer_content"></div>
                                <p @click="showMore(index)" v-if="!readMore[index] && itemlist.answer_content.length > 300" class="showmore">{{ langweb('fe.seemore')}}</p>
                                <p @click="showLess(index)" v-if="readMore[index]" class="lessmore">{{ langweb('fe.showless')}}</p> -->
                                <div class="title-notify" @click="getView(itemlist.id, id_us)">
                                    <div style="cursor: pointer;" v-html="itemlist.answer_content.substring(0, 200)" class="content_chatadmin"></div>
                                </div>
                                <div class="substring_content_tb hidepp">
                                    <div class="flex_popup">
                                        <div class="showtb">
                                            <div class="height_scroll">
                                                <p class="titlenoti">{{ itemlist.title }}</p>
                                                <div v-html="itemlist.answer_content" class="content_tb"></div>
                                            </div>
                                            <button class="close_noti"><img src="../assets/images/closes.svg" alt=""></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="imgxoa"><img src="../assets/images/delete.png" @click="deleteChat" class="img_delete" :data_id="itemlist.id" alt=""></div>
                        </div>
                    </td>
                    <td style="width:15%;text-align: center" v-if="itemlist.user_view == null">{{ langweb('fe.notseen')}}</td>
                    <td style="width:15%;text-align: center" v-else-if="Object.values(itemlist.user_view.split(',').map((e) => parseInt(e))).includes(id_us) == false">{{ langweb('fe.notseen')}}</td>
                    <td style="width:15%;text-align: center" v-else>{{ langweb('fe.watch')}}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="100" class="text-center">{{ langweb('fe.empty')}}</td>
                </tr>
            </tbody>
        </table>
        <div class="flex items-center justify-between sm-col">
            <button class="btn btn-primary" id="to-contact" @click="clickChangeChat">문의하기</button>
            <nav class="custom-pagination not-center">
                <paginate @update:modelValue="clickCallback" :totalCount="totalCount" :limit="perPage" v-model="page"></paginate>
            </nav>
        </div>
        <div class="modal-vue modal-update-reply">
            <form method="post" @submit="reply" class="form-replychat">
                <div class="overlay" v-if="showReply" @click="showReply = false"></div>
                <div class="modal" v-if="showReply">
                    <div class="wp-modal-reply">
                        <div class="header-modal">
                            <div class="title-header" style="color: #ffd989;">{{ langweb('fe.reply') }}</div>
                            <button class="close-modal" @click="showReply = false">x</button>
                        </div>
                        <div class="content-modal">
                            <div class="content-repchat">
                                <textarea name="" rows="6" class="answer_content" v-model="answer_content"></textarea>
                            </div>
                            <input type="hidden" name="id_reply" v-model="reply_id" id="id_reply" class="id_reply">
                            <div class="btn-repchat">
                                <button type="submit" id="submit_btn_chatss">{{ langweb('fe.send') }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
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
    name: 'Chat_city',
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
            listchat: [],
            showReply: false,
            id: '',
            answer_content: '',
            reply_id: '',
            iddelete: '',
            page: 1,
            perPage: 10,
            totalCount: 0,
            datas: [],
            readMore: [false],
            id_us: '',
            level: window.localStorage.getItem('level'),
            offline: window.localStorage.getItem('offline'),
        }
    },
    created () {
        this.getListChat()
        setInterval(this.getListChat, 20000);
        this.infoUser()
    },
    methods: {
        getListChat () {
            this.axios.get(this.api_listchat, {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            }).then((response) => {
                this.listchat = response.data.data
                this.totalCount = this.listchat.length
                this.paginatedData()
            })
        },
        clickreply (e) {
            this.showReply = true
            this.reply_id = e.target.getAttribute('data_id')
        },
        reply (e) {
            e.preventDefault()
            this.id = $('.id_reply').val()
            this.answer_content = $('.answer_content').val()
            $("#submit_btn_chatss").addClass('submit_btn');
            document.getElementById("submit_btn_chatss").disabled = true;
            this.axios.post(this.api_reply, 
                {
                    id: this.id,
                    answer_content: this.answer_content
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
                this.axios.get(this.api_listchat, {
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('token')
                    }
                }).then((response) => {
                    this.listchat = response.data.data
                    this.totalCount = this.listchat.length
                    this.paginatedData()
                })
                this.showReply = false
                this.answer_content = ''
                $("#submit_btn_chatss").removeClass('submit_btn');
                document.getElementById("submit_btn_chatss").disabled = false;
            }).catch(e => {
                if (e.response.status === 404) {
                    this.$swal({
                        position: 'top-end',
                        icon: 'error',
                        title: e.response.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#submit_btn_chatss").removeClass('submit_btn');
                    document.getElementById("submit_btn_chatss").disabled = false;
                }
            })
        },
        deleteChat (e) {
            e.preventDefault()
            this.iddelete = e.target.getAttribute('data_id')
            this.axios.post(this.api_delete, 
                {
                    id: this.iddelete,
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
                var token_usser = window.localStorage.getItem('token')
                this.axios.get(this.api_listchat, {
                    headers: {
                        Authorization: 'Bearer ' + token_usser
                    }
                }).then((response) => {
                    this.listchat = response.data.data
                    this.totalCount = this.listchat.length
                    this.paginatedData()
                })
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
        paginatedData () {
            this.datas = this.listchat.slice((this.page - 1) * this.perPage, this.page * this.perPage)
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
        clickChangeChat () {
            $('.chatlist_tata').hide()
            $('.wrapper-contact').show()
        },
        infoUser () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_infouser, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                this.id_us = response.data.data.user.id
            })
        },
        getView (id, ids) {
            this.axios.post(this.api_viewChat, 
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
                this.listchat.filter(
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
