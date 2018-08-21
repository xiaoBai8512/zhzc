<template>
    <nav>
        <router-link :to="{name: 'home'}" exact tag="div">
            <img v-show="$route.name=='home'" src="../assets/icons/nav/c_home@2x.png" alt="">
            <img v-show="$route.name!='home'" src="../assets/icons/nav/c_home_off@2x.png" alt="">
            <span>首页</span>
        </router-link>

        <router-link :to="{name: 'product'}" exact tag="div">
            <img v-show="$route.name=='product'" src="../assets/icons/nav/c_pro@2x.png" alt="">
            <img v-show="$route.name!='product'" src="../assets/icons/nav/c_pro_off@2x.png" alt="">
            <span>所有产品</span>
        </router-link>

        <router-link :to="{name: 'my'}" exact tag="div">
            <img v-show="$route.name=='my'" src="../assets/icons/nav/c_me@2x.png" alt="">
            <img v-show="$route.name!='my'" src="../assets/icons/nav/c_me_off@2x.png" alt="">
            <span>个人中心</span>
        </router-link>
    </nav>
</template>

<script>
    export default{
        name: 'foot'
    }
</script>
