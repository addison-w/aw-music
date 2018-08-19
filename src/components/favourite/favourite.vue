<template>
    <transition name="slide">
        <div class="favourite-wrap">
            <nav>
                <span class="nav-left" @click="goBack"><i class="material-icons">arrow_back_ios</i></span>
                <span class="nav-center">我的收藏</span>
            </nav>
            <div class="list-content" ref="listContent">
                <scroll class="scroll" ref="scroll" :data="getFavouriteList">
                    <div>
                        <div class="randomRow" v-show="getFavouriteList.length > 0" @click="random">
                            <span><i class="material-icons">play_circle_outline</i>随机播放</span>
                            <span class="bin" @click.stop="clearFavList">
                                <i class="material-icons">delete</i>
                            </span>
                        </div>
                        <ul>
                            <li v-for="(track, index) in getFavouriteList" :key="track.id" @click="onClickTrack(track, index)">
                                <div class="track-num">{{ index + 1 }}</div>
                                <div class="track-info">
                                    <p class="track-name">{{ track.name }}</p>
                                    <p class="track-desc">{{ track.artist }}</p>
                                </div>
                                <div class="remove-icon" @click.stop="removeFavTrack(track)">
                                    <i class="material-icons">close</i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </scroll>
            </div>
        </div>
    </transition>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Scroll from 'base/scroll'
import {playListMixin} from 'common/js/mixin'
export default {
    mixins: [playListMixin],
    components: {
        Scroll
    },
    computed: {
        ...mapGetters(['getFavouriteList', 'getPlayList'])
    },
    methods: {
        ...mapActions(['selectPlay', 'toggleFavouriteTrack', 'removeTrack', 'randomPlay', 'clearFavouriteList']),
        handlePlaylist (playList) {
            const bottom = playList.length > 0 ? '60px' : ''
            this.$refs.listContent.style.bottom = bottom
            this.$refs.scroll.refresh()
        },
        onClickTrack (track, index) {
            this.selectPlay({
                list: this.getFavouriteList,
                index
            })
        },
        removeFavTrack (track) {
            this.toggleFavouriteTrack({
                track: track
            })
            if (this.getPlayList.includes(track)) {
                this.removeTrack({
                    track: track
                })
            }
        },
        random () {
            this.randomPlay({
                list: this.getFavouriteList
            })
        },
        clearFavList () {
            this.clearFavouriteList()
        },
        goBack () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s
    }
    .slide-enter, .slide-leave-to {
        transform: translateX(-100vw)
    }
    .favourite-wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 110;
        background: white;
        nav {
            position: absolute;
            height: 45px;
            line-height: 45px;
            width: 100vw;
            text-align:center;
            border-bottom: 1px solid black;
            .nav-left {
                position: absolute;
                left: 20px;
                i {
                    vertical-align: middle !important;
                }
            }
        }
        .list-content {
            position: fixed;
            top: 45px;
            bottom: 0;
            width: 100vw;
            .scroll {
                height: 100%;
                overflow: hidden;
                .randomRow {
                    width: 100vw;
                    height: 50px;
                    border-bottom: 1px solid #F0F0F0;
                    line-height: 50px;
                    span {
                        padding: 0 25px;
                        .material-icons {
                            vertical-align: middle !important;
                            font-size: 25px;
                            padding-right: 10px;
                        }
                    }
                    .bin {
                        padding-right: 5px;
                        float: right;
                    }
                }
                ul {
                    display: flex;
                    flex-flow: column nowrap;
                    li {
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: center;
                        border-bottom: 1px solid #F0F0F0;
                        padding: 10px 0;
                        .track-num {
                            flex-basis: 70px;
                            text-align: center;
                        }
                        .track-info {
                            flex: 1;
                            p {
                                padding: 5px;
                                font-size: 0.9rem;
                                &.track-name {
                                    overflow: hidden;
                                    white-space: nowrap;
                                    width: 65vw;
                                    display: block;
                                    text-overflow: ellipsis;
                                }
                                &.track-desc {
                                    color: gray;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    width: 65vw;
                                    display: block;
                                    text-overflow: ellipsis;
                                }
                            }
                        }
                        .remove-icon {
                            flex-basis: 40px;
                        }
                    }
                }
            }
        }
    }
</style>
