<template>
    <div class="m-header">
        <h3 class="header-text">AW-MUSIC</h3>
        <span class="search-icon" @click="onClickSearch"><i class="material-icons">search</i></span>
    </div>
</template>

<script>
export default {
    methods: {
        onClickSearch () {
            this.$router.push({
                path: '/search'
            })
        }
    }
}
</script>

<style lang="scss">
    .m-header {
        position: relative;
        left:0;
        top: 0;
        text-align: center;
        height: 45px;
        border-bottom: 1px solid black;
        .header-text {
            line-height: 45px;
            font-size: 1.3rem;
        }
        .search-icon {
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }
</style>
