import React from 'react';
import { Container, Nav, Button } from 'react-bootstrap';

const Header = ({ activeSection }) => {
  return (
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
  );
};

export default Header;
