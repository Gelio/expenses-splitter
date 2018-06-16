const numeral = require('numeral');

const Product = require('./product');
const Person = require('./person');

/**
 * @param {Map<string, Person>} people
 * @param {object} row
 */
module.exports = function transformProductRow(
  { people, names, buyerColumnName, priceColumnName, nameColumnName },
  row
) {
  const keys = Object.keys(row);
  const productName = row[nameColumnName];
  if (!productName) {
    throw new Error(
      `The column name for the product's name (${nameColumnName}) is invalid or some product does not have a name`
    );
  }

  const productPrice = row[priceColumnName];
  if (!productPrice) {
    return;
  }

  const parsedProductPrice = numeral(productPrice.replace(',', '.')).value();

  const buyerName = row[buyerColumnName];
  if (!buyerName) {
    throw new Error(
      `The column name for the product's buyer (${buyerColumnName}) is invalid or some product does not have a buyer`
    );
  }

  if (names.indexOf(buyerName) === -1) {
    throw new Error(
      `Buyer name ${buyerName} is not provided in the names argument`
    );
  }

  let buyer = people.get(buyerName);
  if (!buyer) {
    buyer = new Person(buyerName);
    people.set(buyerName, buyer);
  }

  const product = new Product(productName, parsedProductPrice);
  buyer.purchase(product);

  keys.forEach(key => {
    const foundName = names.find(name => key.includes(name));
    if (!foundName) {
      return;
    }

    let person = people.get(foundName);
    if (!person) {
      person = new Person(foundName);
      people.set(foundName, person);
    }

    if (row[key] === 'TRUE') {
      person.use(product);
    }
  });
};
