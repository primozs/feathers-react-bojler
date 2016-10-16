import { addLocaleData } from 'react-intl';
import { getCurrentLocale, getLocaleData } from 'grommet/utils/Locale';
import Cookies from 'grommet/utils/Cookies';

/**
 * Returns locale data (locale and messages)
 *
 * localeData.locale
 * localeData.messages
 *
 * @returns {Object}
 */
export default function getLocaleMessagesData(locale = '') {
  if (process.env.CLIENT) {
    locale = Cookies.get('language');
  }

  if (!locale) {
    locale = getCurrentLocale();
  }

  let localeData;
  let messages;

  if (locale === 'sl') {
    localeData = require('react-intl/locale-data/sl');
    messages = require('../../messages/sl');
  } else {
    locale = 'en';
    localeData = require('react-intl/locale-data/en');
    messages = require('../../messages/en');
  }

  addLocaleData([...localeData]);

  return getLocaleData(messages, locale);
}
