<template>
    <div class="artist-wrap">
        <div>
            
        </div>
    </div>
</template>

<script>
import {getArtistList} from 'api/artist'
import {SUCC_CODE} from 'api/config'
import pinyin from 'tiny-pinyin'

export default {
    data () {
        return {
            artistList: []
        }
    },
    created () {
        this._getArtistList()
    },
    methods: {
        _getArtistList () {
            getArtistList()
            .then(res => {
                if (res.code === SUCC_CODE) {
                    res.artists.map(artist => {
                        this.artistList.push({
                            id: artist.id,
                            name: artist.name,
                            imgUrl: artist.img1v1Url,
                            firstLetter: pinyin.convertToPinyin(artist.name).substr(0, 1)
                        })
                    })
                }
            })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style lang="scss">

</style>
