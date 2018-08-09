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
    computed: {
        ...mapGetters(['GET_RANK'])
    },
    created () {
        this._initRankDetail()
    },
    methods: {
        _initRankDetail () {
            if (!this.GET_RANK.id) {
                this.$router.push({
                    path: '/rank'
                })
                return
            }
            this.title = this.GET_RANK.name
            this.bgImage = this.GET_RANK.coverImgUrl
            this._normailizeTracks(this.GET_RANK.tracks)
        },
        _normailizeTracks (tracks) {
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
