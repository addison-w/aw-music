<template>
    <transition name="slide">
        <div class="artist-detail-wrap">
        </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getArtistDetail} from 'api/artist'
import {SUCC_CODE} from 'api/config'
export default {
    data () {
        return {
            songs: []
        }
    },
    created() {
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

                }
            })
            .catch(err => console.log(err))
        },
        _normalizeSong (tracks) {
            
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
    .artist-detail-wrap {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
    }
</style>
