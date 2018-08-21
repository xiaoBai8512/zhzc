<template>
    <div class="layout">
        <yd-navbar :title="title">
            <i slot="left" class='HH_icon_back' style="margin-left: 10px" @click="goBack"></i>
            <!--<span>-->
                <!---->
            <!--</span>-->
            <slot  slot="right" name="right"></slot>
        </yd-navbar>
        <!--<header>-->
            <!--<div class="box-back" @click="goBack">-->
                <!--<icon-back></icon-back>-->
            <!--</div>-->
            <!--<slot name="title">-->
                <!--<span class="title">{{title}}</span>-->
            <!--</slot>-->
            <!--<slot name="right">-->
                <!--<span @click="goDetail" class="detail">{{detail}}</span>-->
            <!--</slot>-->
        <!--</header>-->
        <slot></slot>
    </div>
</template>

<script>
    import IconBack from '../components/IconBack.vue'
    export default{
        name: 'LayPage',
        components: {
            [IconBack.name]: IconBack
        },
        props: ['title', 'detail', 'back', 'goto', 'theme'],
        data(){
            return {
                redirect:{
                    enterprisePerfectInfo: 'enterpriseMy',
                    certification: 'my',
                }
            }
        },
        methods: {
            goBack(){
                if (this.redirect[this.$route.name]) {
                    this.$router.push(this.redirect[this.$route.name])
                } else {
                    this.$router.back();
                }
            },
            goDetail(){
                if(this.goto) this.$router.push(this.goto);
            }
        }
    }
</script>
