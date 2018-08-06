export function shuffle (arr) {
    return arr.concat().sort(() => 0.5 - Math.random())
}
