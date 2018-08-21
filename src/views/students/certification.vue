<template>
    <div class="body loginUserInfo boxShadow mB2 certification" v-if="cert">
        <laypage class="headShadow" title="申请认证">
            <div v-if="hasNeedVerify==0">
                <div v-if="canEdit">
                    <yd-cell-group>
                        <yd-cell-item class="justifyContent">
                            <span class="HHCellItem" slot="left">真实姓名</span>
                            <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                                   v-model="cert.realname">
                        </yd-cell-item>
                        <yd-cell-item class="justifyContent">
                            <span class="HHCellItem" slot="left">身份证号码</span>
                            <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                                   v-model="cert.idcardNum">
                        </yd-cell-item>

                        <yd-cell-item>
                            <div class="sfz_box"  slot="right">
                                <div class="HHCellItem">上传身份证图片</div>
                                <div class="sfz" @click="upIdcardImg('idcardScanFront')">
                                    <div v-if="!cert.idcardScanFront">
                                        <svg-icon icon-class="phot"></svg-icon>
                                        上传身份证人像面
                                    </div>
                                    <div v-else>
                                        <img :src="cert.idcardScanFront | imgUrl('_236x150x3.jpg')" alt="">
                                    </div>
                                </div>
                                <div class="sfz" @click="upIdcardImg('idcardScanBack')">
                                    <div v-if="!cert.idcardScanBack">
                                        <svg-icon icon-class="phot"></svg-icon>
                                        上传身份证国徽面
                                    </div>
                                    <div v-else>
                                        <img :src="cert.idcardScanBack | imgUrl('_236x150x3.jpg')" alt="">
                                    </div>
                                </div>
                            </div>
                        </yd-cell-item>
                        <yd-cell-item class="justifyContent">
                            <span class="HHCellItem" slot="left" style="width:2rem">执业资格</span>
                            <span slot="right">
                                <el-checkbox-group v-model="checkedQualification" @change="handleCheckedChange">
                                    <div class="imgList" v-for="item in qualification">
                                        <el-checkbox :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                                        <div class="img_icon" @click="upQualificationImg(item.id)">
                                            <div v-if="checkedQualificationScanPath[item.id]">
                                                <img :src="checkedQualificationScanPath[item.id] | imgUrl" alt="">
                                            </div>
                                            <svg-icon v-else icon-class="add"></svg-icon>
                                            <!-- <div class="modify">
                                                <svg-icon icon-class="add"></svg-icon>
                                            </div> -->
                                        </div>
                                    </div>
                                </el-checkbox-group>
                            </span>
                        </yd-cell-item>
                    </yd-cell-group>
                    <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="submit">立即认证</yd-button>
                </div>

                <div class="cert_success" v-if="certStatus == 1">
                    <div class="img_icon"></div>
                    <span>您已认证成功！</span>
                    <i>有效期至：{{user.certificationExpire | n2t('{y}-{m}-{d}')}}</i>
                </div>
                <div class="cert_failed" v-if="certStatus == 2">
                    <div class="img_icon"></div>
                    <span>认证失败</span>
                    <h3>失败原因：</h3>
                    <p>{{lastCert.reason}}</p>
                    <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="canEdit=true;certStatus=0">重新提交认证资料</yd-button>
                </div>
            </div>
            <div v-else>
                <div style="text-align: center;padding: 50px;">已提交认证<br/>您的资料正在审核中，请耐心等待!</div>
            </div>
        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                qualification:[],
                checkedQualification:[],
                checkedQualificationScanPath:{},
                hasNeedVerify:0,
                user:null,
                cert:null,
                lastCert:null,
                canEdit:false,
                certStatus:0,
            }
        },
        created() {
            this.$store.dispatch('getDicts', {code: ['qualification']}).then((data) => {
                this.qualification = data.qualification;
            });
            var self = this;
            this.$store.dispatch('getExpertCertInfo', {}).then((data) => {
                this.user = data.user;
                this.hasNeedVerify = data.hasNeedVerify;
                this.lastCert = data.lastCert;

                this.user.qualificationItems.forEach(function(item){
                    self.checkedQualification.push(item.qualificationId);
                    self.$set(self.checkedQualificationScanPath, item.qualificationId, item.scanPath);
                });

                if(this.hasNeedVerify == 0){
                    if(!this.lastCert){
                        this.canEdit = true;
                    }else{
                        this.certStatus = this.lastCert.status;
                    }
                }

                this.cert = data.cert;
            });
        },
        watch: {

        },
        methods: {
            submit() {
                let reqObj = this.cert;
                let certQualifications = [];
                let self = this;
                // console.log(self.checkedQualificationScanPath);
                this.checkedQualification.forEach(function(qid){
                    var qitem = {"qualificationId" : qid, "scanPath" : ""};
                    qitem.scanPath = self.checkedQualificationScanPath[qid] || "";
                    certQualifications.push(qitem);
                });

                reqObj['qualifications'] = certQualifications;
                // console.log(reqObj);
                // console.log(this.cert);
                this.$store.dispatch('submitExpertCertInfo', reqObj).then((data) => {
                    this.hasNeedVerify = 1;
                    this.canEdit = false;

                });
            },
            upIdcardImg(val){
                this.$store.dispatch('upImg').then((data) => {
                    this.cert[val] = data.path;
                })
            },
            upQualificationImg(id){
                this.$store.dispatch('upImg').then((data) => {
                    this.$set(this.checkedQualificationScanPath, id, data.path)
                })
            },
            handleCheckedChange(value){
                console.log(value);
            },
        }
    }
</script>

