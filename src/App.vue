<template>
    <div id="app">
        <keep-alive :include="includeComponents">
            <router-view/>
        </keep-alive>

        <loader></loader>
        <prompt></prompt>
    </div>
</template>

<script type="text/ecmascript-6">
    import loader from './components/Loader.vue'
    import prompt from './components/Prompt.vue'
    import {apiRequestNormal} from "./utils/api";
    
    export default {
        name: 'app',
        components: {loader, prompt},
        data() {
            return {
                includeComponents: 'registered,experts'
            }
        },
        mounted: function () {
            let self = this
            
        },
        methods: {
            // getParams: function (url) {
            //     if (url.indexOf("?") != -1) {
            //         let urlParam = url.substr(url.indexOf("?") + 1)
            //         console.info('urlParam ' + urlParam)
            //         let strs = urlParam.split("&")
            //         let params = {}
            //         for (let i = 0; i < strs.length; i++) {
            //             params[strs[i].split("=")[0]] = strs[i].split("=")[1]
            //         }
            //         console.info('param ' + JSON.stringify(params))
            //         return params
            //     }
            //     return null
            // }

            getParams: function (url, name) {
                let reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");
                let r = url.match(reg);
                if (r != null) {
                    return unescape(r[2]);
                }
                return null;
            },
        }
    }
</script>
