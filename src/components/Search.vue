<template>
    <div class="searchInputBox">
        <router-link class="searchInputStart" :to="to" tag="div" v-if="to">
            <div>
                <icon type="search"></icon>
                {{placeholder}}
            </div>
        </router-link>
        <template v-else>
            <input ref="input" v-model="inputValue" class="searchInput" type="text" :placeholder="placeholder"/>
            <button v-if="inputValue && inputValue.length > 0" @click="clickButton" :disabled="loading">
                <inline-loading v-if="loading"></inline-loading>
                <template v-else>
                    {{buttonText}}
                </template>
            </button>
        </template>
    </div>
</template>

<script>
    import {Icon,InlineLoading} from 'vux'
    export default {
        name: 'Search',
        data(){
            return {
                inputValue:this.start,
            }
        },
        created(){
          this.$nextTick(()=>{

          })
        },
        methods:{
            clickButton(val){
                this.$emit('change',this.inputValue)
            }
        },
        watch:{
            start(val){
                this.inputValue=val
            }
        },
        props: {
            to: {
                type: Object,
            },
            placeholder:{
                type:String,
                default:'搜索'
            },
            buttonText:{
                type:String,
                default:'搜索'
            },
            loading:{
                type:Boolean,
                default:false
            },
            start:{
                default:null
            }

        },
        components: {
            Icon,
            InlineLoading
        },
    }
</script>
<style scoped>
    .searchInputBox {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        line-height: 1.2;
        /*background-color: #eee;*/
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        text-align: left;
        color: #c8c8c8;
    }
    .searchInputStart{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        text-indent: 10px;
        font-size: 13px;
        background-color: #eee;
    }
    .searchInput{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        text-indent: 10px;
        font-size: 13px;
    }
    .searchInputBox button{
        white-space:nowrap;
        background: none;
        font-size: 14px;
        color: #5c5c5c;
    }
</style>
