const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Add support for JSON files
defaultConfig.resolver.assetExts.push('json');

module.exports = defaultConfig;