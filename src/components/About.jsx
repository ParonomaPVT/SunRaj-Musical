import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <section id="about" className="about-section reveal visible" style={{ background: 'rgba(14, 31, 74, 1)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <h2 className="about-title text-center">About Us</h2>
            <div className="about-body">
              <p className="about-text">
                <strong>Nagendra Ruban Concerts</strong> — Bringing the heartbeat of music to Europe.
              </p>
              <p className="about-text">
                Nagendra Ruban Concerts is a premier music event company dedicated to curating unforgettable live experiences across France and throughout Europe. From intimate showcases to stadium-shaking performances, we specialize in turning sound into spectacle.
              </p>
              <p className="about-text">
                <strong>Where We Operate</strong> — Our concerts light up cities across France — from Paris to Marseille — and extend to vibrant music scenes in Germany, Italy, Spain, the Netherlands, and beyond. Wherever there's a stage, we bring the energy.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
