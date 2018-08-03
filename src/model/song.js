export default class Song {
    constructor ({id, name, artist, album, duration, image, url = ''}) {
        this.id = id
        this.name = name
        this.url = url
        this.artist = artist
        this.album = album
        this.duration = duration
        this.image = image
    }
}

export function createSong (track) {
    return new Song({
        id: track.id,
        name: track.name
    })
}
