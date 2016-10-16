let config; // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  config = require('../../config/production.json');
} else {
  config = require('../../config/default.json');
}

export default config;
