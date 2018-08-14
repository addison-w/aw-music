<template>
    <div class="search-bar-wrap">
        <div class="search-icon" @click="onClickBack">
            <i class="material-icons">chevron_left</i>
        </div>
        <div class="search-input">
            <input type="text" :placeholder="placeholder" v-model="query">
        </div>
        <div class="clear-icon" v-if="query" @click="clearQuery">
            <i class="material-icons">clear</i>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            query: ''
        }
    },
    props: {
        placeholder: {
            type: String,
            default () {
                return '搜索歌曲、歌手'
            }
        }
    },
    methods: {
        clearQuery () {
            this.$emit('clearQuery')
        },
        onClickBack () {
            this.$router.go(-1)
        }
    },
    watch: {
        query (newQuery) {
            this.$emit('newQuery', newQuery)
        }
    }
}
</script>

<style lang="scss" scoped>
    .search-bar-wrap {
        display: flex;
        line-height: 40px;
        align-items: center;
        margin: 10px 0;
        .search-icon {
            padding: 0 10px;
            i {
                vertical-align: middle;
            }
        }
        .search-input {
            flex: 1;
            input {
                width: 100%;
                font-size: 1rem;
                vertical-align: middle;
                border: none;
                &:focus {
                    outline: none;
                }
            }
        }
        .clear-icon {
            padding: 0 10px;
            i {
                vertical-align: middle;
            }
        }
    }
</style>
