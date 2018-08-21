<template>
    <div class="body loginUserInfo">
        <laypage class="headShadow">
            <div>
                <yd-cell-group title="企业名称">
                    <yd-cell-item class="HHCellItemRequired">
                        <span class="HHCellItem" slot="left">企业名称</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                               v-model="formInline.fullname">
                    </yd-cell-item>
                    <yd-cell-item>
                        <span class="HHCellItem" slot="left">公司简称</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                               v-model="formInline.shortname">
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired" arrow @click.native="openAdd">
                        <span class="HHCellItem" slot="left">所在地</span>
                        <span slot="right" v-if="addressAci && addressAci[0] && addressAci[0].area ">{{addressAci[0].area + '-' + addressAci[1].area + '-' + addressAci[2].area}}</span>
                    </yd-cell-item>
                    <yd-cell-item class="HHCellItemRequired">
                        <span class="HHCellItem" slot="left">联系人</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                               v-model="formInline.contact">
                    </yd-cell-item>
                    <yd-cell-item class="HHCellItemRequired">
                        <span class="HHCellItem" slot="left">联系电话</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                               v-model="formInline.contactMobile">
                    </yd-cell-item>
                    <yd-cell-item class="HHCellItemRequired tyshxydm">
                        <span class="HHCellItem" slot="left">统一社会信用<br/>代码</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                               v-model="formInline.businessLicenseNo">
                    </yd-cell-item>
                    <yd-cell-item class="HHCellItemRequired itemHeaderBox" style="padding-top: 5px; padding-bottom: 5px;">
                        <span class="HHCellItem" slot="left">营业执照（加<br/>盖公章）</span>
                        <button slot="right" @click="upImg('businessLicenseImg')">
                            <img class="itemHeader" :src="formInline.businessLicenseImg  | imgUrl" alt="" v-if="businessLicenseImg">
                            <div class="img_svg_box"  v-else>
                                <svg-icon icon-class="add"></svg-icon>
                            </div>
                        </button>
                    </yd-cell-item>
                    <yd-cell-item class="itemHeaderBox" style="padding-top: 5px; padding-bottom: 5px;">
                        <span class="HHCellItem" slot="left">公司 Logo</span>
                        <button slot="right" @click="upImg('logo')">
                            <img class="itemHeader" :src="formInline.logo | imgUrl" alt="" v-if="logo">
                            <div class="img_svg_box"  v-else>
                                <svg-icon icon-class="add"></svg-icon>
                            </div>
                        </button>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">公司简介</span>
                        <textarea class="HHCellItemTextarea" slot="right" type="text"
                                  placeholder="不超过500个中文字符" v-model="formInline.introduction"></textarea>
                    </yd-cell-item>
                    <yd-cell-item class="HHCellItemRequired" v-if="formInline.type==3">
                        <span class="HHCellItem" slot="left">机构类别<br/><span>(多选)</span></span>
                        <div slot="right">
                            <el-checkbox-group v-model="formInline.organizationType">
                                <el-checkbox v-for="item in orgType" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </yd-cell-item>
                </yd-cell-group>
                <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="sumber">提交
                </yd-button>
                <mt-popup
                        v-model="popupVisible1"
                        position="bottom">
                    <div class="mtPickerBOx">
                        <div class="mtPicker_header">
                            <button @click="openAdd">取消</button>
                            <h3>所在地</h3>
                            <button class="qr" @click="openAdd()">确定</button>
                        </div>
                        <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" valueKey="area"></mt-picker>
                    </div>
                </mt-popup>
                <yd-popup v-model="show1" position="center" width="70%">
                    <div style="background-color:#fff;">
                        <p>
                            “立即认证”将认证身份信息及所填写
                            的资格证书信息，认证后将获得更多的工
                            作机会，“跳过”后也可以从‘我的’中
                            申请认证。
                        </p>
                        <div class="tc">
                            <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu">立即认证</yd-button>
                            <button @click="goRouter(true)">跳过 >></button>
                        </div>

                    </div>
                </yd-popup>
            </div>
        </laypage>
    </div>
</template>

<script>
    function yearSlotList() {
        let now = new Date();
        now = now.getFullYear()
        let toData = [];
        for (let i = 0; i < 40; i++) {
            toData.push(now - 20 - i)
        }
        return toData
    }
    export default {
        name: 'Login',
        data() {
            return {
                logo:null,
                businessLicenseImg:null,
                orgType:[],
                addressSlots: [
                    {
                        flex: 1,
                        values: null,
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        flex: 1,
                        values: null,
                        className: 'slot2',
                        textAlign: 'center'
                    }, {
                        flex: 1,
                        values: null,
                        className: 'slot3',
                        textAlign: 'center'
                    }
                ],
                addressAci:null,

                popupVisible1: false,
                formInline: {
                    fullname: null,
                    shortname: null,
                    province: null,
                    city: null,
                    district: null,
                    contact: null,
                    contactMobile: null,
                    businessLicenseNo: null,
                    introduction: null,
                    organizationType: [],
                    type:0,
                    businessLicenseImg: null,
                    logo: null,
                },
                checkList: [],
                show1: false,
            }
        },
        created() {
            this.$store.dispatch('weiXinFenXiang')
            this.$store.dispatch('getAreas',0).then((data)=>{
                this.addressSlots[0].values=data;
                this.addressSlots[1].values=data[0].areas;
                this.addressSlots[2].values=data[0].areas[0].areas;
            })
            this.$store.dispatch('getDicts', {code: ['org_type']}).then((data) => {
                this.orgType = data.org_type;
            })
            this.formInline.type = this.$store.state.login.selectUserType;
        },
        watch: {
            addressAci: {
                handler(newValue, oldValue) {
                    if(newValue[0]){
                        this.formInline.province = newValue[0].id
                    }
                    if(newValue[1]){
                        this.formInline.city = newValue[1].id
                    }
                    if(newValue[2]){
                        this.formInline.district = newValue[2].id
                    }
                },
                deep: true
            },
        },
        methods: {
            upImg(name){
                console.log('upImgupImgupImg')
                this.$store.dispatch('upImg').then((data)=>{
                    this.formInline[name]=data.path;
                    this[name]=data.url;
                })
            },
            openAdd() {
                this.popupVisible1 = !this.popupVisible1;
            },
            onAddressChange(picker, values) {
                console.log(values)
                values[0] && picker.setSlotValues(1, values[0].areas);
                values[1] && picker.setSlotValues(2, values[1].areas);
                this.addressAci=values;
            },
            enterprisePerfect(){

            },

            sumber() {
                let inData = Object.assign({}, this.formInline);
                if(this.formInline.type==4){
                    // console.log(JSON.stringify(inData))
                    this.$store.dispatch('enterprisePerfectCompany', inData).then((data)=>{
                        this.$router.push({name:'enterprise'})
                    })
                }else if(this.formInline.type==3){
                    inData.organizationType = this.formInline.organizationType.join(',');
                    // console.log(JSON.stringify(inData))
                    this.$store.dispatch('enterprisePerfect', inData).then((data)=>{
                        this.$router.push({name:'isCooperation'})
                    })
                }

            },

        }
    }
</script>

