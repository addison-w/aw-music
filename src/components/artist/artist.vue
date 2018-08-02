<template>
    <div class="artist-wrap">
        <scroll class="artist-content" :data="artistList">
            <div>
                <div v-for="(grouped, index) in artistList" :key="index">
                    <div class="grouped-flag">{{ grouped.flag }}</div>
                    <div v-for="artist in grouped.artists" :key="artist.id" class="artist-row">
                        <img :src="artist.imgUrl" alt="">
                        <span>{{ artist.name }}</span>
                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import {getArtistList} from 'api/artist'
import {SUCC_CODE} from 'api/config'
import pinyin from 'tiny-pinyin'
import Scroll from 'base/scroll'

export default {
    data () {
        return {
            artistList: [],
            indexList: []
        }
    },
    components: {
        Scroll
    },
    created () {
        this._getArtistList()
    },
    methods: {
        _getArtistList () {
            getArtistList()
            .then(res => {
                if (res.code === SUCC_CODE) {
                    let fullList = []
                    res.artists.map(artist => {
                        fullList.push({
                            id: artist.id,
                            name: artist.name,
                            imgUrl: artist.img1v1Url,
                            firstLetter: pinyin.convertToPinyin(artist.name).substr(0, 1)
                        })
                    })

                    fullList.map(artist => {
                        let exist = this.artistList.find(a => a.flag === artist.firstLetter)
                        if (exist) {
                            exist.artists.push(artist)
                        } else {
                            this.artistList.push({
                                flag: artist.firstLetter,
                                artists: [artist]
                            })
                        }
                    })
                    this.artistList.sort((a, b) => a.flag.localeCompare(b.flag))

                    this.artistList.unshift({
                        flag: '热',
                        artists: [...fullList.slice(0, 8)]
                    })

                    this.artistList.map(a => this.indexList.push(a.flag))
                }
            })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style lang="scss" scoped>
    .artist-wrap {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 90px;
        bottom: 0;
        width: 100%;
        .artist-content {
            height: 100%;
            overflow: hidden;
            .grouped-flag {
                background: #F0F0F0;
                padding: 5px 10px;
                font-size: 0.8rem;
            }
            .artist-row {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                padding: 5px 10px;
                border-bottom: 1px solid #F0F0F0;
                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 6px;
                }
                span {
                    margin-left: 20px;
                }
            }
        }
    }
</style>
