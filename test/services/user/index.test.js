const app = require('../../../server/app');

describe('user service', function() {
  it('registered the users service', () => {
    expect(app.service('users')).toBeTruthy();
  });
});
