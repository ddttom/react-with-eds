import React, { useState, useEffect, useRef } from 'react';
import '../styles/SlidePanel.css';

function SlidePanel({ slideData, onClose }) {
  const [html, setHtml] = useState('');
  const panelRef = useRef(null);

  useEffect(() => {
    const fetchSlideHtml = async () => {
      try {
        const response = await fetch(`${slideData.path}.plain.html`);
        if (!response.ok) throw new Error(`Failed to fetch HTML for slide: ${slideData.path}`);
        const text = await response.text();
        setHtml(text);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSlideHtml();

    // Add event listener for clicks outside the panel
    const handleOutsideClick = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [slideData.path, onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="slide-panel-overlay" onClick={handleOverlayClick}>
      <div className="slide-panel" ref={panelRef}>
        <div className="slide-panel-content">
          <div 
            className="slide-panel-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <button className="slide-panel-close" onClick={onClose} aria-label="Close panel">&times;</button>
        </div>
      </div>
    </div>
  );
}

export default SlidePanel;