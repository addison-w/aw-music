<template>
    <div class="search-wrap">
        <search-box ref="searchBox" @clearQuery="clearQuery" @newQuery="newQuery"></search-box>
        <popular-search @onClickPopSearch="onClickPopSearch"></popular-search>
    </div>
</template>

<script>
import SearchBox from 'base/search-box'
import PopularSearch from 'base/popular-search'
export default {
    data () {
        return {
            query: ''
        }
    },
    components: {
        SearchBox,
        PopularSearch
    },
    methods: {
        onClickPopSearch (keyword) {
            this.$refs.searchBox.query = keyword
        },
        clearQuery () {
            this.$refs.searchBox.query = ''
        },
        newQuery (newQuery) {
            this.query = newQuery
        }
    }
}
</script>

<style lang="scss" scoped>
    .search-wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 120;
        background: white;
    }
</style>
