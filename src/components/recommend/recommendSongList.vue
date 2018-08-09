<template>
    <div class="recommenSongList">
        <tile v-for="songList in recommendSongLists" :key="songList.id" :songList="songList" :cname="tileClass"  :id="songList.id"
        @select="selectTrackList"></tile>
    </div>
</template>

<script>
import Tile from 'base/tile'

export default {
    props: {
        recommendSongLists: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: {
        Tile
    },
    data () {
        return {
            tileClass: 'tile'
        }
    },
    methods: {
        selectTrackList (id) {
            this.$emit('select', id)
        }
    }
}
</script>

<style lang="scss">
.recommenSongList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .tile {
        flex-basis: 30%;
        margin-bottom: 0.5rem;
        img {
            width: 100%;
            border-radius: 4px;
        }
        p {
            font-size: 0.75rem;
        }
    }
}
</style>
