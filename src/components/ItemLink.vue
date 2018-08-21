<template>
    <!--<li v-if="tag=='li'" class="item-link" :class="{borderBottomNone: border=='false'}" @click="goTo">-->
        <!--<span><slot></slot></span>-->
        <!--<slot name="right">-->
            <!--<template v-if="desc">-->
                <!--<span class="text-link">{{desc}}</span>-->
                <!--<x-icon class="icon-gray" type="ios-arrow-forward" size=".5rem"></x-icon>-->
            <!--</template>-->
            <!--<div v-else-if="text" class="box-right">-->
                <!--<span>{{text}}</span>-->
            <!--</div>-->
            <!--<template v-else>-->
                <!--<span class="text-link"></span>-->
                <!--<x-icon class="icon-gray" type="ios-arrow-forward" size=".5rem"></x-icon>-->
            <!--</template>-->
        <!--</slot>-->
    <!--</li>-->
    <div class="item-link" :class="{borderBottomNone: border=='false'}" @click="goTo">
        <span><slot></slot></span>
        <slot name="right">
            <template v-if="desc">
                <span v-if="off"  :class="'text-link '+ spanClass"> {{desc}}</span>
                <span v-else  :class="'text-link '+ spanClass"><img class="image" :src="desc.img" alt=""></span>
                <x-icon class="icon-gray" type="ios-arrow-forward"></x-icon>
            </template>
            <div v-else-if="text" class="box-right">
                <span>{{text}}</span>
            </div>
            <template v-else>
                <span class="text-link"></span>
                <x-icon class="icon-gray" type="ios-arrow-right" size="20"></x-icon>
            </template>
        </slot>
    </div>
</template>

<script>
    export default{
        name: 'itemLink',
        props: ['desc', 'text', 'tag', 'border', 'to', 'spanClass'],
        computed:{
            off(){
                return (typeof this.desc=='string')&&this.desc.constructor==String;
            }
        },
        methods: {
            goTo(){
                if(this.$listeners && this.$listeners.open){
                    this.$emit('open')
                }else if(this.to){
                    this.$router.push(this.to)
                }
            }
        }
    }
</script>
