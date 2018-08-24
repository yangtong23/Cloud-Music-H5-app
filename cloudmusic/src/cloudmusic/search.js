import React, { Component } from 'react';
import axios from 'axios'
import { ip, ip1 } from '../default_term'
import { play_song, playlist } from '../store/actions'
import { connect } from 'react-redux';
import './search.css'



let search_result = null;

class Search extends Component {
    constructor(p) {
        super(p);
        this.state = {
            history: [],
            search: [],
            search1: "",
            search_result: []

        }
    }

    render() {


        return (
            <div>
                <div className="search_box">

                    <img src="./image/oq.png" onClick={this.props.history.goBack} />
                    <div className="search_div">
                        <input className="search_in" placeholder="给你推荐 Take It All In" onInput={this.search.bind(this)} />
                        <ul className="search_content">
                            <li onClick={this.search_song.bind(this, this.state.search1)}>搜索"{this.state.search1}"</li>
                            {this.state.search.map(item => <li key={item._id} onClick={this.search_song.bind(this, item)}> <img src="./image/aiu.png" /> {item.name}</li>)}
                        </ul>
                    </div>
                </div>
                {/* 搜索历史 */}
                <div id="search_history">
                    <div className="playall" style={{ textAlign: "center" }}>
                        <span className="search_his" >搜索历史</span>
                    </div>
                    <ul className="song_heshrt">{
                        this.state.history.map((item, index) => (
                            <li key={item._id} >
                                <img src="./image/air.png" />
                                <div className="song_style">
                                    <div  onClick={this.search_song.bind(this, item)} className="search_his_name">
                                        <p>{item.name}</p>

                                    </div>
                                    <img src="./image/a1o.png" onClick={this.del.bind(this, item._id)} />
                                </div>
                            </li>

                        ))
                    }
                    </ul>
                </div>
                {/* 搜索结果 */}
                <div id="search_result" className="search_hidden">
                    <div className="dadadad">
                        <p>搜索结果</p>
                    </div>
                    <ul className="search_heshrt">{
                        this.state.search_result.map((item, index) => (

                            <li onClick={this.play.bind(this, item)} key={item._id}>

                                <div className="search_style">
                                    <div  >
                                        <p>{item.name}</p>
                                        <p>{item.singer}</p>
                                    </div>
                                    <div className="icon_div">
                                        <img src="./image/a3e.png" />
                                        <img src="./image/a3a.png" />
                                    </div>

                                </div>
                            </li>

                        ))
                    }
                    </ul>
                </div>
            </div>


        )
    }
    //  点击搜索结果
    search_song(val) {
        let params = ""
        document.getElementById('search_result').className = "";
        document.getElementById('search_history').className = "search_hidden";
        document.querySelector('.search_content').style.display = "none";
        if (val.name)
            params = val.name
        else
            params = val
        axios.post(ip + "/find_music", { name: params }).then((msg) => {
            this.props.dispatch(playlist(msg.data))
            this.setState({
                search_result: [...msg.data]
            })
        })
        axios.post(ip + "/add_search", { name: params }).then((msg) => {
            this.setState({
                history: [...this.state.history, msg.data[0]]
            })
        })
    }
    search(e) {
        if (e.target.value !== "") {
            document.querySelector('.search_content').style.display = "block";
            this.setState({
                search1: e.target.value
            })
            axios.post(ip + "/find_music", { name: e.target.value }).then((msg) => {
                console.log(msg.data)
                this.setState({
                    search: [...msg.data]
                })
            })
        } else {
            document.querySelector('.search_content').style.display = "none";
        }
    }
    play(item) {
        console.log(item)
        this.props.dispatch(play_song(item))
        console.log(this.props)
   setTimeout(() => {
    window.location.href = ip1 + "/#/player"
   }, 500);
       
    }
    del(id) {
        let arr = this.state.history.filter(o => o._id !== id);
        this.setState({
            history: [...arr]
        })
        axios.post(ip + '/del_search', { _id: id })
    }
    componentWillMount() {

    }
    componentDidMount() {

        axios.post(ip + '/find_search', {}).then((msg) => {
            this.setState({
                history: [...msg.data]
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
export default connect(filter)(Search)
