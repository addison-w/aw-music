import * as types from '../mutation-types'
const state = {
    rank: {}
}

const getters = {
    GET_RANK: state => state.rank
}

const actions = {

}

const mutations = {
    [types.SET_RANK] (state, rank) {
        state.rank = rank
    }
}

export default {
    state, getters, actions, mutations
}
