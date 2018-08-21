<template>
    <laypage class="bodyMin custom">
        <div v-if="detail" class="newContent">
            <h5>{{detail.title}}</h5>
            <span>{{detail.createTime | n2t('{y}.{m}.{d}')}}</span>
            <!-- <img :src="detail.image | imgUrl(' ')"/> -->
            <div v-html="detail.content">

            </div>
        </div>

    </laypage>
</template>
<script>
    import {ajaxError} from "../../utils/api";
    import md5 from 'js-md5'
    import store from '../../store'

    export default {
        name: 'Forget',
        data() {
            return {
                detail:null,
            }
        },
        created() {
            this.$store.dispatch('getNewsDetails',this.$route.query.id).then((data)=>{
                this.detail=data;
            })
        },
        methods: {
            add(){

            },

        }
    }
</script>
