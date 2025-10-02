import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Services = () => {
  return (
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
            To elevate Europe's live music culture by connecting artists and audiences through powerful, immersive events. We believe music is a universal language — and we're fluent in every beat.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Services;
