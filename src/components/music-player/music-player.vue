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
            <transition name="fade">
                <div class="first-middle" v-show="showFirstMiddle">
                    <div class="middle">
                        <div class="cd" @click="toggleMiddleScreen">
                            <img :class="rotateClass" :src="this.getCurrentTrack.image" alt="">
                        </div>
                    </div>
                    <div class="first-middle-lyric" @click="toggleMiddleScreen">
                        <p v-if="currentLyricText">{{currentLyricText}}</p>
                    </div>
                    <div class="progress-bar-wrap">
                        <span>{{formatTime(currentTime)}}</span>
                        <progress-bar class="progress-bar" :percent="progressPercent" @adjustPercent="onAdjustPercent"></progress-bar>
                        <span>{{formatTime(duration)}}</span>
                    </div>
                </div>
            </transition>
            <transition name="fade">
                <div class="second-middle" v-show="!showFirstMiddle" @click="toggleMiddleScreen">
                    <scroll class="lyric-wrap" ref="lyricList" :data="currentLyric && currentLyric.lines">
                        <div>
                            <div v-if="currentLyric">
                                <p class="lyric-row" ref="lyricLine" :class="{'current-line' : currentLine === index}"
                                v-for="(line, index) in currentLyric.lines" :key="index">
                                    {{line.txt}}
                                </p>
                            </div>
                        </div>
                    </scroll>
                </div>
            </transition>
            <div class="bottom">
                <div class="mode-switch" @click="switchPlayMode"><i class="material-icons">{{playModeIcon}}</i></div>
                <div class="prev-track" @click="prev"><i class="material-icons">skip_previous</i></div>
                <div class="play-btn" @click="togglePlay"><i class="material-icons">{{playIconToggle}}</i></div>
                <div class="next-track" @click="next"><i class="material-icons">skip_next</i></div>
                <div class="fav-toggle" @click="toggleFav"><i class="material-icons">{{favIcon}}</i></div>
            </div>
        </div>
        <transition name="mini">
            <div class="mini-player" v-show="!getFullScreen && !showPlayList" @click="toggleFullScreen">
                <div class="mini-cd">
                    <img :src="this.getCurrentTrack.image" alt="" :class="rotateClass">
                </div>
                <div class="footer-info">
                    <p class="footer-track-name">{{editedTrackName()}}</p>
                    <p class="footer-artist-name">{{editedArtistName()}}</p>
                </div>
                <div class="footer-play-btn" @click.stop="togglePlay"><i class="material-icons">{{playIconToggle}}</i></div>
                <div class="footer-list-btn" @click.stop="toggleShowPlayList"><i class="material-icons">queue_music</i></div>
            </div>
        </transition>
        <play-list ref="playList" v-show="showPlayList" @hidePlayList="toggleShowPlayList"></play-list>
        <audio ref="audio" :src="getCurrentMusicUrl" @timeupdate="updateTime" @playing="updateDuration" @ended="end"></audio>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import ProgressBar from 'base/progress-bar'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/utils'
