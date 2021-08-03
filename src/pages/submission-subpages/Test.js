import { Slider, Button, Row, Progress, Col } from 'antd';
import React, { Component } from 'react'
import './Test.less'
import { RightOutlined, PauseOutlined } from '@ant-design/icons';

class IconSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            icon: <RightOutlined/>
        };
        this.onPlayClick = this.onPlayClick.bind(this);
    }

    onPlayClick() {
        let play = !this.state.playing;
        let icon = <PauseOutlined/>;
        if (play) {
            icon = <RightOutlined/>;
        }
        this.setState({
            playing: play,
            icon: icon
        })
    }

    render() {
        return (
            <>
                <Row style={{
                    height: "50px"
                }} justify={"center"} align={"middle"}>
                    <Col span = {4}>
                        <Button shape="circle" icon={this.state.icon} onClick={this.onPlayClick}>
                        </Button>
                    </Col>
                    <Col span = {20}>
                        <Progress percent={30} strokeColor={"#FFFFFF"} />
                    </Col>

                </Row>
            </>
        );
    }
}
export default IconSlider;