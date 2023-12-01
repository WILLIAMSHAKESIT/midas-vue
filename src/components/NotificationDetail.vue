<template>
    <div class="">
        <div class="wrapper-notifi-detail">
            <div class="info-notifi">
                <div class="title-notifi">{{ langweb('fe.title') }}</div>
                <div class="date-name-noti">
                    <p>8/3/2023</p>
                    <p>Thông báo tuyển dụng</p>
                </div>
            </div>
            <div class="content-notifi">
                <p>- Trong trường hợp chuyển API sau khi đăng ký với các ngân hàng khác như Toss, Open Banking, Fintech, Naver/Kakao Pay, v.v.</p>
                <p>- Trong trường hợp chuyển API sau khi đăng ký với các ngân hàng khác như Toss, Open Banking, Fintech, Naver/Kakao Pay, v.v.</p>
                <p>- Trong trường hợp chuyển API sau khi đăng ký với các ngân hàng khác như Toss, Open Banking, Fintech, Naver/Kakao Pay, v.v.</p>
                <p>- Trong trường hợp chuyển API sau khi đăng ký với các ngân hàng khác như Toss, Open Banking, Fintech, Naver/Kakao Pay, v.v.</p>
                <p>- Trong trường hợp chuyển API sau khi đăng ký với các ngân hàng khác như Toss, Open Banking, Fintech, Naver/Kakao Pay, v.v.</p>
            </div>
           <div class="d-flex align-items-center justify-content-center">
            <router-link class="btn btn-primary w-25 mt-4 mx-auto" v-bind:to="{ name: 'Notification_city' }">{{ langweb('fe.list') }}</router-link>
           </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
export default {
    name: 'NotificationDetail_city',
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
            // listcashin: []
        }
    },
    created () {
        // this.getListcashout()
    },
    methods: {
        // getListcashout () {
        //     var token_user = window.localStorage.getItem('token')
        //     this.axios.get(this.api_listcashout, {
        //         headers: {
        //             Authorization: 'Bearer ' + token_user
        //         }
        //     }).then((response) => {
        //         this.listcashin = response.data.data
        //     })
        // },
    }
}
</script>
<style>
</style>
