import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import mapImg from '../assets/map.png';

const Reach = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  const mapRef = useRef(null);

  const locations = [
    {
      id: 1,
      name: "Paris, France",
      position: { top: '35%', left: '48%' },
      description: "Our flagship European branch in the heart of Paris. Home to our main recording studio and concert hall, hosting over 200 events annually.",
      details: "📍 15 Rue de la Musique, 75001 Paris\n🎵 Main Studio & Concert Hall\n📞 +33 1 42 86 17 00\n✨ Capacity: 1,200 guests"
    },
    {
      id: 2,
      name: "Berlin, Germany", 
      position: { top: '28%', left: '52%' },
      description: "Our innovative Berlin branch specializes in electronic music production and underground concert experiences in the vibrant German capital.",
      details: "📍 Musikstraße 42, 10178 Berlin\n🎵 Electronic Music Hub\n📞 +49 30 2462 7890\n✨ Capacity: 800 guests"
    },
    {
      id: 3,
      name: "Amsterdam, Netherlands",
      position: { top: '25%', left: '49%' },
      description: "Our Amsterdam location focuses on intimate acoustic performances and houses our European artist development program.",
      details: "📍 Concertgebouwplein 8, 1071 LN Amsterdam\n🎵 Acoustic Performance Center\n📞 +31 20 573 0573\n✨ Capacity: 600 guests"
    }
  ];

  const handleLocationClick = (location, event) => {
    event.stopPropagation(); // Prevent event bubbling
    setActiveLocation(activeLocation?.id === location.id ? null : location);
  };

  const handleClosePopup = () => {
    setActiveLocation(null);
  };

  const handleMapClick = (event) => {
    // Close popup if clicking on the map background (not on markers or popup)
    if (event.target === mapRef.current || event.target.classList.contains('reach-overlay')) {
      setActiveLocation(null);
    }
  };

  // Close popup when clicking outside the map area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setActiveLocation(null);
      }
    };

    if (activeLocation) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeLocation]);

  return (
    <section id="reach" className="reach-section reveal visible">
      <Container>
        <div className="reach-grid">
          <div className="reach-side">We Serve All Over</div>
          <div 
            ref={mapRef}
            className="reach-map" 
            style={{ backgroundImage: `url(${mapImg})` }}
            onClick={handleMapClick}
          >
            <div className="reach-overlay"></div>
            
            {/* Location Markers */}
            {locations.map((location) => (
              <div
                key={location.id}
                className={`location-marker ${activeLocation?.id === location.id ? 'active' : ''}`}
                style={location.position}
                onClick={(event) => handleLocationClick(location, event)}
              >
                <div className="marker-pulse"></div>
                <div className="marker-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
              </div>
            ))}

            {/* Location Popup */}
            {activeLocation && (
              <div 
                className="location-popup"
                style={activeLocation.position}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="popup-content">
                  <button 
                    className="popup-close"
                    onClick={handleClosePopup}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                  <h4 className="popup-title">{activeLocation.name}</h4>
                  <p className="popup-description">{activeLocation.description}</p>
                  <div className="popup-details">
                    {activeLocation.details.split('\n').map((line, index) => (
                      <div key={index} className="detail-line">{line}</div>
                    ))}
                  </div>
                  <button className="popup-cta">
                    <i className="bi bi-calendar-event"></i>
                    Book Event
                  </button>
                </div>
                <div className="popup-arrow"></div>
              </div>
            )}
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
