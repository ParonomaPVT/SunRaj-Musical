import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      document.body.classList.add('gallery-modal-open'); // Add class to hide nav
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('gallery-modal-open'); // Remove class to show nav
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('gallery-modal-open');
    };
  }, [showModal, selectedIndex]);

  return (
    <section id="gallery" className="gallery-section reveal visible">
      <Container>
        <div className="gallery-header text-center mb-5">
          <h2 className="gallery-title">Gallery</h2>
          <p className="gallery-subtitle">Capturing the magic of music through moments</p>
        </div>

        {/* Category Filter */}
        <div className="gallery-filters mb-4">
          <div className="filter-buttons d-flex justify-content-center flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <Row className="gallery-grid">
          {filteredImages.map((image, index) => (
            <Col key={image.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div 
                className="gallery-item"
                onClick={() => handleImageClick(image, index)}
              >
                <div className="image-container">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <i className="bi bi-zoom-in"></i>
                      <p className="image-caption">{image.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Enhanced Modal for Image Preview */}
        {showModal && (
          <div 
            className="gallery-modal-overlay"
            onClick={handleCloseModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button 
              className="modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            {/* Navigation Arrows */}
            <button 
              className="modal-nav-btn modal-nav-left"
              onClick={(e) => {
                e.stopPropagation();
                handlePreviousImage();
              }}
              aria-label="Previous image"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button 
              className="modal-nav-btn modal-nav-right"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              aria-label="Next image"
            >
              <i className="bi bi-chevron-right"></i>
            </button>

            {/* Main Image Container */}
            <div className="modal-image-container" onClick={(e) => e.stopPropagation()}>
              {selectedImage && (
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  className="modal-main-image"
                />
              )}
              
              {/* Image Counter */}
              <div className="image-counter">
                {selectedIndex + 1} / {filteredImages.length}
              </div>
            </div>
          </div>
        )}
      </Container>

      <style jsx>{`
        .gallery-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .gallery-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gallery-subtitle {
          font-size: 1.2rem;
          color: #b0b0b0;
          margin-bottom: 0;
        }

        .filter-btn {
          padding: 8px 20px;
          border: 2px solid #4ecdc4;
          background: transparent;
          color: #4ecdc4;
          border-radius: 25px;
          transition: all 0.3s ease;
          font-weight: 500;
          text-transform: capitalize;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: #4ecdc4;
          color: #1a1a2e;
          transform: translateY(-2px);
        }

        .gallery-item {
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover {
          transform: translateY(-5px);
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .gallery-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 107, 107, 0.8), rgba(78, 205, 196, 0.8));
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-item:hover .image-overlay {
          opacity: 1;
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.1);
        }

        .overlay-content {
          text-align: center;
          color: white;
        }

        .overlay-content i {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .image-caption {
          font-size: 1rem;
          font-weight: 500;
          margin: 0;
        }

         /* Enhanced Modal Styles */
         .gallery-modal-overlay {
           position: fixed;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           background: rgba(0, 0, 0, 0.95);
           z-index: 99999;
           display: flex;
           align-items: center;
           justify-content: center;
           backdrop-filter: blur(10px);
         }

         /* Hide navigation bar when modal is open */
         body.gallery-modal-open .site-nav {
           display: none !important;
         }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.8);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100001;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .modal-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 100001;
        }

        .modal-nav-left {
          left: 30px;
        }

        .modal-nav-right {
          right: 30px;
        }

        .modal-nav-btn:hover {
          background: rgba(78, 205, 196, 0.8);
          transform: translateY(-50%) scale(1.1);
        }

         .modal-image-container {
           position: relative;
           width: 100vw;
           height: 100vh;
           display: flex;
           align-items: center;
           justify-content: center;
           padding: 0;
           margin: 0;
         }

         .modal-main-image {
           max-width: 80vw;
           max-height: 80vh;
           width: auto;
           height: auto;
           object-fit: contain;
           border-radius: 15px;
           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
           display: block;
           margin: 0 auto;
         }

        .image-counter {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .gallery-section {
            padding: 60px 0;
            min-height: 100vh;
          }

          .gallery-title {
            font-size: 2.5rem;
          }
          
          .gallery-image {
            height: 200px;
          }
          
          .filter-buttons {
            gap: 10px;
          }
          
          .filter-btn {
            padding: 6px 15px;
            font-size: 0.9rem;
          }

          .modal-close-btn {
            top: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .modal-nav-btn {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .modal-nav-left {
            left: 15px;
          }

          .modal-nav-right {
            right: 15px;
          }

           .modal-image-container {
             width: 100vw;
             height: 100vh;
             padding: 0;
             margin: 0;
           }

           .modal-main-image {
             max-width: 90vw;
             max-height: 80vh;
           }

          .image-counter {
            bottom: -40px;
            font-size: 12px;
            padding: 8px 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
