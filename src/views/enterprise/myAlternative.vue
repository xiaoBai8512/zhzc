<template>
    <div class="body myList">
        <laypage title="我的备选">
            <yd-cell-group>
                <yd-cell-item class="yd-cell-item_arrow">
                    <span class="HHCellItem" slot="left">我发出的邀请</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow">
                    <span class="HHCellItem" slot="left">我收到的邀请</span>
                </yd-cell-item>
            </yd-cell-group>
        </laypage>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
            }
        },
        methods: {
            goNext() {
                this.$router.push({name: 'loginIdentity'})
            }

        }
    }
</script>
<style scoped>
    .back {

    }
</style>
