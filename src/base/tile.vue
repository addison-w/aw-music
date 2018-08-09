<template>
    <div :class="cname" @click="selectTrackList">
        <img :src="songList.imgUrl" alt="">
        <p>{{ songList.name }}</p>
    </div>
</template>

<script>
export default {
    props: {
        songList: {
            imgUrl: String,
            name: String,
            playCount: Number,
            id: Number
        },
        cname: String
    },
    methods: {
        selectTrackList () {
            this.$emit('select', this.songList.id)
        }
    }
}
</script>

<style lang="scss">
</style>
