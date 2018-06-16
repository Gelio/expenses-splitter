const Product = require('./product');

module.exports = class Person {
  /**
   * @param {string} name
   */
  constructor(name) {
    this._name = name;

    /** @type {Product[]} */
    this._purchasedProducts = [];

    /** @type {Product[]} */
    this._usedProducts = [];
  }

  get name() {
    return this._name;
  }

  get purchasedProducts() {
    return this._purchasedProducts;
  }

  get usedProducts() {
    return this._usedProducts;
  }

  /**
   * @param {Product} product
   */
  purchase(product) {
    this._purchasedProducts.push(product);
  }

  /**
   * @param {Product} product
   */
  use(product) {
    this._usedProducts.push(product);
    product.addUser();
  }

  getTotalExpenses() {
    return this._purchasedProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );
  }

  getTotalUsedProductsCost() {
    return this._usedProducts.reduce(
      (sum, product) => sum + product.getPerUserPrice(),
      0
    );
  }
};
