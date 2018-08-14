<template>
    <div class="suggest-list-wrap"></div>
</template>

<script>
import {SUCC_CODE, QUERY_TYPE} from 'api/config'
import {searchByKeywordAndType} from 'api/search'
export default {
    props: {
        query: {
            type: String,
            default () {
                return ''
            }
        }
    },
    data () {
        return {
            tracks: []
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>

</style>
