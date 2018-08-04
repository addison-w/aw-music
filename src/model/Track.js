export default class Track {
    constructor ({id, name, artist, album, image}) {
        this.id = id
        this.name = name
        this.artist = artist
        this.album = album
        this.image = image
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

function filterArtist (artists) {
    if (!artists) {
        return ''
    }
    return artists.map(a => a.name).join('/')
}
