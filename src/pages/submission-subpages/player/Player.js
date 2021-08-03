import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FormatTime from './FormatTime'
import Play from './icons/Play'
import Pause from './icons/Pause'
import Replay from './icons/Replay'
import Forward from './icons/Forward'

/**
 * SoundCloud Player
 * A simple SoundCloud player.
 **/
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
      percent_remains: 100,
      percent_progress_remains: 100,
      duration: '0:00',
      current_time: '0:00'
    }
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
    this.setState({ playing: !playing, showAudioPlayer: true }, () => {
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
    if (audioPlayer == undefined) {
      return
    }
    let percent = (audioPlayer.currentTime / audioPlayer.duration) * 100
    this.setState({ current_time: FormatTime(audioPlayer.currentTime) })
    this.setState({ duration: FormatTime(audioPlayer.duration) })
    this.setState({ percent_remains: 100 - percent })
  }

  progressUpdated() {
    const { audioPlayer } = this.state
    if (audioPlayer == undefined) return
    if (!audioPlayer.buffered.length) return
    var bufferedEnd = audioPlayer.buffered.end(audioPlayer.buffered.length - 1)
    if (audioPlayer.duration > 0) {
      let percent_remains = (bufferedEnd / audioPlayer.duration) * 100
      this.setState({ percent_progress_remains: 100 - percent_remains })
    }
  }

  positionChange(e) {
    const { audioPlayer } = this.state
    let elem = ReactDOM.findDOMNode(this.refs.progress)
    let elemRect = elem.getClientRects()
    let elemLeft = elemRect[0].left
    let elemWidth = elemRect[0].width
    let clickPositionLeft = e.pageX
    let percent_remains =
      100 - ((clickPositionLeft - elemLeft) / elemWidth) * 100
    let newTime =
      audioPlayer.duration - audioPlayer.duration * (percent_remains / 100)
    audioPlayer.currentTime = Math.floor(newTime)
    setTimeout(() => {
      if (audioPlayer.paused) {
        this.togglePlay()
      }
    }, 1000)
  }

  renderPlayerIcons() {
    const { playing } = this.state

    if (playing) {
      return (
        <div className = "control-button">
          <PlayerControlIcon onClick={this.togglePlay.bind(this)} className = "control-button">
            <Pause />
          </PlayerControlIcon>
        </div>
      )
    }

    return (
      <div className = "control-button">
        <PlayerControlIcon onClick={this.togglePlay.bind(this)} className = "control-button">
          <Play />
        </PlayerControlIcon>
      </div>
    )
  }

  render() {
    const { audio_id, audio_secret_token, title, client_id } = this.props
    const {
      percent_remains,
      percent_progress_remains,
      duration,
      current_time
    } = this.state
    let streamUrl = `https://api.soundcloud.com/tracks/${audio_id}/stream?client_id=${client_id}&secret_token=${audio_secret_token}`

    let time_remains = {
      transform: `translateX(-${percent_remains.toString()}%)`
    }
    let progress_remains = {
      transform: `translateX(-${percent_progress_remains.toString()}%)`
    }

    return (
      <PlayerWrapper>
        <audio id="audio" preload="none" ref="audio" src={streamUrl} />
        <PlayerControl className = "control-button" >{this.renderPlayerIcons()}</PlayerControl>

        <PlayerDisplay onClick={this.positionChange.bind(this)}>
          <div style={{
            textAlign: "left"
          }}>
            {title}
          </div>

          <PlayerProgress>
            <PlayerProgressTime>{current_time}</PlayerProgressTime>
            <PlayerProgressBar ref="progress">
              <PlayerProgressRemains style={progress_remains} />
              <PlayerTimeRemains style={time_remains} />
            </PlayerProgressBar>
            <PlayerProgressTime>{duration}</PlayerProgressTime>
          </PlayerProgress>
        </PlayerDisplay>
      </PlayerWrapper>
    )
  }
}

const PlayerWrapper = styled.div`
  border: 1px solid #444;
  transition: color 125ms ease-in-out;
  background: white;
  position: relative;
  padding: 1.8rem;
  z-index: 5;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  /* active */
  border-color: #a2a2a2;
  background: black;
  z-index: 10;
  height: 50%;
`

const PlayerControl = styled.div`
  transition: fill 125ms ease-in-out;
`

const PlayerDisplay = styled.div`
  flex: 1 1 100%;
  margin-bottom: 0;
`

const PlayerControlIcon = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-right: 1.2rem;
`

const PlayerProgress = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0;
`

const PlayerProgressPosition = styled.span`
  text-align: right;
  margin-right: 1rem;
  margin-left: 0;
  font-feature-settings: tnum;
`

const PlayerProgressTime = styled.span`
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  line-height: 1rem;
  color: #444;
  flex: 0 1 auto;
  vertical-align: middle;
`

const PlayerProgressBar = styled.span`
  flex: 1 1 auto;
  width: 100%;
  display: block;
  padding: 0.1rem 0;
  margin: 0 0.5rem;
  cursor: pointer;
  position: relative;
  background: #eee;
  border-radius: 2px;
  overflow: hidden;
  transform: translateZ(0);
`

const PlayerTimeRemains = styled.span`
  transition: transform 0.2s;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #f50;
  display: block;
`

const PlayerProgressRemains = styled.span`
  transition: transform 0.2s;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #f50;
  display: block;
  background: #ccc;
`