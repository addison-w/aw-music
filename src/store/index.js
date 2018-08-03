import Vue from 'vue'
import Vuex from 'vuex'
import artist from './modules/artist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    artist
  }
})
