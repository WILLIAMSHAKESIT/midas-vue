<template>
    <div v-if="mainHide == 1">
        <div v-if="$route.path == '/'">
            <Header_city />
                <router-view  :key ='$route.params'/>
            <Footer_city/>
        </div>
        <div v-else>
            <Header_city />
                <div  class="page-content">
                    <div class="route-content container">
                        <router-view  :key ='$route.params'/>
                    </div>
                </div>
            <Footer_city/>
        </div>
    </div>
    <div class="bgr_maintenance" v-else>
        <div class="container maintenance">
            <img src="./assets/images/system.png" alt="">
            <h1 class="error-title"><span>We’ll be back soon!</span></h1>
            <div v-html="message" class="text_maintenance"></div>
        </div>
    </div>
</template>
<script>
//css 
import "./assets/css/style.css"
import "./assets/css/style2.css"
import "./assets/css/all.min.css"
import "./assets/css/animate.min.css"
import "./assets/css/bootstrap.min.css"
import "./assets/css/tailwind.css"
import "./assets/css/aos.css"

import Header_city from './components/Header.vue'
import Footer_city from './components/Footer.vue'

export default {
    name: 'App',
    data () {
        return {
            mainHide: 1,
            message: ''
        }
    },
    components: {
        Header_city,
        Footer_city
    },
    created () {
        this.mainTenance();
        setInterval(this.mainTenance, 30000);
    },
    mounted(){
    },
    methods: {
        mainTenance () {
            this.axios.get(this.api_Setting).then(res => {
                if (res.data.success === true) {
                    this.mainHide = 1
                } else {
                    this.mainHide = 1
                }
            }).catch(e => {
                this.message = e.response.data.message
                if(e.response.status == 503){
                    this.mainHide = 0
                }
            })
        },
    }
}
</script>

<style>
</style>
