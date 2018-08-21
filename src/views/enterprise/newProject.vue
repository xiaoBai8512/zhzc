<template>
    <div class="body newProject">
        <laypage>
            <yd-cell-group title="项目信息">
                <yd-cell-item class="HHCellItemRequired">
                    <span class="HHCellItem" slot="left">项目名称</span>
                    <input class="HHCellItemInput" slot="right" type="text" v-model="formData.projectName" placeholder="请输入项目名称">
                </yd-cell-item>
                <yd-cell-item class="HHCellItemRequired">
                    <span class="HHCellItem" slot="left">工作时间</span>
                    <div slot="right" class="HHItemRight">
                        <span class="button" @click="openPicker('picker')">{{formData.startTime || '工作开始时间'}}</span>
                        <span class="zhi">至</span>
                        <span class="button" @click="openPicker('picker1')">{{formData.endTime || '工作结束时间'}}</span>
                    </div>

                </yd-cell-item>
                <yd-cell-item class="justifyContent HHCellItemRequired" arrow @click.native="openAdd('popupVisible')">
                    <span class="HHCellItem" slot="left">项目所在地</span>
                    <!--<input class="HHCellItemInput" slot="right" type="text" placeholder="目的地"   v-model="formData.endTime">-->
                    <span slot="right" v-if="addressAci && addressAci[0] && addressAci[0].area ">{{addressAci[0].area + '-' + addressAci[1].area + '-' + addressAci[2].area}}</span>
                    <span slot="right" v-else>请选择</span>
                </yd-cell-item>
                <yd-cell-item class="justifyContent HHCellItemRequired" arrow  @click.native="openAdd('popupVisible1')">
                    <span class="HHCellItem" slot="left">项目所属行业</span>
                    <span slot="right" v-if="formData.industry">{{industryName}}</span>
                    <span slot="right" v-else>请选择</span>
                </yd-cell-item>
                <yd-cell-item class="HHCellItemRequired">
                    <span class="HHCellItem" slot="left">联系人姓名</span>
                    <input class="HHCellItemInput" slot="right" type="text" placeholder="请输入" v-model="formData.contact">
                </yd-cell-item>
                <yd-cell-item class="HHCellItemRequired">
                    <span class="HHCellItem" slot="left">联系人电话</span>
                    <div slot="right" class="HHItemRightcom">
                        <input class="HHCellItemInput" type="text" placeholder="请输入"  v-model="formData.contactMobile">
                        <span>请输入连续数字号码（例：18819087098 或 0108668566）</span>
                    </div>
                </yd-cell-item>
            </yd-cell-group>
            <mt-datetime-picker
                    ref="picker"
                    type="date"
                    :startDate="new Date()"
                    @confirm="handleChange($event,'start')"
                    v-model="startTime">
            </mt-datetime-picker>
            <mt-datetime-picker
                    ref="picker1"
                    type="date"
                    :startDate="new Date()"
                    @confirm="handleChange($event,'end')"
                    v-model="endTime">
            </mt-datetime-picker>
            <mt-popup
                    v-model="popupVisible"
                    position="bottom">
                <div class="mtPickerBOx">
                    <div class="mtPicker_header">
                        <button @click="openAdd('popupVisible')">取消</button>
                        <h3>所在地</h3>
                        <button class="qr" @click="openAdd('popupVisible')">确定</button>
                    </div>
                    <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"
                               valueKey="area"></mt-picker>
                </div>
            </mt-popup>
            <mt-popup
                    v-model="popupVisible1"
                    position="bottom">
                <div class="mtPickerBOx">
                    <div class="mtPicker_header">
                        <button @click="openAdd('popupVisible1')">取消</button>
                        <h3>所属行业</h3>
                        <button class="qr" @click="openAdd('popupVisible1')">确定</button>
                    </div>
                    <mt-picker :slots="industriesSlots" @change="onIndusterisesChange" :visible-item-count="5"
                               valueKey="name"></mt-picker>
                </div>
            </mt-popup>
            <button class="HH_Button_Bull" @click="sumber">提交</button>
        </laypage>
    </div>
</template>

<script>
    import {dateFtt} from '../../utils/utils'
    import e from "../../utils/localHandler";
    export default {
        name: 'Login',
        data() {
            return {
                industryName:null,
                addressAci:null,
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
                industriesSlots: [
                    {
                        flex: 1,
                        values: null,
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                startTime:null,
                endTime:null,
                formData:{
                    projectName:'',
                    startTime:null,
                    endTime:null,
                    province:null,
                    city:null,
                    district:null,
                    industry:null,
                    contact:'',
                    contactMobile:'',
                },
                // formData:{
                //     projectName:null,
                //     startTime:null,
                //     endTime:null,
                //     province:null,
                //     city:null,
                //     district:null,
                //     industry:null,
                //     contact:null,
                //     contactMobile:null,
                // },
                industries:[],
                popupVisible: false,
                popupVisible1: false,


                formInline:{},

                dictsBusinessArea:null,
                disctQualification:null,
                disctIndustries:null,
                businessArea:[],
                selected: '1',
                type: null,
                checked: null,
                num: 12,
                allLoaded: false,
                switch1: false,
                getBarWidth: function (index) {
                    if (index == 3) {
                        return (4) * 0.386 + 'rem'
                    } else {
                        return (2) * 0.386 + 'rem'
                    }
                }
            }
        },
        created() {
            this.$store.dispatch('getAreas', 0).then((data) => {
                this.addressSlots[0].values = data;
                this.addressSlots[1].values = data[0].areas;
                this.addressSlots[2].values = data[0].areas[0].areas;
            });
            this.$store.dispatch('getDicts', {code: ['industries']}).then((data) => {
                this.industriesSlots[0].values = data.industries;
            })
        },
        watch:{
            addressAci: {
                handler(newValue, oldValue) {
                    if(newValue[0]){
                        this.formData.province = newValue[0].id
                    }
                    if(newValue[1]){
                        this.formData.city = newValue[1].id
                    }
                    if(newValue[2]){
                        this.formData.district = newValue[2].id
                    }
                },
                deep: true
            },
        },
        methods: {
            openAdd(name){
                this[name] = !this[name];
            },
            onAddressChange(picker, values){
                values[0] && picker.setSlotValues(1, values[0].areas);
                values[1] && picker.setSlotValues(2, values[1].areas);
                this.addressAci = values;
            },
            onIndusterisesChange(picker, values){
                if(values[0]){
                    this.industryName = values[0].name
                    this.formData.industry = values[0].id
                }
            },
            openPicker(name) {
                this.$refs[name].open();
            },
            handleChange(value,type) {
                if(type=='start'){
                    this.formData.startTime=dateFtt('yyyy-MM-dd', value)
                }else {
                    this.formData.endTime=dateFtt('yyyy-MM-dd', value)
                }

            },
            sumber(){
                this.$store.dispatch('projectAdd',this.formData).then((data)=>{
                    let id=data.id;
                    if(this.$route.query.userId){
                        this.MessageBox({
                            title: '',
                            message: '已成功添加项目信息',
                            showCancelButton: true,
                            cancelButtonText: '返回项目列表',
                            confirmButtonText: '添加项目职位',
                        }).then((data)=>{
                            if(data=='confirm'){
                                this.$router.push({name:'newPosition', query:{userId:this.$route.query.userId, id:id}})
                            }else {
                                this.$router.push({'name': 'selectProject', query:{userId:this.$route.query.id}})
                            }
                        })
                    }else {
                        this.$router.back()
                    }

                })
            },
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
