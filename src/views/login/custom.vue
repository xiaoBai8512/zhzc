<template>
    <laypage class="custom" title="定制服务">
        <div class="header_box">
            <tab :line-width="1" :custom-bar-width="getBarWidth" active-color="#3399ff">
                <tab-item :selected="index==1" @on-item-click="index=1">申请定制服务</tab-item>
                <tab-item :selected="index==2" @on-item-click="index=2">申请发布广告</tab-item>
            </tab>
        </div>
        <div class="customCon" v-if="index==1">
            <p>
                本平台可为您提供如下定制服务：报告审核、完善
                工作底稿，定制服务为有偿服务，请提交具体服务需求
                或直接联系客服商议定制服务相关事宜。
            </p>
            <h5>客服电话：<span><a style="color: #3399ff;" href="tel://010-58383614">010-58383614</a></span></h5>
            <el-input v-model="formData.content" class="textareaInput" type="textarea" placeholder="在此输入您希望合作的业务需求，客服将于2日内与您联系，请保持手机畅通。"></el-input>
            <el-input v-model="formData.name" class="InputClass" type="text" placeholder="姓名"></el-input>
            <el-input v-model="formData.phone" class="InputClass" type="text" placeholder="联系电话"></el-input>
            <el-button class="elButton" type="primary" @click="add">申请定制</el-button>
        </div>
        <div class="customCon" v-if="index==2">
            <p>
                您可以申请在本平台首页的广告位发布平面广告，
                广告内容应为不违反国家法律法规的合法内容并与本平
                台推广业务有相关性。广告发布者应为企业。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                广告的发布为有偿服务，具体费用及发布事项请与客服商议。
            </p>
            <h5>客服电话：<span><a style="color: #3399ff;" href="tel://010-58383614">010-58383614</a></span></h5>
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
                index:1,
                getBarWidth:function (index) {
                    return (6) * 0.356 + 'rem'
                },
                formData:{
                    content:null,
                    name:null,
                    phone:null,
                },
            }
        },
        mounted() {
        },
        methods: {
            add(){
                this.$store.dispatch('serviceAdd',this.formData).then(()=>{
                    this.Toast({
                        message: '提交成功',
                        position: 'bottom',
                        duration: 2000
                    })
                    setTimeout(()=>{
                        this.$router.push({'name':'customList'})
                    })
                })
            },

        }
    }
</script>
