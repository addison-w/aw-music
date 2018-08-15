import {BASE_URL, QUERY_TYPE} from './config'
import axios from 'axios'

export function getPopularSearch () {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/search/hot`)
        .then(res => { resolve(res.data) })
        .catch(err => reject(err))
    })
}

export function searchByKeywordAndType (keyword = '', type = QUERY_TYPE.Tracks, offset = 0, limit = 30) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/search?keywords=${keyword}&type=${type}&limit=${limit}&offset=${offset}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
}

export function searchTrackDetailById (id) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/song/detail?ids=${id}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
}
