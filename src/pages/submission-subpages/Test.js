import { Slider, Button, Row, Progress, Col } from 'antd';
import React, { Component } from 'react'
import './Test.less'
import { RightOutlined, PauseOutlined } from '@ant-design/icons';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;

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
        let icon = <RightOutlined/>;
        if (play) {
            icon = <PauseOutlined/>;
        }
        this.setState({
            playing: play,
            icon: icon
        })
    }

    render() {
        return (
            <>
                <Row>
                    <Text> Hello </Text>
                </Row>
                <Row style={{
                    height: "50px",
                    zIndex: "100"
                }} justify={"center"} align={"middle"}>
                    <Col span = {4}>
                        <Button shape="circle" icon={this.state.icon} onClick={this.onPlayClick}>
                        </Button>
                    </Col>
                    <Col span = {20}>
                        <Slider tooltipVisible={false} autoFocus={true}/>
                    </Col>

                </Row>

            </>
        );
    }
}
export default IconSlider;