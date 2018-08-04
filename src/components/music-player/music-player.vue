<template>
    <div class="music-player-wrap" v-show="getPlayList.length > 0">
        <div class="main-player" v-show="getFullScreen">
            <div class="top">
                <div class="down-arrow" @click="toggleFullScreen"><i class="material-icons">expand_more</i></div>
                <div class="header-info">
                    <p class="header-track-name">{{editedTrackName()}}</p>
                    <p class="header-artist-name">{{editedArtistName()}}</p>
                </div>
            </div>
            <div class="middle">
                <div class="cd">
                    <img class="cd-image" :src="this.getCurrentTrack.image" alt="">
                </div>
            </div>
            <div class="bottom">
                <div class="mode-switch"><i class="material-icons">repeat</i></div>
                <div class="prev-track"><i class="material-icons">skip_previous</i></div>
                <div class="play-btn"><i class="material-icons">play_circle_outline</i></div>
                <div class="next-track"><i class="material-icons">skip_next</i></div>
                <div class="fav-toggle"><i class="material-icons">favorite_border</i></div>
            </div>
        </div>
        <div class="mini-player" v-show="!getFullScreen" @click="toggleFullScreen">
            <div class="mini-cd">
                <img :src="this.getCurrentTrack.image" alt="" class="mini-cd-img">
            </div>
            <div class="footer-info">
                <p class="footer-track-name">{{editedTrackName()}}</p>
                <p class="footer-artist-name">{{editedArtistName()}}</p>
            </div>
            <div class="footer-play-btn"><i class="material-icons">play_circle_outline</i></div>
            <div class="footer-list-btn"><i class="material-icons">queue_music</i></div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    computed: {
        ...mapGetters(['getPlayList', 'getFullScreen', 'getCurrentTrack'])
    },
    methods: {
        ...mapMutations(['SET_FULLSCREEN']),
        toggleFullScreen () {
            this.SET_FULLSCREEN(!this.getFullScreen)
        },
        editedTrackName () {
            let name = this.getCurrentTrack.name || ''
            return name.length > 20 ? name.substr(0, 20) + '...' : name
        },
        editedArtistName () {
            let name = this.getCurrentTrack.artist || ''
            return name.length > 10 ? name.substr(0, 10) + '...' : name
        }
    }
}
</script>

<style lang="scss" scoped>
    .main-player {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        .top {
            position: fixed;
            height: 50px;
            width: 100vw;
            text-align: center;
            position: relative;
            .down-arrow {
                z-index: 120;
                position: fixed;
                float: left;
                line-height: 50px;
                padding: 0 20px;
                i {
                    vertical-align: middle;
                }
            }
            .header-info {
                position: absolute;
                left: 0;
                right: 0;
                .header-track-name {
                    line-height: 35px;
                }
                .header-artist-name {
                    line-height: 12px;
                    font-size: 0.8rem;
                    color: lightgray;
                }
            }
        }
        .middle {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -65%);
            .cd {
                width: 75vw;
                height: 75vw;
                border: 12px solid lightgray;
                border-radius: 50%;
                overflow: hidden;
                .cd-image {
                    width: 100%;
                }
            }
        }
        .bottom {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            bottom: 40px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            width: 90vw;
            .material-icons {
                font-size: 40px;
            }
            .play-btn {
                .material-icons {
                    font-size: 60px;
                }
            }
        }
    }
    .mini-player {
        position: fixed;
        height: 60px;
        width: 100vw;
        bottom: 0;
        background: #F0F0F0;
        display: flex;
        align-items: center;
        .mini-cd {
            margin: 0 20px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            overflow: hidden;
            .mini-cd-img {
                width: 100%;
            }
        }
        .footer-info {
            flex: 1;
            display: flex;
            flex-flow: column nowrap;
            .footer-track-name {
                font-size: 0.8rem;
                line-height: 15px;
            }
            .footer-artist-name {
                font-size: 0.7rem;
                line-height: 15px;
            }
        }
        .material-icons {
            font-size: 40px;
        }
        .footer-play-btn {
            margin: 0 5px;
        }
        .footer-list-btn {
            margin-left: 10px;
            margin-right: 20px;
        }
    }
</style>
