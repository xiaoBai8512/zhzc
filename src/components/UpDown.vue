<template>
    <div class="box-icon-cz">
        <x-icon class="icon-gray" type="ios-arrow-up"  v-show="value=='up'"></x-icon>
        <x-icon class="icon-gray" type="ios-arrow-down" v-show="value=='down'"></x-icon>
        <span @click="ud">{{value=='up'?'点击收起':'点击展开'}}</span>
    </div>
</template>

<script>
    export default{
        name: 'up-down',
        props: ['value'],
        methods: {
            ud(){
                if(this.value=='up'){
                    this.$emit('input', 'down')
                }else{
                    this.$emit('input', 'up')
                }
            }
        }
    }
</script>
