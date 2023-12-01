<template>
    <form :class="showParent?'wrapper-contact d-block':'wrapper-contact'">
        <div class="mb-4">
            <label for="">{{ langweb('fe.title')}}</label>
            <select v-model="title" class="form-control">
                <option value="" selected>{{ langweb('fe.select')}}</option>
                <option value="입금문의">입금문의</option>
                <option value="출금문의">출금문의</option>
                <option value="입금계좌 요청문의">입금계좌 요청문의</option>
                <option value="기타문의">기타문의</option>
            </select>
        </div>
        <div class="mb-4">
            <label for="">{{ langweb('fe.writer')}}</label>
            <input type="hidden" v-model="id_user">
            <input type="text" :value="nameUser" class="form-control" disabled>
        </div>
        <div class="mb-4">
            <textarea class="form-control" cols="30" rows="10" v-model="question_content" maxlength="100" ></textarea>
        </div>
        <div class="flex items-center gap-4 mx-auto justify-center w-full">
            <button class="btn btn-danger" id="submit_btnss">{{ langweb('fe.apply')}}</button>
            <button class="btn btn-primary" @click="clickComeBack">{{ langweb('fe.back')}}</button>
        </div>
    </form>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
import $ from 'jquery'
export default {
    name: 'Contact_city',
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
            nameUser: '',
            id_user: '1',
            title: '',
            question_content: '',
            listtitle: [],
            showParent:false
        }
    },
    created () {
        this.infoUser()
        this.listTitle()
    },
    mounted(){
        if(this.$route.path == '/contact-us'){
            this.showParent = true
            console.log('tessiongf')
        }
    },
    components: {
    },
    methods: {
        infoUser () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_infouser, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                this.nameUser = response.data.data.user.name
            })
        },
        SendChat (e) {
            e.preventDefault()
            var token_user = window.localStorage.getItem('token')
            this.title = $('.select-title').val()
            this.question_content = $('.content-send-chat').val()
            $("#submit_btnss").addClass('submit_btn');
            document.getElementById("submit_btnss").disabled = true;
            this.axios.post(this.api_sendchat, 
                {
                    title: this.title,
                    question_content: this.question_content,
                    user_receive: this.id_user
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
                    this.title = this.question_content = ''
                    $("#submit_btnss").removeClass('submit_btn');
                    document.getElementById("submit_btnss").disabled = false;
                } else {
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.title = this.question_content = ''
                    $("#submit_btnss").removeClass('submit_btn');
                    document.getElementById("submit_btnss").disabled = false;
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
                    $("#submit_btnss").removeClass('submit_btn');
                    document.getElementById("submit_btnss").disabled = false;
                }
            })
        },
        listTitle () {
            var token_user = window.localStorage.getItem('token')
            this.axios.get(this.api_listtitle, {
                headers: {
                    Authorization: 'Bearer ' + token_user
                }
            }).then((response) => {
                this.listtitle = response.data.data.filter(d => d.type == 0)
            })
        },
        clickComeBack () {
            $('.chatlist_tata').show()
            $('.wrapper-contact').hide()
        }
    }
}
</script>
<style>
</style>
