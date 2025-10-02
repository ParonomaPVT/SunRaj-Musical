import React from 'react';
import { Container } from 'react-bootstrap';
import mapImg from '../assets/map.png';

const Reach = () => {
  return (
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
            Whether you're in Berlin, Rome, Amsterdam, Madrid, Vienna, or Prague — SunRajMusic is there, amplifying local talent and global beats.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Reach;
