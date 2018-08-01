<template>
    <div class="m-tabs">
        <div class="recommend">
            <router-link to="/recommend">推荐</router-link>
        </div>
        <div class="rank">
            <router-link to="/rank">排行</router-link>
        </div>
        <div class="artist">
            <router-link to="/artist">歌手</router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .m-tabs {
        display: flex;
        justify-content: space-around;
        height: 45px;
        line-height: 45px;
        a {
            text-decoration: none !important;
            color: black;
        }
        .router-link-active {
            border-bottom: 1px solid black;
        }
    }
</style>
