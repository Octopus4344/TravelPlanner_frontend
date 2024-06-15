const path = require('path');
const os = require('os');
const crypto = require('crypto');

module.exports = function override(config) {
  config.resolve.fallback = {
    buffer: require.resolve('buffer/'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify')
  };
  return config;
};

