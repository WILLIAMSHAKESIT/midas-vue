<template>
    <div class="lang-webs">
        <a @click="clickEn"><img src="../assets/images/en.svg" alt=""></a>
        <a @click="clickKr"><img src="../assets/images/kr.svg" alt=""></a>
    </div>
    <button @click="$emit('add', 2)">
        emit
    </button>
</template>

<script>
import { useStore } from "vuex";
import {  computed } from 'vue';

export default {
    name: 'Input_note',
    setup() {
        const store = useStore();
        const lang = computed(() => store.state.lang);
        const lang_en = computed(() => store.state.language);
        store.dispatch("changLang");
        return {
            lang,
            lang_en,
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
            clickEn () {
                store.commit('clickEn')
            },
            clickKr () {
                store.commit('clickKr')
            },
        };
        
        // return {
        //     // addnumber: () => {
        //         //store.commit('getInfo')
        //     // },
        //     count: computed(() => store.state.lang),
        // }
    },
    created () {
    },
    methods: {
        // savetitle(variable) {
        //     this.$store.dispatch("filterLang", variable);
        // },
        emitFc () {
            this.$emit("test", 123);
        }
    }
}
</script>
