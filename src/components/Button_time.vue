<template>
    <button :disabled="disAbled" type="ghost" @click="clickButton">
        <span v-if="timeData != 0">{{timeData}}s</span><slot v-else></slot>
    </button>
    <!--<Button  type="ghost" :disabled="disabled" :loading="loading" long @click="getCaptcha">获取验证码</Button>-->
</template>

<script>

    export default {
        name: 'TimeButton',
        data(){
            return{
                timeData:0,
                off:false,
                // disAbled:'',
            }
        },
        props: ['time','rules'],
        computed:{
            disAbled(){
                return this.off || this.rules;
            }
        },
        methods: {
            clickButton(){
                this.timeData=this.time;
                this.off=true;
                var buttonTime = setInterval(function() {
                    if (this.timeData == 0) {
                        this.off=false;
                        clearInterval(buttonTime);
                    } else {
                        this.timeData--;
                    }
                }.bind(this), 1000);
                this.$emit('click');
            },
            upDis(){
                if(this.rules) this.disAbled=this.disabled;
                this.$emit('upDis');
            }
        }
    }
</script>
<style scoped>
</style>
