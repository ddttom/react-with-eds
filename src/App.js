import React, { useState, useEffect } from 'react';
import SlideBuilder from './components/SlideBuilder';
import './App.css';

function App() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/slides/query-index.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setSlides(json.data);
    } catch (error) {
      console.error("Failed to fetch slides:", error);
    }
  };

  return (
    <div className="App">
       <main>
        <SlideBuilder slides={slides} />
      </main>
    </div>
  );
}

export default App;