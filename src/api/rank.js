import axios from 'axios'
import {BASE_URL} from './config'

const Ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

function _getRankList (listId) {
    return axios.get(`${BASE_URL}/top/list?idx=${listId}`)
}

export function getAllRankList () {
    return new Promise((resolve, reject) => {
        let results = []

        axios.all(Ids.map(id => _getRankList(id)))
        .then(axios.spread((...res) => {
            res.map(r => {
                results.push(r.data)
            })
            resolve(results)
        }))
        .catch(err => reject(err))
    })
}

export function getRankById (id) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/top/list?idx=${id}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => reject(err))
    })
}
