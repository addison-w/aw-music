<template>
    <div class="suggest-list-wrap">
        <scroll class="scroll" :data="tracks" :pullup="pullup" @scrollToEnd="loadMore">
            <div>
                <p class="suggest-title">最佳匹配</p>
                <ul class="suggest-list">
                    <li v-for="track in tracks" :key="track.id" class="list-row" @click="selectTrack(track)">
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
export default {
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
    methods: {
        loadMore () {
            if (this.isLoading === false) {
                this.$emit('loadMore')
                this.isLoading = true
            }
        },
        selectTrack (track) {

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
