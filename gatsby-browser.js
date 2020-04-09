require(`core-js/es7/symbol`)
require(`core-js/es7/array`)
require(`@babel/polyfill`)
require(`url-search-params-polyfill`)
const smoothscroll = require(`smoothscroll-polyfill`)

exports.onClientEntry = () => {
  smoothscroll.polyfill()
}
