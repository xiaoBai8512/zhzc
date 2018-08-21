<template>
    <div class="c-number">
        <div class="flex-center" @click="minus" style="padding: .2rem">
            <svg class="icon-c-number"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" :class="{active: Number(value)>dMin && !dis}">
                <path d="M961.944576 447.944704 60.007424 447.944704c-30.829568 0-55.911424 25.265152-55.911424 56.32s25.081856 56.32 55.911424 56.32l901.937152 0c30.829568 0 55.911424-25.265152 55.911424-56.32S992.774144 447.944704 961.944576 447.944704z"/>
            </svg>
        </div>

        <!--<x-icon class="icon-c-number" :class="{active: Number(value)>dMin && !dis}" type="ios-minus-empty" size=".7rem" @click="minus"></x-icon>-->

        <span class="num" :class="{theme: Number(value)>0}">{{value}}</span>

        <div class="flex-center" @click="plus" style="padding: .2rem">
            <svg class="icon-c-number" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" :class="{active: (Number(value)<dMax || this.dMax == -1) && !dis}">
                <path d="M950.857143 585.142857 73.142857 585.142857C32.768 585.142857 0 552.374857 0 512s32.768-73.142857 73.142857-73.142857l877.714286 0c40.374857 0 73.142857 32.768 73.142857 73.142857S991.232 585.142857 950.857143 585.142857z"  />
                <path d="M512 1024c-40.374857 0-73.142857-32.768-73.142857-73.142857L438.857143 73.142857c0-40.374857 32.768-73.142857 73.142857-73.142857s73.142857 32.768 73.142857 73.142857l0 877.714286C585.142857 991.232 552.374857 1024 512 1024z"  />
            </svg>
        </div>

        <!--<x-icon class="icon-c-number" :class="{active: (Number(value)<dMax || this.dMax == -1) && !dis}" type="ios-plus-empty" size=".7rem" @click="plus"></x-icon>-->
    </div>
</template>

<script>
    export default{
        name: 'c-number',
        props: {
            value: [String, Number],
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: [String, Number],
                default: -1
            },
            dis: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                number: 0,
                dMin: 0,
                dMax: -1,
            }
        },
        methods: {
            minus(){
                if(this.number > this.dMin && !this.dis){
                    if(this.number-this.dMin==0.5){
                        this.$emit('input', this.dMin);
                    }else{
                        this.$emit('input', --this.number);
                    }
                    this.$emit('countMoney');
                }
            },
            plus(){
                if((this.number < this.dMax || this.dMax == -1) && !this.dis){
                    if(this.number%1>0){
                        this.$emit('input', Math.ceil(this.number))
                    }else{
                        this.$emit('input', ++this.number);
                    }
                    this.$emit('countMoney');
                }
            }
        },
        created(){
            this.number = Number(this.value)
            this.dMin = this.min
            this.dMax = Number(this.max)
        },
        watch:{
            value(v){
                this.number = Number(v)
            },
            min(v){
                this.dMin = Number(v)
            },
            max(v){
                this.dMax = Number(v)
            }
        }
    }
</script>
