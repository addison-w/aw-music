<template>
    <transition name="slide">
        <div class="search-wrap">
            <search-box ref="searchBox" @clearQuery="clearQuery" @newQuery="newQuery"></search-box>
            <popular-search @onClickPopSearch="onClickPopSearch" v-show="!query"></popular-search>
            <suggest-list :tracks="tracks" v-show="query" :searchMore="searchMore" @loadMore="loadMore" ref="suggestList"></suggest-list>
        </div>
    </transition>
</template>

<script>
import SearchBox from 'base/search-box'
import PopularSearch from 'base/popular-search'
import {searchByKeywordAndType} from 'api/search'
import {QUERY_TYPE, SUCC_CODE} from 'api/config'
import {createSearchedTrack} from 'model/Track'
import SuggestList from 'base/suggest-list'
export default {
    data () {
        return {
            query: '',
            tracks: [],
            songCount: 0,
            searchMore: false
        }
    },
    components: {
        SearchBox,
        PopularSearch,
        SuggestList
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
        },
        search (query) {
            this.searchMore = true
            this.tracks = []
            this.songCount = 0
            searchByKeywordAndType(query, QUERY_TYPE.Tracks)
            .then(res => {
                if (res.code === SUCC_CODE && res.result.songs.length > 0) {
                    this._normalizeTracks(res.result.songs)
                    this.songCount = res.result.songCount
                    this.searchMore = false
                    this.$refs.suggestList.isLoading = false
                }
            })
            .catch(err => console.log(err))
        },
        loadMore () {
            if (this.tracks.length < this.songCount) {
                this.searchMore = true
                searchByKeywordAndType(this.query, QUERY_TYPE.Tracks, this.tracks.length)
                .then(res => {
                    if (res.code === SUCC_CODE && res.result.songs.length > 0) {
                        this._normalizeTracks(res.result.songs)
                        this.searchMore = false
                        this.$refs.suggestList.isLoading = false
                    }
                })
            }
        },
        _normalizeTracks (songs) {
            songs.map(song => {
                this.tracks.push(createSearchedTrack(song))
            })
        }
    },
    watch: {
        query (newQuery) {
            this.search(newQuery)
        }
    }
}
</script>

<style lang="scss" scoped>
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }
    .slide-enter, .slide-leave-to {
        transform: translateX(100vw)
    }
    .search-wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 110;
        background: white;
    }
</style>
