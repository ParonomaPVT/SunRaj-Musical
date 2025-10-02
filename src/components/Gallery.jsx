import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Gallery images - using existing assets and placeholder for missing ones
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      alt: 'Concert Performance',
      category: 'concerts'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=500&fit=crop',
      alt: 'Artist on Stage',
      category: 'concerts'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      alt: 'Music Studio Session',
      category: 'studio'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
      alt: 'Behind the Scenes',
      category: 'behind-scenes'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=500&fit=crop',
      alt: 'Crowd at Concert',
      category: 'concerts'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      alt: 'Artist Portrait',
      category: 'portraits'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
      alt: 'Stage Setup',
      category: 'concerts'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop',
      alt: 'Musical Instruments',
      category: 'instruments'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
      alt: 'Concert Lighting',
      category: 'concerts'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
      alt: 'Artist Performance',
      category: 'concerts'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop',
      alt: 'Music Festival',
      category: 'festivals'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop',
      alt: 'Recording Session',
      category: 'studio'
    }
  ];

  const categories = ['all', 'concerts', 'studio', 'behind-scenes', 'portraits', 'instruments', 'festivals'];
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    setSelectedIndex(0);
  };

  const handlePreviousImage = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : filteredImages.length - 1;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = selectedIndex < filteredImages.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    } else if (e.key === 'ArrowLeft') {
      handlePreviousImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    }
  };

  // Add keyboard event listener when modal is open
  useEffect(() => {
    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showModal, selectedIndex]);

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">Gallery</h2>
            <p className="lead text-muted">Capturing the magic of music through moments</p>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <div className="d-flex justify-content-center flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'light' : 'outline-light'}
                  size="sm"
                  className="rounded-pill px-3 py-2"
                  style={{
                    backgroundColor: activeCategory === category ? 'white' : 'transparent',
                    color: activeCategory === category ? 'black' : 'white',
                    border: activeCategory === category ? '2px solid white' : 'none'
                  }}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <Row>
            {filteredImages.map((image, index) => (
              <Col key={image.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <div 
                  className="position-relative overflow-hidden rounded shadow"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleImageClick(image, index)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="img-fluid w-100"
                    style={{ height: '250px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 opacity-0" style={{ transition: 'opacity 0.3s ease' }}>
                    <div className="text-center text-white">
                      <i className="bi bi-zoom-in fs-1 mb-2"></i>
                      <p className="mb-0">{image.alt}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Bootstrap Modal for Image Preview */}
          <Modal 
            show={showModal} 
            onHide={handleCloseModal}
            size="xl"
            centered
            className="modal-fullscreen-lg-down"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
          >
            <Modal.Header className="bg-dark border-secondary position-relative">
              <Modal.Title className="text-white">{selectedImage?.alt}</Modal.Title>
              <Button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                aria-label="Close"
                onClick={handleCloseModal}
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%'
                }}
              >
                <i className="bi bi-x-lg text-white"></i>
              </Button>
            </Modal.Header>
            <Modal.Body className="p-0 position-relative bg-dark">
              {selectedImage && (
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  className="img-fluid w-100"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
              )}
              
              {/* Navigation Arrows */}
              <Button
                variant="secondary"
                className="position-absolute top-50 start-0 translate-middle-y rounded-circle border-0"
                style={{ left: '20px', width: '50px', height: '50px', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                onClick={handlePreviousImage}
              >
                <i className="bi bi-chevron-left text-white"></i>
              </Button>
              
              <Button
                variant="secondary"
                className="position-absolute top-50 end-0 translate-middle-y rounded-circle border-0"
                style={{ right: '20px', width: '50px', height: '50px', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                onClick={handleNextImage}
              >
                <i className="bi bi-chevron-right text-white"></i>
              </Button>
            </Modal.Body>
            <Modal.Footer className="justify-content-center bg-dark border-secondary">
              <small className="text-light">
                {selectedIndex + 1} / {filteredImages.length}
              </small>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Gallery;
