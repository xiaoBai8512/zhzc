<template>
    <div class="body loginUserInfo">
        <laypage class="headShadow">
            <div>
                <yd-cell-group title="账户信息">
                    <yd-cell-item>
                        <span class="HHCellItem" slot="left">头像</span>
                        <button slot="right" @click="upImg">
                            <img class="iconHead" :src="avatar" alt="" >
                        </button>
                        <!--<svg-icon slot="right" icon-class="icon_head"/>-->
                    </yd-cell-item>
                    <yd-cell-item class="HHCellItemRequired">
                        <span class="HHCellItem" slot="left">昵称</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                               v-model="formInline.nickname">
                    </yd-cell-item>
                </yd-cell-group>
                <yd-cell-group title="基本信息">
                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">真实姓名</span>
                        <span class="realName" slot="right">
                            <div class="realName_con">
                                <input class="realname" type="text" placeholder="最多不超过10个中文字符"
                                       v-model="formInline.realname">
                                <!--<u>最多不超过10个中文字符</u>-->
                                <el-checkbox class="el-checkbox-round" v-model="formInline.isAnonymous">匿名</el-checkbox>
                            </div>
                            <p>匿名时，以昵称代替真实姓名，且不显示现就职单位</p>
                        </span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired">
                        <span class="HHCellItem" slot="left">性别</span>
                        <span slot="right">
                            <el-checkbox class="el-checkbox-round" v-model="gender">男</el-checkbox>
                            <el-checkbox class="el-checkbox-round" v-model="genderOthen">女</el-checkbox>
                        </span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired" arrow @click.native="openYead">
                        <span class="HHCellItem" slot="left">出生年份</span>
                        <span slot="right">{{formInline.birthday}}</span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired" arrow @click.native="openAdd">
                        <span class="HHCellItem" slot="left" v-if="formInline.type==2">所在地</span>
                        <span class="HHCellItem" slot="left" v-else>学校所在地</span>
                        <span slot="right" v-if="addressAci && addressAci[0] && addressAci[0].area ">{{addressAci[0].area + '-' + addressAci[1].area + '-' + addressAci[2].area}}</span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">电子邮箱</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入邮箱"
                               v-model="formInline.email">
                    </yd-cell-item>
                </yd-cell-group>

                <!--专家-->
                <yd-cell-group title="详细信息" v-if="formInline.type==2">
                    <yd-cell-item class="justifyContent" arrow @click.native="openEdu">
                        <span class="HHCellItem" slot="left">最高学历</span>
                        <span slot="right">{{formInline.highestEducation}}</span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">所学专业</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入"
                               v-model="formInline.specialty">
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">现就职单位</span>
                        <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入单位名称"
                               v-model="formInline.company">
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent" arrow @click.native="openWorkTime">
                        <span class="HHCellItem" slot="left">从业时间</span>
                        <span class="realName" slot="right">
                            <div class="realName_con">
                                <p v-if="formInline.workTime">{{formInline.workTime}}</p>
                                <input v-else class="realname" type="text" placeholder="请选择" disabled
                                       v-model="formInline.workTime">
                            </div>
                            <p>从事资产评估，财务审计，造价咨询，律师业务的从业时间</p>
                        </span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent" arrow @click.native="openJob">
                        <span class="HHCellItem" slot="left">职称</span>
                        <span slot="right" v-if="jobAci && jobAci[0] && jobAci[0].name ">{{jobAci[0].name + '-' + jobAci[1].name}}</span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired">
                        <span class="HHCellItem" slot="left">是否接受出差</span>
                        <span slot="right">
                            <el-checkbox class="el-checkbox-round" v-model="businessTrip">是</el-checkbox>
                            <el-checkbox class="el-checkbox-round" v-model="businessTripOthen">否</el-checkbox>
                        </span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">工作经验</span>
                        <textarea class="HHCellItemTextarea" slot="right" type="text"
                                  placeholder="不超过500个中文字符" v-model="formInline.wordExperience"></textarea>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent">
                        <span class="HHCellItem" slot="left">个人特长</span>
                        <textarea class="HHCellItemTextarea" slot="right" type="text"
                                  placeholder="不超过500个中文字符" v-model="formInline.strength"></textarea>
                    </yd-cell-item>
                </yd-cell-group>

                <!--学生-->
                <yd-cell-group title="详细信息" v-else>
                    <yd-cell-item class="justifyContent HHCellItemRequired" arrow @click.native="openEdu">
                        <span class="HHCellItem" slot="left">在读学历</span>
                        <span slot="right">{{formInline.highestEducation}}</span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired dqjd">
                        <span class="HHCellItem" slot="left">当前就读</span>
                            <div slot="right"class="experience">
                                <div class="educationBox" v-for="(item, index) in educationList">
                                    <input class="HHCellItemInput" type="text" placeholder="输入院校名称" v-model="educationList[index].school">
                                    <input class="HHCellItemInput" type="text" placeholder="输入专业名称" v-model="educationList[index].speciality">
                                    <div class="timeBB" @click="openYead2(index)">
                                        <button>{{item.entranceTime || '入学时间'}}</button><span class="mind">至</span><button>{{item.graduateTime || '毕业时间'}}</button>
                                    </div>
                                    <i class="el-icon-close" v-if="index!=0" @click="delEducation(index)"></i>
                                </div>
                                <button class="tianjian" @click="addEducation">添加教育经历</button>
                            </div>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired">
                        <span class="HHCellItem" slot="left">是否接受出差</span>
                        <span slot="right">
                            <el-checkbox class="el-checkbox-round" v-model="businessTrip">是</el-checkbox>
                            <el-checkbox class="el-checkbox-round" v-model="businessTripOthen">否</el-checkbox>
                        </span>
                    </yd-cell-item>
                </yd-cell-group>
                <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="sumber">提交
                </yd-button>
                <mt-popup
                        v-if="popupVisible"
                        v-model="popupVisible"
                        position="bottom">
                    <div class="mtPickerBOx" @touchmove.prevent>
                        <div class="mtPicker_header">
                            <button @click="openYead">取消</button>
                            <h3>出生年份</h3>
                            <button class="qr" @click="openYead()">确定</button>
                        </div>
                        <mt-picker :slots="yearSlot" @change="onYearChange"></mt-picker>
                    </div>
                </mt-popup>
                <mt-popup
                        v-if="popupVisible5"
                        v-model="popupVisible5"
                        position="bottom">
                    <div class="mtPickerBOx"  @touchmove.prevent>
                        <div class="mtPicker_header">
                            <button @click="openYead2">取消</button>
                            <h3>入学-毕业时间</h3>
                            <button class="qr" @click="openEduQuery()">确定</button>
                        </div>
                        <mt-picker :slots="yearSlot2" @change="onYearChange2"></mt-picker>
                    </div>
                </mt-popup>
                <mt-popup
                        v-if="popupVisible1"
                        v-model="popupVisible1"
                        position="bottom">
                    <div class="mtPickerBOx"  @touchmove.prevent>
                        <div class="mtPicker_header">
                            <button @click="openAdd">取消</button>
                            <h3>所在地</h3>
                            <button class="qr" @click="openAdd()">确定</button>
                        </div>
                        <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"
                                   valueKey="area"></mt-picker>
                    </div>
                </mt-popup>
                <mt-popup
                        v-if="popupVisible2"
                        v-model="popupVisible2"
                        position="bottom">
                    <div class="mtPickerBOx"  @touchmove.prevent>
                        <div class="mtPicker_header">
                            <button @click="openEdu">取消</button>
                            <h3>最高学历</h3>
                            <button class="qr" @click="openEdu()">确定</button>
                        </div>
                        <mt-picker :slots="education" @change="onEduChange" :visible-item-count="5"
                                   valueKey="name"></mt-picker>
                    </div>
                </mt-popup>
                <mt-popup
                        v-if="popupVisible3"
                        v-model="popupVisible3"
                        position="bottom">
                    <div class="mtPickerBOx"  @touchmove.prevent>
                        <div class="mtPicker_header">
                            <button @click="openWorkTime">取消</button>
                            <h3>从业时间</h3>
                            <button class="qr" @click="openWorkTime()">确定</button>
                        </div>
                        <mt-picker :slots="startWorkTime" @change="onWorkTimeChange" :visible-item-count="5"
                                   valueKey="name"></mt-picker>
                    </div>
                </mt-popup>
                <mt-popup
                        v-if="popupVisible4"
                        v-model="popupVisible4"
                        position="bottom">
                    <div class="mtPickerBOx"  @touchmove.prevent>
                        <div class="mtPicker_header">
                            <button @click="openJob">取消</button>
                            <h3>从业时间</h3>
                            <button class="qr" @click="openJob()">确定</button>
                        </div>
                        <mt-picker :slots="job" @change="onJobChange" :visible-item-count="5"
                                   valueKey="name"></mt-picker>
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
                            <yd-button size="large" bgcolor="#3399ff" color="#FFF" class="HH_submenu" @click.native="$router.push({name:'certification'})">立即认证</yd-button>
                            <button @click="$router.push({name:'students'})">跳过 >></button>
                        </div>

                    </div>
                </yd-popup>
                <mt-popup
                        v-if="popupVisible1"
                        v-model="popupVisible1"
                        position="bottom">
                    <div class="mtPickerBOx" @touchmove.prevent>
                        <div class="mtPicker_header">
                            <button @click="openAdd">取消</button>
                            <h3>所在地</h3>
                            <button class="qr" @click="openAdd()">确定</button>
                        </div>
                        <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"
                                   valueKey="area"></mt-picker>
                    </div>
                </mt-popup>
            </div>
        </laypage>
    </div>
