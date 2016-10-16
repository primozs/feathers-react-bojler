const app = require('../../../server/app');

describe('message service', function() {
  it('registered the messages service', () => {
    expect(app.service('messages')).toBeTruthy();
  });
});
