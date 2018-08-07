import {mapGetters} from 'vuex'
export const playListMixin = {
    computed: {
        ...mapGetters(['getPlayList'])
    },
    methods: {
        handlePlaylist () {
            throw new Error('Component must implement handlePlaylist method!')
        }
    },
    mounted () {
        this.handlePlaylist(this.getPlayList)
    },
    activated () {
        this.handlePlaylist(this.getPlayList)
    },
    watch: {
        getPlayList (newVal) {
            this.handlePlaylist(newVal)
        }
    }
}
