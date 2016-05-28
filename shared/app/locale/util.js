import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import sl from 'react-intl/locale-data/sl';
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
export function getLocaleMessagesData(locale = '') {
  if (process.env.CLIENT) {
    locale = Cookies.get('language');
  }

  if (!locale) {
    locale = getCurrentLocale();
  }
  addLocaleData([...en, ...sl]);

  let messages;
  try {
    messages = require(`../../messages/${locale}`);
  } catch (e) {
    messages = require('../../messages/en');
  }
  return getLocaleData(messages, locale);
}
