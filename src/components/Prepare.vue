<template>
    <div >
        <mt-popup v-model="value" class="popupBeixuan">
            <h5 class="tc">选择备选方向</h5>
            <template  v-if="dictsOrgType && type == 3">
                <div v-for="(item, index) in dictsOrgType">
                    <HH_chechbox class="aaa" @click="clickOne(item.id)" :start="businessArea.indexOf(item.id) > -1" :key="item.id" :disabled="disabledList.indexOf(item.id) < 0">{{item.name}}</HH_chechbox>
                </div>
            </template>
            <template v-else>
                <div v-for="(item, index) in dictsBusinessArea">
                    <HH_chechbox class="aaa" @click="clickOne(item.id)" :start="businessArea.indexOf(item.id) > -1" :key="item.id" :disabled="disabledList.indexOf(item.id) < 0">{{item.name}}</HH_chechbox>
                    <div class="HH_chechbox—box clearfix" v-if="item.dicts.length > 0">
                        <HH_chechbox @click="clickTwo(towItem.id, item.id)" class="bbb" type="mini"
                                     v-for="(towItem, ind) in item.dicts" :start="erOjb[item.id].indexOf(towItem.id) > -1" :disabled="disabledList.indexOf(towItem.id) < 0" :key="towItem.id">{{towItem.name}}
                        </HH_chechbox>
                    </div>
                </div>
            </template>
            <div class="popupBeixuanFoot">
                <button @click="close">取消</button>
                <button class="bull"  @click="sumber">确定</button>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    export default {
        name: 'Prepare',
        data(){
            return{
                erList:[],
                erOjb:{},
                erData:{},
                businessArea:[],
                dictsBusinessArea:[],
                dictsOrgType:[],
            }
        },
        props:['id','value','type', 'disabled'],
        created(){
            this.$store.dispatch('getDicts',{code: ['business_area', 'org_type']}).then((data) => {
                for(let item of data.business_area){
                    if(item.dicts.length > 0){
                        this.$set(this.erData,[item.id],item.dicts)
                        this.$set(this.erOjb,[item.id],[])
                    }
                }
                this.dictsBusinessArea = data.business_area;
                this.dictsOrgType = data.org_type;
            })
        },
        computed:{
            disabledList(){
                if(this.disabled){
                    let outData=[]
                    for(let item of this.disabled){
                        outData.push(item.id)
                        if(item.dicts && item.dicts.length > 0){
                            for(let itemT of item.dicts){
                                outData.push(itemT.id)
                            }
                        }
                    }
                    console.log(outData)
                    return outData
                }else {
                    return []
                }
            }
        },
        methods:{
            close(){
                this.$emit('input',false)
            },
            clickOne(id){
                if(this.businessArea.indexOf(id) > -1){
                    this.businessArea.splice(this.businessArea.indexOf(id), 1)
                    if(id in this.erData){
                        this.$set(this.erOjb,[id],[])
                    }
                }else {
                    this.businessArea.push(id)
                    if(id in this.erData){
                        for(let item of this.erData[id]){
                            if(this.erOjb[id].indexOf(item.id) < 0 && this.disabledList.indexOf(item.id) > -1){
                                this.erOjb[id].push(item.id)
                            }
                        }
                    }
                }
            },
            clickTwo(id, key){
                if(this.erOjb[key].indexOf(id) > -1){
                    this.erOjb[key].splice(this.erOjb[key].indexOf(id), 1)
                }else {
                    this.erOjb[key].push(id)
                }
                if(this.erOjb[key].length==0){
                    if(this.businessArea.indexOf(key) > -1){
                        this.businessArea.splice(this.businessArea.indexOf(key), 1)
                    }
                }else {
                    if(this.businessArea.indexOf(key) < 0){
                        this.businessArea.push(key)
                    }
                }
            },
            sumber(){
                if(this.businessArea && this.businessArea.length > 0){
                    let inData=[];
                    inData=inData.concat(this.businessArea)
                    for(let item in this.erOjb){
                        inData=inData.concat(this.erOjb[item])
                    }
                    this.$store.dispatch('preparePrepareUser',{prepareUserId: this.id, prepareType:inData.join(','),}).then((data)=>{
                        this.close()
                        this.$emit('callBack')
                    })
                }else{
                    this.Toast({
                        message: '请选择备选方向',
                        position: 'bottom',
                        duration: 3000
                    })
                }
            }
        },
        mounted(){

        }
    }
</script>
