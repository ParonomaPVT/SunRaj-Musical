import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import heroImg from './assets/home.png';
import aboutBg from './assets/aboutus.png';
import mapImg from './assets/map.png';
import './App.css';

const App = () => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const playlist = useMemo(() => {
    const imported = import.meta.glob('./assets/*.{mp3,wav,ogg}', { eager: true });
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

  useEffect(() => {
    const targets = ['home', 'about', 'services']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && visible.target && visible.target.id) {
          const id = visible.target.id;
          setActiveSection(id === 'home' ? '' : id);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-10% 0px -70% 0px',
      }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-page">

      <header className="site-nav">
        <Container className="d-flex align-items-center justify-content-between">
          <a className="brand d-flex align-items-center text-decoration-none" href="#home">
            <span className="brand-mark me-2"></span>
            <span className="brand-text">SunRaj Musical</span>
          </a>
          <Nav className="nav-links align-items-center">
            <Nav.Link href="#about" className={`mx-3 ${activeSection === 'about' ? 'is-active' : ''}`}>About Us</Nav.Link>
            <Nav.Link href="#services" className={`mx-3 ${activeSection === 'services' ? 'is-active' : ''}`}>Services</Nav.Link>
            <Nav.Link href="#gallery" className={`mx-3 ${activeSection === 'gallery' ? 'is-active' : ''}`}>Gallery</Nav.Link>
            <Nav.Link href="#contact" className={`mx-3 ${activeSection === 'contact' ? 'is-active' : ''}`}>Contact Us</Nav.Link>
            <Button variant="outline-light" className="ms-1 book-btn">Book Now</Button>
          </Nav>
        </Container>
      </header>

      <section className="hero-section" id="home">
        <div className="overlay-gradient"></div>
        <main className="hero d-flex align-items-center">
          <Container>
            <div className="hero-content">
            <h1 className="hero-title">“More than a concert<br />it’s a movement.”</h1>

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

      <section id="about" className="about-section reveal visible" style={{ backgroundImage: `url(${aboutBg})` }}>
        <div className="about-scrim"></div>
        <Container>
          <h2 className="about-title">About Us</h2>
          <div className="about-body">
            <p className="about-text">
              <strong>Nagendra Ruban Concerts</strong> — Bringing the heartbeat of music to Europe.
            </p>
            <p className="about-text">
              Nagendra Ruban Concerts is a premier music event company dedicated to curating unforgettable live experiences across France and throughout Europe. From intimate showcases to stadium-shaking performances, we specialize in turning sound into spectacle.
            </p>
            <p className="about-text">
              <strong>Where We Operate</strong> — Our concerts light up cities across France — from Paris to Marseille — and extend to vibrant music scenes in Germany, Italy, Spain, the Netherlands, and beyond. Wherever there’s a stage, we bring the energy.
            </p>
          </div>
        </Container>
      </section>

      <section id="services" className="services-section reveal visible">
        <Container>
          <h2 className="services-title">What We Do</h2>
          <ul className="services-list">
            <li>Organize and produce high‑impact music concerts</li>
            <li>Partner with European venues and global artists</li>
            <li>Deliver seamless event logistics and production</li>
            <li>Build communities of passionate music fans</li>
          </ul>
          <div className="mission">
            <div className="mission-kicker">Our Mission</div>
            <p>
              To elevate Europe’s live music culture by connecting artists and audiences through powerful, immersive events. We believe music is a universal language — and we’re fluent in every beat.
            </p>
          </div>
        </Container>
      </section>

      <section id="reach" className="reach-section reveal visible">
        <Container>
          <div className="reach-grid">
            <div className="reach-side">We Serve All Over</div>
            <div className="reach-map" style={{ backgroundImage: `url(${mapImg})` }}>
              <div className="reach-overlay"></div>
            </div>
          </div>
          <div className="reach-notes">
            <p>
              Spreading Rhythms Across Europe — From the vibrant streets of Paris to the scenic corners of Marseille, Lyon, and Bordeaux — SunRajMusic is making waves in every city across France and throughout Europe. As a dynamic force in the music industry, SunRajMusic brings together artists, audiences, and cultures through unforgettable soundscapes and immersive musical experiences.
            </p>
            <p>
              Whether you’re in Berlin, Rome, Amsterdam, Madrid, Vienna, or Prague — SunRajMusic is there, amplifying local talent and global beats.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default App;