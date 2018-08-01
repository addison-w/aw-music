<template>
    <div :class="cname">
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
    }
}
</script>

<style lang="scss">
</style>
