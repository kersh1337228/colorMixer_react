import React from 'react'
import './ColorMixer.css'
import $ from 'jquery'


export default class ColorMixer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pointer: {
                mouseHeld: false,
                position: {
                    x: -7,
                    y: -7
                }
            },
            spectrum: {
                mouseHeld: false,
                position: {
                    x: 0,
                    y: 0
                },
                hue: 'rgba(255, 0, 0, 1)',
            }
        }
        this.colorPalette = React.createRef()
        this.colorSpectrum = React.createRef()
        this.changeColor = this.changeColor.bind(this)
        this.changeHue = this.changeHue.bind(this)
    }

    changeColor(event) {
        let pointer = this.state.pointer
        if (pointer.mouseHeld) {
            pointer.position = {
                x: event.clientX - event.target.getBoundingClientRect().left - 7,
                y: event.clientY - event.target.getBoundingClientRect().top - 7
            }
            this.setState({pointer: pointer})
        }
    }

    changeHue(event) {
        let spectrum = this.state.spectrum
        if (spectrum.mouseHeld) {
            spectrum.position.y = event.clientY - event.target.getBoundingClientRect().top - 9.6
            this.setState({spectrum: spectrum})
        }
    }

    componentDidMount() {
        let [pointer, spectrum] = [
            this.state.pointer, this.state.spectrum
        ]
        pointer.position = {
            x: this.colorPalette.current.getBoundingClientRect().left - 7,
            y: this.colorPalette.current.getBoundingClientRect().top - 7
        }
        spectrum.position = {
            x: this.colorSpectrum.current.getBoundingClientRect().left,
            y: this.colorSpectrum.current.getBoundingClientRect().top - 9.6
        }
        this.setState({
            pointer: pointer, spectrum: spectrum
        })
    }

    render() {
        return (
            <div className={'color_mixer_component'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 100 100'}
                     preserveAspectRatio={'none'} className={'color_palette'} ref={this.colorPalette}
                     onMouseMove={this.changeColor}
                     onClick={event => {
                         let pointer = this.state.pointer
                         pointer.position = {
                             x: event.clientX - event.target.getBoundingClientRect().left - 7,
                             y: event.clientY - event.target.getBoundingClientRect().top - 7
                         }
                         this.setState({pointer: pointer})
                     }}
                     onMouseOut={() => {
                         let pointer = this.state.pointer
                         pointer.mouseHeld = false
                         this.setState({pointer: pointer})
                     }}
                     onMouseDown={() => {
                         let pointer = this.state.pointer
                         pointer.mouseHeld = true
                         this.setState({pointer: pointer})
                     }}
                     onMouseUp={() => {
                         let pointer = this.state.pointer
                         pointer.mouseHeld = false
                         this.setState({pointer: pointer})
                     }}
                >
                    <defs>
                        <linearGradient id={'brightness'} gradientTransform={'rotate(90)'}>
                            <stop offset={'0'} stopColor={'rgba(0, 0, 0, 0)'}></stop>
                            <stop offset={'100%'} stopColor={'rgba(0, 0, 0, 1)'}></stop>
                        </linearGradient>
                        <linearGradient id={'hue'}>
                            <stop offset={'0'} stopColor={'#ffffff'}></stop>
                            <stop offset={'100%'} stopColor={this.state.spectrum.hue}></stop>
                        </linearGradient>
                    </defs>
                    <rect x={0} y={0} width={100} height={100} fill={'url(#hue)'}></rect>
                    <rect x={0} y={0} width={100} height={100} fill={'url(#brightness)'}></rect>
                </svg>
                <div className={'color_pointer'} style={{
                    left: this.state.pointer.position.x,
                    top: this.state.pointer.position.y,
                }}></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={'0 0 100 100'}
                     preserveAspectRatio={'none'} className={'color_spectrum'} ref={this.colorSpectrum}
                     onMouseMove={this.changeHue}
                     onClick={event => {
                         let spectrum = this.state.spectrum
                         spectrum.position.y = event.clientY - event.target.getBoundingClientRect().top - 9.6
                         this.setState({spectrum: spectrum})
                     }}
                     onMouseOut={() => {
                         let spectrum = this.state.spectrum
                         spectrum.mouseHeld = false
                         this.setState({spectrum: spectrum})
                     }}
                     onMouseDown={() => {
                         let spectrum = this.state.spectrum
                         spectrum.mouseHeld = true
                         this.setState({spectrum: spectrum})
                     }}
                     onMouseUp={() => {
                         let spectrum = this.state.spectrum
                         spectrum.mouseHeld = false
                         this.setState({spectrum: spectrum})
                     }}
                >
                    <defs>
                        <linearGradient id={'color_spectrum'} gradientTransform={'rotate(90)'}>
                            <stop offset={'0'} stopColor={'#ffffff'}></stop>
                            <stop offset={'100%'} stopColor={'#000000'}></stop>
                        </linearGradient>
                    </defs>
                    <rect x={0} y={0} width={100} height={100} fill={'url(#color_spectrum)'}></rect>
                </svg>
                <div className={'spectrum_pointer'} style={{
                    left: this.state.spectrum.position.x,
                    top: this.state.spectrum.position.y,
                }}>
                    <div className={'left'}>▸</div>
                    <div className={'right'}>◂</div>
                </div>
            </div>
        )
    }
}
