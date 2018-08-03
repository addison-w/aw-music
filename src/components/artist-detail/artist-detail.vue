<template>
    <transition name="slide">
        <music-list :bgImage="GET_ARTIST.imgUrl" :title="GET_ARTIST.name" ></music-list>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getArtistDetail} from 'api/artist'
import {SUCC_CODE} from 'api/config'
import {createSong} from 'model/Song'
import MusicList from 'components/music-list/music-list'

export default {
    data () {
        return {
            songs: []
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
                    this._normalizeSong(res.hotSongs)
                }
                console.log(this.songs)
            })
            .catch(err => console.log(err))
        },
        _normalizeSong (tracks) {
            tracks.forEach(track => {
                this.songs.push(createSong(track))
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
