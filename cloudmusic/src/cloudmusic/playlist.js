import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import axios from 'axios'
import './playlist.css'
import { connect } from 'react-redux';
import { play_song, playlist } from '../store/actions'
import { ip} from '../default_term'
class Playlist extends Component {

    state = {
        playlist: {},
        music: []
    }
    play(id) {
        this.props.dispatch(play_song(id))
        this.props.dispatch(playlist(this.state.playlist.music))
        this.props.history.push('/player')
    }
    reback() { this.props.history.goBack(); }
    render() {

        let { name, author, head, content, share, img } = this.state.playlist;


        let arr = [content, share, "下载", "多选"]
        return (
            <div className="playerlist_page">
                <div className="list_cover" style={{ backgroundImage: `url(${ip}/images/${img})` }}>
                </div>
                <div className="list_top">
                    <div>
                        <img src="./image/oq.png" alt="11" onClick={this.reback.bind(this)} />
                        <span>歌单</span>
                    </div>
                    <img src="./image/pf.png" alt="11" />

                </div>
                <div className="list_cover_middle">
                    <img src={ip + "/images/" + img} alt="" />
                    <div>
                        <p>{name}</p>
                        <p>
                            <img src={ip + "/images/" + head} alt="" />
                            <span>{author}</span>
                            <Icon type="right" />
                        </p>
                    </div>


                </div>
                <div className="list_cover_bottom">
                    {
                        arr.map((item, index) => (

                            <figure key={index}>
                                <img src={`./image/a${index}h.png`} alt="" />
                                <figcaption>{item}</figcaption>
                            </figure>

                        ))
                    }
                </div>
                <div className="playall">
                    <img src="./image/a3d.png" />
                    <span>播放全部</span><span className="xiaospan">(共{this.state.music.length}首)</span>
                </div>
                <ul className="song_heshrt">{
                    this.state.music.map((item, index) => (

                        <li onClick={this.play.bind(this, item)} key={item._id}>
                            <p>{index + 1}</p>
                            <div className="song_style">
                                <div >
                                    <p>{item.name}</p>
                                    <p>{item.singer}</p>
                                </div>
                                <img src="./image/a3a.png" />
                            </div>
                        </li>

                    ))
                }
                </ul>
            </div>
        )
    }
    componentDidMount() {
        console.log(this.props)
        axios.post(ip + "/init_playlist", { _id: this.props.match.params.id, submitType: "findJoin", ref: ["music"] }).then((msg) => {
            console.log(msg.data)
            this.setState({
                playlist: msg.data,
                music: [...msg.data.music]
            })
        })
    }

}

function filter(state) {
    return {
        playlist: state.playlist,
        song: state.play_song
    }
}
export default connect(filter)(Playlist)

