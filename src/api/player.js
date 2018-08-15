import axios from 'axios'
import {BASE_URL, SUCC_CODE, CDN_URL, PROXY} from './config'

export function getMusicUrl (id) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/music/url?id=${id}&proxy=${PROXY}`)
        .then(res => {
            let music = res.data.data[0]
            if (music.code === SUCC_CODE && music.url) {
                let url = music.url
                let modifiedUrl = `${url.slice(0, 7)}${CDN_URL}/${url.slice(7, url.length)}`
                resolve(modifiedUrl)
            } else {
                resolve('')
            }
        })
        .catch(err => reject(err))
    })
}

export function getLyrics (id) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/lyric?id=${id}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => reject(err))
    })
}
