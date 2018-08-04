<template>
  <div id="app">
    <m-header></m-header>
    <tabs></tabs>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <music-player></music-player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tabs from 'components/tabs/tabs'
import MusicPlayer from 'components/music-player/music-player'
export default {
  components: {
    MHeader,
    Tabs,
    MusicPlayer
  }
}
</script>

<style lang="scss">
@import './common/scss/reset.scss';
@import './common/scss/base.scss';
</style>
