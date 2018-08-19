import * as types from '../mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/utils'

const findTrackIndex = (list, track) => {
    return list.findIndex(item => {
        return item.id === track.id
    })
}

const state = {
    fullScreen: false,
    playing: false,
    playList: [],
    sequenceList: [],
    currentIndex: -1,
    playMode: playMode.sequence,
    currentMusicUrl: '',
    favouriteList: JSON.parse(window.localStorage.getItem('favouriteList')) || []
}

const getters = {
    getFullScreen: state => state.fullScreen,
    getPlaying: state => state.playing,
    getPlayList: state => state.playList,
    getSequenceList: state => state.sequenceList,
    getCurrentIndex: state => state.currentIndex,
    getPlayMode: state => state.playMode,
    getCurrentTrack: state => state.playList[state.currentIndex] || {},
    getCurrentMusicUrl: state => state.currentMusicUrl,
    getFavouriteList: state => state.favouriteList
}

const actions = {
    selectPlay: ({commit, state}, {list, index}) => {
        commit(types.SET_FULLSCREEN, true)
        commit(types.SET_SEQUENCE_LIST, list)
        if (state.playMode === playMode.random) {
            let shuffledList = shuffle(list)
            commit(types.SET_PLAY_LIST, shuffledList)
            index = findTrackIndex(shuffledList, list[index])
        } else {
            commit(types.SET_PLAY_LIST, list)
        }
        commit(types.SET_CURRENT_INDEX, index)
    },
    randomPlay: ({commit}, {list}) => {
        commit(types.SET_FULLSCREEN, true)
        commit(types.SET_PLAYING, true)
        commit(types.SET_PLAY_MODE, playMode.random)
        commit(types.SET_SEQUENCE_LIST, list)
        let shuffledList = shuffle(list)
        commit(types.SET_PLAY_LIST, shuffledList)
        commit(types.SET_CURRENT_INDEX, 0)
    },
    selectExistedTrack ({commit}, {index, fullscreen = true}) {
        commit(types.SET_FULLSCREEN, fullscreen)
        commit(types.SET_PLAYING, true)
        commit(types.SET_CURRENT_INDEX, index)
    },
    removeTrack ({commit, state}, {track}) {
        let playList = state.playList.slice()
        let sequenceList = state.sequenceList.slice()
        let currentIndex = state.currentIndex
        let playListIndex = findTrackIndex(playList, track)
        playList.splice(playListIndex, 1)
        let sequenceListIndex = findTrackIndex(sequenceList, track)
        sequenceList.splice(sequenceListIndex, 1)

        if (currentIndex > playListIndex || currentIndex === playList.length) {
            currentIndex--
        }

        commit(types.SET_PLAY_LIST, playList)
        commit(types.SET_SEQUENCE_LIST, sequenceList)
        commit(types.SET_CURRENT_INDEX, currentIndex)

        if (!playList.length) {
            commit(types.SET_PLAYING, false)
        }
    },
    toggleFavouriteTrack ({commit, state}, {track}) {
        let favList = state.favouriteList.slice()
        let index = favList.length > 0 ? favList.findIndex(fav => fav.id === track.id) : -1
        if (index > -1) {
            favList.splice(index, 1)
        } else {
            favList.unshift(track)
        }
        commit(types.SET_FAVOURITE_LIST, favList)
        window.localStorage.setItem('favouriteList', JSON.stringify(favList))
    },
    clearFavouriteList ({commit}) {
        commit(types.SET_FAVOURITE_LIST, [])
        window.localStorage.removeItem('favouriteList')
    }
}

const mutations = {
    [types.SET_FULLSCREEN] (state, isFullScreen) {
        state.fullScreen = isFullScreen
    },
    [types.SET_PLAYING] (state, isPlaying) {
        state.playing = isPlaying
    },
    [types.SET_PLAY_LIST] (state, playList) {
        state.playList = playList
    },
    [types.SET_SEQUENCE_LIST] (state, sequenceList) {
        state.sequenceList = sequenceList
    },
    [types.SET_CURRENT_INDEX] (state, currentIndex) {
        state.currentIndex = currentIndex
    },
    [types.SET_PLAY_MODE] (state, playMode) {
        state.playMode = playMode
    },
    [types.SET_CURRENT_MUSIC_URL] (state, musicUrl) {
        state.currentMusicUrl = musicUrl
    },
    [types.SET_FAVOURITE_LIST] (state, favouriteList) {
        state.favouriteList = favouriteList
    }
}

export default {
    state, getters, actions, mutations
}
