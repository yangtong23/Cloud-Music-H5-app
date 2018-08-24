import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import axios from 'axios'
import './player.css'
import { connect } from 'react-redux';
import { play_song } from '../store/actions'
import { ip } from '../default_term'

// 定时器
let timer = null;
let inittimeout = null;
class Player extends Component {
    constructor(p) {
        super(p);
    }
    state = {
        arr: [0, 1, 2, 3],
        duration: 0,
        currentTime: 0,
        playerstate: true,


    }

    render() {

        let file_style = {
            animation: "rotate-disk 20s infinite normal linear",
            animationPlayState: " paused "
        }
        let totalTime = this.validateTime(this.state.duration / 60) + ":" + this.validateTime(this.state.duration % 60);
        let startTime = this.validateTime(this.state.currentTime / 60) + ":" + this.validateTime(this.state.currentTime % 60);
        let { name, singer, content, img } = this.props.song
        return (
            <div className="plager_box">
                <div className="player" style={{ backgroundImage: `url('${ip}/images/${this.props.song.img}')` }}></div>
                <div className="playerTop">
                    <div>
                        <img src="./image/oq.png" onClick={this.goBack.bind(this)} />
                        <div>
                            <p className="song_name">{name}</p>
                            <p className="singer_11">{singer}</p>
                        </div>
                    </div>
                    <img src="./image/a1h.png" />
                </div>
                <div className="control_rod">
                    <img src="./image/ae0.png" ref="needle" className="pause-needle" />
                </div>
                <div className="film " style={file_style} ref="film">
                    <img src="./image/ace.png" />
                    <img src={ip + "/images/" + img} />

                </div>
                <div className="player_middle">
                    {this.state.arr.map((item, index) => {
                        if (item == 2) {
                            return (
                                <div key={`${index}song`}>
                                    <img src={`./image/ac${item}.png`} />
                                    <p className="content">{content}</p>
                                </div>
                            )
                        } else {
                            return (
                                <div key={`${index}song`}>
                                    <img src={`./image/ac${item}.png`} />
                                </div>
                            )
                        }

                    })}

                </div>
                <div>
                    <audio ref="audio" id="audio" src={ip + "/music/" + this.props.song.url} ></audio>

                </div>
                <div className="jindutio">

                    <div id="currentTime">{startTime}</div>
                    <div className="process-bar">
                        <div className="rdy"></div>
                        <div className="cur" ref="cur">
                            <span id="processBtn" className="process-btn c-btn"></span>
                        </div>
                    </div>
                    <span id="totalTime">{totalTime}</span>

                </div>
                <div className="player_icon">
                    <div><img ref="changePlay" onClick={this.changePlay.bind(this)} src="./image/ad1.png" /></div>
                    <div><img src="./image/ad2.png" onClick={this.prev.bind(this)} /></div>
                    <div><img ref="playstate" onClick={this.play.bind(this)} src="./image/ad3.png" /></div>
                    <div><img src="./image/ad4.png" onClick={this.next.bind(this)} /></div>
                    <div><img src="./image/ad5.png" /></div>
                </div>
            </div>
        )

    }
    goBack() {
        // console.log(this.refs.audio.paused)
        this.refs.audio.pause();
        this.props.history.goBack();


    }
    // 上一曲
    prev() {
        clearInterval(timer)
        clearTimeout(inittimeout)
        let length = this.props.playlist.length;
        let index = this.props.playlist.indexOf(this.props.song)
        let newIndex;
        this.refs.film.style.animationPlayState = "paused"
        this.refs.needle.className = "pause-needle"
        if (index > 0) {
            newIndex = index - 1
            this.props.dispatch(play_song(this.props.playlist[newIndex]))
        } else {
            this.props.dispatch(play_song(this.props.playlist[length - 1]))
        }

        inittimeout = setTimeout(() => {
            this.refs.film.style.animationPlayState = "running"
            this.refs.needle.className = "resume-needle"
            this.setState({
                duration: this.refs.audio.duration,
            })
            this.play();
        }, 2000);
    }
    // 下一曲
    next() {
        clearInterval(timer)
        clearTimeout(inittimeout)
        let length = this.props.playlist.length;
        let index = this.props.playlist.indexOf(this.props.song)
        let newIndex;
        this.refs.film.style.animationPlayState = "paused"
        this.refs.needle.className = "pause-needle"
        if (this.state.playerstate) {
            if (index < length - 1) {
                newIndex = index + 1
                this.props.dispatch(play_song(this.props.playlist[newIndex]))
            } else {
                this.props.dispatch(play_song(this.props.playlist[0]))
            }
        } else {
            let random = parseInt(Math.random() * length)
            this.props.dispatch(play_song(this.props.playlist[random]))
        }

        inittimeout = setTimeout(() => {
            this.refs.film.style.animationPlayState = "running"
            this.refs.needle.className = "resume-needle"
            this.play();
            this.setState({
                duration: this.refs.audio.duration,
            })
        }, 2000);
    }

