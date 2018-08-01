<template>
    <div class="rank-wrap">
        <scroll :data="rankList" class="rank-content">
            <div>
                <div class="rank-row" v-for="rank in rankList" :key="rank.id">
                    <img :src="rank.coverImgUrl" alt="">
                    <ul>
                        <li v-for="(track, index) in rank.tracks.slice(0 , 3)" :key="track.id">
                            <span>{{++index}}. {{track.name}} - {{track.ar.map(a => a.name).join("/")}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import {getAllRankList} from 'api/rank'
import {SUCC_CODE} from 'api/config'
import Scroll from 'base/scroll'
export default {
    data () {
        return {
            rankList: []
        }
    },
    components: {
        Scroll
    },
    created () {
        this._getAllRankList()
    },
    methods: {
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
