import Vue from 'vue'
import Vuex from 'vuex'
import artist from './modules/artist'
import player from './modules/player'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    artist,
    player
  }
})
