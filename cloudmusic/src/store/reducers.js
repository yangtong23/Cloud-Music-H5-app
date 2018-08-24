import { combineReducers } from 'redux'

let defaultSong = {
    content: "999+",
    img: "109951163416312552.jpg",
    name: "We Can't Stop",
    singer: "Boyce Avenue",
    url: "BoyceAvenue-WeCan't Stop.mp3",
    _id: "5b6f1a595fd151c1e76b558e"
}
function play_song(state = defaultSong, action) {
    switch (action.type) {
        case 'PLAY_SONG': return action.id
        default: return state;
    }
}

let defaultlist = [{
    content: "999+",
    img: "109951163416312552.jpg",
    name: "We Can't Stop",
    singer: "Boyce Avenue",
    url: "BoyceAvenue-WeCan't Stop.mp3",
    _id: "5b6f1a595fd151c1e76b558e"
}, {
    bimg: "5yq3gKPZVfeSqeqdEQdvKQ%3D%3D%2F17947328300433747.jpg",
    content: "999+",
    img: "109951162863729074.jpg",
    name: "sorry for not answering the phone",
    singer: "In Love With A Ghost",
    url: "In Love With A Ghost - sorry for not answering the phone, i'm too busy trying to fly away.mp3",
    _id: "5b6f1bab5fd151c1e76b5590"
}, {
    bimg: "9YLLfTyDf7aGpi1FjH3xoA%3D%3D%2F2289183309035050.jpg",
    content: "999+",
    img: "2564061116003405.jpg",
    name: "winter bokeh",
    singer: "idealism",
    url: "idealism - winter bokeh.mp3",
    _id: "5b6f1b145fd151c1e76b558f"
}]
function playlist(state = defaultlist, action) {
    switch (action.type) {
        case 'PLAYLIST': return action.playlist
        default: return state;
    }
}




export default combineReducers({
    play_song,
    playlist
})