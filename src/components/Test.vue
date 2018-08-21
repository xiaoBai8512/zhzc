<template>
    <div>
        <section class="sec-icon">
            <i class="a"></i>
            <i class="b"></i>
        </section>

        <ul>
            <li @click="prompt">test prompt</li>

            <li @click="confirm">test confirm</li>

            <li @click="confirm2">test confirm with choose</li>

            <li @click="loader">test loader</li>

            <li @click="syncApp">test syncApp</li>

            <li @click="asyncApp">test asyncApp</li>
        </ul>

        <section>
            <iteminput holder="选择银行" v-model="bank">银行</iteminput>
            <iteminput holder="填写姓名" border="false" v-model="name">姓名</iteminput>
        </section>

        <section>
            <itemlink>店铺名称</itemlink>
            <itemlink desc="未设置" :to="{name: 'shopEdit'}">店铺简介</itemlink>
            <itemlink text="飞鱼" border="false">合同提供</itemlink>
            <!--<div slot="right" class="text-right">-->
                <!--<span>飞鱼提供</span>-->
            <!--</div>-->
        </section>

        <section>
            <div style="height: 5rem;">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="banner in banners" :key="banner.id"><img class="img-responsive" :src="banner.imageUrl" @click="bannerClick(banner.target)">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </section>

        <section>
            <button @click="toggleMenu1">去支付（底部弹窗）</button>
            <actionsheet v-model="show1" :menus="menus1" @on-click-menu="click">
                <p slot="header">选择支付方式</p>
            </actionsheet>
        </section>

        <section>
            <group>
                <selector placeholder="请选择省份" v-model="selector" title="省份" name="district" :options="list" @on-change="onChange"></selector>
            </group>
        </section>

        <!--<div class="Header_box">-->
            <!--<Headup class="ded" :width="50" v-model="photo" @getData="changePhoto"></Headup>-->
        <!--</div>-->
        <ImgUp :width="'4.4rem'" :height="'2.41rem'" v-model="upimg" @getData="formDataUp"></ImgUp>

    </div>

</template>

<script type="text/ecmascript-6">
    import {LOADER, PROMPT} from '../store/cons'
    import {callNative, setHandler} from '../utils/setBridge'
    import Headup from './Headup.vue'
    import ImgUp from './ImgUp.vue'
    export default{
        name: 'Test',
        data(){
            return{
                bank: '123',
                name: '',
                show1: false,
                menus1: {
                    menu1: '微信支付',
                    menu2: '支付宝支付',
                    menu3: '信用卡支付',
                },
                selector: null,
                list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
                banners: [
                    {"id":"2","name":"注册活动","image":"activity/banner/3f/3fe15d0d15934b92a3935c7998b47043.jpg","imageUrl":"https://image-test-tonglvhuanqiu.oss-cn-zhangjiakou.aliyuncs.com/activity/banner/3f/3fe15d0d15934b92a3935c7998b47043.jpg","target":"http://app.test.tonglvhuanqiu.com/#/home/activity?type=new","type":"APP","description":""},
                    {"id":"3","name":"充值返现活动","image":"activity/banner/ec/ec0592d9cf314ff49860dc4c881f5093.jpg","imageUrl":"https://image-test-tonglvhuanqiu.oss-cn-zhangjiakou.aliyuncs.com/activity/banner/ec/ec0592d9cf314ff49860dc4c881f5093.jpg","target":"http://app.test.tonglvhuanqiu.com/#/home/activity?type=charge","type":"APP","description":""}
                ],
                photo:'',
                upimg:'https://image-test-tonglvhuanqiu.oss-cn-zhangjiakou.aliyuncs.com/activity/banner/ec/ec0592d9cf314ff49860dc4c881f5093.jpg',
            }
        },
        components:{Headup,ImgUp},
        methods: {
            prompt(){
                this.$store.commit('PROMPT', {type: 'prompt', text: 'test promptpromptpromptpromptpromptpromptpromptpromptpromptpromptpromptpromptpromptprompt'})
            },
            confirm(){
                this.$store.commit(PROMPT, {type: 'confirm', text: 'test confirm'})
            },
            confirm2(){
                this.$store.commit(PROMPT, {text: 'test confirm with choose'})
            },
            loader(){
                this.$store.commit(LOADER, true)
                setTimeout(()=>{
                    this.$store.commit(LOADER, false)
                }, 3000)
            },
            syncApp(){
                callNative('submitFromWeb', {}, data => console.log(data))
            },
            asyncApp(){
                callNative('requestAppLocation', {}, data => console.log(data))
            },
            toggleMenu1(){
                this.show1 = !this.show1
            },
            click (key) {
                console.log(key)
            },
            onChange(val){
                console.log(val)
            },
            changePhoto(){

            },
            formDataUp(inData){
//                var formData = new FormData();
//                formData.append('upimg', inData);
//                let config = {
//                    headers: {
//                        'Content-Type': 'multipart/form-data',
//                        'Authorization': 'Bearer ' + localStorage.getItem('token')
//                    }
//                };
//                axios.post('/v1/user/photo', formData, config)
//                    .then(function (response) {
//                        sessionStorage.setItem('sourceUrl', 'meInfo');
//                        self.$store.dispatch('postUser', {vm: self, type: '2'});
//                    })
//                    .catch(function (error) {
//                        ajaxError(error, self);
//                    });
            }
        },
        created(){
            setHandler('responseJsLocation', data => console.log(data))
        }
    }
</script>
<style>

</style>
