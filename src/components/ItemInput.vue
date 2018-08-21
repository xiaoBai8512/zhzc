<template>
    <div class="item-input" :class="{borderBottomNone: border=='false'}">
        <span class="text-left"><slot></slot></span>
        <div class="text-right">
            <input :type="type" :placeholder="holder" :value="value" @input="input">
        </div>
    </div>
</template>

<script>
    export default{
        name: 'itemInput',
        props: {
            holder: String,
            border: [String, Boolean],
            value: null,
            type: {
                type: null,
                default: 'text'
            }
        },
        methods:{
            input($event){
                this.$emit('input', $event.target.value)
            }
        }
    }
</script>
