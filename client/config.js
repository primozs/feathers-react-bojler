let config; // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  config = require('../config/client-production');
} else {
  config = require('../config/client-default');
}

export default config;
