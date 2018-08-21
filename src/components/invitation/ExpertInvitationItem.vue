<template>
	<div class="HH_List ExpertInvitationItem new"  @click="$router.push({name:'expertInvitationDetail',query:{id:item.id}})">
        <svg-icon class="icon-class-new" icon-class="new" v-if="!!!item.isRead"></svg-icon>
        <img class="logo" :src="item.sender.logo | imgUrl" alt="">
        <div class="HH_List_Content">
            <div class="HH_List_Content_List HH_List_Content_List_1">
                <h5 class="HH_Grow HH_ellipsis coll">{{item.projectName}}
                    <!--<svg-icon icon-class="vip"></svg-icon>-->
                </h5>
                <span>{{item.sendTime | n2t('{m}.{d}')}}</span>
            </div>
            <div class="HH_List_Content_List_1_1">
            	<span>{{item.sender.fullname}}</span>
            </div>
            <div class="HH_List_Content_List HH_List_Content_List_2 coll">
                <div class="icon_box HH_Grow">
                    <svg-icon icon-class="adds"></svg-icon>
                    <span>{{item.city_name}}</span>
                    <svg-icon icon-class="time"></svg-icon>
                    <span class="coll">{{item.startTime | n2t('{m}.{d}')}} - {{item.endTime | n2t('{m}.{d}')}}</span>
                    <!--<svg-icon icon-class="bao"></svg-icon>-->
                    <!--<span>需出差</span>-->
                </div>
                <span class="money"></span>
                <!--<span class="money">2000元/天</span>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'expert_invitation_item',
        data(){
            return{

            }
        },
        props: ['item'],
        computed: {

        },
    }
</script>
<style scoped>
    .HH_List_Content_List_1{
        flex-grow: 0;
    }
    .HH_ellipsis{

    }
</style>
