<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :tracks="tracks"></music-list>
    </transition>
</template>

<script>
import {getTrackListById} from 'api/recommend'
import {SUCC_CODE} from 'api/config'
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
            let id = this.GET_TRACK_LIST.id
            getTrackListById(id).then(res => {
                if (res.code === SUCC_CODE) {
                    this.title = res.playlist.name
                    this.bgImage = res.playlist.coverImgUrl
                    this._normalizeTracks(res.playlist.tracks)
                }
            })
            .catch(err => console.log(err))
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
