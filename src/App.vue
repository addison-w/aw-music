<template>
  <div id="app">
    <m-header></m-header>
    <tabs></tabs>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tabs from 'components/tabs/tabs'
export default {
  components: {
    MHeader,
    Tabs
  }
}
</script>

<style lang="scss">
@import './common/scss/reset.scss';
@import './common/scss/base.scss';
</style>
