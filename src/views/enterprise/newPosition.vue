<template>
    <div class="body newPosition">
        <laypage :title="this.$route.query.jobid ? '修改职位' : '添加职位'">
            <div class="newPosition_con">
                <yd-cell-group>

                    <yd-cell-item class="justifyContent HHCellItemRequired">
                        <span class="HHCellItem" slot="left">职位</span>
                        <span class="realName" slot="right">
                            <div class="realName_con">
                                <input type="text" placeholder="填写职位" v-model="formData.jobName">
                                <!--<u>最多不超过10个中文字符</u>-->
                                <button @click="openPopup('popupVisible')"><i class="el-icon-view"></i>历史职位</button>
                            </div>
                        </span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired">
                        <span class="HHCellItem" slot="left">薪资</span>
                        <span class="realName" slot="right">
                            <div class="realName_con">
                                <input type="text" placeholder="填写薪资" v-model="formData.salary">
                                <span class="danwei">元/ 天</span>
                                <!--<u>最多不超过10个中文字符</u>-->
                                <el-checkbox class="el-checkbox-round" v-model="salaryNegotiated">面议</el-checkbox>
                            </div>
                        </span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired">
                        <span class="HHCellItem" slot="left">是否出差</span>
                        <span slot="right">
                            <el-checkbox class="el-checkbox-round" v-model="businessTrip">是</el-checkbox>
                            <el-checkbox class="el-checkbox-round" v-model="businessTripOthen">否</el-checkbox>
                        </span>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired">
                        <span class="HHCellItem" slot="left">工作内容</span>
                        <textarea class="HHCellItemTextarea" slot="right" type="text"
                                  placeholder="不超过500个中文字符" v-model="formData.content"></textarea>
                    </yd-cell-item>
                    <yd-cell-item class="justifyContent HHCellItemRequired">
                        <span class="HHCellItem" slot="left">工作要求</span>
                        <textarea class="HHCellItemTextarea" slot="right" type="text"
                                  placeholder="不超过500个中文字符" v-model="formData.requirement"></textarea>
                    </yd-cell-item>
                </yd-cell-group>
                <!-- <button class="HH_Button_Bull" v-if="$route.query.userId">保存并发送邀请</button> -->
                <button class="HH_Button_White" @click="sumber">保存</button>
                <mt-popup
                        v-model="popupVisible"
                        position="bottom">
                    <div class="mtPickerBOx">
                        <div class="mtPicker_header">
                            <button @click="openPopup('popupVisible')">取消</button>
                            <h3>历史职位</h3>
                            <button class="qr" @click="query">确定</button>
                        </div>
                        <mt-picker :slots="allSlots" @change="onAllChange" valueKey="name"></mt-picker>
                    </div>
                </mt-popup>
                <mt-popup v-model="popupVisible2" :closeOnClickModal="false">
                    <div class="copyPosition" v-if="copyData">
                        <h5 class="tit">是否使用该职位信息？</h5>
                        <p><span>职位：</span>{{copyData.jobName}}</p>
                        <p v-if="!!copyData.salaryNegotiated"><span>薪资：</span>面议</p>
                        <p v-else><span>薪资：</span>{{copyData.salary}}元/天</p>
                        <p><span>是否出差：</span>{{!!copyData.businessTrip ? '是' : '否'}}</p>
                        <p><span>工作内容：</span></p>
                        <p>{{copyData.content}}</p>
                        <p><span>工作要求：</span></p>
                        <p class="lastP">{{copyData.requirement}}</p>
                        <div class="copyPosition_foot">
                            <button class="HH_Button_Grey"  @click="openPopup('popupVisible2')">放弃</button>
                            <button class="HH_Button_Bull" @click="copy">确认带入</button>
                        </div>
                    </div>
                </mt-popup>
            </div>
        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                formData:{
                    "projectId": this.$route.query.id,
                    "jobName": "",
                    "salary": "",
                    "salaryNegotiated": 0,
                    "businessTrip": 1,
                    "content": "",
                    "requirement": ""
                },
                businessTrip:true,
                businessTripOthen:false,
                allSlots: [
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
                    }
                ],
                copyId:null,
                copyData:null,
                salaryNegotiated:null,
                popupVisible: false,
                popupVisible2: false,


                yearSlot: [{
                    flex: 1,
                    values: null,
                    className: 'slot1'
                },{
                    flex: 1,
                    values: null,
                    className: 'slot1'
                }],
            }
        },
        created() {
            this.$store.dispatch('projectAll').then((data) => {
                this.allSlots[0].values=data;
                this.allSlots[1].values=data[0].jobs;
            })
            if(this.$route.query.jobid){
                this.$store.dispatch('projectJobDetails',this.$route.query.jobid).then((data)=>{
                    this.salaryNegotiated = !!this.formData.salaryNegotiated;
                    this.businessTrip = !!this.formData.businessTrip;
                    this.formData=data;
                })
            }
        },
        watch:{
            salaryNegotiated(val){
                this.formData.salaryNegotiated = val ? 1 : 0
            },
            businessTripOthen(val) {
                this.businessTrip = !val
            },
            businessTrip(val) {
                this.formData.businessTrip = val ? 1 : 0
                this.businessTripOthen = !val
            },
        },
        methods: {
            sumber(){
                //projectUpdateJob
                if(this.$route.query.jobid){
                    this.$store.dispatch('projectUpdateJob',this.formData).then((data)=>{
                        this.Toast({
                            message: '修改成功',
                            position: 'bottom',
                            duration: 3000
                        })
                        setTimeout(() => {
                            this.$router.back()
                        }, 1000);
                    })
                }else{
                    this.$store.dispatch('projectAddJob',this.formData).then((data) => {
                        if(this.$route.query.userId){
                            this.MessageBox({
                                title: '',
                                message: '职位添加成功',
                                showCancelButton: true,
                                cancelButtonText: '返回项目列表',
                                confirmButtonText: '继续添加职位',
                            }).then((data)=>{
                                if(data=='confirm'){
                                    this.formData.jobName = "";
                                    this.formData.salary = "";
                                    this.formData.salaryNegotiated = 0;
                                    this.formData.businessTrip = 1;
                                    this.formData.content = "";
                                    this.formData.requirement = "";
                                } else {
                                    this.$router.replace({name:'selectProject', query:{userId:this.$route.query.userId}})
                                }
                            })
                        }else {
                            this.Toast({
                                message: '添加成功',
                                position: 'bottom',
                                duration: 3000
                            })
                            setTimeout(() => {
                                this.$router.back()
                            }, 1000);
                        }
                    })
                }
            },
            openPopup(name){
              this[name]=!this[name]
            },
            onAllChange(picker,values){
                values[0] && picker.setSlotValues(1, values[0].jobs);
                values[0] && (this.copyId=values[1].id);
            },
            query(){
                this.$store.dispatch('projectJobDetails',this.copyId).then((data)=>{
                    this.copyData=data;
                    this.openPopup('popupVisible2')
                })
            },
            copy(){
                console.log(this.copyData)
                this.salaryNegotiated = !!this.formData.salaryNegotiated;
                this.businessTrip = !!this.formData.businessTrip;
                // this.formData=this.copyData;
                this.formData.jobName = this.copyData.jobName;
                this.formData.salary = this.copyData.salary;
                this.formData.salaryNegotiated = this.copyData.salaryNegotiated;
                this.formData.businessTrip = this.copyData.businessTrip;
                this.formData.content = this.copyData.content;
                this.formData.requirement = this.copyData.requirement;

                this.openPopup('popupVisible2');
                this.openPopup('popupVisible');
            },
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
