<template>
    <div class="recommend-wrap" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data="recommendSongLists">
            <div class="content">
                <swiper v-if="recommendSlides.length" :items="recommendSlides" :cname="swiperClass"></swiper>
                <loading v-show="!recommendSlides.length"></loading>
                <p class="sub-heading-text">推荐歌单</p>
                <RecommendSongList :recommendSongLists="recommendSongLists" @select="selectTrackList"></RecommendSongList>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
import {getRecommendSlides, getRecommendSongLists} from 'api/recommend'
import {SUCC_CODE} from 'api/config'
import RecommendSlide from 'model/RecommendSlide'
import Swiper from 'base/swiper'
import Scroll from 'base/scroll'
import RecommendSongList from './recommendSongList'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
import Loading from 'base/loading'

export default {
    mixins: [playListMixin],
    data () {
        return {
            recommendSlides: [],
            recommendSongLists: [],
            swiperClass: 'swiper-wrap'
        }
    },
    components: {
        Swiper,
        Scroll,
        RecommendSongList,
        Loading
    },
    created () {
        this._getRecommendSliders()
        this._getRecommendSongLists()
    },
    methods: {
        ...mapMutations(['SET_TRACK_LIST']),
        handlePlaylist (playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.recommend.style.bottom = bottom
            this.$refs.scroll.refresh()
        },
        _getRecommendSliders () {
            getRecommendSlides().then(res => {
                if (res.code === SUCC_CODE) {
                    res.banners.map(banner => {
                        this.recommendSlides.push(new RecommendSlide({
                            picUrl: banner.picUrl,
                            url: banner.url,
                            targetId: banner.targetId,
                            targetType: banner.targetType
                        }))
                    })
                }
            })
        },
        _getRecommendSongLists () {
            getRecommendSongLists().then(res => {
                if (res.code === SUCC_CODE) {
                    res.result.map(songList => {
                        this.recommendSongLists.push({
                            id: songList.id,
                            name: songList.name,
                            imgUrl: songList.picUrl,
                            playCount: songList.playCount
                        })
                    })
                }
            })
        },
        selectTrackList (id) {
            this.SET_TRACK_LIST({
                id: id
            })
            this.$router.push({
                path: `/recommend/${id}`
            })
        }
    },
    watch: {
        recommendSlides () {
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style lang="scss">
@import '../../common/scss/variable.scss';
.recommend-wrap {
    position: fixed;
    width: 100%;
    top: 90px;
    bottom: 0;
    .recommend-content {
        height: 100%;
        overflow: hidden;
        .swiper-wrap {
            text-align: center;
            img {
                width: 98%;
                border-radius: 10px;
            }
            .swiper-pagination-bullet-active {
                background: white;
            }
        }
        .sub-heading-text {
            margin-left: 10px;
            line-height: 50px;
            font-weight: bold;
        }
    }
}
</style>
