import I18n from 'react-native-i18n';
import english from './en';
import zhTw from './zh';

I18n.defaultLocale = 'zhTw';
I18n.fallbacks = true;
I18n.translations = {
  zhTw,
  english,
};
export default I18n;
