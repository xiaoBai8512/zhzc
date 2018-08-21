<template>
    <div class="body myList">
        <laypage title="我的收藏">
            <yd-cell-group>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="$router.push({name:'collectionExperts', query:{type:2}})">
                    <span class="HHCellItem" slot="left">收藏的专家</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" v-if="type==3"  @click.native="$router.push({name:'collectionExperts', query:{type:1}})">
                    <span class="HHCellItem" slot="left">收藏的学生</span>
                </yd-cell-item>
                <yd-cell-item class="yd-cell-item_arrow" @click.native="$router.push({name:'collectionExperts', query:{type:3}})">
                    <span class="HHCellItem" slot="left">{{type==3?"收藏的合作机构":"收藏的专业机构"}}</span>
                </yd-cell-item>
            </yd-cell-group>
        </laypage>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'Login',
        computed: {
            ...mapGetters([
                'type',
            ]),
        },
    }
</script>
