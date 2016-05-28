'use strict';

module.exports = function() {
  return function(req, res, next) {
    const acceptLanguageHeader = req.headers['accept-language'];

    if (acceptLanguageHeader) {
      const acceptedLanguages = acceptLanguageHeader.match(/[a-zA-z\-]{2,10}/g);
      if (acceptedLanguages) {
        res.cookie('languages', JSON.stringify(acceptedLanguages));
      }
    }
    next();
  };
};
