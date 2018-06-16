const numeral = require('numeral');

const priceFormat = '0.00';

module.exports = function formatPrice(price) {
  return numeral(price).format(priceFormat);
};
