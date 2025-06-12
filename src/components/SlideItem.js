import React, { useState, useEffect, useCallback } from 'react';
import SlidePanel from './SlidePanel';
import '../styles/SlideItem.css';

function SlideItem({ slideData, index }) {
  const [bgImage, setBgImage] = useState('');
  const [supportingText, setSupportingText] = useState('');
  const [showPanel, setShowPanel] = useState(false);

  const fetchSupportingText = useCallback(async () => {
    if (window.innerWidth <= 799) {
      const html = await fetchSlideHtml(slideData.path);
      if (html) {
        const text = extractSupportingText(html);
        setSupportingText(text);
      }
    }
  }, [slideData.path]);

  const setSlideBackground = useCallback(() => {
    const imageUrl = slideData.image.split("?")[0];
    const finalImageUrl = `${imageUrl}?width=2000&format=webply&optimize=medium`;

    const img = new Image();
    img.src = finalImageUrl;
    img.onload = () => setBgImage(finalImageUrl);
    img.onerror = () => console.error(`Failed to load image: ${finalImageUrl}`);
  }, [slideData.image]);

  useEffect(() => {
    setSlideBackground();
    fetchSupportingText();
  }, [fetchSupportingText, setSlideBackground]);

  const fetchSlideHtml = async (path) => {
    try {
      const response = await fetch(`${path}.plain.html`);
      if (!response.ok) throw new Error(`Failed to fetch HTML for slide: ${path}`);
      return await response.text();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const extractSupportingText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const h2 = doc.querySelector("h2");
    let firstParagraph = h2 ? h2.nextElementSibling : doc.querySelector("p");
    while (firstParagraph && firstParagraph.tagName.toLowerCase() !== "p") {
      firstParagraph = firstParagraph.nextElementSibling;
    }
    return firstParagraph?.textContent.trim() || null;
  };

  return (
    <>
      <div
        className="slide-builder-item"
        style={{ backgroundImage: `url(${bgImage})` }}
        data-slidenum={index + 1}
        onClick={() => setShowPanel(true)}
      >
        <div className="text-container">
          <h2>{slideData.title}</h2>
          <p><strong>{slideData.description}</strong></p>
          {supportingText && <p className="supporting-text">{supportingText}</p>}
        </div>
      </div>
      {showPanel && (
        <SlidePanel slideData={slideData} onClose={() => setShowPanel(false)} />
      )}
    </>
  );
}

export default SlideItem;