import React, { useState, useEffect } from 'react';
import SlideBuilder from './components/SlideBuilder';
import config from './config';
import './App.css';

function App() {
  // State management with useState hook
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Side effects with useEffect hook
  useEffect(() => {
    fetchSlides();
  }, []);

  // Async data fetching with proper error handling
  const fetchSlides = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Use config.baseUrl to handle different environments
      const response = await fetch(`${config.baseUrl}/slides/query-index.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setSlides(json.data);
    } catch (error) {
      console.error("Failed to fetch slides:", error);
      setError("Failed to fetch slides. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // JSX return with component composition
  return (
    <div className="App">
      <main>
        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!isLoading && !error && <SlideBuilder slides={slides} />}
      </main>
    </div>
  );
}

export default App; 
