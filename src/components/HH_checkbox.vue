<template>
    <button type="ghost" :disabled="disabled" @click="clickButton" :class="className">
        <slot></slot>
        <svg-icon icon-class="HH_chechbox_open"/>
    </button>
</template>

<script>

    export default {
        name: 'TimeButton',
        data(){
            return{
                timeData:0,
                className:'HH_chechbox',
                miniClass:'HH_chechbox HH_chechbox',
            }
        },
        props: {
            type: String,
            disabled: {
                default: false,
            },
            start: {
                default: false,
            }
        },
        created(){
            if(this.type){
                this.className=this.miniClass+'_'+this.type;
            }
            if(this.start){
                this.className=this.className + ' open'
            }
        },
        watch:{
            start(val){
                if(val){
                    this.className=this.className + ' open'
                }else {
                    this.className.indexOf('open') > -1 && (this.className=this.className.substring(0,this.className.length-4))
                }
            }
        },
        computed:{
        },
        methods: {
            clickButton(){
                this.$emit('click',this.start);
            },
        }
    }
</script>
<style scoped>
</style>
