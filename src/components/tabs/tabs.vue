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
@import 'common/scss/variable.scss';
    .m-tabs {
        display: flex;
        justify-content: space-around;
        height: 60px;
        line-height: 60px;
        a {
            text-decoration: none !important;
            color: $color-primary;
        }
        .router-link-active {
            border-bottom: 2px solid $color-secondary;
            padding: 3px 15px;
        }
    }
</style>
