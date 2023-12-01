<template>
    <form ref="form_changepass" @submit="changepass" method="post">
        <h3 class="text-center block text-amber-500 text-3xl mb-2">{{ langweb('fe.password') }}</h3>
        <div class="mb-4">
            <label for="">{{ langweb('fe.passwordold') }}</label>
            <input type="password" class="form-control" name="password" v-model="password" autocomplete="off" :placeholder="langweb('fe.passwordold') + ' (*)'">
        </div>
        <div class="mb-4">
            <label for="">{{ langweb('fe.passwordnew') }}</label>
            <input type="password" class="form-control" name="password_new" autocomplete="off" v-model="password_new" :placeholder="langweb('fe.passwordnew') + ' (*)'">
        </div>
        <div class="mb-4">
            <label for="">{{ langweb('fe.passwordconfirm') }}</label>
            <input  type="password" class="form-control" name="password_confirm" autocomplete="off" v-model="password_confirm" :placeholder="langweb('fe.passwordconfirm') + ' (*)'">
        </div>
        <div class="w-full flex items-center justify-center">
            <button class="btn btn-primary" type="submit">{{ langweb('fe.submit') }}</button>
        </div>
    </form>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';
export default {
    name: 'ChangePass_city',
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
            password: '',
            password_new: '',
            password_confirm: ''
        }
    },
    methods: {
        changepass (e) {
            e.preventDefault()
            var token_user = window.localStorage.getItem('token')
            this.axios.post(this.api_changepass, 
                {
                    password: this.password,
                    password_new: this.password_new,
                    password_confirm: this.password_confirm
                },
                { headers: {
                    Authorization: 'Bearer ' + token_user
                }},
            ).then(res => {
                if (res.data.success === true) {
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 4000
                    })
                    this.password = this.password_new = this.password_confirm = ''
                    window.localStorage.removeItem('token')
                    window.location.href = '/'
                } else {
                    this.$swal({
                        position: 'top-end',
                        icon: 'error',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
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
                }
            })
        },
    }
}
</script>
<style>
</style>
