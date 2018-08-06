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
                    <img :class="rotateClass" :src="this.getCurrentTrack.image" alt="">
                </div>
            </div>
            <div class="progress-bar-wrap">
                <span>{{formatTime(currentTime)}}</span>
                <progress-bar class="progress-bar" :percent="progressPercent"></progress-bar>
                <span>{{formatTime(duration)}}</span>
            </div>
            <div class="bottom">
                <div class="mode-switch"><i class="material-icons">repeat</i></div>
                <div class="prev-track" @click="prev"><i class="material-icons">skip_previous</i></div>
                <div class="play-btn" @click="togglePlay"><i class="material-icons">{{playIconToggle}}</i></div>
                <div class="next-track" @click="next"><i class="material-icons">skip_next</i></div>
                <div class="fav-toggle"><i class="material-icons">favorite_border</i></div>
            </div>
        </div>
        <transition name="mini">
            <div class="mini-player" v-show="!getFullScreen" @click="toggleFullScreen">
                <div class="mini-cd">
                    <img :src="this.getCurrentTrack.image" alt="" :class="rotateClass">
                </div>
                <div class="footer-info">
                    <p class="footer-track-name">{{editedTrackName()}}</p>
                    <p class="footer-artist-name">{{editedArtistName()}}</p>
                </div>
                <div class="footer-play-btn" @click.stop="togglePlay"><i class="material-icons">{{playIconToggle}}</i></div>
                <div class="footer-list-btn"><i class="material-icons">queue_music</i></div>
            </div>
        </transition>
        <audio ref="audio" :src="musicUrl" @timeupdate="updateTime" @playing="updateDuration"></audio>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {getMusicUrl} from 'api/player'
import ProgressBar from 'base/progress-bar'
export default {
    data () {
        return {
            musicUrl: '',
            rotateClass: '',
            currentTime: 0,
            duration: 0
        }
    },
    components: {
        ProgressBar
    },
    computed: {
        ...mapGetters(['getPlayList', 'getFullScreen', 'getCurrentTrack', 'getPlaying', 'getCurrentIndex']),
        playIconToggle () {
            return this.getPlaying ? 'pause_circle_outline' : 'play_circle_outline'
        },
        progressPercent () {
            return this.currentTime / this.duration
        }
    },
    methods: {
        ...mapMutations(['SET_FULLSCREEN', 'SET_PLAYING', 'SET_CURRENT_INDEX']),
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
        },
        togglePlay () {
            this.SET_PLAYING(!this.getPlaying)
        },
        next () {
            let newIndex = this.getCurrentIndex + 1
            if (this.getPlayList.length === newIndex) {
                newIndex = 0
            }
            this.SET_CURRENT_INDEX(newIndex)
        },
        prev () {
            let newIndex = this.getCurrentIndex - 1
            if (newIndex === -1) {
                newIndex = this.getPlayList.length - 1
            }
            this.SET_CURRENT_INDEX(newIndex)
        },
        updateDuration (e) {
            this.duration = e.target.duration
        },
        updateTime (e) {
            this.currentTime = e.target.currentTime
        },
        formatTime (interval) {
            interval = interval | 0
            let minutes = interval / 60 | 0
            let seconds = this._pad(interval % 60)
            return `${minutes}:${seconds}`
        },
        _pad (num, n = 2) {
            if (num.toString().length < n) {
                return `0${num}`
            }
            return num
        }
    },
    watch: {
        getCurrentTrack (newTrack) {
            if (newTrack) {
                let audio = this.$refs.audio
                this.duration = 0
                audio.pause()
                getMusicUrl(newTrack.id).then(res => {
                    this.musicUrl = res
                    this.SET_PLAYING(true)
                    this.$nextTick(() => {
                        audio.play()
                    })
                })
                .catch(err => console.log(err))
            }
        },
        getPlaying (newPlaying) {
            let audio = this.$refs.audio
            this.$nextTick(() => {
                newPlaying ? audio.play() : audio.pause()
                this.rotateClass = newPlaying ? 'play' : 'play pause'
            })
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
            transform: translate(-50%, -70%);
            .cd {
                width: 75vw;
                height: 75vw;
                border: 12px solid lightgray;
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 100%;
                    &.play {
                        animation: rotate 10s linear infinite
                    }
                    &.pause {
                        animation-play-state: paused
                    }
                }
            }
        }
        .progress-bar-wrap {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            width: 85vw;
            bottom: 18vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .progress-bar {
                flex: 1
            }
            span {
                font-size: 0.8rem;
                margin: 10px;
            }
        }
        .bottom {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            bottom: 30px;
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
        &.mini-enter-active, &.mini-leave-active {
            transition: all 0.2s ease;
        }
        &.mini-enter, &.mini-leave-to {
            transform: translateY(-10vh);
            opacity: 0;
        }
        .mini-cd {
            margin: 0 20px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                &.play {
                    animation: rotate 10s linear infinite
                }
                &.pause {
                    animation-play-state: paused
                }
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
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
