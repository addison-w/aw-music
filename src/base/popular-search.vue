<template>
    <div class="popular-search-wrap">
        <p class="pop-search-title">热门搜索</p>
        <div class="pop-search-list">
            <span v-for="(keyword, index) in searches" :key="index" @click="onClickPopSearch(keyword)">{{ keyword }}</span>
        </div>
    </div>
</template>

<script>
import {getPopularSearch} from 'api/search'
import {SUCC_CODE} from 'api/config'
export default {
    data () {
        return {
            searches: []
        }
    },
    created () {
        this._getPopularSearch()
    },
    methods: {
        _getPopularSearch () {
            getPopularSearch().then(res => {
                if (res.code === SUCC_CODE && res.result.hots.length > 0) {
                    res.result.hots.map(hot => {
                        this.searches.push(hot.first)
                    })
                }
            })
            .catch(err => console.log(err))
        },
        onClickPopSearch (keyword) {
            this.$emit('onClickPopSearch', keyword)
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/variable.scss';
    .popular-search-wrap {
        margin: 0 auto;
        width: 95vw;
        .pop-search-title {
            font-size: 0.7rem;
            padding: 10px 10px;
            color: $color-secondary;
        }
        .pop-search-list {
            display: flex;
            flex-flow: row wrap;
            span {
                font-size: 0.9rem;
                padding: 5px;
                margin: 3px 6px;
                border-radius: 6px;
                border: 1px solid lightgray;
            }
        }
    }
</style>
