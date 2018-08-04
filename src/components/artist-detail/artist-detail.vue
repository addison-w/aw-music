<template>
    <transition name="slide">
        <music-list :bgImage="GET_ARTIST.imgUrl" :title="GET_ARTIST.name" :tracks="tracks"></music-list>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getArtistDetail} from 'api/artist'
import {SUCC_CODE} from 'api/config'
import {createTrack} from 'model/Track'
import MusicList from 'components/music-list/music-list'

export default {
    data () {
        return {
            tracks: []
        }
    },
    components: {
        MusicList
    },
    created () {
        this._getArtistDetails()
    },
    computed: {
        ...mapGetters(['GET_ARTIST'])
    },
    methods: {
        _getArtistDetails () {
            if (!this.GET_ARTIST.id) {
                this.$router.push({
                    path: '/artist'
                })
                return
            }
            getArtistDetail(this.GET_ARTIST.id)
            .then(res => {
                if (res.code === SUCC_CODE) {
                    this._normalizeTrack(res.hotSongs)
                }
                console.log(this.tracks)
            })
            .catch(err => console.log(err))
        },
        _normalizeTrack (tracks) {
            tracks.forEach(track => {
                this.tracks.push(createTrack(track))
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .slide-enter-active,.slide-leave-active {
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to {
        transform: translate3d(100%, 0, 0)
    }
</style>
