<template>
    <div class="music-list-wrap">
        <div class="nav">
            <span class="nav-left" @click="goBack">&lt;</span>
            <span class="nav-center">{{ title }}</span>
        </div>
        <scroll :data="tracks" class="list-content" ref="scroll" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll">
            <div>
                <!-- <img class="cover-image" :src="bgImage" alt=""> -->
                <div class="bg-img" :style="setBgImage" ref="bgImg"></div>
                <div class="bg-filter"></div>
                <div class="track-list">
                    <ul>
                        <li v-for="(track, index) in tracks" :key="track.id">
                            <div class="track-num">{{ ++index }}</div>
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
            scrollY: -1
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
    methods: {
        goBack () {
            this.$router.go(-1)
        },
        scroll (pos) {
            this.scrollY = pos.y
        }
    },
    watch: {
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
