<template>
    <div class="body loginUserInfo boxShadow mB2 certification">
        <laypage class="headShadow" title="申请认证">
            <div>
                <yd-cell-group>
                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">真实姓名</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                               v-model="formData.realname">
                    </yd-cell-item>

                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">身份证号码</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                               v-model="formData.idcardNum">
                    </yd-cell-item>

                    <yd-cell-item>
                        <div class="sfz_box" slot="right">
                            <div class="HHCellItem">上传身份证图片</div>
                            <div class="sfz">
                                <svg-icon icon-class="phot"></svg-icon>
                                上传身份证国徽面
                            </div>
                            <div class="sfz">
                                <svg-icon icon-class="phot"></svg-icon>
                                上传身份证人像面
                            </div>
                        </div>
                    </yd-cell-item>
                    
                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">执业资格</span>
                        <span slot="right">
                            <div class="imgList" v-for="item in qualification">
                                <el-checkbox v-model="gender">{{item.name}}</el-checkbox>
                                <div class="img_icon">
                                    <svg-icon icon-class="add"></svg-icon>
                                    <!-- <img src="../../assets/image/404.png" alt=""> -->
                                    <!-- <div class="modify">
                                        <svg-icon icon-class="add"></svg-icon>
                                    </div> -->
                                </div>
                            </div>
                        </span>
                    </yd-cell-item>
                </yd-cell-group>
                <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="sumber">立即认证
                </yd-button>
            </div>
        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                qualification:null,
                formData:{
                    realname:"",
                    idcardNum:"",
                },
                user:null,
                cert:null,
            }
        },
        created() {
            // this.$store.dispatch('getDicts', {code: ['qualification']}).then((data) => {
            //     this.qualification = data.qualification;
            // });

            // this.$store.dispatch('getExpertCertInfo', {}).then((data) => {
            //     this.user = data.user;
            //     this.cert = data.cert;

            // });

        },
        watch: {

        },
        methods: {
            sumber() {

            },

        }
    }
</script>

