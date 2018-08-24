import React, { Component } from 'react';
import axios from 'axios'
import { ip, ip1 } from '../default_term'
import { play_song, playlist } from '../store/actions'
import { connect } from 'react-redux';
import './mine.css'



class History extends Component {
    constructor(p) {
        super(p);
        this.state = {

            history: []
        }
    }

    render() {
        return (

            <div>
                <div className="histoty_head_box">
                    <div>
                        <img src="./image/oq.png" onClick={this.close_history.bind(this)} /> <span>最近播放</span>
                    </div>
                    <p>清空</p>
                </div>
                <div className="playall">
                    <img src="./image/a3d.png" />
                    <span>播放全部</span><span className="xiaospan">(共{this.state.history.length}首)</span>
                </div>
                <ul className="song_heshrt">{
                    this.state.history.map((item, index) => (

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
    play(id) {
        this.props.dispatch(play_song(id))
        this.props.dispatch(playlist(this.state.history))
        window.location.href = ip1 + "/#/player"

    }
    componentDidMount() {
        axios.post(ip + '/find_history', {submitType: "findJoin", ref:JSON.stringify( ["music"])}).then((msg) => {
            console.log(msg.data)
            let arr = msg.data.map(item => item.music[0])
            console.log(arr)
            this.setState({
                history: [...arr]
            })
        })
    }
    close_history() {
        document.getElementById('history_page').className = "history_page_hidden";

    }
}


function filter(state) {
    return {
        playlist: state.playlist,
        song: state.play_song
    }
}
export default connect(filter)(History)
