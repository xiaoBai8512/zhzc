<template>
    <div class="body enterpriseExperts">
        <layout>
            <div slot="header" class="header">
                    <p @click="popupVisible=true">筛选</p>
                    <svg-icon class="icon-class-new" icon-class="shaixuan" @click.native="popupVisible=true"></svg-icon>
            </div>
            <div class="enterpriseExperts_con">
                <div class="tiaojianList">
                    <div>
                        <button :class="formData.business_area.length ==0 && 'open'" @click="all">全部</button>
                        <span v-for="(item, index) in dictsBusinessArea" :key="'Area'+index">
                             <el-popover
                                     v-if="item.dicts && item.dicts.length > 0"
                                     v-model="clickButtonTowPopover"
                                     class="enterPopover"
                                     placement="bottom"
                                     width="120"
                                     trigger="click">
                                <!--<button class="enterPopover open" v-for="itemTow in item.dicts">{{itemTow.name}}</button>-->
                                 <span v-for="(itemTow,ind) in item.dicts" :key="'ind'+ind">
                                        <button :class="formData.business_area[0] == itemTow.id ? 'enterPopover open' : 'enterPopover'"  @click="clickButtonTow(itemTow.id, item.id,itemTow.name)">{{itemTow.name}}</button>
                                        <div class="b_b_1"></div>
                                 </span>
                                 <button :class="clickButtonTowIndex == item.id ? 'xiala open' : 'xiala'" slot="reference">{{(clickButtonTowCon || item.name).substr(0, 4)}} <i class="el-icon-caret-bottom"></i></button>
                            </el-popover>
                            <button :class="formData.business_area[0] == item.id && 'open'" v-else @click="clickButton(item.id)">{{item.name}}</button>
                        </span>
                    </div>
                    <div v-if="type!=4">
                        <button :class="formData.type || 'open'" @click="clickType(null)">全部</button>
                        <button :class="formData.type ==2 && 'open'" @click="clickType(2)">专家</button>
                        <button :class="formData.type ==1 && 'open'"  @click="clickType(1)">实习生</button>
                    </div>
                </div>
                <div class="loadmoreBox">
                    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false"
                                 v-if="list" class="conList">

                        <ExpertItem :item="item" :showOp="true" :index="index" @Prepare="onPrepare(item,index)" v-for="(item, index) in list" :key="'list'+index"></ExpertItem>
                        <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
                    </mt-loadmore>
                </div>
                <Prepare ref="Prepare" v-if="popupVisible2" v-model="popupVisible2" :id="id" @callBack="callBack()" :disabled="disabled"></Prepare>
                <mt-popup
                        v-if="popupVisible"
                        v-model="popupVisible"
                        popup-transition="popup-fade"
                        position="right">
                    <div class=enterPopup>
                        <div class="enterPopupHeader">
                            筛选
                        </div>
                        <div class="enterPopupCon">
                            <h5>出差</h5>
                            <div>
                                <HH_chechbox :start="formData.business_trip==1" class="fff" @click="chengList(1, 'business_trip')">接受出差</HH_chechbox>
                                <HH_chechbox  :start="formData.business_trip==0" class="fff" @click="chengList(0, 'business_trip')">不接受出差</HH_chechbox>
                            </div>
                            <h5>是否认证</h5>
                            <div>
                                <HH_chechbox :start="formData.is_certification==1" class="fff" @click="chengList(1,'is_certification')">已认证</HH_chechbox>
                                <HH_chechbox :start="formData.is_certification==0" class="fff" @click="chengList(0,'is_certification')">未认证</HH_chechbox>
                            </div>
                            <h5>从业时间</h5>
                            <div>
                                <HH_chechbox class="fff" v-for="(item, index) in dictsWorkTime" :key="'WorkTim'+index" :start="formData.work_time==item.name" @click="chengList(item.name,'work_time')">{{item.name}}</HH_chechbox>
                            </div>
                            <h5>执业资格</h5>
                            <div>
                                <HH_chechbox class="fff" v-for="(item, index) in disctQualification" :key="'Qual'+index" :start="formData.qualifications.indexOf(item.id) > -1" @click="qualificationsClick(item.id)">{{item.name}}</HH_chechbox>
                            </div>
                            <h5>年龄</h5>
                            <div class="age">
                                <input  class="fff" type="number" v-model="formData.ages[0]">
                                <span>至</span>
                                <input  class="fff" type="number"  v-model="formData.ages[1]">
                            </div>
                            <h5>熟悉行业</h5>
                            <div>
                                <HH_chechbox class="fff" v-for="(item, index) in disctIndustries" :key="'Indus'+index" :start="formData.industries.indexOf(item.id) > -1" @click="industriesClick(item.id)">{{item.name}}</HH_chechbox>
                            </div>
                            <h5>所在地</h5>
                            <div>
                                <HH_chechbox class="eee" @click="popupVisible1=true">{{addName || '请选择'}}</HH_chechbox>
                            </div>
                        </div>
                        <div class="enterPopupFoot">
                            <button @click="rest">重置</button>
                            <button class="bull" @click="query">完成</button>
                        </div>
                    </div>
                </mt-popup>
                <mt-popup
                        v-if="popupVisible1"
                        v-model="popupVisible1"
                        position="bottom">
                    <div class="mtPickerBOx">
                        <div class="mtPicker_header">
                            <button @click="popupVisible1=false">取消</button>
                            <h3>所在地</h3>
                            <button class="qr" @click="popupVisible1=false">确定</button>
                        </div>
                        <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"
                                   valueKey="area"></mt-picker>
                    </div>
                </mt-popup>
            </div>

        </layout>
    </div>
