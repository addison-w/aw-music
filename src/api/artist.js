import axios from 'axios'
import {BASE_URL} from './config'

export function getArtistList () {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/top/artists?offset=0&limit=100`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => reject(err))
    })
}

export function getArtistDetail (artistId) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/artists?id=${artistId}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => reject(err))
    })
}
