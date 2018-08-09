import * as types from '../mutation-types'
const state = {
    tracklist: {}
}

const getters = {
    GET_TRACK_LIST: state => state.tracklist
}

const actions = {

}

const mutations = {
    [types.SET_TRACK_LIST] (state, tracklist) {
        state.tracklist = tracklist
    }
}

export default {
    state, getters, actions, mutations
}
