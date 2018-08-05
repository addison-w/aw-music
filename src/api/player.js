import axios from 'axios'
import {BASE_URL, SUCC_CODE, PROXY} from './config'

export function getMusicUrl (id) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/music/url?id=${id}&proxy=${PROXY}`)
        .then(res => {
            let music = res.data.data[0]
            if (music.code === SUCC_CODE) {
                resolve(music.url || '')
            } else {
                resolve('')
            }
        })
        .catch(err => reject(err))
    })
}
