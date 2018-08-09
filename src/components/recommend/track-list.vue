<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :tracks="tracks"></music-list>
    </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {createTrack} from 'model/Track'
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            title: '',
            bgImage: '',
            tracks: []
        }
    },
    components: {
        MusicList
    },
    created () {
        this._initTrackList()
    },
    computed: {
        ...mapGetters(['GET_TRACK_LIST'])
    },
    methods: {
        _initTrackList () {
            if (!this.GET_TRACK_LIST.id) {
                this.$router.push({
                    path: '/recommend'
                })
            }
            this.title = this.GET_TRACK_LIST.name
            this.bgImage = this.GET_TRACK_LIST.coverImgUrl
            this._normalizeTracks(this.GET_TRACK_LIST.tracks)
        },
        _normalizeTracks (tracks) {
            tracks.map(track => {
                this.tracks.push(createTrack(track))
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }
    .slide-enter, .slide-leave-to {
        transform: translateX(100vw);
    }
</style>