    //  播放完毕自动下一曲
    successively() {
        if (this.refs.audio.ended) {
            this.next()
        }
    }
    //  设置进度条  左边时间
    progress() {
        clearInterval(timer)
        timer = setInterval(() => {
            let currentTime = this.refs.audio.currentTime
            let Percentage = currentTime / this.state.duration
            let Percentage_width = Percentage * 100 + "%"
            this.refs.cur.style.width = Percentage_width;
            this.successively();
            this.setState({
                currentTime: this.refs.audio.currentTime
            })
            if (this.refs.audio.paused) {
                clearInterval(timer)
            }
        }, 500)
    }
    //   播放
    play() {
        clearInterval(timer)

        if (this.refs.audio.paused) {
            this.refs.audio.play();
            this.refs.playstate.src = "./image/ad6.png"
            this.refs.film.style.animationPlayState = "running"
            this.refs.needle.className = "resume-needle"
            this.progress();           // 驱动播放条
            this.add_history();        //添加到历史记录

        } else {
            this.refs.audio.pause();
            this.refs.playstate.src = "./image/ad3.png"
            this.refs.film.style.animationPlayState = "paused"
            this.refs.needle.className = "pause-needle"
        }

    }
    // 将播放歌曲添加到历史记录
    add_history() {
        console.log(this.props.song._id)
        axios.post(ip + '/find_history', {}).then((msg) => {
            console.log(msg.data.every(item => item.music[0] !== this.props.song._id))
            if (msg.data.every(item => item.music[0] !== this.props.song._id))
                axios.post(ip + '/add_history', { music: JSON.stringify([this.props.song._id]) })

        })

    }
    // 改变播放顺序
    changePlay() {
        if (this.refs.changePlay.src.search('ad7') === -1) {

            this.refs.changePlay.src = "./image/ad7.png"
            Toast.info('随机播放', 1);
            this.setState({
                playerstate: false
            })
        } else {
            this.refs.changePlay.src = "./image/ad1.png"
            Toast.info('顺序播放', 1);
            this.setState({
                playerstate: true
            })
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        console.log(this.props.playlist)
        console.log(this.props.song)
        inittimeout = setTimeout(() => {
            this.setState({
                duration: this.refs.audio.duration,
                currentTime: this.refs.audio.currentTime,
            })
            this.play();
        }, 1000);
    }
    // 卸载定时器
    componentWillUnmount() {
        clearInterval(timer)
        clearTimeout(inittimeout)
    }
    // 将时间转换为时钟模式
    validateTime(number) {
        var value = (number > 10 ? number + '' : '0' + number).substring(0, 2);
        return isNaN(value) ? '00' : value;
    }

}

function filter(state) {
    return {
        playlist: state.playlist,
        song: state.play_song
    }
}
export default connect(filter)(Player)