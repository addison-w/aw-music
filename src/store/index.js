import Vue from 'vue'
import Vuex from 'vuex'
import artist from './modules/artist'
import player from './modules/player'
import rank from './modules/rank'
import tracklist from './modules/tracklist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    artist,
    player,
    rank,
    tracklist
  }
})
