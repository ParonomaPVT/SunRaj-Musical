import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Reach from './components/Reach';

const App = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const targets = ['home', 'about', 'services', 'gallery', 'contact']
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
      <Header activeSection={activeSection} />
      <Home />
      <About />
      <Services />
      <Reach />
      <Gallery />
      <Contact />
      
    </div>
  );
};

export default App;