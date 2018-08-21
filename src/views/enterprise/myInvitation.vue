<template>
    <div class="body myList">
        <laypage title="我的邀请" v-if="type==3">
            <yd-cell-group>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="$router.push({name: 'yaoInvitation', query:{send:'TO_EXPERT'}})">
                    <span class="HHCellItem" slot="left">我发出的邀请</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="$router.push({name: 'yaoInvitation',  query:{send:'TO_Organization'}})">
                    <span class="HHCellItem" slot="left">我收到的邀请</span>
                </yd-cell-item>
            </yd-cell-group>
        </laypage>
        <laypage title="我发出的邀请" v-else>
            <yd-cell-group>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="$router.push({name: 'yaoInvitation', query:{send:'TO_EXPERT'}})">
                    <span class="HHCellItem" slot="left">发给专家的邀请</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="$router.push({name: 'yaoInvitation', query:{send:'TO_Organization'}})">
                    <span class="HHCellItem" slot="left">发给专业机构的邀请</span>
                </yd-cell-item>
            </yd-cell-group>
        </laypage>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'Login',
        computed:{
            ...mapGetters(['type'])
        },
        data() {
            return {
                selected: '1',
                formInline: null,
                checked: null,
                allLoaded: false,
                switch1: false,
                getBarWidth: function (index) {
                    if (index == 3) {
                        return (4) * 0.386 + 'rem'
                    } else {
                        return (2) * 0.386 + 'rem'
                    }
                }
            }
        },
        methods: {
            goNext() {
                this.$router.push({name: 'loginIdentity'})
            },

        }
    }
</script>
<style scoped>
    .back {

    }
</style>
