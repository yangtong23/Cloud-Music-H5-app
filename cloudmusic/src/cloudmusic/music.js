import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import Nomaiate from './music/nominate'

class Music extends Component {
    render() {
        function renderTabBar(props) {
            return (<Sticky>
                {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }
        const tabs = [
            { title: '推荐' },
            { title: '朋友' },
            { title: '电台' },
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
                        <div >
                            <Nomaiate />
                        </div>
                        <div style={{textAlign:"center" ,paddingTop:"20%"}}>
                           待续
                </div>
                        <div style={{textAlign:"center" ,paddingTop:"20%"}}>
                           待续
                </div>
                    </Tabs>
                </StickyContainer>
              
            </div>
        )
    }

} export default Music;





