<template>
    <div class="suggest-list-wrap" ref="suggestList">
        <scroll class="scroll" :data="tracks" :pullup="pullup" @scrollToEnd="loadMore" ref="scroll">
            <div>
                <p class="suggest-title">最佳匹配</p>
                <ul class="suggest-list">
                    <li v-for="(track, index) in tracks" :key="index" class="list-row" @click="selectTrack(track)">
                        <p class="track-name">{{ track.name }}</p>
                        <p class="track-artist">{{ track.artist }}</p>
                    </li>
                </ul>
                <loading v-show="searchMore"></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll'
import Loading from 'base/loading'
import {mapGetters, mapActions} from 'vuex'
import {searchTrackDetailById} from 'api/search'
import {SUCC_CODE} from 'api/config'
import {playListMixin} from 'common/js/mixin'
export default {
    mixins: [playListMixin],
    data () {
        return {
            pullup: true,
            isLoading: false
        }
    },
    props: {
        tracks: {
            type: Array,
            default () {
                return []
            }
        },
        searchMore: {
            type: Boolean,
            default () {
                return false
            }
        }
    },
    components: {
        Scroll,
        Loading
    },
    computed: {
        ...mapGetters(['getPlayList', 'getSequenceList'])
    },
    methods: {
        ...mapActions(['selectPlay', 'selectExistedTrack']),
        loadMore () {
            if (this.isLoading === false) {
                this.$emit('loadMore')
                this.isLoading = true
            }
        },
        selectTrack (track) {
            searchTrackDetailById(track.id)
            .then(res => {
                if (res.code === SUCC_CODE) {
                    let img = res.songs[0].al.picUrl
                    track.image = img
                }
            })
            .then(() => {
                if (this.getPlayList.length === 0) { // If play list is empty
                    this.selectPlay({
                        list: [track],
                        index: 0
                    })
                } else if (this.getPlayList.find(t => t.id === track.id)) { // if this track already existed in the play list
                    let existedIndex = this.getPlayList.findIndex(t => t.id === track.id)
                    this.selectExistedTrack({
                        index: existedIndex
                    })
                } else { // Insert this track to the play list end
                    let seqList = this.getSequenceList.concat()
                    seqList.push(track)
                    let newIndex = seqList.length - 1
                    this.selectPlay({
                        list: seqList,
                        index: newIndex
                    })
                }
            })
            .catch(err => console.log(err))
        },
        handlePlaylist (playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.suggestList.style.bottom = bottom
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style lang="scss" scoped>
    .suggest-list-wrap {
        position: fixed;
        top: 60px;
        bottom: 0;
        width: 100vw;
        .scroll {
            height: 100%;
            overflow: hidden;
            .suggest-title {
                font-size: 0.7rem;
                padding: 10px 10px;
                color: gray;
            }
            .suggest-list {
                display: flex;
                flex-flow: column nowrap;
                .list-row {
                    border-bottom: 1px solid #F0F0F0;
                    padding: 10px 20px;
                    line-height: 20px;
                    .track-name {
                        padding-top: 1px;
                    }
                    .track-artist {
                        font-size: 0.8rem;
                        color: gray;
                    }
                }
            }
        }
    }
</style>
