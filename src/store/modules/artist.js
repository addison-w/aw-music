import * as types from '../mutation-types'

const state = {
    artist: {}
}

const getters = {
    GET_ARTIST: (state) => state.artist
}

const actions = {

}

const mutations = {
    [types.SET_ARTIST] (state, artist) {
        state.artist = artist
    }
}

export default {
    state, getters, actions, mutations
}
