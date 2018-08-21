<template>
    <div class="m-header">
        <router-link to="/favourite" tag="div" class="favourite-icon"><i class="material-icons">view_headline</i></router-link>
        <h3 class="header-text">AW<span class="slash">/</span>MUSIC</h3>
        <router-link to="/search" tag="div" class="search-icon"><i class="material-icons">search</i></router-link>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import 'common/scss/variable.scss';
    .m-header {
        position: relative;
        left:0;
        top: 0;
        text-align: center;
        height: 45px;
        .favourite-icon {
            position: absolute;
            left: 13px;
            top: 10px;
        }
        .header-text {
            line-height: 45px;
            font-size: 1.3rem;
            .slash {
                color: $color-secondary;
            }
        }
        .search-icon {
            position: absolute;
            right: 13px;
            top: 10px;
        }
        .material-icons {
            font-size: 30px;
        }
    }
</style>
