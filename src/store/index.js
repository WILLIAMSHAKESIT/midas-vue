// import Vue from "vue";
import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
    state:{
        lang: [],
        // title: []
        language: 'kr',
        user: [],
        gameTab:'casino',
    },
    getters:{
        
    },
    mutations:{
        changeTab(state,payload) {
            state.gameTab = payload;
        },
        changLang(state) {
            axios.get(`https://api.chanel01.com/api/language`).then((res) => {
                // state.lang = [...state.lang, res.data.data.language];
                state.lang = res.data.data.language
                // console.log(res);
            })
        },
        clickEn(state){
            state.language = 'en'
        },
        clickKr(state){
            state.language = 'kr'
        },
        // getInfo (state, name) {
        //     let title = state.title
        //     title.push(name)
        //     state.title = [...state.title];
        // }
    },
    actions:{
        // getInfo(context, title) {
        //     context.commit('getInfo', title);
        // },
        changLang(context) {
            context.commit('changLang');
        },
    }
});

export default store;
