<template>
    <div class="music-list-wrap">
        <div class="nav" ref="nav">
            <span class="nav-left" @click="goBack"><i class="material-icons">arrow_back_ios</i></span>
            <span class="nav-center">{{ title }}</span>
        </div>
        <scroll :data="tracks" class="list-content" ref="scroll"
        :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">
            <div>
                <div class="bg-img" :style="setBgImage" ref="bgImg"></div>
                <div class="bg-filter"></div>
                <div class="track-list">
                    <div class="randomRow" v-show="tracks.length > 0" @click="random"><span><i class="material-icons">play_circle_outline</i>随机播放</span></div>
                    <ul>
                        <li v-for="(track, index) in tracks" :key="track.id" @click="onClickTrack(track, index)">
                            <div class="track-num">{{ index + 1 }}</div>
                            <div class="track-info">
                                <p class="track-name">{{ track.name }}</p>
                                <p class="track-desc">{{ track.artist }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll'
import {mapActions} from 'vuex'
export default {
    props: {
        title: {
            type: String,
            default () {
                return ''
            }
        },
        bgImage: {
            type: String,
            default () {
                return ``
            }
        },
        tracks: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            probeType: 3,
            listenScroll: true,
            scrollY: -1,
            imgHeight: 0
        }
    },
    components: {
        Scroll
    },
    computed: {
        setBgImage () {
            return `background-image: url(${this.bgImage})`
        }
    },
    mounted () {
        this.imgHeight = this.$refs.bgImg.clientHeight
    },
    methods: {
        ...mapActions(['selectPlay', 'randomPlay']),
        goBack () {
            this.$router.go(-1)
        },
        scroll (pos) {
            this.scrollY = pos.y
        },
        onClickTrack (track, index) {
            this.selectPlay({
                list: this.tracks,
                index
            })
        },
        random () {
            this.randomPlay({
                list: this.tracks
            })
        }
    },
    watch: {
        scrollY (newY) {
            let scrollPercent = -(newY / this.imgHeight)
            this.$refs.nav.style.background = `rgba(38, 38, 38, ${scrollPercent})`
        }
    }
}
</script>

<style lang="scss" scoped>
    .music-list-wrap {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100vw;
        z-index: 100;
        background: white;
        .nav {
            z-index: 120;
            position: fixed;
            height: 45px;
            width: 100vw;
            line-height: 45px;
            text-align: center;
            color: white;
            .nav-left {
                z-index: 120;
                position: absolute;
                left: 0;
                padding: 0 20px;
                i {
                    vertical-align: middle !important;
                }
            }
            .nav-center {
                position: absolute;
                left: 0;
                right: 0;
            }
        }
        .list-content {
            height: 100%;
            overflow: hidden;
            .bg-img {
                height: 40vh;
                width: 100vw;
                background-position: 0 30%;
                background-size: cover;
                position: relative;
            }
            .bg-filter {
                top:0;
                z-index: 110;
                position: fixed;
                height: 40vh;
                width: 100vw;
                background: black;
                opacity: 0.2;
            }
            .track-list {
                position: relative;
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
                            width: 70px;
                            text-align: center;
                        }
                        .track-info {
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
                    }
                }
            }
        }
    }
</style>
