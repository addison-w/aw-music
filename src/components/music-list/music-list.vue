<template>
    <div class="music-list-wrap">
        <div>
            <div class="header" :style="setBgImage">
                <div class="bg-filter"></div>
                <div class="top-nav">
                    <span class="back-arrow">&lt;</span>
                    <span class="main-title">{{ title }}</span>
                </div>
                <div class="bottom">
                    <span>Play All</span>
                </div>
            </div>
            <div class="tracks-list">
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default () {
                return ''
            }
        },
        bgImage: {
            type: String,
            default () {
                return ``
            }
        },
        tracks: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
        }
    },
    computed: {
        setBgImage () {
            return `background-image: url(${this.bgImage})`
        }
    }
}
</script>

<style lang="scss" scoped>
    .music-list-wrap {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100vw;
        z-index: 100;
        background: white;
        .header {
            height: 40vh;
            width: 100vw;
            background-size: cover;
            background-position: 0 30%;
            position: relative;
            color: white;
            .bg-filter {
                height: 40vh;
                width: 100vw;
                background: black;
                opacity: 0.15;
            }
            .top-nav {
                height: 45px;
                line-height: 45px;
                .back-arrow {
                    position: fixed;
                    left: 0;
                    top: 0;
                    padding: 0 20px;
                }
                .main-title {
                    position: fixed;
                    left: 0;
                    right: 0;
                    top: 0;
                    text-align: center;
                }
            }
            .bottom {
                position: absolute;
                bottom: 30px;
                left: 0;
                right: 0;
                text-align: center;
            }
        }
    }
</style>
