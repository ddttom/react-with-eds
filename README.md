# React with EDS - Slide Builder Application

A React-based slide builder application, converted from an Adobe Edge Delivery Services (EDS) block implementation. This project demonstrates the integration of React components with EDS data structures and APIs.

## Project Overview

The Slide Builder React App allows users to view and interact with a collection of slides. Each slide displays an image, title, description, and supporting text. Users can click on a slide to view more detailed information in a panel. The application fetches slide data from EDS query endpoints and renders them using modern React patterns.

## Features

- **Interactive Slide Gallery**: Browse through a collection of slides with rich media content
- **Detailed Slide Panel**: Click on any slide to view expanded information
- **EDS Integration**: Seamlessly fetches data from Adobe Edge Delivery Services
- **Responsive Design**: Optimized for various screen sizes and devices
- **Modern React Architecture**: Built with React 18 and functional components

## Project Structure

```
react-with-eds/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md        # Bug report template
│   │   └── feature_request.md   # Feature request template
│   └── pull_request_template.md # Pull request template
├── public/
│   └── slides.html              # Static HTML template
├── src/
│   ├── components/
│   │   ├── SlideBuilder.js      # Main slide gallery component
│   │   ├── SlideItem.js         # Individual slide component
│   │   └── SlidePanel.js        # Detailed slide view panel
│   ├── styles/
│   │   ├── SlideBuilder.css     # Gallery styles
│   │   ├── SlideItem.css        # Individual slide styles
│   │   └── SlidePanel.css       # Panel styles
│   ├── App.js                   # Main application component
│   ├── App.css                  # Global application styles
│   ├── index.js                 # React application entry point
│   └── index.css                # Global CSS styles
├── .eslintrc.json               # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .prettierignore              # Prettier ignore patterns
├── .gitignore                   # Git ignore patterns
├── package.json                 # Project dependencies and scripts
├── CODE_OF_CONDUCT.md           # Code of conduct
├── CONTRIBUTING.md              # Contributing guidelines
├── LICENSE                      # MIT license
├── SECURITY.md                  # Security policy
└── README.md                    # This file
```

## Getting Started

### Prerequisites

- Node.js (version 18.0.0 or higher)
- npm (version 8.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ddttom/react-with-eds.git
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

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- **`npm start`** - Runs the app in development mode
- **`npm run build`** - Builds the app for production
- **`npm test`** - Launches the test runner
- **`npm run eject`** - Ejects from Create React App (one-way operation)
- **`npm run lint`** - Runs ESLint and fixes issues automatically
- **`npm run lint:check`** - Runs ESLint without fixing issues
- **`npm run format`** - Formats code using Prettier
- **`npm run format:check`** - Checks code formatting without fixing

## Data Integration

The application expects slide data to be available at `/slides/query-index.json` endpoint. The data structure should follow the EDS query index format:

```json
{
  "data": [
    {
      "image": "path/to/image.jpg",
      "title": "Slide Title",
      "description": "Slide description",
      "text": "Supporting text content"
    }
  ]
}
```

## Component Architecture

### SlideBuilder
The main container component that:
- Fetches slide data from the EDS endpoint
- Manages the overall state of the slide gallery
- Handles slide selection and panel display

### SlideItem
Individual slide components that:
- Display slide preview information
- Handle click events for detailed view
- Provide responsive image handling

### SlidePanel
Detailed view component that:
- Shows expanded slide information
- Provides close functionality
- Handles overlay interactions

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and follows React best practices:

- Functional components with hooks
- Modern ES6+ JavaScript syntax
- CSS modules for component styling
- Responsive design principles

### Code Quality Tools

The project includes several tools to maintain code quality:

- **ESLint** - JavaScript linting with React-specific rules
- **Prettier** - Code formatting for consistent style
- **Testing** - React Testing Library for component testing

### Development Workflow

1. **Code Formatting**: Run `npm run format` to format your code
2. **Linting**: Run `npm run lint` to check and fix code issues
3. **Testing**: Run `npm test` to execute tests
4. **Building**: Run `npm run build` to create production build

## Deployment to Edge Delivery Services

To integrate your React application with Adobe Edge Delivery Services, follow these steps:

### Build the Production Output

1. **Create a Production Build:**
   
   In your project directory, run:
   ```bash
   npm run build
   ```
   
   This command creates a `build` directory with a production build of your app.

2. **Build Directory Structure:**
   
   The build directory will contain:
   ```
   build/
   ├── index.html
   └── static/
       ├── css/
       │   └── (minified CSS files)
       └── js/
           └── (minified JavaScript files)
   ```

### Integration with Edge Delivery Services

1. **Copy Build Contents:**
   
   Copy the internal contents of the `build` folder (the `static` folder and `index.html`) to the root of your Edge Delivery Services repository.

2. **Rename the HTML File:**
   
   Rename `index.html` to `slides.html` to match your EDS structure.

3. **Final Repository Structure:**
   
   Your Edge Delivery Services repository should now include:
   ```
   your-eds-repo/
   ├── slides.html          # Renamed from index.html
   ├── static/              # React build assets
   │   ├── css/
   │   └── js/
   └── (other EDS files)
   ```

4. **Deploy:**
   
   Commit and push your repository to deploy the integrated React application.

### Integration Benefits

Converting an Edge Delivery Services block to a React application provides:

- **Component Reusability**: Break down monolithic structures into reusable components
- **React Ecosystem**: Leverage React's lifecycle, hooks, and extensive library ecosystem
- **Enhanced Development**: Better development experience with modern tooling
- **Extensibility**: Easy integration with existing React applications or sophisticated components

This conversion allows you to maintain the performance benefits of Edge Delivery Services while gaining the flexibility and power of React's component-based architecture. If your customer already has a React application, calculator, or other sophisticated components, you can easily integrate them into your Edge Delivery Services site collection.

## Browser Support

The application supports modern browsers as defined in the browserslist configuration:

**Production:**
- \>0.2% market share
- Not dead browsers
- Not Opera Mini

**Development:**
- Latest Chrome, Firefox, and Safari versions

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Documentation

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## Adobe Edge Delivery Services

This project demonstrates integration patterns with Adobe Edge Delivery Services (EDS). For more information about EDS, visit the [official documentation](https://www.aem.live/developer/tutorial).
