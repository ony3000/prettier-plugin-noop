import prettier from 'prettier';

if (prettier.version.startsWith('2.')) {
  // eslint-disable-next-line global-require
  module.exports = require('v2-plugin');
} else {
  // eslint-disable-next-line global-require
  module.exports = require('v3-plugin');
}
