# React with Edge Delivery Services

A React.js application that integrates with Adobe Edge Delivery Services, featuring a dynamic slide gallery with interactive panels.

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

## Getting Started

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

### Production Mode
- Uses direct relative paths
- No proxy configuration
- Deployed to the same domain as the Edge Delivery Services instance
- Requests go directly to the server

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
│   ├── config.js       # Environment configuration
│   ├── App.jsx         # Main application component
│   └── index.js        # Application entry point
├── config-overrides.js # Custom webpack configuration
└── package.json        # Project configuration
```

## Build Configuration

The application uses a custom webpack configuration to optimize the build process:

- Non-hashed filenames for easier integration (`slide-builder-main.js` and `slide-builder-main.css`)
- No license file generation in production builds
- Optimized asset loading
- Development proxy for local testing

This is configured in `config-overrides.js` using `react-app-rewired` and `customize-cra`.

## Configuration

The application uses different URL configurations for development and production:

- Development: Uses a proxy to forward requests to the Edge Delivery Services instance
- Production: Uses relative paths since the app is deployed to the same domain

This is handled in `src/config.js`:
```javascript
const config = {
  baseUrl: '', // Empty string for relative paths in both environments
};
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the contents of the `build` directory to your Edge Delivery Services instance

3. Ensure the application is deployed to the same domain as your Edge Delivery Services instance

## Testing

The application includes a comprehensive test suite using Jest and React Testing Library:

```bash
npm test
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
