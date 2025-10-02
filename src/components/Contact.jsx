import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import profileImage from '../assets/images/image.png';

const Contact = () => {
  return (
    <section id="contact" className="contact-section reveal visible">
      <Container>
        <div className="contact-content">
          {/* Centered Image */}
          <div className="contact-image-container">
            <div className="contact-image-wrapper">
              <img 
                src={profileImage} 
                alt="Nagendra Ruban"
                className="contact-profile-image"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="contact-text-content">
            <div className="contact-description">
              <p>
                <strong>Nagendra Ruban Concerts</strong> — Bringing the heartbeat of music to Europe.
              </p>
              
              <p>
                With deep roots in the music industry and a growing European footprint, Nagendra Ruban Concerts combines professionalism, creativity, and an unwavering commitment to excellence. Our events don't just entertain — they inspire.
              </p>
              
              <p>
                <strong>Join the Movement</strong> — Whether you're an artist, a venue, or a music fan, Nagendra Ruban Concerts is your gateway to the music you love. From intimate acoustic sessions to grand concert halls, we create experiences that resonate.
              </p>
            </div>
          </div>

          {/* Social Media & QR Code Section */}
          <div className="contact-bottom-section">
            <Row className="align-items-center">
              <Col md={6} className="text-center mb-4 mb-md-0">
                <div className="social-media-section">
                  <h4 className="social-title">Connect With Us</h4>
                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="Facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="social-link" aria-label="Instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" className="social-link" aria-label="Twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="social-link" aria-label="YouTube">
                      <i className="bi bi-youtube"></i>
                    </a>
                    <a href="#" className="social-link" aria-label="LinkedIn">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </Col>
              
              <Col md={6} className="text-center">
                <div className="qr-code-section">
                  <h4 className="qr-title">Scan to Connect</h4>
                  <div className="qr-code-wrapper">
                    <div className="qr-code-placeholder">
                      <i className="bi bi-qr-code"></i>
                      <p className="qr-text">QR Code</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .contact-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .contact-content {
          text-align: center;
        }

        .contact-image-container {
          margin-bottom: 40px;
        }

        .contact-image-wrapper {
          display: inline-block;
          position: relative;
        }

        .contact-profile-image {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #4ecdc4;
          box-shadow: 0 20px 40px rgba(78, 205, 196, 0.3);
          transition: transform 0.3s ease;
        }

        .contact-profile-image:hover {
          transform: scale(1.05);
        }

        .contact-text-content {
          max-width: 800px;
          margin: 0 auto 60px;
        }

        .contact-description p {
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 25px;
          color: #e0e0e0;
        }

        .contact-description strong {
          color: #4ecdc4;
          font-weight: 600;
        }

        .contact-bottom-section {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid rgba(78, 205, 196, 0.3);
        }

        .social-title,
        .qr-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 25px;
          color: #4ecdc4;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: rgba(78, 205, 196, 0.1);
          border: 2px solid #4ecdc4;
          border-radius: 50%;
          color: #4ecdc4;
          text-decoration: none;
          font-size: 20px;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: #4ecdc4;
          color: #1a1a2e;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(78, 205, 196, 0.4);
        }

        .qr-code-wrapper {
          display: inline-block;
        }

        .qr-code-placeholder {
          width: 150px;
          height: 150px;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid #4ecdc4;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #4ecdc4;
          margin: 0 auto;
          transition: all 0.3s ease;
        }

        .qr-code-placeholder:hover {
          background: rgba(78, 205, 196, 0.1);
          transform: scale(1.05);
        }

        .qr-code-placeholder i {
          font-size: 3rem;
          margin-bottom: 10px;
        }

        .qr-text {
          font-size: 0.9rem;
          font-weight: 500;
          margin: 0;
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 60px 0;
          }

          .contact-profile-image {
            width: 150px;
            height: 150px;
          }

          .contact-description p {
            font-size: 1.1rem;
            margin-bottom: 20px;
          }

          .social-title,
          .qr-title {
            font-size: 1.3rem;
          }

          .social-link {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }

          .qr-code-placeholder {
            width: 120px;
            height: 120px;
          }

          .qr-code-placeholder i {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 576px) {
          .contact-profile-image {
            width: 120px;
            height: 120px;
          }

          .contact-description p {
            font-size: 1rem;
          }

          .social-links {
            gap: 15px;
          }

          .social-link {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
