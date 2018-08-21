<template>
    <div class="box-mask" v-show="prompt.show">
        <div class="normalMask" :class="{boxMaskBlack: prompt.type != 'prompt'}" @click="maskClear"></div>
        <template v-if="prompt.type == 'prompt'">
            <div class="box-prompt"><p class="prompt_weak">{{prompt.text}}</p></div>
        </template>
        <template v-else-if="prompt.type == 'confirm'">
            <div class="mask_confirm confirm-yes">
                <p>{{prompt.text}}</p>
                <p class="sure" @click="close">{{prompt.textSure}}</p>
            </div>
        </template>
        <template v-else>
            <div class="mask_confirm">
                <p>{{prompt.text}}</p>
                <button class="left" @click="close">{{prompt.textLeft}}</button>
                <button class="right" @click="closeWithAction">{{prompt.textRight}}</button>
            </div>
        </template>
    </div>

</template>

<script>
    import {PROMPT} from '../store/cons'
    export default {
        name: 'prompt',
        props: ['text'],
        computed: {
            prompt(){
                return this.$store.state.prompt;
            }
        },
        methods: {
            close(){
                this.$store.commit(PROMPT, {show: false});
                if(this.prompt.eventLeft){
                    this.prompt.eventLeft();
                }
            },
            closeWithAction(){
                this.$store.commit(PROMPT, {show: false});
                if(this.prompt.eventRight){
                    this.prompt.eventRight();
                }
            },
            maskClear(){
                if(this.prompt.maskClear){
                    this.$store.commit(PROMPT, {show: false});
                }
            }
        }
    }
</script>
