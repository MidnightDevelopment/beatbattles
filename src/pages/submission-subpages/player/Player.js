import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Slider, Button, Row, Col } from 'antd';
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import FormatTime from './FormatTime'
import { Typography } from 'antd';

const { Title } = Typography;

export default class Player extends Component {
    static get propTypes() {
        return {
            audio_id: PropTypes.string.isRequired,
            audio_secret_token: PropTypes.string,
            client_id: PropTypes.string.isRequired,
            title: PropTypes.string
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            playing: false,
            audioPlayer: null,
            percent_remains: 0,
            progress_position: 0,
            percent_progress_remains: 100,
            duration: '0:00',
            current_time: '0:00',
            icon: <CaretRightOutlined style = {{fontSize: '150%'}}/>
        }
        this.togglePlay = this.togglePlay.bind(this);
        this.sliderChange = this.sliderChange.bind(this);
    }

    componentDidMount() {
        this.setState(
            { audioPlayer: ReactDOM.findDOMNode(this.refs.audio) },
            () => {
                this.state.audioPlayer.ontimeupdate = () => {
                    this.timeUpdated()
                }
                this.state.audioPlayer.onprogress = () => {
                    this.progressUpdated()
                }
            }
        )
    }

    togglePlay() {
        const { playing, audioPlayer } = this.state
        let icon = <CaretRightOutlined style = {{fontSize: '150%'}}/>
        if (!playing) {
            icon = <PauseOutlined style = {{fontSize: '150%'}}/>
        }
        this.setState({ playing: !playing, showAudioPlayer: true, icon: icon }, () => {
            if (audioPlayer.paused) {
                audioPlayer.play()
            }
            if (!this.state.playing) {
                if (!audioPlayer.buffered.length) return
                audioPlayer.pause()
            }
        })
    }

    timeUpdated() {
        const { audioPlayer } = this.state
        if (audioPlayer === undefined) {
            return
        }
        let percent = (audioPlayer.currentTime / audioPlayer.duration) * 100
        this.setState({ current_time: FormatTime(audioPlayer.currentTime) })
        this.setState({ duration: FormatTime(audioPlayer.duration) })
        this.setState({ percent_remains: 100 - percent })
        this.setState({ progress_position: percent})
    }

    progressUpdated() {
        const { audioPlayer } = this.state
        if (audioPlayer === undefined) return
        if (!audioPlayer.buffered.length) return
        let bufferedEnd = audioPlayer.buffered.end(audioPlayer.buffered.length - 1)
        if (audioPlayer.duration > 0) {
            let percent_remains = (bufferedEnd / audioPlayer.duration) * 100
            console.log(percent_remains)
            this.setState({
                percent_progress_remains: 100 - percent_remains,
            })
        }
    }

    sliderChange(e) {
        const { audioPlayer } = this.state
        let percent_remains = 100 - e
        let newTime = audioPlayer.duration - audioPlayer.duration * (percent_remains / 100)
        audioPlayer.currentTime = Math.floor(newTime)
        this.setState({
            progress_position: e,
            percent_remains: 100 - e
        })
        setTimeout(() => {
            if (audioPlayer.paused) {
                this.togglePlay()
            }
        }, 1000)
    }

    render() {
        const { audio_id, audio_secret_token, title, client_id } = this.props
        const {
            current_time
        } = this.state
        let streamUrl = `https://api.soundcloud.com/tracks/${audio_id}/stream?client_id=${client_id}&secret_token=${audio_secret_token}`
        return (
            /*<PlayerWrapper>
                <audio id="audio" preload="none" ref="audio" src={streamUrl} />
                {/!*<PlayerControl className = "control-button" >{this.renderPlayerIcons()}</PlayerControl>*!/}
                <Col span = {2}>
                    <Button shape="circle" icon={this.state.icon} type={"text"} onClick={this.togglePlay}>
                    </Button>
                </Col>

                <PlayerDisplay>
                    <Col span={16} offset={3} style={{textAlign: "left"}}>
                        <Title level={5} style={{marginBottom: "0", marginTop: "0.5rem"}}>Nova - The Middle</Title>
                    </Col>

                    <PlayerProgress>
                        <PlayerProgressTime>{current_time}</PlayerProgressTime>
                        <Col span = {20} ref="progress">
                            <Slider tooltipVisible={false} step = {0.01} onChange={this.sliderChange} autoFocus={true} value={this.state.progress_position}/>
                        </Col>
                    </PlayerProgress>
                </PlayerDisplay>
            </PlayerWrapper>*/
            <>
                <audio id="audio" preload="none" ref="audio" src={streamUrl} />
                <Row align={"middle"} style={{margin: "0.75rem"}}>
                    <Col span={3}>
                        <Button shape="circle" icon={this.state.icon} size = {"large"} type={"text"} onClick={this.togglePlay}/>
                    </Col>
                    <Col span={21} style={{textAlign: "left"}}>
                        <Title level={5} style={{marginBottom: "0", marginTop: "0.5rem"}}>{title}</Title>
                        <Slider tooltipVisible={false}
                                step = {0.01}
                                onChange={this.sliderChange}
                                autoFocus={true}
                                value={this.state.progress_position}/>
                    </Col>
                </Row>
            </>
        )
    }
}