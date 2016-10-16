import app from './app';

if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets =
    JSON.stringify(require('../static/manifest.json')); // eslint-disable-line
  // process.env.webpackChunkAssets =
  // JSON.stringify(require('../static/chunk-manifest.json')); // eslint-disable-line
}

const port = app.get('port');
const server = app.listen(port);

server.on('listening', () =>
  console.log(`Application started on ${app.get('host')}:${port}`) // eslint-disable-line
);
