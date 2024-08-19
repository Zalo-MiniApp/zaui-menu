import '@formatjs/intl-numberformat/polyfill'
import '@formatjs/intl-numberformat/locale-data/vi'
import 'intersection-observer'

import ResizeObserver from 'resize-observer-polyfill'

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver
}
