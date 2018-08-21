<template>
  <div id="app" @click="playAudio">
    <m-header></m-header>
    <tabs></tabs>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <music-player ref="player"></music-player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tabs from 'components/tabs/tabs'
import MusicPlayer from 'components/music-player/music-player'
export default {
  data () {
    return {
      flag: false
    }
  },
  components: {
    MHeader,
    Tabs,
    MusicPlayer
  },
  methods: {
    playAudio () {
      if (this.flag === true) {
        return
      }
      this.flag = true
      this.$refs.player.$refs.audio.src = ''
      this.$refs.player.$refs.audio.play()
      this.$refs.player.$refs.audio.pause()
    }
  }
}
</script>

<style lang="scss">
@import './common/scss/reset.scss';
@import './common/scss/base.scss';
</style>
