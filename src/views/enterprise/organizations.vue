<template>
    <div class="body enterpriseInvitation">
        <layout>
            <div class="EIheader">
                <button :class="(!addName && !formData.organizationType) ? 'xiala open' : '' " @click="rest">全部</button>
                <el-popover
                        class="enterPopover"
                        ref="popover2"
                        placement="bottom"
                        width="120"
                        v-model="popover2"
                        trigger="click">
                    <span v-for="(itemTow,index) in dictsOrgType">
                        <button :class="formData.organizationType == itemTow.id ? 'enterPopover open' : 'enterPopover'"  @click="clickButtonTow(itemTow.id, itemTow.name)">{{itemTow.name}}</button>
                        <div class="b_b_1"></div>
                    </span>
                </el-popover>
                <button :class="formData.organizationType ? 'xiala open' :''" v-popover:popover2>{{seachCon || '机构类别'}} <i class="el-icon-caret-bottom"></i></button>
                <button :class="addName ? 'xiala open' : '' " @click="popupVisible1 = true">{{addName || "所在地"}} <i class="el-icon-caret-bottom"></i></button>
            </div>
            <div class="InvitationBox_con">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main" :auto-fill="false"
                             v-if="list">

                    <EnterpriseItem :item="item" :showOp="true" :index="index" @Prepare="onPrepare(item,index)" v-for="(item, index) in list" :key="'ent_list_'+index"></EnterpriseItem>

                    <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
                </mt-loadmore>
            </div>
            <Prepare v-if="popupVisible2" v-model="popupVisible2" :id="id" @callBack="onPreparecallBack()" type="3" :disabled="disabled"></Prepare>

            <mt-popup
                    v-if="popupVisible1"
                    v-model="popupVisible1"
                    position="bottom">
                <div class="mtPickerBOx">
                    <div class="mtPicker_header">
                        <button @click="popupVisible1 = false">取消</button>
                        <h3>所在地</h3>
                        <button class="qr" @click="popupVisible1 = false">确定</button>
                    </div>
                    <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"
                               valueKey="area"></mt-picker>
                </div>
            </mt-popup>
        </layout>
    </div>
</template>

<script>
    import Prepare from '../../components/Prepare'
    import EnterpriseItem from '../../components/enterprise/EnterpriseItem'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Login',
        components:{Prepare, EnterpriseItem},
        data() {
            return {
                formData:{
                    "organizationType" : null,
                    "province" : null,
                    "city" : null,
                    "district" : null,
                    "openCooperation": null,
                    "businessAlternative" : null,
                    "isRecommend" : null
                },
                pageData:{
                    pageNum:1,
                    pageSize: 10,
                },
                disabled: null,
                popover2: false,
                popupVisible1: false,
                popupVisible2: false,
                allLoaded: false,
                seachCon: null,
                getBarWidth: function (index) {
                    if (index == 3) {
                        return (4) * 0.386 + 'rem'
                    } else {
                        return (2) * 0.386 + 'rem'
                    }
                },
                list:[],
                id:null,
                openIndex:null,
                addName:null,
                dictsOrgType:[],
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
                addressAci:[],
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'type',
            ]),
        },
        created(){
            document.title = this.$store.state.login.type == 3 ? "合作机构" : "专业机构";
            this.$store.dispatch('getDicts',{code: ['org_type']}).then((data) => {
                this.dictsOrgType = data.org_type;
            })
            this.$store.dispatch('getAreas', 0).then((data) => {
                this.addressSlots[0].values = data;
                this.addressSlots[1].values = data[0].areas;
            })
            if(this.type == 3){
                this.formData.openCooperation = 1;

            }else{
                this.formData.businessAlternative = 1;
            }
            // this.getData(this.formData);
        },
        watch: {
            formData: {
                handler(newValue) {
                    this.list=[];
                    this.pageData={
                        pageNum:1,
                        pageSize: 10,
                    },
                    this.getData(newValue)
                },
                deep: true
            },
        },
        methods: {
            getData(formData){
                let inData=Object.assign(this.pageData, formData)
                this.$store.dispatch('enterpriseSearch', inData).then((data)=>{
                    this.allLoaded = !!!data.hasNextPage;
                    if(data.pageNum==1){
                        this.list=[]
                    }
                    for (let item of data.list){
                        this.list.push(item)
                    }
                }).finally(()=>{
                    this.$refs.p_main.onBottomLoaded();
                })
            },
            onPrepare(item, idx){
                if(item.isPrepare == 0){
                    this.disabled=item.organizationTypeItems;
                    this.popupVisible2 = true;
                    this.id = item.userId;
                    this.openIndex = idx;
                }else{
                    this.$store.dispatch('preparePrepareUser',{prepareUserId: item.userId}).then((data)=>{
                        item.isPrepare = 0;
                    });
                }
            },
            onPreparecallBack(){
                this.list[this.openIndex].isPrepare=1;
            },
            clickButtonTow(id, name){
                this.seachCon=name;
                this.formData.organizationType=id;
                this.popover2 = false;
            },
            onAddressChange(picker, values) {
                values[0] && picker.setSlotValues(1, values[0].areas);
                values[1] && picker.setSlotValues(2, values[1].areas);
                this.addressAci = values;
                if(values[0]){
                    this.formData.province = values[0].id
                }
                if(values[1]){
                    this.formData.city = values[1].id;
                }
            },
            rest(){
                this.addName=null;
                this.formData.organizationType=null;
                this.formData.province=null;
                this.formData.city=null;
                this.formData.district=null;
            },
            goNext() {
                this.$router.push({name: 'loginIdentity'})
            },
            loadBottom() {
                this.pageData.pageNum++;
                this.getData(this.formData)
            }

        }
    }
</script>
<style scoped>
    .mint-loadmore {
        width: 100%;
    }
</style>
