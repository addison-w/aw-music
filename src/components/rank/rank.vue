<template>
    <div class="rank-wrap" ref="rank">
        <scroll :data="rankList" class="rank-content" ref="scroll">
            <div>
                <div class="rank-row" v-for="rank in rankList" :key="rank.id" @click="selectRank(rank)">
                    <img :src="rank.coverImgUrl" alt="">
                    <ul>
                        <li v-for="(track, index) in rank.tracks.slice(0 , 3)" :key="track.id">
                            <span>{{++index}}. {{track.name}} - {{track.ar.map(a => a.name).join("/")}}</span>
                        </li>
                    </ul>
                </div>
                <loading v-show="!rankList.length"></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
import {getAllRankList} from 'api/rank'
import {SUCC_CODE} from 'api/config'
import Scroll from 'base/scroll'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
import Loading from 'base/loading'
export default {
    mixins: [playListMixin],
    data () {
        return {
            rankList: []
        }
    },
    components: {
        Scroll,
        Loading
    },
    created () {
        this._getAllRankList()
    },
    methods: {
        ...mapMutations(['SET_RANK']),
        handlePlaylist (playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.rank.style.bottom = bottom
            this.$refs.scroll.refresh()
        },
        _getAllRankList () {
            getAllRankList().then(res => {
                res.map(rank => {
                    if (rank.code === SUCC_CODE) {
                        this.rankList.push({
                            id: rank.playlist.id,
                            name: rank.playlist.name,
                            coverImgUrl: rank.playlist.coverImgUrl,
                            tracks: rank.playlist.tracks
                        })
                    }
                })
            })
        },
        selectRank (rank) {
            this.SET_RANK(rank)
            this.$router.push({
                path: `rank/${rank.id}`
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .rank-wrap {
        width: 100%;
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 90px;
        bottom: 0;
        .rank-content{
            height: 100%;
            overflow: hidden;
            .rank-row {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 5px 10px;
                border-bottom: 1px solid lightgray;
                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 6px;
                }
                ul {
                    margin-left: 15px;
                    span {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        width: 60vw;
                        display: block;
                        line-height: 25px;
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
</style>