</template>

<script>
    import e from "../../utils/localHandler";

    function yearSlotList(y) {
        let toData = [];
        let now;
        if(y){
            now=y;
            for (let i = 0; i < 40; i++) {
                toData.push(now - i)
            }
        }else {
            now = new Date();
            now = now.getFullYear()
            for (let i = 0; i < 40; i++) {
                toData.push(now - 20 - i)
            }
        }
        return toData
    }

    export default {
        name: 'Login',
        data() {
            return {
                avatar:null,
                educationListIndex:null,
                educationListAci:null,
                educationList:[
                    {
                        school: null,
                        entranceTime: null,
                        graduateTime: null,
                        isCurrent:1
                    },
                ],
                xue: 1,
                year: '1988',
                yearSlot: [{
                    flex: 1,
                    values: yearSlotList(),
                    className: 'slot1'
                }],
                yearSlot2: [{
                    flex: 1,
                    values: yearSlotList(2028),
                    className: 'slot1'
                },{
                    flex: 1,
                    values: [1,2,3,4,5,6,7,8,9,10,11,12],
                    className: 'slot2'
                },{
                    divider: true,
                    content: '至',
                    className: 'slot2'
                },
                    {
                        flex: 1,
                        values: yearSlotList(2018),
                        className: 'slot1'
                    },{
                        flex: 1,
                        values: [1,2,3,4,5,6,7,8,9,10,11,12],
                        className: 'slot2'
                    }],
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
                addressAci: null,
                jobAci: null,
                education: [{
                    flex: 1,
                    values: null,
                    className: 'slot1'
                }],
                job: [{
                    flex: 1,
                    values: null,
                    className: 'slot1'
                }, {
                    flex: 1,
                    values: null,
                    className: 'slot2'
                }],
                startWorkTime: [{
                    flex: 1,
                    values: null,
                    className: 'slot1'
                }],
                popupVisible: false,
                popupVisible1: false,
                popupVisible2: false,
                popupVisible3: false,
                popupVisible4: false,
                popupVisible5: false,
                formInline: {
                    avatar: null,
                    nickname: null,
                    realname: null,
                    isAnonymous: false,
                    gender: 1,
                    province: null,
                    city: null,
                    district: null,
                    email: null,
                    education: null,
                    birthday: null,
                    businessTrip: 1,
                    wordExperience: null,
                    titleFirst: null,
                    titleLast: null,
                    strength: null,
                    workTime: null,
                    type:null,
                    businessArea:null,
                    qualification:null,
                    industries:null,
                },
                gender: true,
                genderOthen: false,
                businessTrip: true,
                businessTripOthen: false,
                checked: 2,
                index: 2,
                addressProvince: null,
                addressCity: null,
                input21: false,
                show1: false,


            }
        },
        created() {
            if(this.$store.state.login.wxUser){
                if(!this.$store.state.login.wxUser){
                    if(location.href.indexOf('code=') > -1){
                        this.$store.dispatch('getOpenId',location.href.split('code=')[1].split('&')[0]).then((data)=>{
                            this.avatar=data.headImgUrl;
                            this.formInline.avatar=data.headImgUrl;
                            this.formInline.nickname=data.nickname;
                            this.formInline.gender=data.sex;
                        })
                    }else {
                        window.location.href = 'http://api.zhzc.bjhqzl.com/api/wechat/oauth?scope=snsapi_userinfo&redirect_uri=' + encodeURIComponent(location.href);
                    }
                }else{
                    this.avatar = this.$store.state.login.wxUser.headImgUrl;
                    this.formInline.avatar = this.$store.state.login.wxUser.headImgUrl;
                    this.formInline.nickname = this.$store.state.login.wxUser.nickname;
                    this.formInline.gender = this.$store.state.login.wxUser.sex;
                }
            };
            this.formInline.type = this.$store.state.login.selectUserType;
            this.$store.commit('SET_TYPE', this.$store.state.login.selectUserType)
            // console.log(this.$store.state.login.businessArea);
            this.formInline.businessArea = this.$store.state.login.businessArea ? this.$store.state.login.businessArea.join(',') : null;
            this.formInline.qualification = this.$store.state.login.qualification ? this.$store.state.login.qualification.join(',') : null;
            this.formInline.industries = this.$store.state.login.industries ? this.$store.state.login.industries.join(',') : null;

            this.$store.dispatch('weiXinFenXiang')
            // window.location.href = 'http://api.zhzc.bjhqzl.com/api/wechat/oauth?scope=snsapi_userinfo&redirect_uri=' + encodeURIComponent(location.href);
            this.$store.dispatch('getAreas', 0).then((data) => {
                this.addressSlots[0].values = data;
                this.addressSlots[1].values = data[0].areas;
                this.addressSlots[2].values = data[0].areas[0].areas;
            })
            this.$store.dispatch('getDicts', {code: ['education', 'work_time', 'job_title']}).then((data) => {
                this.education[0].values = data.education;
                this.startWorkTime[0].values = data.work_time;
                this.job[0].values = data.job_title;
                this.job[1].values = data.job_title[0].dicts;
            })
        },
        watch: {
            genderOthen(val) {
                this.gender = !val
            },
            gender(val) {
                this.formInline.gender = val ? 2 : 1
                this.genderOthen = !val
                this.genderOthen = !val
            },
            businessTripOthen(val) {
                this.businessTrip = !val
            },
            businessTrip(val) {
                this.formInline.businessTrip = val ? 1 : 0
                this.businessTripOthen = !val
            },
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
            jobAci: {
                handler(newValue, oldValue) {
                    if(newValue[0]){
                        this.formInline.titleFirst = newValue[0].name
                    }
                    if(newValue[0]){
                        this.formInline.titleLast = newValue[1].name
                    }
                },
                deep: true
            }
        },
        methods: {
            openYead2(index) {
                if(!this.popupVisible5){
                    this.educationListIndex = index
                }else {
                    this.educationListIndex = null
                }
                this.popupVisible5 = !this.popupVisible5;

            },
            openEduYead(index){
                this.educationListIndex = index;
                this.popupVisible5 = !this.popupVisible5;
            },
            openYead() {
                this.popupVisible = !this.popupVisible;
            },
            openAdd() {
                this.popupVisible1 = !this.popupVisible1;
            },
            openEdu() {
                this.popupVisible2 = !this.popupVisible2;
            },
            openWorkTime() {
                this.popupVisible3 = !this.popupVisible3;
            },
            openJob() {
                this.popupVisible4 = !this.popupVisible4;
            },
            onYearChange(picker, values) {
                if(values[0]){
                    this.formInline.birthday = values[0];
                }
            },
            onYearChange2(picker, values) {
                if(values[0]){
                    this.educationListAci = values;
                    // this.yearSlot2=picker;
                    // this.formInline.birthday = values[0];
                }
            },
            openEduQuery() {
                this.educationList[this.educationListIndex].entranceTime=this.educationListAci[0]+'-'+this.educationListAci[1]+'-1';
                this.educationList[this.educationListIndex].graduateTime=this.educationListAci[2]+'-'+this.educationListAci[3]+'-1';
                this.openYead2();
                // this.educationListAci = values;
            },
            onEduChange(picker, values) {
                if(values[0]){
                    this.formInline.highestEducation = values[0].name
                }
            },
            onWorkTimeChange(picker, values) {
                if(values[0]) {
                    this.$set(this.formInline, 'workTime', values[0].name)
                }
            },
            onJobChange(picker, values) {
                values[0] && picker.setSlotValues(1, values[0].dicts);
                this.jobAci = values;
            },
            onAddressChange(picker, values) {
                values[0] && picker.setSlotValues(1, values[0].areas);
                values[1] && picker.setSlotValues(2, values[1].areas);
                this.addressAci = values;
                // picker.setSlotValues(2, address[values[0]]);
                // this.addressProvince = values[0];
                // this.addressCity = values[1];
            },
            goNext(nav) {
                this.index = nav;
                // console.log('goNext')
                // this.$router.push({name:'students'})
            },
            sumber() {
                // this.Toast({
                //     message: '正在提交...|' + this.formInline.type,
                //     position: 'bottom',
                //     duration: 2000
                // })
                let inData = this.formInline
                if(this.formInline.type==2){
                    inData.isAnonymous = inData.isAnonymous ? 1 : 0;
                    inData.gender = this.gender ? 1 : 2;
                    inData.businessTrip = this.businessTrip ? 1 : 0;
                    console.log(JSON.stringify(inData))
                    this.$store.dispatch('expertPerfect', inData).then((data)=>{
                        this.show1=true
                    })
                }else if(this.formInline.type==1){
                    inData.isAnonymous = inData.isAnonymous ? 1 : 0;
                    inData.gender = this.gender ? 1 : 2;
                    inData.businessTrip = this.businessTrip ? 1 : 0;
                    inData.education = this.educationList;
                    console.log(JSON.stringify(inData))
                    this.$store.dispatch('expertPerfect', inData).then((data)=>{
                        this.show1=true
                    })
                }
            },
            addEducation(){
                this.educationList.push({school: null, entranceTime: null, graduateTime: null, isCurrent:0})
            },
            delEducation(index){
                this.educationList.splice(index, 1)
            },
            upImg(){
                console.log('upImgupImgupImg')
                this.$store.dispatch('upImg').then((data)=>{
                    this.formInline.avatar=data.path;
                    this.avatar=data.url;
                })
            }

        }
    }
</script>