import {getLyrics, getMusicUrl} from 'api/player'
import {SUCC_CODE} from 'api/config'
import Lyric from 'lyric-parser'
import Scroll from 'base/scroll'
import PlayList from 'components/play-list/play-list'
export default {
    data () {
        return {
            musicUrl: '',
            rotateClass: '',
            currentTime: 0,
            duration: 0,
            currentLyric: null,
            currentLine: 0,
            showFirstMiddle: true,
            currentLyricText: '',
            currentLyricLineNum: 0,
            showPlayList: false
        }
    },
    components: {
        ProgressBar,
        Scroll,
        PlayList
    },
    computed: {
        ...mapGetters(['getPlayList', 'getFullScreen', 'getCurrentTrack', 'getPlaying', 'getCurrentIndex', 'getPlayMode', 'getSequenceList', 'getCurrentMusicUrl', 'getFavouriteList']),
        playIconToggle () {
            return this.getPlaying ? 'pause_circle_outline' : 'play_circle_outline'
        },
        progressPercent () {
            return this.currentTime / this.duration
        },
        playModeIcon () {
            return this.getPlayMode === playMode.sequence ? 'repeat' : this.getPlayMode === playMode.loop ? 'repeat_one' : 'shuffle'
        },
        favIcon () {
            return this.getFavouriteList.includes(this.getCurrentTrack) ? 'favorite' : 'favorite_border'
        }
    },
    methods: {
        ...mapActions(['toggleFavouriteTrack']),
        ...mapMutations(['SET_FULLSCREEN', 'SET_PLAYING', 'SET_CURRENT_INDEX', 'SET_PLAY_MODE', 'SET_PLAY_LIST', 'SET_CURRENT_MUSIC_URL']),
        toggleFav () {
            if (this.getCurrentTrack.id) {
                this.toggleFavouriteTrack({
                    track: this.getCurrentTrack
                })
            }
        },
        toggleShowPlayList () {
            this.showPlayList = !this.showPlayList
            if (this.showPlayList) {
                setTimeout(() => {
                    this.$refs.playList.$refs.scroll.refresh()
                    this.$refs.playList.$refs.scroll.scrollToElement(this.$refs.playList.$refs.listItem[this.getCurrentIndex])
                }, 20)
            }
        },
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
        editedAudioUrl () {
            return this.getCurrentTrack.url || ''
        },
        togglePlay () {
            this.SET_PLAYING(!this.getPlaying)
            if (this.currentLyric) {
                this.currentLyric.togglePlay()
            }
        },
        next () {
            if (this.getPlayList.length === 1) {
                this.loop()
            }

            let newIndex = this.getCurrentIndex + 1
            if (this.getPlayList.length === newIndex) {
                newIndex = 0
            }
            this.SET_CURRENT_INDEX(newIndex)
        },
        prev () {
            if (this.getPlayList.length === 1) {
                this.loop()
            }

            let newIndex = this.getCurrentIndex - 1
            if (newIndex === -1) {
                newIndex = this.getPlayList.length - 1
            }
            this.SET_CURRENT_INDEX(newIndex)
        },
        end () {
            if (this.getPlayMode === playMode.loop) {
                this.loop()
            } else {
                this.next()
            }
        },
        loop () {
            let audio = this.$refs.audio
            audio.currentTime = 0
            audio.play()
            if (this.currentLyric) {
                this.currentLyric.seek(0)
            }
        },
        updateDuration (e) {
            this.duration = e.target.duration
            if (this.currentLyric && e.target.currentTime === 0) {
                this.currentLyric.play()
            }
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
        },
        onAdjustPercent (adjustedPercent) {
            const currentTime = adjustedPercent * this.duration
            this.$refs.audio.currentTime = currentTime
            if (!this.getPlaying) {
                this.togglePlay()
            }
            if (this.currentLyric) {
                this.currentLyric.seek(currentTime * 1000)
            }
        },
        switchPlayMode () {
            const mode = (this.getPlayMode + 1) % 3
            this.SET_PLAY_MODE(mode)
            let list = []
            if (mode === playMode.random) {
                list = shuffle(this.getSequenceList)
                this.resetCurrentIndex(list)
                this.SET_PLAY_LIST(list)
            }
        },
        resetCurrentIndex (list) {
            let index = list.findIndex((item) => {
                return item.id === this.getCurrentTrack.id
            })
            this.SET_CURRENT_INDEX(index)
        },
        toggleMiddleScreen () {
            this.showFirstMiddle = !this.showFirstMiddle
            if (this.currentLyric && !this.showFirstMiddle) {
                this.$nextTick(() => {
                    this.$refs.lyricList.refresh()

                    let lineNum = this.currentLyricLineNum
                    this.currentLine = lineNum
                    if (lineNum > 5) {
                        let lineElement = this.$refs.lyricLine[lineNum - 5]
                        this.$refs.lyricList.scrollToElement(lineElement, 1000)
                    } else {
                        this.$refs.lyricList.scrollTo(0, 0, 1000)
                    }
                })
            }
        },
        handleLyric ({lineNum, txt}) {
            this.currentLine = lineNum
            if (lineNum > 5) {
                let lineElement = this.$refs.lyricLine[lineNum - 5]
                this.$refs.lyricList.scrollToElement(lineElement, 1000)
            } else {
                this.$refs.lyricList.scrollTo(0, 0, 1000)
            }
            this.currentLyricText = txt
            this.currentLyricLineNum = lineNum
        }
    },
    watch: {
        getCurrentTrack (newTrack, oldTrack) {
            if (newTrack.id === oldTrack.id) {
                return
            }
            if (this.currentLyric) {
                this.currentLyric.stop()
                this.currentLyricText = ''
                this.currentLyricLineNum = 0
            }
            getMusicUrl(newTrack.id).then(url => {
                this.SET_CURRENT_MUSIC_URL(url)
                this.$nextTick(() => {
                    getLyrics(newTrack.id)
                    .then(res => {
                        if (res.code === SUCC_CODE && res.lrc) {
                            this.currentLyric = new Lyric(res.lrc.lyric, this.handleLyric)
                        } else {
                            this.currentLyric = null
                            this.currentLyricText = ''
                            this.currentLine = 0
                        }
                    })
                    this.SET_PLAYING(true)
                    let audio = this.$refs.audio
                    audio.play()
                })
            })
            .catch(err => console.log(err))
        },
        getPlaying (newPlaying) {
            this.$nextTick(() => {
                let audio = this.$refs.audio
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
        z-index: 150;
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
        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
        .first-middle {
            .middle {
                position: fixed;
                top: 47%;
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
                        height: 100%;
                        &.play {
                            animation: rotate 10s linear infinite
                        }
                        &.pause {
                            animation-play-state: paused
                        }
                    }
                }
            }
        }
        .second-middle {
            position: fixed;
            top: 60px;
            bottom: 110px;
            width: 100vw;
            .lyric-wrap {
                height: 100%;
                overflow: hidden;
                p {
                    line-height: 50px;
                    text-align: center;
                }
                p.current-line {
                    color: #d44439;
                }
            }
        }
        .first-middle-lyric {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            width: 90vw;
            overflow: hidden;
            bottom: 27vh;
            p {
                width: 100%;
                text-align: center;
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
            height: 70px;
            bottom: 25px;
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
        z-index: 150;
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
