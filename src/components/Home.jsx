import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import heroImg from '../assets/images/home.png';

const Home = () => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const playlist = useMemo(() => {
    const imported = import.meta.glob('../assets/*.{mp3,wav,ogg}', { eager: true });
    const tracks = Object.keys(imported).map((path) => {
      const mod = imported[path];
      const url = typeof mod === 'string' ? mod : mod.default;
      const pretty = path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
      return { title: pretty, artist: 'Unknown', url };
    });
    if (tracks.length === 0) {
      return [
        { title: 'Oru Kili Oru Kili', artist: 'Shreya Ghoshal', url: 'https://cdn.pixabay.com/audio/2023/01/18/audio_1f062c7c6a.mp3' },
      ];
    }
    return tracks;
  }, []);

  const currentTrack = playlist[Math.min(currentIndex, playlist.length - 1)];

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const pct = (audio.currentTime / (audio.duration || 1)) * 100;
    setProgress(pct);
    setCurrent(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const onSeek = (e) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    audio.currentTime = ratio * (audio.duration || 0);
  };

  const playIndex = (index) => {
    const next = (index + playlist.length) % playlist.length;
    setCurrentIndex(next);
  };

  const playNext = () => playIndex(currentIndex + 1);
  const playPrev = () => playIndex(currentIndex - 1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  const toggleMute = () => setIsMuted((m) => !m);
  const changeVolume = (e) => setVolume(parseFloat(e.target.value));

  const formatTime = (s) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <section className="hero-section" id="home">
      <div className="overlay-gradient"></div>
      <main className="hero d-flex align-items-center">
        <Container>
          <div className="hero-content">
            <h1 className="hero-title">"More than a concert<br />it's a movement."</h1>

            <div className="audio-card">
              <div className="audio-top">
                <img className="track-art" src={heroImg} alt="Track art" />
                <div className="track-meta">
                  <div className="audio-header">
                    <div className="track-title">{currentTrack?.title || 'Track'}</div>
                    <i className="bi bi-soundwave"></i>
                  </div>
                  <div className="track-artist">{currentTrack?.artist || 'Artist'}</div>
                </div>
              </div>
              <div className="progress-wrap" ref={progressRef} onClick={onSeek}>
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="time-row">
                <span>{formatTime(current)}</span>
                <span className="muted">-{formatTime(Math.max(duration - current, 0))}</span>
              </div>
              <div className="controls">
                <div className="transport">
                  <button className="ctrl" aria-label="Previous" onClick={playPrev}>
                    <i className="bi bi-skip-backward-fill"></i>
                  </button>
                  <button className="ctrl primary" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                    <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'}`}></i>
                  </button>
                  <button className="ctrl" aria-label="Next" onClick={playNext}>
                    <i className="bi bi-skip-forward-fill"></i>
                  </button>
                </div>
                <div className="volume">
                  <button className="ctrl" aria-label="Mute/Unmute" onClick={toggleMute}>
                    <i className={`bi ${isMuted || volume === 0 ? 'bi-volume-mute-fill' : volume < 0.5 ? 'bi-volume-down-fill' : 'bi-volume-up-fill'}`}></i>
                  </button>
                  <input
                    className="volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={changeVolume}
                    aria-label="Volume"
                  />
                </div>
              </div>
              <audio
                ref={audioRef}
                src={currentTrack?.url}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onTimeUpdate}
                onEnded={playNext}
              />
            </div>
          </div>
        </Container>
      </main>
    </section>
  );
};

export default Home;
