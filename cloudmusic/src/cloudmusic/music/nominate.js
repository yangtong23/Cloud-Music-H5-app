import React, { Component } from 'react';
import { Carousel, WingBlank, Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ip } from '../../default_term'


class Nomaiate extends Component {
    state = {
        data: ['1', '2', '3'],
        song_sheet: [],
        type: ["私人FM", '每日推荐', '歌单', '排行榜']
    }
    componentDidMount() {

        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['lun1', 'lun2', 'lun3', 'lun4', 'lun5', 'lun6',],
            });
        }, 100);

        axios.post(ip + '/find_sheet', {}).then((msg) => {
            this.setState({
                song_sheet: [...this.state.song_sheet, ...msg.data]
            })

        })
    }
    render() {
        return (
            <div style={{ position: "relative" }}>
                <div style={{ width: "100%", height: "3rem", backgroundColor: "rgb(212, 59, 51)", position: "absolute" }} ></div>

                <WingBlank>
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                        {this.state.data.map(val => (
                            <img
                                key={val}
                                src={`./image/${val}.jpg`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />

                        ))}
                    </Carousel>
                </WingBlank>

                <div className="nomaiate_type">
                    {this.state.type.map((item, index) => (
                        <figure key={index}>
                            <img src={`./image/m${index + 1}.png`} alt="" />
                            <figcaption>{item}</figcaption>
                        </figure>
                    ))}

                </div>
                <h6>推荐歌单  <Icon type="right" /> </h6>
                <div className="song_sheet">
                    {this.state.song_sheet.map(item =>
                        (<div key={item._id}>
                            <Link to={`/playlist/${item._id}`}>
                                <div>
                                    <img src={ip + "/images/" + item.img} />
                                    <p className="song_steet_name">{item.name}</p>
                                </div>
                            </Link>
                        </div>)
                    )}
                </div>
                {/* <audio src="http://192.168.0.101:3111/music/Matt%20Cab%20-%20Sing%20You%20To%20Sleep.mp3" controls ></audio> */}
            </div>
        )
    }
}


export default Nomaiate;





