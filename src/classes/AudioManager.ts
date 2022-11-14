interface AudioManagerInterface  {
    backgroundMusic: HTMLAudioElement
}
class AudioManager implements AudioManagerInterface{
    backgroundMusic: HTMLAudioElement = new Audio("../../audio/soundtrack.mp3")
    
    play() {
        this.backgroundMusic.loop = true
        this.backgroundMusic.play()
    }

    stop() {
        this.backgroundMusic.pause()
    }
}

export default AudioManager