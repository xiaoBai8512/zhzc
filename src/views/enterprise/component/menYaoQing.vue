<template>
    <div class="body enterpriseExperts">
        <laypage :title="type==3 ? '我发出的邀请' : '发给专家的邀请'">
            <div class="enterpriseExperts_Header" v-if="type==3">
                <button class="narButton" @click="narAll">全部</button>
                <button class="narButton coll"  @click="popupVisible=true">{{project_name}}</button>
                <button class="narButton"  @click="popupVisible1=true">{{type_name}}</button>
            </div>
            <div class="enterpriseExperts_Header" v-else>
                <span>项目</span>
                <button class="buttonContent" @click="popupVisible=true">{{project_name}}</button>
                <button class="clear" @click="clearProject"><i class="el-icon-error"></i></button>
            </div>
            <div class="enterpriseExperts_con ovBox ">
                <div class="loadmoreBox">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="p_main"
                             :auto-fill="false"
                             class="conList" v-if="list">
                    <div class="HH_List men" v-for="(item, index) in list">
                        <h5 class="titleH5">
                            <span class="coll">{{item.projectName}}</span>
                            <button type="text" v-if="!!item.senderStatus" class="open" @click.stop="">
                                <svg-icon icon-class="hezhuo_open"></svg-icon>
                                已合作
                            </button>
                            <!-- <button type="text" v-else @click.stop="">
                                <svg-icon icon-class="hezhuo"></svg-icon>
                                合作
                            </button> -->
                        </h5>
                        <div class="men_1"
                             @click="$router.push({name: 'expertInvitationDetail',query:{id:item.id}})">
                            <img class="logo" :src="item.receiver.avatar | imgUrl" alt="">
                            <div class="men_1_con">
                                <div class="men_1_con_top">
                                    <h5 class="HH_Grow HH_ellipsis">
                                        {{item.receiver.isAnonymous == 0 && item.receiver.realname ? item.receiver.realname : item.receiver.nickname}}
                                        <span class="rz" v-if="item.receiver.isCertification==1">认证</span>
                                        <span v-if="item.receiver.type==2">专家</span>
                                        <span v-else>学生</span>
                                    </h5>
                                </div>
                                <div class="men_1_con_bottom">
                                    <svg-icon icon-class="nv" v-if="item.receiver.gender==2"></svg-icon>
                                    <svg-icon icon-class="nan"  v-if="item.receiver.gender==1"></svg-icon>
                                    <span>{{item.receiver.age}}岁</span>
                                    <svg-icon icon-class="adds"></svg-icon>
                                    <span>{{item.receiver.city_name}}</span>
                                    <svg-icon icon-class="bao"></svg-icon>
                                    <span>{{!!item.receiver.businessTrip ? '接受出差' : '不接受出差'}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-if="allLoaded" class="ywgdnr">已无更多内容</p>
                </mt-loadmore>
                </div>
                <mt-popup
                        v-if="popupVisible"
                        v-model="popupVisible"
                        position="bottom">
                    <div class="mtPickerBOx">
                        <div class="mtPicker_header">
                            <button @click="popupVisibleEsc">取消</button>
                            <h3>选择项目</h3>
                            <button class="qr" @click="popupVisibleQuery">确定</button>
                        </div>
                        <mt-picker :slots="yearSlot" @change="onYearChange" :visible-item-count="5"
                                   valueKey="projectName"></mt-picker>
                    </div>
                </mt-popup>
                <mt-popup
                        v-if="popupVisible1"
                        v-model="popupVisible1"
                        position="bottom">
                    <div class="mtPickerBOx">
                        <div class="mtPicker_header">
                            <button @click="popupVisible1=false">取消</button>
                            <h3></h3>
                            <button class="qr" @click="popupVisibleQuery1">确定</button>
                        </div>
                        <mt-picker :slots="yearSlot1" @change="onYearChange1" :visible-item-count="5"
                                   valueKey="name"></mt-picker>
                    </div>
                </mt-popup>
            </div>
        </laypage>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Login',
        computed: {
            ...mapGetters(['type'])
        },
        data() {
            return {
                yearSlot: [{
                    flex: 1,
                    values: [],
                    className: 'slot1'
                }],
                yearSlot1: [{
                    flex: 1,
                    values: [{name:'专家&实习生',type:null},{name:'专家',type:2},{name:'实习生', type:1}],
                    className: 'slot1'
                }],
                titleList: {
                    1: '发给专家的邀请',
                    2: '我收藏的学生',
                    3: '我收藏的机构',
                },
                pageData:{
                    pageNum:1,
                    pageSize: 10,
                },
                formData: {
                    "send_type": this.$route.query.send,
                    "user_type": null,
                    "project_id": null,
                },
                popupVisible: false,
                popupVisible1: false,
                allLoaded: false,
                list: [],
                project_name: '请选择项目',
                type_name: '专家&实习生',
                projectAci: null,
                projectAci1: null,
            }
        },
        created() {
            //我的项目
            this.$store.dispatch('projectMyProjects').then((data) => {
                this.yearSlot[0].values = data.list
            })
            this.getData(this.formData)
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
                this.$store.dispatch('inviteMySend', inData).then((data)=>{
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
            narAll(){
                this.project_name = '请选择项目';
                this.type_name = '专家&实习生';
                this.formData.user_type = null;
                this.formData.project_id = null;
            },
            onYearChange(picker, values) {
                if (values[0]) {
                    this.projectAci = values[0];
                    // this.project_name = values[0].projectName;
                    // this.formData.project_id = values[0].id;
                }
            },
            onYearChange1(picker, values) {
                if (values[0]) {
                    this.projectAci1 = values[0];
                    // this.project_name = values[0].projectName;
                    // this.formData.project_id = values[0].id;
                }
            },
            loadBottom() {
                this.pageData.pageNum++;
                this.getData(this.formData)
            },
            clearProject() {
                this.project_name = '请选择';
                this.formData.project_id = null;
            },
            popupVisibleEsc() {
                this.popupVisible = false;
            },
            popupVisibleQuery() {
                this.project_name = this.projectAci.projectName;
                this.formData.project_id = this.projectAci.id;
                this.popupVisible = false;
            },
            popupVisibleQuery1() {
                this.formData.user_type = this.projectAci1.type;
                this.type_name = this.projectAci1.name;
                this.popupVisible1 = false;
            }
        }
    }
</script>
