# Building a React App with Edge Delivery Services

| bio |  |
| :---- | :---- |
| ![][image1] | React and Edge Delivery Services work together surprisingly well, giving developers the best of both worlds \- modern component architecture and headless content management. |

| index |
| :---- |

## Bringing React to Adobe's Edge Platform

You might already have a complex React application that your client wants to include in Edge Delivery Services. Perhaps as a separate page, perhaps as a block within existing content. This guide shows you how to make that integration work smoothly.

The complete code lives in the [react-with-eds GitHub repository](https://github.com/ddttom/react-with-eds) if you want to jump straight in.

## What We're Building

This tutorial walks through creating a React slide builder application that integrates with Adobe Edge Delivery Services. The application fetches slide content dynamically and provides an interactive viewing experience with modal panels for detailed content.

We'll use existing JSON data built with EDS, taken from my earlier post on [building headless applications with Edge Delivery Services](https://allabout.network/blogs/ddt/integrations/building-headless-applications-with-edge-delivery-services).

The finished application includes a responsive slide gallery with dynamic image loading, interactive modal panels for detailed slide content, smooth integration with Edge Delivery Services, and a production-ready React setup.

## Why Choose React for Edge Delivery Services

React brings several advantages to Edge Delivery Services development. Component reusability means you create modular, maintainable pieces. The Virtual DOM provides efficient rendering and updates for better performance. You get access to a vast ecosystem of components and tools, backed by extensive community support and resources. The declarative syntax makes code clear and predictable.

## Understanding JSX in React

Before we look at components, let's understand JSX (JavaScript XML). This syntax extension makes React code more readable and easier to write.

JSX allows you to write HTML-like code directly in JavaScript files. During the build process, it transforms into regular JavaScript. Here's a simple example:

`// This is JSX`  
`function Greeting({ name }) {`  
`return <h1>Hello, {name}!</h1>;`  
`}`

`// This is what it compiles to`  
`function Greeting({ name }) {`  
`return React.createElement('h1', null, 'Hello, ', name, '!');`  
`}`

Our application uses several key JSX features. We combine HTML-like tags with JavaScript expressions:

``<div className="slide-builder-item" style={{ backgroundImage: `url(${bgImage})` }}>``  
`<h2>{slideData.title}</h2>`  
`</div>`

Component composition works like HTML tags:

`<SlideBuilder slides={slides} />`  
`<SlidePanel onClose={() => setShowPanel(false)} />`

We pass data to components through props:

`<SlideItem`  
`key={slide.path}`  
`slideData={slide}`  
`index={index}`  
`/>`

Conditional rendering uses JavaScript expressions:

`{supportingText && (`  
`<p className="supporting-text">{supportingText}</p>`  
`)}`

Event handling connects to JavaScript functions:

`<button onClick={() =>`  
`setShowPanel(true)}>View Details</button>`

Remember these JSX rules: use `className` instead of `class` for CSS classes, close all tags (`<img />` not `<img>`), put JavaScript expressions inside curly braces `{}`, return a single root element from components, and use camelCase for all attributes.

## Application Architecture

Our slide builder consists of three main components. The **SlideBuilder** serves as the main container that fetches and organises slide data. Individual **SlideItem** components display slides with image loading and click handling. The **SlidePanel** modal component handles detailed slide content viewing.

## Setting Up the React Project

You can clone the complete project structure with `git clone https://github.com/ddttom/react-with-eds.git`, or start fresh by creating a new React project:

`# Create new React project`

`npx create-react-app react-with-eds`  
`cd react-with-eds`  
`npm install`

Organise your project with clear separation of concerns:

`/react-with-eds`  
`├── public/`  
`│   └── slides.html`  
`├── src/`  
`│   ├── App.js`  
`│   ├── App.css`  
`│   ├── index.js`  
`│   ├── components/`  
`│   │   ├── SlideBuilder.js`  
`│   │   ├── SlideItem.js`  
`│   │   └── SlidePanel.js`  
`│   └── styles/`  
`│       ├── SlideBuilder.css`  
`│       ├── SlideItem.css`  
`│       └── SlidePanel.css`  
`├── package.json`  
`└── README.md`

## Project Setup and Configuration

To handle different environments (development vs production), we use a configuration file:

`// src/config.js`

`const config = {`  
`// Use the full URL in development, relative path in production`  
`baseUrl: process.env.NODE_ENV === 'development'`  
`? 'https://allabout.network'`  
`: '',`  
`};`

`export default config;`

This allows us to use the full URL (`https://allabout.network/slides/query-index.json`) in development, switch to relative paths (`/slides/query-index.json`) in production, and change automatically based on the environment.

Our `package.json` includes all necessary dependencies and scripts:

`{`  
`"name": "react-with-eds",`  
`"version": "1.0.0",`  
`"private": true,`  
`"dependencies": {`  
`"react": "^18.2.0",`  
`"react-dom": "^18.2.0",`  
`"react-scripts": "5.0.1"`  
`},`

`"scripts": {`  
`"start": "react-scripts start",`  
`"build": "react-scripts build",`  
`"test": "react-scripts test",`  
`"lint": "eslint src/**/*.{js,jsx}",`  
`"lint:fix": "eslint src/**/*.{js,jsx} --fix"`  
`},`

`"eslintConfig": {`  
`"extends": [`  
`"react-app",`  
`"react-app/jest",`  
`"airbnb"`  
`]`  
`},`  
`"proxy": "https://allabout.network"`  
`}`

This configuration provides modern React with hooks, Airbnb style guide compliance, development and production builds, code quality tools, and proxy setup for local development.

The development workflow starts with installation:

`git clone https://github.com/ddttom/react-with-eds.git`  
`cd react-with-eds`  
`npm install`

For development, run `npm start` to launch the app with hot reloading. Build with `npm run build` for an optimised production version. Check code quality with `npm run lint` and fix issues automatically with `npm run lint:fix`.

## Testing Strategy

Our React application includes comprehensive testing using Jest and React Testing Library. This ensures components work as expected and maintain functionality as we make changes.

Our testing approach covers component testing (verifying rendering, user interactions, state management, and props handling), async operation testing (mocking API calls, testing loading states, verifying error handling, and checking data updates), error handling (network error scenarios, invalid data handling, user feedback verification, and recovery mechanisms), and best practices (tests alongside components, clear test descriptions, isolated test cases, and proper cleanup).

Run tests in watch mode with `npm test` or get coverage reports with `npm test -- --coverage`.  Tests are in the github repo.

## The Main App

The App component handles loading and error states:

`function App() {`  
  `const [slides, setSlides] = useState([]);`  
  `const [isLoading, setIsLoading] = useState(true);`  
  `const [error, setError] = useState(null);`

  `useEffect(() => {`  
    `fetchSlides();`  
  `}, []);`

  `const fetchSlides = async () => {`  
    `try {`  
      `setIsLoading(true);`  
      `setError(null);`  
        
      ``const response = await fetch(`${config.baseUrl}/slides/query-index.json`);``  
        
      `if (!response.ok) {`  
        ``throw new Error(`HTTP error! status: ${response.status}`);``  
      `}`  
        
      `const json = await response.json();`  
      `setSlides(json.data);`  
    `} catch (error) {`  
      `console.error("Failed to fetch slides:", error);`  
      `setError("Failed to fetch slides. Please try again later.");`  
    `} finally {`  
      `setIsLoading(false);`  
    `}`  
  `};`

  `return (`  
    `<div className="App">`  
      `<main>`  
        `{isLoading && <div>Loading...</div>}`  
        `{error && <div>{error}</div>}`  
        `{!isLoading && !error && <SlideBuilder slides={slides} />}`  
      `</main>`  
    `</div>`  
  `);`  
`}`

These include loading state management, error handling and display, clean component structure, proper async/await usage, and environment-aware configuration.

## Building the Components

The root App component demonstrates several key React and JSX concepts:

`import React, { useState, useEffect } from 'react';`  
`import SlideBuilder from './components/SlideBuilder';`

`import './App.css';`  
`function App() {`  
`// State management with useState hook`  
`const [slides, setSlides] = useState([]);`  
`// Side effects with useEffect hook`  
`useEffect(() => {`  
`fetchSlides();`  
`}, []);`

`// Async data fetching with proper error handling`  
`const fetchSlides = async () => {`  
`try {`  
`const response = await fetch("/slides/query-index.json");`  
`if (!response.ok) {`  
``throw new Error(`HTTP error! status: ${response.status}`);``  
`}`  
`const json = await response.json();`  
`setSlides(json.data);`  
`} catch (error) {`  
`console.error("Failed to fetch slides:", error);`  
`}`  
`};`

`// JSX return with component composition`

`return (`  
`<div className="App">`  
`<main>`  
`<SlideBuilder slides={slides} />`  
`</main>`  
`</div>`  
`);`  
`}`

`export default App;`

This demonstrates hooks (`useState` for state management, `useEffect` for side effects), async/await for clean asynchronous code, error handling with proper response validation, component composition using custom components in JSX, props for passing data between components, and JSX syntax with HTML-like structure containing JavaScript expressions.

The container component renders the slide collection:

`import React from 'react';`  
`import SlideItem from './SlideItem';`  
`import '../styles/SlideBuilder.css';`

`function SlideBuilder({ slides }) {`  
  `return (`  
    `<div className="slide-builder">`  
      `{slides.map((slide, index) => (`  
        `<SlideItem`   
          `key={slide.path}`   
          `slideData={slide}`   
          `index={index}`   
        `/>`  
      `))}`  
    `</div>`  
  `);`  
`}`

`export default SlideBuilder;`

This highlights React features including type-safe component communication through props, efficient list rendering with array mapping, and optimised React reconciliation using the key prop.

Each slide handles its own state, image loading, and content fetching:

`import React, { useState, useEffect, useCallback } from 'react';`  
`import SlidePanel from './SlidePanel';`  
`import '../styles/SlideItem.css';`

`function SlideItem({ slideData, index }) {`  
  `const [bgImage, setBgImage] = useState('');`  
  `const [supportingText, setSupportingText] = useState('');`  
  `const [showPanel, setShowPanel] = useState(false);`

  `const setSlideBackground = useCallback(() => {`  
    `const imageUrl = slideData.image.split('?')[0];`  
    ``const finalImageUrl = `${imageUrl}?width=2000&format=webply&optimize=medium`;``  
      
    `const img = new Image();`  
    `img.onload = () => setBgImage(finalImageUrl);`  
    ``img.onerror = () => console.error(`Failed to load image: ${finalImageUrl}`);``  
    `img.src = finalImageUrl;`  
  `}, [slideData.image]);`

  `const fetchSupportingText = useCallback(async () => {`  
    `if (window.innerWidth <= 799) return;`  
      
    `try {`  
      ``const response = await fetch(`${slideData.path}.plain.html`);``  
      `if (!response.ok) return;`  
        
      `const html = await response.text();`  
      `const parser = new DOMParser();`  
      `const doc = parser.parseFromString(html, 'text/html');`  
        
      `const h2 = doc.querySelector('h2');`  
      `let firstParagraph = h2 ? h2.nextElementSibling : doc.querySelector('p');`  
        
      `while (firstParagraph && firstParagraph.tagName.toLowerCase() !== 'p') {`  
        `firstParagraph = firstParagraph.nextElementSibling;`  
      `}`  
        
      `setSupportingText(firstParagraph?.textContent.trim() || null);`  
    `} catch (error) {`  
      `console.error('Failed to fetch supporting text:', error);`  
    `}`  
  `}, [slideData.path]);`

  `useEffect(() => {`  
    `setSlideBackground();`  
    `fetchSupportingText();`  
  `}, [setSlideBackground, fetchSupportingText]);`

  `return (`  
    `<>`  
      `<div`  
        `className="slide-builder-item"`  
        ``style={{ backgroundImage: `url(${bgImage})` }}``  
        `data-slidenum={index + 1}`  
        `onClick={() => setShowPanel(true)}`  
      `>`  
        `<div className="text-container">`  
          `<h2>{slideData.title}</h2>`  
          `<p><strong>{slideData.description}</strong></p>`  
          `{supportingText && <p className="supporting-text">{supportingText}</p>}`  
        `</div>`  
      `</div>`  
        
      `{showPanel && (`  
        `<SlidePanel`  
          `slideData={slideData}`  
          `onClose={() => setShowPanel(false)}`  
        `/>`  
      `)}`  
    `</>`  
  `);`  
`}`

`export default SlideItem;`

The modal component handles detailed content viewing:

`import React, { useState, useEffect, useRef } from 'react';`  
`import '../styles/SlidePanel.css';`

`function SlidePanel({ slideData, onClose }) {`  
  `const [html, setHtml] = useState('');`  
  `const panelRef = useRef(null);`

  `useEffect(() => {`  
    `const fetchSlideHtml = async () => {`  
      `try {`  
        ``const response = await fetch(`${slideData.path}.plain.html`);``  
          
        `if (!response.ok) {`  
          ``throw new Error(`Failed to fetch HTML for slide: ${slideData.path}`);``  
        `}`  
          
        `const text = await response.text();`  
        `setHtml(text);`  
      `} catch (error) {`  
        `console.error(error);`  
      `}`  
    `};`

    `fetchSlideHtml();`

    `const handleOutsideClick = (event) => {`  
      `if (panelRef.current && !panelRef.current.contains(event.target)) {`  
        `onClose();`  
      `}`  
    `};`

    `document.addEventListener('mousedown', handleOutsideClick);`  
      
    `return () => document.removeEventListener('mousedown', handleOutsideClick);`  
  `}, [slideData.path, onClose]);`

  `return (`  
    `<div`   
      `className="slide-panel-overlay"`   
      `onClick={(e) => e.target === e.currentTarget && onClose()}`  
    `>`  
      `<div className="slide-panel" ref={panelRef}>`  
        `<div className="slide-panel-content">`  
          `<div`   
            `className="slide-panel-body"`   
            `dangerouslySetInnerHTML={{ __html: html }}`   
          `/>`  
          `<button`   
            `className="slide-panel-close"`   
            `onClick={onClose}`   
            `aria-label="Close panel"`  
          `>`  
            `&times;`  
          `</button>`  
        `</div>`  
      `</div>`  
    `</div>`  
  `);`  
`}`

`export default SlidePanel;`

## Component Communication Patterns

React and JSX provide elegant patterns for component communication. For parent to child data flow, we use props:

`// Parent component`  
`function ParentComponent() {`  
  `const slide = {`  
    `title: "Example Slide",`  
    `description: "This is an example slide",`  
    `image: "/path/to/image.jpg"`  
  `};`  
  `const index = 0;`

  `return (`  
    `<div>`  
      `<SlideItem slideData={slide} index={index} />`  
    `</div>`  
  `);`  
`}`

`// Child component receiving props`  
`function SlideItem({ slideData, index }) {`  
  `// Use props in JSX`  
  `return (`  
    `<div className="slide-item">`  
      `<h2>{slideData.title}</h2>`  
      `<p>{slideData.description}</p>`  
      `<span>Slide {index + 1}</span>`  
    `</div>`  
  `);`  
`}`

For child to parent communication, we use callbacks:

`import React, { useState } from 'react';`

`// Parent component`  
`function SlideBuilder() {`  
  `const [showPanel, setShowPanel] = useState(true);`  
    
  `const handleClose = () => setShowPanel(false);`  
    
  `return (`  
    `<div>`  
      `{showPanel && (`  
        `<SlidePanel onClose={handleClose} />`  
      `)}`  
    `</div>`  
  `);`  
`}`

`// Child component`  
`function SlidePanel({ onClose }) {`  
  `return (`  
    `<div className="slide-panel">`  
      `<h2>Slide Panel Content</h2>`  
      `<button onClick={onClose}>`  
        `Close`  
      `</button>`  
    `</div>`  
  `);`  
`}`

State management with hooks keeps everything organised:

 `const [showPanel, setShowPanel] = useState(false);`

  `return (`  
    `<div>`  
      `<button onClick={() => setShowPanel(true)}>`  
        `Open Panel`  
      `</button>`  
        
      `{/* Using state in JSX - Conditional Rendering */}`  
      `{showPanel && (`  
        `<SlidePanel`   
          `onClose={() => setShowPanel(false)}`   
        `/>`  
      `)}`  
    `</div>`  
  `);`  
`}`

## Styling Architecture

React supports multiple styling approaches. We use modular CSS files for maintainability:  
     
`import '../styles/SlideItem.css';`

The modular approach allows each component to manage its own styles while sharing common design patterns. All CSS files are available in the [styles directory](https://github.com/ddttom/react-with-eds/tree/main/src/styles).

## Edge Delivery Services Integration

There are two main approaches for integration. The standalone page integration is recommended for most use cases.

For standalone page integration, first build for production:

`#build`  
`npm run build`

Then prepare your EDS repository. Navigate to your existing Edge Delivery Services repository and create the necessary structure:

`cd your-eds-repository`  
`# Copy assets`  
`cp -r ../react-with-eds/build/static/* ./static/`  
`cp ../react-with-eds/build/index.html ./slides.html`

`# Copy blocks for later`  
`cp -r ../react-with-eds/blocks/* blocks/`

Deploy with:

`git add .`  
`git commit -m "Add React slide builder application"`  
`git push`

Your React app will be available at `https://your-domain.com/slides.html`. My React app is here: [https://allabout.network/slides.html](https://allabout.network/slides.html).

## Create a React block for in-page React

For deeper integration where the React app appears as a block within EDS pages, create the block structure:

`#`  
`mkdir -p blocks/react-slide-builder`

Create **blocks/react-slide-builder/react-slide-builder.js**:

`export default function decorate(block) {`

`// Create container for React app`  
`const container = document.createElement('div');`  
`container.id = 'react-slide-app';`  
`block.appendChild(container);`

`// Load React bundle`

`const script = document.createElement('script');`  
`script.src = '/static/js/slide-builder-main.js'; // Your built JS file`  
`script.type = 'module';`

`document.head.appendChild(script);`

`// Load CSS`

`const link = document.createElement('link');`  
`link.rel = 'stylesheet';`  
`link.href = '/static/css/slide-builder-main.css'; // Your built CSS file`  
`document.head.appendChild(link);`  
`}`

Create **blocks/react-slide-builder/react-slide-builder.css**:

`.react-slide-builder {`  
`width: 100%;`  
`min-height: 400px;`  
`}`

`.react-slide-builder #react-slide-app {`  
`width: 100%;`  
`}`

We have modified the standard React index.jsx to check for the block container:  
`import React from 'react';`  
`import ReactDOM from 'react-dom/client';`  
`import './index.css';`  
`import App from './App.jsx';`

`const mountPoint = document.getElementById('react-slide-app') || document.getElementById('root');`

`if (mountPoint) {`  
  `ReactDOM.createRoot(mountPoint).render(`  
    `<React.StrictMode>`  
      `<App />`  
    `</React.StrictMode>`  
  `);`  
`}`

In your Document, add the block:  
![][image2]

I've used the block here: [https://allabout.network/blogs/ddt/integrations/reactjs-version-of-slide-builder](https://allabout.network/blogs/ddt/integrations/reactjs-version-of-slide-builder)

## Development Experience Benefits

React brings several advantages to Edge Delivery Services development. Component-based architecture creates reusable, maintainable components. The Virtual DOM provides efficient rendering and updates. You get access to a rich ecosystem with a vast library of tools and components. Strong community support offers extensive resources. The declarative syntax ensures clear, predictable code structure.

## Deployment Considerations

The application automatically handles different environments. In development mode (`npm start`), it uses the full URL for API calls, enables hot reloading, shows detailed error messages, and includes development tools. In production mode (`npm run build`), it uses relative paths, provides optimised and minified code, removes development tools, and delivers better performance.

When deploying to Edge Delivery Services, build the application with `npm run build`, copy the build files with `cp -r build/* your-eds-repository/`, and the application will automatically use the correct API endpoints based on the environment.

To work within CORS restrictions, use relative paths for all requests in production deployment, deploy the application to the same domain, and ensure all requests are same-origin. In the development environment, use the proxy configuration in `package.json` to make requests appear from the same origin while avoiding CORS issues.

This approach ensures full compliance with the Edge Delivery Services security policy, smooth operation in both development and production, no need to modify the CSP, and secure communication between the application and the CMS.

## Development Configuration

To handle CORS issues during local development, we use a proxy configuration in `package.json`:

`{`  
`"proxy": "https://allabout.network"`  
`}`

This setup allows us to use relative paths in our code, let the development server proxy requests to the Edge Delivery Services instance, avoid CORS issues during local development, and keep the same code structure for both environments.

The application uses a simple configuration in `src/config.js`:

`const config = {`  
`baseUrl: '', // Empty string for relative paths in both environments`  
`};`

`export default config;`

This configuration works in both environments. In development, the proxy handles forwarding requests to the full URL. In production, direct relative paths are used since the app is deployed to the same domain.

The development workflow starts by running `npm start`. The application will be available at [http://localhost:3000](http://localhost:3000). All API requests will be proxied to the Edge Delivery Services instance with no CORS issues and hot reloading for instant feedback.

When building for production, run `npm run build` and deploy the contents of the `build` directory. The application will use relative paths with no proxy needed since everything is on the same domain. The build process generates non-hashed filenames (`slide-builder-main.js` and `slide-builder-main.css`) for easier integration and no license file, making deployment simpler.

This approach provides a clean development experience without CORS issues, simple production deployment, consistent code between environments, and no environment-specific code changes needed.

## Conclusion

Building a React slide builder with Edge Delivery Services demonstrates the power of combining modern frontend frameworks with headless content management. This approach provides developer productivity through intuitive React patterns, content flexibility allowing authors to work in familiar document environments, performance through optimised builds and progressive loading, maintainability with clear component structure and separation of concerns, and scalability for easy extension with additional features and integrations.

The React ecosystem offers excellent tooling and community support, making it an ideal choice for Edge Delivery Services applications that require interactive, dynamic user interfaces.

Clone the [complete project](https://github.com/ddttom/react-with-eds) and customise it for your needs.

This pattern works excellently for portfolios, product showcases, educational content, marketing campaigns, and any scenario where you need rich, interactive content management with a modern development experience.

## Resources and Next Steps

For further learning, explore the [React documentation](https://reactjs.org), [Adobe Edge Delivery Services](https://www.aem.live), [Create React App](https://create-react-app.dev), and the [project repository](https://github.com/ddttom/react-with-eds).

⭐ **Found this helpful?** Star the [https://github.com/ddttom/react-with-eds](https://github.com/ddttom/react-with-eds) on GitHub\!

---

| fragment |
| :---- |
| /fragments/ddt/proposition |

| Section metadata |  |
| :---- | :---- |
| style | bg-dark |

---

Related Articles

| Blogroll |
| :---- |
| path=\* |

## 

| Blogroll (compact) |
| :---- |
| **path=\*** |

| Code-expander (text) |
| :---- |

| returntotop |
| :---- |
| Back to Top |

| metadata |  |
| :---- | :---- |
| title | Building a React App with Edge Delivery Services |
| description | Learn how to integrate React applications with Adobe Edge Delivery Services for modern, component-based content experiences |
| json-ld | article |
| image |  |
| author | Tom Cranstoun |
| longdescription | React and Edge Delivery Services work together to create powerful, interactive web experiences. This comprehensive guide walks through building a slide viewer application, from component architecture to production deployment. Whether you're integrating an existing React app or starting fresh, you'll learn practical patterns for combining modern frontend development with headless content management. |
| LinkedIn | [https://www.linkedin.com/in/tom-cranstoun/](https://www.linkedin.com/in/tom-cranstoun/) |
| publication-date | 12/Jun/2025 |
 