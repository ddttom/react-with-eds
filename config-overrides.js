const { override, disableEsLint } = require('customize-cra');

module.exports = override(
  // Disable ESLint during build
  disableEsLint(),
  
  // Override webpack config
  (config) => {
    // Set custom filenames
    config.output.filename = 'static/js/slide-builder-main.js';
    config.output.chunkFilename = 'static/js/slide-builder-main.chunk.js';
    
    // Update CSS filename
    const cssPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (cssPlugin) {
      cssPlugin.options.filename = 'static/css/slide-builder-main.css';
      cssPlugin.options.chunkFilename = 'static/css/slide-builder-main.chunk.css';
    }

    // Disable license file generation
    const terserPlugin = config.optimization.minimizer.find(
      (plugin) => plugin.constructor.name === 'TerserPlugin'
    );
    if (terserPlugin) {
      terserPlugin.options.extractComments = false;
    }

    return config;
  }
); 
