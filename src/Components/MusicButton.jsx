import { useState, useRef } from 'react'
import './MusicButton.css'
export default function MusicButton() {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef(null)
    const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
    audio.pause()
    } else {
    // Replace '/your-track.mp3' with your actual file in the public/ folder
    audio.play().catch(() => alert('Click again to play.'))
    }
    setPlaying(!playing)
    }
    return (
    <>
    <audio ref={audioRef} loop src="/doom-theme.mp3" />
    <button
    className={`music-btn ${playing ? 'playing' : ''}`}
    onClick={toggle}
    title="Toggle music"
    >
    {playing ? '🔊' : '🔇'}
    </button>
    </>
 )
}
