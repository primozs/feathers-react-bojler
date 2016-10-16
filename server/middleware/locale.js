import getLocaleMessagesData from '../../client/app/locale/util';

const handleLocale = (req, res, next) => {
  const cookies = req.cookies;
  if (cookies && 'language' in cookies) {
    req.localeData = getLocaleMessagesData(cookies.language);
    return next();
  }

  // get language from browser
  const acceptLanguageHeader = req.headers['accept-language'];
  if (acceptLanguageHeader) {
    const acceptedLanguages = acceptLanguageHeader.match(/[a-zA-z\-]{2,10}/g);

    for (let i = 0; i < acceptedLanguages.length; i++) {
      if (req.config.locales.indexOf(acceptedLanguages[i]) !== -1) {
        res.cookie('language', acceptedLanguages[i], {
          httpOnly: req.config.cookies.httpOnly,
          secure: req.config.cookies.secure,
          domain: req.config.cookies.domain,
          path: req.config.cookies.path,
          expires: new Date(Date.now() + (60 * 60 * 1000))
        });
        req.localeData = getLocaleMessagesData(acceptedLanguages[i]);
        return next();
      }
    }
  }

  // or set default language
  res.cookie('language', 'en', {
    httpOnly: req.config.cookies.httpOnly,
    secure: req.config.cookies.secure,
    domain: req.config.cookies.domain,
    path: req.config.cookies.path,
    expires: new Date(Date.now() + (60 * 60 * 1000))
  });

  req.localeData = getLocaleMessagesData('en');
  return next();
};

export default handleLocale;
