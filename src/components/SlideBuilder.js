import React from 'react';
import SlideItem from './SlideItem';
import '../styles/SlideBuilder.css';

function SlideBuilder({ slides }) {
  return (
    <div className="slide-builder">
      {slides.map((slide, index) => (
        <SlideItem key={slide.path} slideData={slide} index={index} />
      ))}
    </div>
  );
}

export default SlideBuilder;