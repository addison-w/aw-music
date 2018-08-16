<template>
    <div class="play-list-wrap" @click.stop="hidePlayList">
        <div class="play-list-container">
            <scroll class="scroll" ref="scroll" :data="getPlayList">
                <ul>
                    <li v-for="track in getPlayList" :key="track.id" 
                    @click.stop="selectTrack(track)" 
                    :class="{'current-playing' : getCurrentTrack.id === track.id }"
                    ref="listItem">
                        <span class="track-name">{{ track.name }} - {{ track.artist }}</span>
                        <span class="close-icon"><i class="material-icons">close</i></span>
                    </li>
                </ul>
            </scroll>
            <div class="play-list-bottom">
                <p>关闭</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Scroll from 'base/scroll'
export default {
    components: {
        Scroll
    },
    computed: {
        ...mapGetters(['getPlayList', 'getCurrentTrack'])
    },
    methods: {
        ...mapActions(['selectExistedTrack']),
        hidePlayList () {
            this.$emit('hidePlayList')
        },
        selectTrack (track) {
            let index = this.getPlayList.findIndex(t => t.id === track.id)
            this.selectExistedTrack({
                index: index,
                fullscreen: false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .play-list-wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 160;
        .play-list-container {
            position: absolute;
            width: 100vw;
            background: white;
            max-height: 300px;
            bottom: 0;
            z-index: 180;
            .scroll {
                position: relative;
                max-height: 250px;
                overflow: hidden;
                ul {
                    li {
                        line-height: 25px;
                        padding: 10px 20px;
                        font-size: 0.8rem;
                        width: 90vw;
                        display: flex;
                        align-items: center;
                        .track-name {
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            flex: 1;
                        }
                        .material-icons {
                            font-size: 20px;
                            vertical-align: middle;
                        }
                    }
                }
                .current-playing {
                    color: #d44439;
                }
            }
            .play-list-bottom {
                box-sizing: border-box;
                position: relative;
                bottom: 0;
                height: 50px;
                width: 100vw;
                line-height: 50px;
                text-align: center;
                background: white;
                border-top: 1px solid #F0F0F0;
            }
        }
    }
</style>