</template>

<script>
    import Prepare from '../../components/Prepare'
    import ExpertItem from '../../components/expert/ExpertItem'

    export default {
        name: 'experts',
        components:{Prepare,ExpertItem},
        data() {
            return {
                disabled:null,
                openIndex:null,
                id:null,
                addName:null,
                ages:[null,null],
                formData:{
                    "business_trip": null,
                    "is_certification": null,
                    "work_time": null,
                    "business_area": [],
                    "qualifications": [],
                    "industries": [],
                    "ages": [null,null],
                    "province": null,
                    "city": null,
                    "district": null,
                    "type": this.$route.params.type || null,
                    "isRecommend":null,
                    "pageNum": 1,
                    "pageSize": 10
                },
                pageData:{
                    pageNum:1,
                    pageSize: 10,
                },
                list:null,
                type:this.$store.getters.type,
                clickButtonTowIndex:null,
                clickButtonTowIn:null,
                clickButtonTowCon:null,
                clickButtonTowPopover:false,
                role:null,
                dictsBusinessArea:null,
                dictsWorkTime:null,
                disctQualification:null,
                disctIndustries:null,
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
                    }
                ],
                popupVisible: false,
                popupVisible1: false,
                popupVisible2: false,

                businessArea:[],
                selected: '1',
                formInline: null,
                checked: null,
                num: 12,
                allLoaded: false,
                switch1: false,
            }
        },
        created() {
            document.title = this.$store.state.login.type == 3 ? '专家&实习生' : '专家';
            if(this.type==4){
                this.formData.type=2;
            }
            this.query();
            // this.$store.dispatch('expertSearch',this.formData).then((data)=>{
            //     this.list=data.list;
            //     this.allLoaded = !!!data.hasNextPage;
            // })
            this.$store.dispatch('getAreas', 0).then((data) => {
                this.addressSlots[0].values = data;
                this.addressSlots[1].values = data[0].areas;
            })
            this.$store.dispatch('getDicts',{code: ['business_area','work_time', 'qualification','industries']}).then((data) => {
                this.dictsBusinessArea = data.business_area;
                this.dictsWorkTime = data.work_time;
                this.disctQualification = data.qualification;
                this.disctIndustries = data.industries;
            })
        },
        methods: {
            agesVol(){
                if(!this.formData.ages[0] && !this.formData.ages[0]){
                    return true
                }else if(this.formData.ages[0] && this.formData.ages[0] && Number(this.formData.ages[0]) < Number(this.formData.ages[1])){
                        return true
                }else {
                    this.Toast({
                        message: '年龄段不合法',
                        position: 'bottom',
                        duration: 2000
                    })
                    return false
                }
            },
            chengList(val,key){
                if(this.formData[key]==val){
                    this.formData[key]=null
                }else {
                    this.formData[key]=val
                }
            },
            onPrepare(item, idx){
                if(item.isPrepare == 0){
                    this.disabled=item.businessAreaItems;
                    this.popupVisible2 = true;
                    this.id = item.userId;
                    this.openIndex = idx;
                }else{
                    this.$store.dispatch('preparePrepareUser',{prepareUserId: item.userId}).then((data)=>{
                        item.isPrepare = 0;
                    });
                }
            },
            callBack(){
                this.list[this.openIndex].isPrepare=1;
            },
            query(){
                let inData = Object.assign({}, this.formData, this.pageData)
                if(this.agesVol()){
                    console.log(this.formData)
                    inData.ages= this.formData.ages[0] ? this.formData.ages.join(',') : null;
                    this.$store.dispatch('expertSearch', inData).then((data)=>{
                        this.list=data.list;
                        this.popupVisible=false
                    })
                }
            },
            qualificationsClick(id){
                if(this.formData.qualifications.indexOf(id) > -1){
                    this.formData.qualifications.splice(this.formData.qualifications.indexOf(id), 1)
                }else {
                    this.formData.qualifications.push(id)
                }
            },
            industriesClick(id){
                if(this.formData.industries.indexOf(id) > -1){
                    this.formData.industries.splice(this.formData.industries.indexOf(id), 1)
                }else {
                    this.formData.industries.push(id)
                }
            },
            clickButton(val){
                this.clickButtonTowIndex=null;
                this.clickButtonTowCon=null;
                if(this.formData.business_area.indexOf(val) < 0){
                    this.$set(this.formData.business_area, 0, val)
                }
                this.query();
            },
            all(){
                this.formData.business_area=[];
                this.clickButtonTowCon=null;
                this.clickButtonTowIndex=null;
                this.query();
            },
            clickButtonTow(val, id, name){
                this.clickButtonTowIndex=id;
                if(this.formData.business_area.indexOf(val) < 0){
                    this.$set(this.formData.business_area, 0, val)
                }
                this.clickButtonTowPopover=false;
                this.clickButtonTowCon=name;
                this.query();
            },
            clickType(id){
                this.formData.type=id;
                this.query();
            },
            onAddressChange(picker, values) {
                values[0] && picker.setSlotValues(1, values[0].areas);
                values[1] && picker.setSlotValues(2, values[1].areas);
                this.addressAci = values;
                if(values[0]){
                    this.formData.province = values[0].id
                }
                if(values[1]){
                    this.formData.city = values[1].id
                }
                this.addName=values[0].area+'-'+values[1].area
                // picker.setSlotValues(2, address[values[0]]);
                // this.addressProvince = values[0];
                // this.addressCity = values[1];
            },
            rest(){
                this.type = this.$store.getters.type;
                this.formData={
                    "business_trip": null,
                    "is_certification": null,
                    "work_time": null,
                    "business_area": [],
                    "qualifications": [],
                    "industries": [],
                    "ages": [null,null],
                    "province": null,
                    "city": null,
                    "district": null,
                    "type": this.type==4 ? 2 : null,
                    "isRecommend":null,
                    "pageNum": 1,
                    "pageSize": 10
                };
                this.ages=[null,null];
                this.addName=null;
                this.query()
            },
            loadBottom() {
                this.formData.pageNum++
                let inData = Object.assign({}, this.formData)
                if(this.agesVol()){
                    inData.ages= this.formData.ages[0] ? this.formData.ages.join(',') : null;
                    this.$store.dispatch('expertSearch', inData).then((data)=>{
                        this.allLoaded = !!!data.hasNextPage;
                        if(data.pageNum==1){
                            this.list=[]
                        }
                        for (let item of data.list){
                            this.list.push(item)
                        }
                    }).finally(()=>{
                        this.$refs.loadmore.onBottomLoaded();
                    })
                }
            },
        },
        beforeRouteEnter (to, from, next) {
            let whiteList = ['enterpriseExpertsDetails'];
            next(vm=>{
                document.title = vm.$store.state.login.type == 3 ? '专家&实习生' : '专家';
                if(whiteList.indexOf(from.name) < 0){
                    vm.rest()
                }
            })
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
        }
    }
</script>
<style scoped>
    .back {

    }
</style>
