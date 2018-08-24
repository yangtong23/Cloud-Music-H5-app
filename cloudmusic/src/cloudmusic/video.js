import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { ip } from '../default_term';
import axios from 'axios';
import "./video.css"


class Video extends Component {
    state = {
         Videos:[]
    }
    render() {
        function renderTabBar(props) {
            return (<Sticky>
                {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }
        const tabs = [
            { title: '推荐' },
            { title: '现场' },
            { title: '翻唱' },

        ];


        return (
            <div>

                <StickyContainer>
                    <Tabs tabs={tabs}
                        swipeable={false}
                        useOnPan={false}
                        initalPage={'t2'}
                        renderTabBar={renderTabBar}
                        tabBarBackgroundColor="rgb(212, 59, 51)"
                        tabBarActiveTextColor="white"
                        tabBarInactiveTextColor="#d3d3d3"
                    >
                        <div className="video_box">
                        {
                           this.state.Videos.map(item=>(
                               <div>
                               <div>
                               <video src={ip+item.url} />
                              </div>
                              <p>{item.name}</p>
                              <div>
                                  <img src=""/>
                                  <p>{item.uname}</p>
                                  <p> <img src=""/>{item.good}</p>
                                  <p> <img src=""/>{item.comment}</p>
                                  <img src=""/>
                              </div>
                              </div>
                           ))
                        }

                        </div>
                        <div style={{ textAlign: "center", paddingTop: "20%" }}>
                            待续
                </div>
                        <div style={{ textAlign: "center", paddingTop: "20%" }}>
                            待续
                </div>

                    </Tabs>
                </StickyContainer>

            </div>
        )
    }
    componentDidMount() {
        axios.post(ip + "/find_video", {}).then((res) => {
            console.log(res.data)
            this.setState({
                Videos: [...res.data]
            })
        })
    }

} export default Video;