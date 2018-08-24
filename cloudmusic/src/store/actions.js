
export function play_song(id) {
    return {
      type: 'PLAY_SONG',
      id
    }
  }
  export function playlist(playlist) {
    return {
      type: 'PLAYLIST',
      playlist
    }
  }