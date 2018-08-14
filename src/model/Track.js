export default class Track {
    constructor ({id, name, artist, album, image}) {
        this.id = id
        this.name = name
        this.artist = artist
        this.album = album
        this.image = image
        this.url = `http://music.163.com/song/media/outer/url?id=${id}.mp3`
    }
}

export function createTrack (track) {
    return new Track({
        id: track.id,
        name: track.name,
        artist: filterArtist(track.ar),
        album: track.al.name,
        image: track.al.picUrl
    })
}

export function createSearchedTrack (track) {
    return new Track({
        id: track.id,
        name: track.name,
        artist: filterArtist(track.artists),
        album: track.album.name || '',
        image: ''
    })
}

function filterArtist (artists) {
    if (!artists) {
        return ''
    }
    return artists.map(a => a.name).join('/')
}
