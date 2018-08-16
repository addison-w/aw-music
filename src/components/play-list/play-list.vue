<template>
    <div class="play-list-wrap">
        <div class="background-mask" @click.stop="hidePlayList">
            <div class="play-list-container">
                <div class="play-list-content"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        hidePlayList () {
            this.$emit('hidePlayList')
        }
    }
}
</script>

<style lang="scss" scoped>
    .play-list-wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        z-index: 160;
        .background-mask {
            height: 100vh;
            width: 100vw;
            background: rgba(0, 0, 0, 0.3);
            z-index: 170;
            .play-list-container {
                position: absolute;
                width: 100vw;
                background: #F0F0F0;
                height: 40vh;
                bottom: 0;
                z-index: 180;
                .play-list-content {

                }
            }
        }
    }
</style>
