import app from './app';

const port = app.get('port');
const server = app.listen(port);

server.on('listening', () =>
  console.log(`Application started on ${app.get('host')}:${port}`) /* eslint-disable-line */
);
