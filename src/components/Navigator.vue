<template>
    <yd-tabbar class="HH_nav" active-class="HH_nav_open">
        <template v-if="type==1 || type ==2">
            <yd-tabbar-item title="首页" link="/students" :active="$route.name=='students'">
                <!--<svg-icon icon-class="nav1" slot="icon"></svg-icon>-->
                <svg-icon :icon-class="$route.name=='students' ? 'nav1_open' : 'nav1'"  slot="icon"></svg-icon>
                <!--<yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>-->
            </yd-tabbar-item>
            <yd-tabbar-item title="邀请" link="/invitation" :active="$route.name=='invitation'">
                <svg-icon :icon-class="$route.name=='invitation' ? 'nav2_open' : 'nav2'" slot="icon"></svg-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="我的" link="my" :active="$route.name=='my'">
                <svg-icon :icon-class="$route.name=='my' ? 'nav3_open' : 'nav3'" slot="icon"></svg-icon>
            </yd-tabbar-item>
        </template>
        <template v-else>
            <yd-tabbar-item title="首页" link="/enterprise" :active="$route.name=='enterprise' || $route.name=='companyIndex'">
                <!--<svg-icon icon-class="nav1" slot="icon"></svg-icon>-->
                <svg-icon :icon-class="$route.name=='enterprise' ? 'nav1_open' : 'nav1'"  slot="icon"></svg-icon>
                <!--<yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>-->
            </yd-tabbar-item>
            <yd-tabbar-item title="专家" link="/enterpriseExperts"  :active="$route.name=='enterpriseExperts'" v-if="type==4">
                <svg-icon :icon-class="$route.name=='enterpriseExperts' ? 'nav4_open' : 'nav4'" slot="icon"></svg-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="专家&实习生" link="/enterpriseExperts"  :active="$route.name=='enterpriseExperts'" v-else>
                <svg-icon :icon-class="$route.name=='enterpriseExperts' ? 'nav4_open' : 'nav4'" slot="icon"></svg-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="专业机构" link="/Organizations"  :active="$route.name=='Organizations'"  v-if="type==4">
                <svg-icon :icon-class="$route.name=='Organizations' ? 'nav5_open' : 'nav5'" slot="icon"></svg-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="合作机构" link="/Organizations"  :active="$route.name=='Organizations'" v-else>
                <svg-icon :icon-class="$route.name=='Organizations' ? 'nav5_open' : 'nav5'" slot="icon"></svg-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="备选" link="/enterpriseAlternative"  :active="$route.name=='enterpriseAlternative'">
                <svg-icon :icon-class="$route.name=='enterpriseAlternative' ? 'nav6_open' : 'nav6'" slot="icon"></svg-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="我的" link="/enterpriseMy"   :active="$route.name=='enterpriseMy'">
                <svg-icon :icon-class="$route.name=='enterpriseMy' ? 'nav3_open' : 'nav3'" slot="icon"></svg-icon>
            </yd-tabbar-item>
        </template>
    </yd-tabbar>
</template>

<script>
    export default{
        name: 'navigator',
        computed: {
            shopOrgInfo(){
                return this.$store.state.shop.shopOrgInfo
            },
            type(){
                return this.$store.state.login.type
            }
        },
    }
</script>
