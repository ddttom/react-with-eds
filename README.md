# React Slide Builder (with Edge Delivery Services)

This project is a React slide builder application that integrates with Adobe Edge Delivery Services. It fetches slide content dynamically and provides an interactive slide gallery with modal panels for detailed slide content.

## Features

- Responsive slide gallery with dynamic image loading
- Interactive modal panels for detailed content
- Seamless integration with Edge Delivery Services
- Development proxy for local testing
- Production-ready build configuration with non-hashed filenames
- No license file generation in production builds
- Compliance with Edge Delivery Services security policy

## Security Considerations

The application is designed to work within Edge Delivery Services' Content Security Policy:

```
default-src 'self';
script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://www.google-analytics.com;
connect-src 'self' https://*.google-analytics.com;
```

To maintain security:
- Production: Uses relative paths and same-origin requests
- Development: Uses a proxy to simulate same-origin requests
- No modifications to the CSP are required
- All requests comply with the security policy

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Access to an Edge Delivery Services instance

## Project Structure

The project is organized as follows:

- **public/** – Contains static assets (e.g. slides.html) and the production build (index.html, static/*).
- **src/** – Contains the React application source:
  - **App.jsx** – The root component (handles loading, error states, and fetching slide data).
  - **index.jsx** – Entry point (mounts the React app).
  – **config.js** – Configuration (e.g. baseUrl for API endpoints) for development and production.
  – **components/** – React components (SlideBuilder, SlideItem, SlidePanel) (using .jsx).
  – **styles/** – Modular CSS files (SlideBuilder.css, SlideItem.css, SlidePanel.css).
  – **tests/** – Dedicated test directory (e.g. App.test.jsx, SlideBuilder.test.jsx, SlideItem.test.jsx, SlidePanel.test.jsx).
- **package.json** – Dependencies, scripts (start, build, test, lint, etc.) and proxy (for local development).
- **README.md** – This file.

## Development

- **Installation:**  
  Clone the repo and install dependencies:
  ```bash
  git clone https://github.com/ddttom/react-with-eds.git
  cd react-with-eds
  npm install
  ```
- **Development Mode:**  
  Run `npm start` (or `react-scripts start`) to launch the app (with hot reloading) at [http://localhost:3000](http://localhost:3000). (API requests are proxied via package.json's "proxy" setting.)
- **Production Build:**  
  Run `npm run build` (or `react-scripts build`) to generate an optimized production build (in the build/ folder).  
- **Linting:**  
  Run `npm run lint` (or `eslint src/**/*.{js,jsx}`) to check code quality. (Use `npm run lint:fix` to automatically fix issues.)

## Testing

- **Test Suite:**  
  Tests are located in the `src/tests/` directory (e.g. App.test.jsx, SlideBuilder.test.jsx, SlideItem.test.jsx, SlidePanel.test.jsx).  
- **Running Tests:**  
  Run `npm test` (or `react-scripts test`) to execute the test suite (in watch mode).  
- **Current Status:**  
  All tests pass (green suite) – the test suite is up to date and reflects the current project structure and modern React practices (using .jsx).

## Deployment (Edge Delivery Services Integration)

- **Production Build:**  
  Run `npm run build` (or `react-scripts build`) to generate a production build (in the build/ folder).  
- **Deploying:**  
  Copy the contents of the build folder (e.g. index.html, static/*) into your Edge Delivery Services repository (e.g. into a "slides" folder or as a block).  
- **Configuration:**  
1. Clone the repository:
```bash
git clone https://github.com/yourusername/react-with-eds.git
cd react-with-eds
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Development vs Production

### Development Mode
- Uses a proxy to forward requests to the Edge Delivery Services instance
- Configured in `package.json` with `"proxy": "https://allabout.network"`
- Requests use relative paths (e.g., `/slides/query-index.json`)
- The proxy handles forwarding to the full URL
- Avoids CORS issues during local development
- Hot reloading enabled for instant feedback
- Development tools and detailed error messages available

### Production Mode
- Uses direct relative paths
- No proxy configuration
- Deployed to the same domain as the Edge Delivery Services instance
- Requests go directly to the server
- Optimized and minified code
- Development tools removed
- Better performance

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Creates a production build
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from create-react-app

## Project Structure

```
/react-with-eds
├── public/
│   ├── index.html      # Development entry point
│   └── slides.html     # Production entry point
├── src/
│   ├── components/     # React components
│   │   ├── SlideBuilder.jsx  # Main slide container component
│   │   ├── SlideItem.jsx     # Individual slide component
│   │   └── SlidePanel.jsx    # Modal panel component
│   ├── styles/         # Component-specific styles
│   │   ├── SlideBuilder.css
│   │   ├── SlideItem.css
│   │   └── SlidePanel.css
│   ├── tests/          # Test files
│   │   ├── components/       # Component tests
│   │   │   ├── SlideBuilder.test.jsx
│   │   │   ├── SlideItem.test.jsx
│   │   │   └── SlidePanel.test.jsx
│   │   └── App.test.jsx     # Application tests
│   ├── config.js       # Environment configuration
│   ├── App.jsx         # Main application component
│   └── index.jsx       # Application entry point
├── blocks/             # Edge Delivery Services blocks
│   └── react-slide-builder/
│       ├── react-slide-builder.js
│       └── react-slide-builder.css
├── config-overrides.js # Custom webpack configuration
└── package.json        # Project configuration
```

## Build Configuration

The application uses a custom webpack configuration to optimize the build process:

- Non-hashed filenames for easier integration (`slide-builder-main.js` and `slide-builder-main.css`)
- No license file generation in production builds
- Optimized asset loading
- Development proxy for local testing
- JSX syntax support
- Modern JavaScript features enabled
- CSS modules support

This is configured in `config-overrides.js` using `react-app-rewired` and `customize-cra`.

## Configuration

The application uses different URL configurations for development and production:

- Development: Uses a proxy to forward requests to the Edge Delivery Services instance
- Production: Uses relative paths since the app is deployed to the same domain

This is handled in `src/config.js`:
```javascript
const config = {
  // Empty string for relative paths in both environments
  // In development: The proxy in package.json handles the base URL
  baseUrl: '',
};

export default config;
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the contents of the `build` directory to your Edge Delivery Services instance

3. Ensure the application is deployed to the same domain as your Edge Delivery Services instance

## Testing

The application includes a comprehensive test suite using Jest and React Testing Library. Tests are organized in a dedicated `src/tests` directory:

```bash
npm test
```

### Test Organization
- `src/tests/components/` - Component-specific tests
  - `SlideBuilder.test.jsx` - Tests for the main slide container
  - `SlideItem.test.jsx` - Tests for individual slide components
  - `SlidePanel.test.jsx` - Tests for the modal panel
- `src/tests/App.test.jsx` - Application-level tests

### Test Coverage
- Component rendering
- User interactions
- State management
- Props handling
- Async operations
- Error scenarios

Run tests in watch mode:
```bash
npm test
```

Generate coverage report:
```bash
npm test -- --coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Contact

For expert guidance on React.js applications or Edge Delivery Services integration, contact:
[info@digitaldomaintechnologies.com](mailto:info@digitaldomaintechnologies.com)
