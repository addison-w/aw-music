<template>
    <div>
        <div class="main-player">
            <div class="top">
                <div class="back-arrow"></div>
                <div class="header-info">
                    <div class="header-track-name"></div>
                    <div class="header-artist-name"></div>
                </div>
            </div>
            <div class="middle">
                <div class="cd">
                    <img class="cd-image" src="" alt="">
                </div>
            </div>
            <div class="bottom">
                <div class="mode-switch"></div>
                <div class="prev-track"></div>
                <div class="play-btn"></div>
                <div class="next-track"></div>
                <div class="fav-toggle"></div>
            </div>
        </div>
        <div class="mini-player">
            <div class="mini-cd">
                <img src="" alt="" class="mini-cd-img">
            </div>
            <div class="footer-info">
                <div class="footer-track-name"></div>
                <div class="footer-track-name"></div>
            </div>
            <div class="footer-play-btn"></div>
            <div class="footer-list-btn"></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .main-player {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        .top {
            position: fixed;
            height: 50px;
            width: 100vw;
            line-height: 50px;
            text-align: center;
            color: white;
        }
    }
</style>
